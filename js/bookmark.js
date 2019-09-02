layui.use(['table', 'upload', 'form'], function () {
    var table = layui.table;
    var upload = layui.upload;
    var form = layui.form;
    //第一个实例
    table.render({
        elem: '#bookmarkList'
        , height: 312
        , url: getPort()+'/bookmark/list' //数据接口
        , page: true //开启分页
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
            {field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left'}
            , {field: 'username', title: '名称', width: 200}
            , {field: 'sex', title: '链接'}
        ]]
    });

    //执行实例
    var uploadInst = upload.render({
        elem: '#import' //绑定元素
        , url: '/upload/' //上传接口
        , done: function (res) {
            //上传完毕回调
        }
        , error: function () {
            //请求异常回调
        }
    });
    //监听提交
    form.on('submit(search)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});