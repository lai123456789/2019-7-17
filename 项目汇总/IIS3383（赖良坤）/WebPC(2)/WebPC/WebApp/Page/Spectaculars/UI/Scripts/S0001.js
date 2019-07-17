/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {

    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});


$(function () {
    RequestData("IIS", "Spectaculars.aspx?action=gets0001list", { });
});


/*
请求数据
*/
function RequestData(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
            hideLoading();
            if (data.errcode == 0) {
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr>';
                    content += '    <td>' + (idx + 1) + '</td>';
                    content += '    <td>' + obj.购货单位 + '</td>';
                    content += '    <td>' + obj.业务员 + '</td>';
                    //content += '    <td>' + obj.隶属区域 + '</td>';
                    //content += '    <td>' + obj.MT跟单员 + '</td>';
                    content += '    <td>' + obj.PJ + '</td>';
                    content += '    <td>' + obj.项目名称 + '</td>';
                    content += '    <td>' + obj.类别一代码 + '</td>';
                    content += '    <td>' + obj.试制单号 + '</td>';
                    //content += '    <td>【手工】</td>';
                    content += '    <td>' + obj.收货人 + '</td>';
                    content += '    <td>' + obj.PDU + '</td>';
                    content += '    <td>' + obj.产品料号 + '</td>';
                    content += '    <td>' + obj.产品名称 + '</td>';
                    content += '    <td>' + obj.Part编号 + '</td>';
                    content += '    <td>' + obj.物料版本 + '</td>';
                    content += '    <td>' + obj.订单数量 + '</td>';
                    content += '    <td>' + obj.发货数量 + '</td>';
                    content += '    <td>' + obj.欠数 + '</td>';
                    content += '    <td>' + obj.总入库数量 + '</td>';
                    content += '    <td>' + obj.已入库未出货 + '</td>';
                    content += '    <td>' + obj.文控下图时间 + '</td>';
                    content += '    <td>' + obj.接单日期 + '</td>';
                    //content += '    <td>' + obj.PO + '</td>';
                    //content += '    <td>' + obj.PO到位时间 + '</td>';
                    //content += '    <td>' + obj.SLA天数 + '</td>';
                    //content += '    <td>' + obj.合理应减天数 + '</td>';
                    //content += '    <td>' + obj.SLA时间按PO时间算 + '</td>';
                    //content += '    <td>' + obj.SLA时间按下单时间算 + '</td>';
                    //content += '    <td>' + obj.客户要求日期 + '</td>';
                    //content += '    <td>' + obj.首次承诺客户日期 + '</td>';
                    //content += '    <td>' + obj.再次承诺时间 + '</td>';
                    //content += '    <td>' + obj.是否紧急 + '</td>';
                    //content += '    <td>' + obj.要求配件到货时间 + '</td>';
                    //content += '    <td>' + obj.装配调试检测时间 + '</td>';
                    //content += '    <td>' + obj.计划装配开始时间 + '</td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    //content += '    <td></td>';
                    switch (obj.PJ) {
                        case "190255":
                            content += '    <td>';
                            content += '        <div class="progress_white" title="190255001:未装配 \r190255002:未装配 \r190255003:未装配 \r190255004:未装配 \r190255005:未装配">5</div>';
                            content += '        <div class="progress_yellow" title="">0</div>';
                            content += '        <div class="progress_red" title="">0</div>';
                            content += '        <div class="progress_green" title="">0</div>';
                            content += '    </td>';
                            break;
                        case "190252":
                            content += '    <td>';
                            content += '        <div class="progress_white" title="190252009:未装配 \r190252010:未装配 \r190252011:未装配 \r190252012:未装配 \r190252013:未装配 \r190252014:未装配 \r190252015:未装配 \r190252016:未装配 \r190252017:未装配">9</div>';
                            content += '        <div class="progress_yellow" title="190252001:组装 \r190252002:组装 \r190252003:组装 \r190252004:组装 \r190252005:接线 \r190252006:组装 \r190252007:组装 \r190252008:接线">8</div>';
                            content += '        <div class="progress_red" title="">0</div>';
                            content += '        <div class="progress_green" title="">0</div>';
                            content += '    </td>';
                            break;
                        case "190253":
                            content += '    <td>';
                            content += '        <div class="progress_white" title="190252009:未装配 \r190253010:未装配 \r190253011:未装配 \r190253012:未装配 \r190253013:未装配">5</div>';
                            content += '        <div class="progress_yellow" title="190253001:组装 \r190253002:调试 \r190253003:调试 \r190253004:接线 \r190253005:组装 \r190253006:组装 \r190253007:组装 \r190253008:组装">8</div>';
                            content += '        <div class="progress_red" title="190253014:缺料 \r190253015:缺料 \r190253016:缺料 \r190253017:缺料 \r190253018:缺料 \r190253019:缺料 \r190253020:缺料 \r190253021:缺料">8</div>';
                            content += '        <div class="progress_green" title="">0</div>';
                            content += '    </td>';
                            break;
                        case "190254":
                            content += '    <td>';
                            content += '        <div class="progress_white" title="190254001:未装配 \r190254002:未装配 \r190254003:未装配 \r190254004:未装配 \r190254005:未装配 \r190254006:未装配 \r190254007:未装配 \r190254008:未装配 \r190254009:未装配 \r190254010:未装配 \r190254011:未装配 \r190254012:未装配 \r190254013:未装配 \r190254014:未装配 \r190254015:未装配 \r190254016:未装配 \r190254017:未装配 \r190254018:未装配 \r190254019:未装配 \r190254020:未装配...">56</div>';
                            content += '        <div class="progress_yellow" title="190254001:组装 \r190254057:调试 \r190254058:调试 \r190254059:接线 \r190254060:组装 \r190254061:组装 \r190254062:组装 \r190254063:组装">8</div>';
                            content += '        <div class="progress_red" title="190254064:缺料 \r190254065:缺料 \r190254066:缺料 \r190254067:缺料 \r190254068:缺料 \r190254069:缺料 \r190254070:缺料 \r190254071:缺料 \r190254072:缺料 \r190254073:缺料 \r190254074:缺料 \r190254075:缺料 \r190254076:缺料 \r190254077:缺料 \r190254078:缺料 \r190254079:缺料 \r190254080:缺料 \r190254081:缺料 \r190254082:缺料 \r190254083:缺料...">50</div>';
                            content += '        <div class="progress_green" title="190254115:待出货 \r190254116:待出货 \r190254117:待出货">3</div>';
                            content += '    </td>';
                            break;
                    }
                    
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}