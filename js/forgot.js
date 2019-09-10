layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;
    //监听提交
    form.on('submit(forgot)', function (data) {
        get('/login/forgot?email=' + data.field.email + "&username=" + data.field.username, function (result) {
            if (result.code == 1) {
                layer.msg('新密码已发送至邮箱...', {icon: 6});
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        return false;
    });
});