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
        $.ajax({
            type: "POST",
            url: getPort() + "/note/save",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                title: data.field.title,
                "content": layedit.getContent(index),
                category_id: data.field.category
            }),
            dataType: "json",
            headers: {"Token": window.localStorage.token},
            success: function (result) {
                if (result.code == 1) {
                    console.log(result);
                    layer.msg("保存成功");
                    category.loadNoteList();
                } else {
                    alert(result.msg);
                }
            },
            error: function (result) {
            }
        });
        return false;
    });
    var category = new Vue({
        el: "#category",
        data: {
            notes: [],
            category_id: 0,
            categories: []
        },
        methods: {
            /**
             * 查看笔记内容
             * @param id
             */
            viewNote: function (id) {
                $.ajax({
                    type: "GET",
                    url: getPort() + "/note/content/" + id,
                    dataType: "json",
                    headers: {"Token": window.localStorage.token},
                    success: function (result) {
                        if (result.code == 1) {
                            console.log(result);
                        } else {
                            alert(result.msg);
                        }
                    },
                    error: function (result) {
                    }
                });
            },
            /**
             * 加载笔记列表
             */
            loadNoteList: function () {
                $.ajax({
                    type: "GET",
                    url: getPort() + "/note/findAll/" + category.category_id,
                    dataType: "json",
                    headers: {"Token": window.localStorage.token},
                    success: function (result) {
                        if (result.code == 1) {
                            // console.log(result);
                            category.notes = result.data;
                        } else {
                            alert(result.msg);
                        }
                    },
                    error: function (result) {
                    }
                });
            },
            /**
             * 加载分类列表
             */
            loadCategoryList: function () {
                $.ajax({
                    type: "GET",
                    url: getPort() + "/category/list",
                    dataType: "json",
                    headers: {"Token": window.localStorage.token},
                    success: function (result) {
                        if (result.code == 1) {
                            // console.log(result);
                            category.categories = result.data;
                        } else {
                            alert(result.msg);
                        }
                    },
                    error: function (result) {
                    }
                });
            }
        },
        mounted: function () {
            this.loadNoteList();
        }
    });

    var note = new Vue({
        el: "#note",
        data: {},
        computed: {
            categories: function () {
                return category.categories;
            }
        },
        methods: {},
        mounted: function () {
        }
    });

});