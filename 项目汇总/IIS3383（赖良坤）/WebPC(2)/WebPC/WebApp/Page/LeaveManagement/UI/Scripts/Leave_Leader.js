$(document).on('click', '#refuse', function () {
    $("#RefuseModal").draggable();//为模态对话框添加拖拽
    $("#RefuseModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#RefuseModal').modal('show');

});