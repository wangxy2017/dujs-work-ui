//Demo
layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;

    //自定义验证规则
    form.verify({
        confirmPwd: function (value) {
            var new_password = $("#new_password").val();
            if (value != new_password) {
                return '确认密码与新密码不一致';
            }
        }
    });

    //监听提交
    form.on('submit(updatePwd)', function (data) {
        post('/user/password', data.field, function (result) {
            if (result.code == 1) {
                layer.msg("修改成功", {icon: 1});
            } else {
                layer.msg(result.msg, {icon: 2});
            }
        });
        return false;
    });
});