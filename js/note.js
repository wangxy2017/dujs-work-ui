layui.use(['layedit', 'form'], function () {
    var layedit = layui.layedit;
    var form = layui.form;
    //建立编辑器
    layedit.build('content', {
        height: 800 //设置编辑器高度
    });
    //监听提交
    form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
    var category = new Vue({
        el: "#category",
        data: {
            notes: [],
            category_id: 0
        },
        methods: {
            /**
             * 查看笔记内容
             * @param id
             */
            viewNote: function (id) {
                $.ajax({
                    type: "GET",
                    url: getPort() + "/note/content/" + id,
                    dataType: "json",
                    headers: {"Token": window.localStorage.token},
                    success: function (result) {
                        if (result.code == 1) {
                            console.log(result);
                        } else {
                            alert(result.msg);
                        }
                    },
                    error: function (result) {
                    }
                });
            }
        },
        mounted: function () {
            $.ajax({
                type: "GET",
                url: getPort() + "/note/findAll/" + this.category_id,
                dataType: "json",
                headers: {"Token": window.localStorage.token},
                success: function (result) {
                    if (result.code == 1) {
                        console.log(result);
                    } else {
                        alert(result.msg);
                    }
                },
                error: function (result) {
                }
            });
        }
    });
});