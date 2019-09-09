layui.use(['layedit', 'form', 'layer'], function () {
    var layedit = layui.layedit;
    var form = layui.form;
    var layer = layui.layer;
    //建立编辑器
    var index = layedit.build('content', {
        height: 800 //设置编辑器高度
    });
    //监听提交
    form.on('submit(saveNote)', function (data) {
        post('/note/save', {
            title: data.field.title,
            "content": layedit.getContent(index),
            category_id: data.field.category
        }, function (result) {
            if (result.code == 1) {
                layer.msg("保存成功", {icon: 1});
                vue.loadNoteList();
            } else {
                layer.msg(result.msg, {icon: 2});
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
            } else {
                layer.msg(result.msg, {icon: 2});
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
                            layer.msg("删除成功", {icon: 1});
                            vue.loadNoteList();
                        } else {
                            layer.msg(result.msg, {icon: 2});
                        }
                    });
                    layer.close(index);
                });
            }
        },
        mounted: function () {
            this.loadNoteList();
        }
    });
});