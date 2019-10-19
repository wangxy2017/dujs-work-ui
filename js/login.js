layui.use(['carousel', 'form', 'layer'], function () {
    var carousel = layui.carousel;
    var form = layui.form;
    var layer = layui.layer;

    //自定义验证规则
    form.verify({
        /**
         * 验证码
         * @param value
         * @returns {string}
         */
        vercodes: function (value) {
            //获取验证码
            var zylVerCode = $(".zylVerCode").html();
            if (value.toLowerCase() != zylVerCode.toLowerCase()) {
                return '验证码错误';
            }
        },
        /**
         * 验证用户名
         * @param value
         */
        checkUsername: function (value) {
            get('/register/checkUsername?username=' + value, function (result) {
                if (result.code == 1) {
                    return "用户已注册";
                }
            });
        },
        /**
         * 验证邮箱
         */
        checkEmail: function (value) {
            get('/register/checkEmail?email=' + value, function (result) {
                if (result.code == 1) {
                    return "邮箱已注册";
                }
            });
        }
    });

    //监听提交
    form.on('submit(login)', function (data) {
        post('/login/login', data.field, function (result) {
            if (result.code == 1) {
                window.localStorage.setItem("token", result.data.token);
                window.localStorage.setItem("userId", result.data.userId);
                window.location.href = "index.html";
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        return false;
    });
    form.on('submit(register)', function (data) {
        post('/register/register', data.field, function (result) {
            if (result.code == 1) {
                layer.msg("注册成功！", {icon: 6});
                setTimeout(function () {
                    window.localStorage.setItem("token", result.data.token);
                    window.localStorage.setItem("userId", result.data.userId);
                    window.location.href = "index.html";
                }, 1000);
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        return false;
    });
    //粒子线条
    $(".zyl_login_cont").css({"height": $(window).height() / 1.3}).jParticle({
        background: "rgba(0,0,0,0)",//背景颜色
        color: "#fff",//粒子和连线的颜色
        particlesNumber: 100,//粒子数量
        //disableLinks:true,//禁止粒子间连线
        //disableMouse:true,//禁止粒子间连线(鼠标)
        particle: {
            minSize: 1,//最小粒子
            maxSize: 3,//最大粒子
            speed: 30,//粒子的动画速度
        }
    });
    window.showRegister = function () {
        $("#register").show();
        $("#login").hide();
    };
    window.showLogin = function () {
        $("#login").show();
        $("#register").hide();
    };
    window.checkForm = function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var email = $("#email").val();
        if (isEmpty(username)) {
            $("#username").focus();
            $("#username").addClass("layui-form-danger");
            layer.msg("必填项不能为空", {icon: 5,anim: 6});
            return false;
        }
        if (isEmpty(password)) {
            $("#password").focus();
            $("#password").addClass("layui-form-danger");
            layer.msg("必填项不能为空", {icon: 5,anim: 6});
            return false;
        }
        if (isEmpty(email)) {
            $("#email").focus();
            $("#email").addClass("layui-form-danger");
            layer.msg("必填项不能为空", {icon: 5,anim: 6});
            return false;
        }
    };
    /**
     * 发送验证码
     */
    window.getCode = function () {
        var _this = $("#sendCode");
        if (_this.hasClass("layui-btn-disabled")) {
            return false;
        }
        if (!checkForm()) {
            return false;
        }
        get('/register/getCode?email=' + email, function (result) {
            if (result.code == 1) {
                layer.msg("验证码已发送至邮箱，请前往查看...", {icon: 6});
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        });
        // 启动计时器
        var time = 30;
        _this.addClass("layui-btn-disabled");
        var timer = setInterval(() => {
            time--;
            _this.text(time + ' 秒');
            if (time === 0) {
                clearInterval(timer);
                _this.text('重新获取');
                _this.removeClass("layui-btn-disabled")
            }
        }, 1000);

    }
});