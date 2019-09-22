var giveIdea;
//JavaScript代码区域
layui.use(['element', 'layer', 'form'], function () {
    var element = layui.element;
    var layer = layui.layer;
    var form = layui.form;

    //监听提交
    form.on('submit(submitIdea)', function (data) {
        post('/user/idea',data.field,function (result) {});
        layer.close(giveIdea);
        layer.msg('提交成功', {icon: 6});
        return false;
    });
    $(function () {
        get('/user/query/' + window.localStorage.getItem("userId"), function (result) {
            if (result.code == 1) {
                $("#username").text(subStr(result.data.username, 5));
            }
        });
    });

    /**
     * 页面跳转
     * @param url
     */
    window.jumpTo = function (url) {
        $("#main").attr("src", url);
    };

    /**
     * 退出
     */
    window.logout = function () {
        layer.confirm('确认退出系统吗？', function (index) {
            window.localStorage.removeItem("token");// 清除token
            window.localStorage.removeItem("userId");// 清除userId
            window.location.href = "login.html";
            layer.close(index);
        });
    };
    /**
     * 意见反馈
     */
    window.tellIdeas = function () {
        giveIdea = layer.open({
            type: 1,
            title: "意见反馈",
            content: $('#giveIdea'),
            area: ["800px", "500px"],
            end: function () {
                // 重置表单
                $("#giveIdea").find("form")[0].reset();
            }
        });
    };
});