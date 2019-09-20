layui.use(['layedit', 'form', 'layer'], function () {
    var layedit = layui.layedit;
    var form = layui.form;
    var layer = layui.layer;
    // 建立编辑器
    var index = layedit.build('content', {
        height: 800 //设置编辑器高度
    });
    // 自定义验证
    form.verify({
        content: function () {
            layedit.sync(index);
            var content = $("#content").val();
            if (content == "") {
                return "请输入笔记内容";
            }
        }
    });
    //监听提交
    form.on('submit(saveNote)', function (data) {
        var url = $("#id").val() == "" ? "/note/save" : "/note/update";
        post(url, data.field, function (result) {
            if (result.code == 1) {
                layer.msg("保存成功", {icon: 6});
                vue.loadNoteList();
                // 表单重置
                $("#noteForm")[0].reset();
                layedit.setContent(index, "");
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        return false;
    });
    $(function () {
        // 加载分类
        get('/category/list', function (result) {
            if (result.code == 1) {
                var list = result.data == null ? [] : result.data;
                var html = "";
                for (var i = 0; i < list.length; i++) {
                    html += ' <option value="' + list[i].id + '">' + list[i].name + '</option>';
                }
                $("#category").append(html);
                // 重新渲染
                form.render("select");
            }
        });
    });
    // 笔记列表
    var vue = new Vue({
        el: "#notes",
        data: {
            notes: []
        },
        methods: {
            /**
             * 加载笔记列表
             */
            loadNoteList: function () {
                get('/note/findAll/0', function (result) {
                    if (result.code == 1) {
                        vue.notes = result.data;
                    }
                });
            },
            /**
             * 删除笔记
             * @param id
             */
            removeNote: function (id) {
                layer.confirm('确认删除笔记吗？', function (index) {
                    del('/note/' + id, function (result) {
                        if (result.code == 1) {
                            layer.msg("删除成功", {icon: 6});
                            vue.loadNoteList();
                        } else {
                            layer.msg(result.msg, {icon: 5});
                        }
                    });
                    layer.close(index);
                });
            },
            /**
             * 查看笔记
             */
            viewNote: function (e, id) {
                get('/note/content/' + id, function (result) {
                    if (result.code == 1) {
                        var note = result.data;
                        form.val("noteForm", {
                            "id": note.id
                            , "title": note.title
                            , "content": note.content
                            , "category_id": note.categoryId
                        });
                        layedit.setContent(index, note.content);
                    } else {
                        layer.msg(result.msg, {icon: 5});
                    }
                });
                var _this = e.currentTarget;
                $(_this).addClass("active").siblings().removeClass("active");
            }
        },
        mounted: function () {
            this.loadNoteList();
        }
    });
    var recycle = new Vue({
        el: "#recycleNotes",
        data: {
            notes: []
        },
        methods: {
            /**
             * 清空回收站
             */
            cleanNotes: function () {
                layer.confirm('确认清空回收站吗？', function (index) {
                    get('/note/clean', function (result) {
                        if (result.code == 1) {
                            recycle.notes = [];
                        }
                    });
                    layer.close(index);
                });
            }
        },
        mounted: function () {
        }
    });
    /**
     * 回收站
     */
    window.recycleList = function () {
        get('/note/recycle', function (result) {
            if (result.code == 1) {
                recycle.notes = result.data;
                $("#recycleNotes").show();
                $("#notes").hide();
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        })
    };
    window.showNotes = function () {
        $("#recycleNotes").hide();
        $("#notes").show();
    };
    window.download = function () {
        var id = $(".note-group-list li.active").attr("data-id");
        if (typeof id === "undefined") {
            layer.msg("请选择笔记");
            return false;
        }
    };
});