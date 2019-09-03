//JavaScript代码区域
layui.use(['element', 'layer'], function () {
    var element = layui.element;
    var layer = layui.layer;

});
var menu = new Vue({
    el: "#menu",
    data: {},
    methods: {
        goto: function (url) {
            main.url = url;
        }
    },
    mounted: function () {
    }
});
var main = new Vue({
    el: "#main",
    data: {url: "note.html"},
    methods: {},
    mounted: function () {
    }
});
var nav = new Vue({
    el: "#nav",
    data: {
        username: ""
    },
    methods: {
        goto: function (url) {
            main.url = url;
        },
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
                } else {
                    alert(result.msg);
                }
            },
            error: function (result) {
            }
        });
    }
});