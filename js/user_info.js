//Demo
layui.use('form', function () {
    var form = layui.form;

    //监听提交
    form.on('submit(updateUser)', function (data) {
        $.ajax({
            type: "POST",
            url: getPort() + "/user/update",
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

    $(function () {
        // 查询基本资料
        $.ajax({
            type: "GET",
            url: getPort() + "/user/query/" + window.localStorage.userId,
            dataType: "json",
            headers: {"Token": window.localStorage.token},
            success: function (result) {
                if (result.code == 1) {
                    var user = result.data;
                    form.val("userForm", {
                        "photo": user.photo
                        , "nickName": user.nickName
                        , "email": user.email
                    })
                } else {
                    alert(result.msg);
                }
            },
            error: function (result) {
            }
        });
    });
});