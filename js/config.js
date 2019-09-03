var port = "http://localhost:9000";

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
        headers: {"Token": window.localStorage.token},
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
        headers: {"Token": window.localStorage.token},
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