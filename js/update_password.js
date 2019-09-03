//Demo
layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;

    //监听提交
    form.on('submit(updatePwd)', function (data) {
        post('/user/password', data.field, function (result) {
            layer.msg("修改成功", {icon: 1});
        });
        return false;
    });
});