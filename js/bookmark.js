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
            , {
                field: 'href',
                title: '链接',
                templet: '<div><a href="javascript:;" class="layui-table-link" onclick="goto(\'{{d.href}}\')"><img src="{{d.icon}}" class="icon">{{d.name}}</a></div>'
            }
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
                layer.msg(res.msg, {icon: 5});
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
        layer.confirm('确认清空书签吗？', function (index) {
            del('/bookmark/deleteAll', function (result) {
                if (result.code == 1) {
                    layer.msg("清除成功", {icon: 6});
                    tableList.reload();
                } else {
                    layer.msg(result.msg, {icon: 5});
                }
            });
            layer.close(index);
        });
    };
    /**
     * 导出书签
     */
    window.exportAll = function () {
        console.log("导出书签");
    };
    /**
     * 新窗口
     * @param url
     */
    window.goto = function (url) {
        window.parent.open(url);
    }
});