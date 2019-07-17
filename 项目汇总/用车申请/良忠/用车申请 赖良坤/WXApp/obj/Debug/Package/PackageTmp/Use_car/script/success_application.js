$(document).on('click', '#use_car', function () { //确定申请按钮
    var doctorSex = $("#star_num").val(); //获取单选按钮选中的值
    if (doctorSex == '' || doctorSex == null) {
        weui.alert("请输入初始公里数");
        return;
    }
});