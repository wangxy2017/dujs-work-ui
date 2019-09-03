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
            layer.msg("保存成功", {icon: 1});
            category.loadNoteList();
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
                get('/note/content' + id, function (result) {
                    console.log(result);
                });
            },
            /**
             * 加载笔记列表
             */
            loadNoteList: function () {
                get('/note/findAll/' + this.category_id, function (result) {
                    category.notes = result.data;
                });
            },
            /**
             * 加载分类列表
             */
            loadCategoryList: function () {
                get('/category/list', function (result) {
                    category.categories = result.data;
                });
            }
        },
        mounted: function () {
            this.loadNoteList();
            this.loadCategoryList();
        }
    });

    // var note = new Vue({
    //     el: "#note",
    //     data: {},
    //     computed: {
    //         categories: function () {
    //             return category.categories;
    //         }
    //     },
    //     methods: {},
    //     mounted: function () {
    //         console.log(this.categories);
    //     }
    // });

});