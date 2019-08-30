layui.use(['table', 'upload', 'form'], function () {
    var table = layui.table;
    var upload = layui.upload;
    var form = layui.form;
    //第一个实例
    table.render({
        elem: '#bookmarkList'
        , height: 312
        , url: 'https://www.layui.com/demo/table/user/' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left'}
            , {field: 'username', title: '用户名', width: 80}
            , {field: 'sex', title: '性别', width: 80, sort: true}
            , {field: 'city', title: '城市', width: 80}
            , {field: 'sign', title: '签名', width: 177}
            , {field: 'experience', title: '积分', width: 80, sort: true}
            , {field: 'score', title: '评分', width: 80, sort: true}
            , {field: 'classify', title: '职业', width: 80}
            , {field: 'wealth', title: '财富', width: 135, sort: true}
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