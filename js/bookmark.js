layui.use(['table', 'upload', 'form', 'layer'], function () {
    var table = layui.table;
    var upload = layui.upload;
    var form = layui.form;
    var layer = layui.layer;
    //加载数据
    var tableList = table.render({
        elem: '#bookmarkList'
        , height: 312
        , url: getPort() + '/bookmark/list' //数据接口
        , page: true //开启分页
        , headers: {"Token": window.localStorage.getItem("token")}
        , parseData: function (res) {
            return {
                "code": res.code,
                "msg": res.msg,
                "count": res.data.total,
                "data": res.data.list
            };
        }, request: {
            pageName: "pageNum",
            limitName: "pageSize"
        },
        response: {
            statusCode: 1
        }
        , cols: [[ //表头
            {field: 'id', title: 'ID', width: 80}
            , {field: 'name', title: '名称'}
            , {field: 'href', title: '链接'}
        ]]
    });

    //导入书签
    var uploadInst = upload.render({
        elem: '#import' //绑定元素
        , url: getPort() + '/bookmark/upload' //上传接口
        , accept: "file"
        , exts: "html"
        , headers: {"Token": window.localStorage.getItem("token")}
        , done: function (res) {
            // 上传成功
            if (res.code == 1) {
                tableList.reload();
            } else {
                layer.msg(res.msg, {icon: 2});
            }
        }
        , error: function () {
            layer.msg("网络异常", {icon: 2});
        }
    });
    //监听提交
    form.on('submit(search)', function (data) {
        tableList.reload({where: data.field});
        return false;
    });
    /**
     * 清空书签
     */
    window.deleteAll = function () {
        del('/bookmark/deleteAll', function (result) {
            layer.msg("清除成功", {icon: 5});
            tableList.reload();
        });
    };
    /**
     * 导出书签
     */
    window.exportAll = function () {
    };
});