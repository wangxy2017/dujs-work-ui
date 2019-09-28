var port = "http://47.108.71.102:9030";

/**
 * 获取host
 * @returns {string}
 */
function getPort() {
    return port;
}

/**
 * 发送get请求
 * @param url
 * @param callback
 */
function get(url, callback) {
    $.ajax({
        type: "GET",
        url: getPort() + url,
        dataType: "json",
        headers: {"Token": window.localStorage.getItem("token")},
        success: function (result) {
            if (result.msg == "未登录") {
                // 清除token
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("userId");
                window.top.location.href = "login.html";
            }
            callback && callback(result);
        },
        error: function () {
            layer.msg("服务器错误", {icon: 2});
        }
    });
}

/**
 * 发送post请求
 * @param url
 * @param data
 * @param callback
 */
function post(url, data, callback) {
    $.ajax({
        type: "POST",
        url: getPort() + url,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        headers: {"Token": window.localStorage.getItem("token")},
        success: function (result) {
            if (result.msg == "未登录") {
                // 清除token
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("userId");
                window.top.location.href = "login.html";
            }
            callback && callback(result);
        },
        error: function () {
            layer.msg("服务器错误", {icon: 2});
        }
    });
}

/**
 * delete请求
 * @param url
 * @param callback
 */
function del(url, callback) {
    $.ajax({
        type: "DELETE",
        url: getPort() + url,
        dataType: "json",
        headers: {"Token": window.localStorage.getItem("token")},
        success: function (result) {
            if (result.msg == "未登录") {
                // 清除token
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("userId");
                window.top.location.href = "login.html";
            }
            callback && callback(result);
        },
        error: function () {
            layer.msg("服务器错误", {icon: 2});
        }
    });
}

/**
 * 格式化时间
 * @param UTCDateString
 * @returns {string}
 */
function toLocalTime(UTCDateString) {
    if (!UTCDateString) {
        return '-';
    }

    function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
    }

    var date2 = new Date(UTCDateString);     //这步是关键
    var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
    var hour = date2.getHours();
    var noon = hour >= 12 ? '下午' : '上午';
    hour = hour >= 12 ? hour - 12 : hour;
    hour = formatFunc(hour);
    var min = formatFunc(date2.getMinutes());
    var dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min;
    return dateStr;
}

/**
 * 截取字符串
 * @param text
 * @param max
 * @returns {string}
 */
function subStr(text, max) {
    if (text.length > max) {
        return text.substring(0, max) + "...";
    }
}

/**
 * 判断是否是空
 * @param value
 * @returns {boolean}
 */
function isEmpty(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null") {
        return true;
    } else {
        value = value.replace(/\s/g, "");
        if (value == "") {
            return true;
        }
        return false;
    }
}