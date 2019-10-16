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
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        return false;
    });
    form.on('submit(searchBtn)', function (data) {
        get('/note/findAll?title=' + data.field.title, function (result) {
            if (result.code == 1) {
                vue.notes = result.data;
            }
        });
        return false;
    });
    window.loadCategorySelect = function () {
        get('/category/findAll', function (result) {
            if (result.code == 1) {
                var list = result.data == null ? [] : result.data;
                var html = '<option value="">请选择</option>';
                for (var i = 0; i < list.length; i++) {
                    html += ' <option value="' + list[i].id + '">' + list[i].name + '</option>';
                }
                $("#categorySelect").empty().append(html);
                // 重新渲染
                form.render("select");
            }
        });
    };
    // 页面加载完成执行
    $(function () {
        // 加载分类
        loadCategorySelect();
        // 初始化滚动条
        $("#scroll").mCustomScrollbar({theme: "minimal-dark"});
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
                get('/note/findAll', function (result) {
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
             * 编辑笔记
             */
            editNote: function (e, id) {
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
            },
            /**
             * 预览笔记
             * @param id
             */
            viewNote: function (id) {
                get('/note/content/' + id, function (result) {
                    if (result.code == 1) {
                        $("#noteContent").show();
                        noteContent.title = result.data.title;
                        noteContent.content = result.data.content;
                    } else {
                        layer.msg(result.msg, {icon: 5});
                    }
                });

            },
            /**
             * 下载笔记
             * @param id
             */
            downloadNote: function (id) {
                window.location.href = getHost() + "/note/download/" + id;
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
    window.closeNoteCategories = function () {
        $("#noteCategoriesMask").hide();
        $("#noteCategories").hide();
    };
    window.showNoteCategories = function () {
        //阻止事件冒泡
        var e = window["event"] || arguments.callee.caller.arguments[0];
        e.stopPropagation();

        var node = $("#noteCategories");
        var mask = $("#noteCategoriesMask");
        if (node.is(":hidden")) {
            node.show();
            mask.show();
        } else {
            node.hide();
            mask.hide();
        }
    };
    /**
     * 重置表单
     */
    window.resetForm = function () {
        $("#noteForm")[0].reset();
        $("#id").val("");
        layedit.setContent(index, "");
    };
    window.newNote = function () {
        // 表单重置
        resetForm();
        // 触发提交
        $("#saveNote").click();
    };
    var noteContent = new Vue({
        el: "#noteContent",
        data: {title: "", content: ""},
        methods: {
            /**
             * 关闭预览
             */
            closeDiv: function () {
                $("#noteContent").hide();
            }
        },
        mounted: function () {
            // 初始化滚动条
            $("#noteScroll").mCustomScrollbar({theme: "minimal-dark"});
        }
    });
    var noteCategories = new Vue({
        el: "#noteCategories",
        data: {categories: []},
        methods: {
            getNotes: function (e, id) {
                if (id == -1) {// 查看回收站笔记
                    get('/note/recycle', function (result) {
                        if (result.code == 1) {
                            recycle.notes = result.data;
                            $("#recycleNotes").show();
                            $("#notes").hide();
                        } else {
                            layer.msg(result.msg, {icon: 5});
                        }
                    });
                } else if (id == -2) {// 全部笔记
                    get('/note/findAll', function (result) {
                        if (result.code == 1) {
                            vue.notes = result.data;
                        }
                    });
                    $("#recycleNotes").hide();
                    $("#notes").show();
                } else {
                    get('/note/findAll?category_id=' + id, function (result) {
                        if (result.code == 1) {
                            vue.notes = result.data;
                        }
                    });
                    $("#recycleNotes").hide();
                    $("#notes").show();
                }
                // 弹出框消失
                $("#noteCategories").hide();
                var _this = e.currentTarget;
                $(_this).addClass("active").siblings().removeClass("active");
            },
            /**
             * 修改分类
             * @param id
             * @param name
             */
            editCategory: function (id, name, e) {
                var _this = e.currentTarget;
                layer.prompt({title: '修改分类', maxlength: 20, value: name}, function (value, index, elem) {
                    post('/category/update', {"id": id, "name": value}, function (result) {
                        if (result.code == 1) {
                            layer.msg("修改成功", {icon: 6});
                            $(_this).parent().prev().text(value);
                            loadCategorySelect();
                        } else {
                            layer.msg(result.msg, {icon: 5});
                        }
                    });
                    layer.close(index);
                });
            },
            /**
             * 删除分类
             * @param id
             * @param e
             */
            delCategory: function (id, e) {
                var _this = e.currentTarget;
                layer.confirm('确认删除分类吗？', {title: '提示'}, function (index) {
                    del("/category/" + id, function (result) {
                        if (result.code == 1) {
                            layer.msg("删除成功", {icon: 6});
                            $(_this).parent().parent().remove();
                            loadCategorySelect();
                        } else {
                            layer.msg(result.msg, {icon: 5});
                        }
                    });
                    layer.close(index);
                });
            },
            /**
             * 新增分类
             */
            addCategory: function () {
                layer.prompt({title: '分类名称', maxlength: 20}, function (value, index, elem) {
                    post('/category/save', {"name": value}, function (result) {
                        if (result.code == 1) {
                            layer.msg("保存成功", {icon: 6});
                            noteCategories.loadDataList();
                            loadCategorySelect();
                        } else {
                            layer.msg(result.msg, {icon: 5});
                        }
                    });
                    layer.close(index);
                });
            },
            loadDataList: function () {
                // 加载分类
                get('/category/findAll', function (result) {
                    if (result.code == 1) {
                        noteCategories.categories = result.data;
                    }
                });
            }
        },
        mounted: function () {
            // 加载分类
            this.loadDataList();
            // 初始化滚动条
            $("#category-scroll").mCustomScrollbar({theme: "minimal-dark"});
        }
    });

});