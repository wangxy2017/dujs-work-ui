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
    data: {url: null},
    methods: {},
    mounted: function () {
    }
});
var nav = new Vue({
    el: "#nav",
    data: {},
    methods: {
        goto: function (url) {
            main.url = url;
        },
        logout: function () {
            layer.confirm('确认退出系统吗？', function (index) {
                window.location.href = "login.html";
                layer.close(index);
            });
        }
    },
    mounted: function () {
    }
});