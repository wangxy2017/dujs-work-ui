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
            // element.render('menu');
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
            get('/user/query/' + window.localStorage.userId, function (result) {
                nav.username = result.data.username;
                nav.$nextTick(function () {
                    element.render('nav');
                });
            });
        }
    });
});