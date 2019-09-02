//Demo
layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;

    //监听提交
    form.on('submit(updatePwd)', function (data) {
        $.ajax({
            type: "POST",
            url: getPort() + "/user/password",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data.field),
            dataType: "json",
            headers: {"Token": window.localStorage.token},
            success: function (result) {
                if (result.code == 1) {
                    console.log(result);
                    layer.msg("修改成功");
                } else {
                    alert(result.msg);
                }
            },
            error: function (result) {
            }
        });
        return false;
    });
});