//Demo
layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;

    //监听提交
    form.on('submit(updateUser)', function (data) {
        post('/user/update', data.field, function (result) {
            layer.msg("修改成功", {icon: 1});
        });
        return false;
    });

    $(function () {
        // 查询基本资料
        get('/user/query/' + window.localStorage.getItem("userId"), function (result) {
            var user = result.data;
            form.val("userForm", {
                "photo": user.photo
                , "nickName": user.nickName
                , "email": user.email
            });
        });
    });
});