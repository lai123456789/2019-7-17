$(document).on('click', '#return_car', function () { //确定申请按钮
    var doctorSex = $("#num").val(); //获取单选按钮选中的值
    if (doctorSex == '' || doctorSex == null) {
        weui.alert("请输入还车公里数");
        return;
    }
});