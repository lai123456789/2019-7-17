
$(document).on('click', '.bianji > a.edit', function () {
    $('#AddUserModal').modal("show");
});
$(document).on('click', '.bianji > a.del', function () {
    $('#AddUserModal2').modal("show");
});
$(document).on('click', '#add_sure', function () {
    $('#form_tb > tr > td:eq(2)').text('1234444444');
    $('#form_tb > tr > td:eq(3)').text('2018-09-20');
    $('#form_tb > tr > td:eq(4)').text('15');
    $('#form_tb > tr > td:eq(5)').text('2018-09-29');
    $('#form_tb > tr > td:eq(9)').text('杨晓龙');
});
$(document).on('click','')



