//JavaScript代码区域
layui.use(['element', 'layer'], function () {
    var element = layui.element;
    var layer = layui.layer;

    /**
     * 菜单
     */
    var menu = new Vue({
        el: "#menu",
        data: {},
        methods: {
            goto: function (url) {
                main.url = url;
            }
        },
        mounted: function () {
            element.render('menu');
        }
    });
    /**
     * iframe
     */
    var main = new Vue({
        el: "#main",
        data: {url: "note.html"},
        methods: {},
        mounted: function () {
        }
    });
    /**
     * 头部导航条
     */
    var nav = new Vue({
        el: "#nav",
        data: {
            username: ""
        },
        methods: {
            /**
             * 跳转
             * @param url
             */
            goto: function (url) {
                main.url = url;
            },
            /**
             * 退出
             */
            logout: function () {
                layer.confirm('确认退出系统吗？', function (index) {
                    window.localStorage.token = null;// 清除token
                    window.localStorage.userId = null;// 清除userId
                    window.location.href = "login.html";
                    layer.close(index);
                });
            }
        },
        mounted: function () {
            $.ajax({
                type: "GET",
                url: getPort() + "/user/query/" + window.localStorage.userId,
                dataType: "json",
                headers: {"Token": window.localStorage.token},
                success: function (result) {
                    if (result.code == 1) {
                        nav.username = result.data.username;
                        nav.$nextTick(function () {
                            element.render('nav');
                        });
                    } else {
                        layer.msg(result.msg, {icon: 2});
                    }
                },
                error: function (result) {
                    layer.msg("网络异常", {icon: 2});
                }
            });
        }
    });
});