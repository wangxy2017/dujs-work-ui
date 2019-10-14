layui.use(['table', 'upload', 'form', 'layer'], function () {
    var table = layui.table;
    var form = layui.form;
    var layer = layui.layer;
    //加载数据
    var tableList = table.render({
        elem: '#categoryList'
        , url: getHost() + '/category/list' //数据接口
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
            , {field: 'name', title: '分类名称'}
            , {title: '操作', fixed: 'right', align: 'center', toolbar: '#options', width: 120}
        ]]
    });
    // 监听工具条
    table.on('tool(categoryList)', function (obj) {
        var data = obj.data; // 获得当前行数据
        var layEvent = obj.event; // 获得 lay-event 对应的值

        // 修改分类
        if (layEvent === 'update') {
            layer.prompt({title: '分类名称', maxlength: 20, value: data.name}, function (value, index, elem) {
                post('/category/update', {"id": data.id, "name": value}, function (result) {
                    if (result.code == 1) {
                        layer.msg("修改成功", {icon: 6});
                        tableList.reload();
                    } else {
                        layer.msg(result.msg, {icon: 5});
                    }
                });
                layer.close(index);
            });
        }
        // 删除分类
        if (layEvent === 'delete') {
            layer.confirm('确认删除分类吗？', function (index) {
                del("/category/" + data.id, function (result) {
                    if (result.code == 1) {
                        layer.msg("删除成功", {icon: 6});
                        tableList.reload();
                    } else {
                        layer.msg(result.msg, {icon: 5});
                    }
                });
                layer.close(index);
            });
        }
    });
    //监听提交
    form.on('submit(search)', function (data) {
        tableList.reload({where: data.field});
        return false;
    });
    window.addCategory = function () {
        layer.prompt({title: '分类名称', maxlength: 20}, function (value, index, elem) {
            post('/category/save', {"name": value}, function (result) {
                if (result.code == 1) {
                    layer.msg("保存成功", {icon: 6});
                    tableList.reload();
                } else {
                    layer.msg(result.msg, {icon: 5});
                }
            });
            layer.close(index);
        });
    };
});