
$(document).on('click','#showPicker', function () {
    weui.picker([{
        label: '采购部',
        value: '采购部'
    }, {
        label: '外发部',
        value: '外发部'
    }, {
        label: '装配部',
        value: '装配部'
    }, {
        label: '机加部',
        value: '机加部'
    }, {
        label: '人事部',
        value: '人事部'
    }, {
        label: '品质部',
        value: '品质部'
    }, {
        label: '设计部',
        value: '设计部'
    }, {
        label: '精益科',
        value: '精益科'
    }], {
        onChange: function (result) {
            $("#showPicker").text(result);
        },
        onConfirm: function (result) {
            console.log(result);
        }
    });
});
$(document).on('click','#showDatePicker', function () {
    weui.datePicker({
        start: 1990,
        end: new Date().getFullYear(),
        onChange: function (result) {
            $("#showDatePicker").text(result);
        },
        onConfirm: function (result) {
            console.log(result);
        }
    });
});
    
function tan() {  //点击+号按钮显示审核人数据
    $("#doctorSexDialog").show();
    $("#add_img").hide()
}
$(document).on('click', '#sure_application', function () { //确定申请按钮
    var doctorSex = $("input[name='sex']:checked").val(); //获取单选按钮选中的值
    console.log(doctorSex);
    if (doctorSex == '' || doctorSex == null) {
        weui.alert("请选择审批人");
        return;
    }
});

$(document).on('click', '#zhankai', function () { 
    $(".itemAll22").slideToggle(500);
});

