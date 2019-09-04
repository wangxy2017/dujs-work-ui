//JavaScript代码区域
layui.use(['element', 'layer'], function () {
    var element = layui.element;
    var layer = layui.layer;

    $(function () {
        get('/user/query/' + window.localStorage.userId, function (result) {
            $("#username").text(result.data.username);
        });
    });

    /**
     * 页面跳转
     * @param url
     */
    window.jumpTo = function (url) {
        $("#main").attr("src", url);
    }

    /**
     * 退出
     */
    window.logout = function () {
        layer.confirm('确认退出系统吗？', function (index) {
            window.localStorage.token = null;// 清除token
            window.localStorage.userId = null;// 清除userId
            window.location.href = "login.html";
            layer.close(index);
        });
    }
});