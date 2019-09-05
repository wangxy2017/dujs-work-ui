var port = "http://222.180.198.30:9030";

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
            if (result.code == 1) {
                callback(result);
            } else {
                layer.msg(result.msg, {icon: 2});
            }
        },
        error: function (result) {
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
            if (result.code == 1) {
                callback(result);
            } else {
                layer.msg(result.msg, {icon: 5});
            }
        },
        error: function (result) {
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
            if (result.code == 1) {
                callback(result);
            } else {
                layer.msg(result.msg, {icon: 2});
            }
        },
        error: function (result) {
            layer.msg("服务器错误", {icon: 2});
        }
    });
}