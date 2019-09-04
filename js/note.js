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
        });
        return false;
    });
});