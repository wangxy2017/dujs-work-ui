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
            vue.loadNoteList();
        });
        return false;
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
                    vue.notes = result.data;
                });
            }
        },
        mounted: function () {
            this.loadNoteList();
        }
    });
});