
var param = {};
function getOrdersList() {
    $('#table').bootstrapTable({
        method: 'POST',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        // contentType : 'application/json',// 发送到服务器的数据编码类型
        striped : true,// 隔行变色效果
        pagination : true,// 在表格底部显示分页条
        pageNumber : 1,// 首页页码
        pageList : [5,10],// 设置可供选择的页面数据条数
        clickToSelect : false,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
        cache : false,// 禁用 AJAX 数据缓存
        sortName : 'id',// 定义排序列
        sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
        url : '/order/orderListConditionalPaging',// 服务器数据的加载地址
        sidePagination : 'client',// 设置在哪里进行分页
        /*showRefresh: true,*/  //显示刷新按钮
        dataType : 'json',// 服务器返回的数据类型
        queryParamsType:'limit',//查询参数组织方式
        queryParams: function queryParams(params) {
            param.page = (params.offset/params.limit) + 1;
            param.size=params.limit;
            param.sort = params.order; // 排序列名
            param.order = params.sort; // 排位命令（descasc）
            param.field = 'sys_user'; //查询数据库字段
            // param.content = 'ORDER_PAID_NO_SHIPPED'; //查询内容
            param.fullMatch = true;
            return param;
        },
        selectItemName : '',// radio or checkbox 的字段名
        onLoadSuccess:function (backData) {
            console.log(backData.user_order_list);
            $('#table').bootstrapTable('removeAll');
            $('#table').bootstrapTable('append', backData.user_order_list);
        },
        //data:[{id:'1',account:'123',password:'123456',node:'0000',money:'1000',orderStatus:'003',currentCity:'重庆',TimeOfArrival:'2016-12-20',startCity:'重庆',endCity:'河北',createTime:'2016-12-20'}
        //    ,{id:'2',account:'234',password:'123456',node:'1111',money:'2000',orderStatus:'001',currentCity:'浙江',TimeOfArrival:'2018-03-20',startCity:'台湾',endCity:'新疆',createTime:'2018-03-18'}],
        columns : [ {
            checkbox : true,
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '2'// 宽度
        },{
            title: '序号',//标题  可不加
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter: function (value, row, index) {
                return index+1;
            }
        }, {
            field : 'id',// 返回值名称
            title : '订单号',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1'// 宽度
        }, {
            field : 'sysUser.account',// 返回值名称
            title : '用户名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible:false
        },{
            field : 'node',// 返回值名称
            title : '备注',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
            visible : false
        },{
            field : 'cost',// 返回值名称
            title : '金额',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10'// 宽度
        },  {
            field : 'orderStatus',// 返回值名称
            title : '订单状态',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
            formatter:function(value){
                switch(value){
                    case 'ORDER_PENDING_PAYMENT':return "未支付";break;
                    case 'ORDER_PAID_NO_SHIPPED':return "未发货";break;
                    case 'ORDER_BEING_SHIPPED':return "已发货";break;
                    case 'ORDER_ARRIVALS':return "已到达";break;
                    case 'ORDER_SIGN':return "已签收";break;
                }
            }
        }, {
            field : 'currentCity.cityName',// 返回值名称
            title : '当前地点',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
        }, {
            field : 'TimeOfArrival',// 返回值名称
            title : '到达当前地点时的时间',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter:function(value){
                if(value != undefined)
                    return new Date(value);
                else
                    return "-"
            }
        },{
            field : 'startCity.cityName',// 返回值名称
            title : '起点',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5'// 宽度
        },{
            field : 'endCity.cityName',// 返回值名称
            title : '终点',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5'// 宽度
        },{
            field : 'createTime',// 返回值名称
            title : '创建时间',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter:function(value){
                if(value != undefined)
                    return new Date(value);
                else
                    return "-"
            }
        },{
            field : 'orderStatus',// 返回值名称
            title : '操作',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter: function (value, row, index) {
                if(value == 'ORDER_PAID_NO_SHIPPED'){
                    return "<input class='btn btn-info' type='button' onclick='show("+JSON.stringify(row)+")' value='详情'>"
                        +  "<input class='btn btn-info' type='button' onclick='handler("+JSON.stringify(row)+")' value='受理'>"
                }else{
                    return "<input class='btn btn-info' type='button' onclick='show("+JSON.stringify(row)+")' value='详情'>"
                }
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
}var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};
function handler(date) {
    $.ajax({
        type: 'POST',
        url: "/administrator/orderHandler",
        dataType: 'json',
        //组装order实体参数
        data: {
            field: fiel,
            content: info
        },
        success: function (data) {
        }
    })
}


/*展示方法*/
function show(data) {
    data.startCity = data.startCity.cityName;
    data.endCity = data.endCity.cityName;
    data.currentCity = data.currentCity.cityName;
    sessionStorage.setItem("goodData",JSON.stringify(data));
    window.location.href="../templates/showGoodInfo.html";
}

$('#searchbtn').click(function () {
    var info = $('#search').val();
    var fiel = $("#filed").val();

    $.ajax({
        type: 'POST',
        url: "/member/list.do",
        dataType: 'json',
        data: {
            field: fiel,
            content: info
        },
        success: function (data) {
            console.log(data);
            if (data.code === 'SUCCESS') {
                $('#table').bootstrapTable('removeAll');
                $('#table').bootstrapTable('append', data.list);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.status == 401) {
                alert("权限不足！！！")
            }
        }
    })
});
getOrdersList();