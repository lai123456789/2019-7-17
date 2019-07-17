$(document).on('tap', '#refuse_result_sure', function () {
    var 申请单号 = $('#danhao1').text();
    var 原因 = $('#refuse_result').val();
    拒绝原因('IIS3382', '/Proposer.aspx?action=ApplyFalse', {
        "applycode": 申请单号,
        "reason": 原因
    });
});
function 拒绝原因(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                weui.alert("提交拒绝成功！");
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}