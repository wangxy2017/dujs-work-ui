layui.use(['layedit', 'form'], function () {
    var layedit = layui.layedit;
    var form = layui.form;
    //建立编辑器
    layedit.build('content', {
        height: 800 //设置编辑器高度
    });
    //监听提交
    form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});