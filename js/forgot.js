layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;
    //监听提交
    form.on('submit(forgot)', function (data) {
        get('/login/forgot?email=' + data.field.email + "&username=" + data.field.username, function (result) {
            if (result.code == 1) {
                layer.alert('新密码已发送至邮箱...', function (index) {
                    //do something
                    window.location.href = "login.html";
                    layer.close(index);
                });
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        return false;
    });
});