var id = "http://192.168.1.104:3380";
var page = 1;
var onetype = '全部';
var oneval = '';
var numbertype = '未出图';
var datetype = '全部';
var pagesize = 20;
var data;
var pagecount;
var 是否具有审核权 = false;

var 替换的文字 = new Array();

$(document).on('tap', '#conditions > .dropdown', function () {
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#conditions > .left > .query', function () {
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();
    page = 1;
    getDrawing()
});



$(document).on('tap', '#yesinfo > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $('#yesinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

    $('#yesinfo > .materialinfo > .column1 > .right textarea').val('');
});

//$(document).on('tap', '#noinfo > .materialinfo > .column4 > .left .values', function (e) {
//    stopDefault(e);
//    $("textarea ").blur();
//    $('#noinfo').removeClass('contor');
//    setTimeout(function () {
//        $('#mask300').removeClass('contor');
//    }, 350);

//    $('#noinfo > .materialinfo > .column1 > .right textarea').val('');
//});



$(document).on('tap', '#form_tb > tr > td', function () {
    $(this).parents('tr').addClass('contor').siblings().removeClass('contor');
    var len = $('#form_tb > tr.contor').length;
    
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
        $('#bottom_footer > .left > .box2').addClass('contor');
    }
});

$(document).on('tap', '#bottom_footer > .left > .box2.contor', function (e) {
    stopDefault(e);
    $('#noinfo').addClass('contor');
    $('#mask300').addClass('contor');
    
});

$(document).on('tap', '#yesinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);
        $("textarea").blur();
        $('#yesinfo').removeClass('contor');
        setTimeout(function () {
            $('#mask300').removeClass('contor');
        }, 350);

        var 流程单号 = $('#div_form_table > .infolist.select').attr('data-ProcessNo');
    //var 项目经理 = $('#div_form_table > .infolist.select').attr('data-PM');
        var 试制号 = $('#div_form_table > .infolist.select').attr('data-TrialNo');
        var 图纸号 = $('#div_form_table > .infolist.select').attr('data-ImageNo');
        var 名称 = $('#div_form_table > .infolist.select').attr('data-Name');

        是长期('IIS3380', '/AdvanceOrder.aspx?action=ISAuditState', {
            "usercode": $('#usercode').val(),
            "cause": $('#yesinfo > .materialinfo > .column1 > .right textarea').val(),
            "processnum": 流程单号,
            "testnumber": 试制号,
            "imagenum": 图纸号,
            "name": 名称
        });

        $('#yesinfo > .materialinfo > .column1 > .right textarea').val('');
});

$(document).on('tap', '#noinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);
    $("textarea").blur();
    $('#noinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

    var 流程单号 = $('#div_form_table > .infolist.select').attr('data-ProcessNo');
    //var 项目经理 = $('#div_form_table > .infolist.select').attr('data-PM');
    var 试制号 = $('#div_form_table > .infolist.select').attr('data-TrialNo');
    var 图纸号 = $('#div_form_table > .infolist.select').attr('data-ImageNo');
    var 名称 = $('#div_form_table > .infolist.select').attr('data-Name');

    不是长期('IIS3380', '/AdvanceOrder.aspx?action=NOAuditState', {
        "usercode":$('#usercode').val(),
        "cause": $('#noinfo > .materialinfo > .column1 > .right textarea').val(),
        "processnum": 流程单号,
        "testnumber": 试制号,
        "imagenum": 图纸号,
        "name": 名称
    });


    $('#noinfo > .materialinfo > .column1 > .right textarea').val('');

});


$(document).on('tap', '#choose', function (e) {
    stopDefault(e);
    


});


$(document).on('tap', '#bottom_footer > .right > .box1.contor', function (e) {
    stopDefault(e);
    $('#yesinfo').addClass('contor');
    $('#mask300').addClass('contor');

    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        //var 流程单号 = $('#form_tb > tr.contor > td.ProcessNo').text();
        //var 项目经理 = $('#form_tb > tr.contor > td.PM').text();
        //var 试制号 = $('#form_tb > tr.contor > td.TrialNo').text();
        //var 图纸号 = $('#form_tb > tr.contor > td.ImageNo').text();
        //var 名称 = $('#form_tb > tr.contor > td.Name').text();
        //var 需求数量 = $('#form_tb > tr.contor > td.DemandNum').text();
        //var 归类 = $('#form_tb > tr.contor > td.Classified').text();
        //var 提单人 = $('#form_tb > tr.contor > td.Lading').text();
        //var 系统通知日期 = $('#form_tb > tr.contor > td.Sysnotifydate').text();
        //var 需求场景 = $('#form_tb > tr.contor > td.Scenario').text();
        //var 子流程单号 = $('#form_tb > tr.contor > td.SubprocessNo').text();


        var 流程单号 = $('#div_form_table > .infolist.select').attr('data-ProcessNo');
        //var 项目经理 = $('#div_form_table > .infolist.select').attr('data-PM');
        var 试制号 = $('#div_form_table > .infolist.select').attr('data-TrialNo');
        var 图纸号 = $('#div_form_table > .infolist.select').attr('data-ImageNo');
        var 名称 = $('#div_form_table > .infolist.select').attr('data-Name');
        //var 需求数量 = $('#div_form_table > .infolist.select').attr('data-DemandNum');
        //var 归类 = $('#div_form_table > .infolist.select').attr('data-Classified');
        //var 提单人 = $('#div_form_table > .infolist.select').attr('data-Lading');
        //var 系统通知日期 = $('#div_form_table > .infolist.select').attr('data-Sysnotifydate');
        //var 需求场景 = $('#div_form_table > .infolist.select').attr('data-Scenario');
        //var 子流程单号 = $('#div_form_table > .infolist.select').attr('data-SubprocessNo');

        //$('#ProcessNo').val(流程单号);
        //$('#PM').val(项目经理);
        //$('#TrialNo').val(试制号);
        //$('#ImageNo').val(图纸号);
        //$('#Name').val(名称);
        //$('#DemandNum').val(需求数量);
        //$('#Classified').val(归类);
        //$('#Lading').val(提单人);
        //$('#Sysnotifydate').val(系统通知日期);
        //$('#Scenario').val(需求场景);
        //$('#SubprocessNo').val(子流程单号);
        //$('#form_design').submit();

    } else {
        alert('未选中行');
        return;
    }
});

function getDrawing() {


    if (page == 1) {
        $('#div_form_table').empty();
    }

    var dataarr = {"usercode":$('#usercode').val(), "page": page, "onetype": onetype, "oneval": oneval, "numbertype": numbertype, "datetype": datetype, "pagesize": pagesize };
    去重('IIS3380', '/AdvanceOrder.aspx?action=getLongDelivery', dataarr, function () {

    });
}

//---滑动到底部事件
$(document).on("pageshow", "#maindiv", function () {
    var start, end;
    $('#maindiv').on("scrollstart", function (event) {
        start = $('#maindiv').scrollTop();
    })
    $('#maindiv').on("scrollstop", function (event) {
        if (page > pagecount) {
            return;
        }
        end = $('#maindiv').scrollTop();

        if ((end - start) >= 0) {
            if (end >= $('#div_form_table').height() - $('#maindiv').height()) {
                page++;
                getDrawing();
            }
        }
    })
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .box3', function (e) {
    stopDefault(e);
    $(this).parents('.infolist').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    $(this).addClass('select').siblings().removeClass('select');
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        var 流程单号 = $(this).attr('data-ProcessNo');
        var 试制号 = $(this).attr('data-TrialNo');
        var 图纸号 = $(this).attr('data-ImageNo');
        查询是否轮到当前用户审核('IIS3380', '/AdvanceOrder.aspx?action=checkAudit', {
            "usercode":$('#usercode').val(),
            "processnum":流程单号,
            "testnumber": 试制号,
            "imagenum": 图纸号
        });
    }
});

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});

$(function () {

    替换的文字.push({ "value": "E5573Cs-609" });
    替换的文字.push({ "value": "Emily" });
    替换的文字.push({ "value": "E5573Cs-933" });
    替换的文字.push({ "value": "Blanc" });
    替换的文字.push({ "value": "Schubert" });
    替换的文字.push({ "value": "H18" });
    替换的文字.push({ "value": "eM300" });
    替换的文字.push({ "value": "Alps" });
    替换的文字.push({ "value": "Toronto" });
    替换的文字.push({ "value": "Rhone" });
    替换的文字.push({ "value": "HWS32" });
    替换的文字.push({ "value": "Bond" });
    替换的文字.push({ "value": "Cameron" });
    替换的文字.push({ "value": "F662-50" });
    替换的文字.push({ "value": "BKL" });
    替换的文字.push({ "value": "TOR" });
    替换的文字.push({ "value": "E5783h-92a" });
    替换的文字.push({ "value": "eM300-118" });
    替换的文字.push({ "value": "Stanford" });
    替换的文字.push({ "value": "Natasha" });
    替换的文字.push({ "value": "Figo" });
    替换的文字.push({ "value": "Leland" });
    替换的文字.push({ "value": "Hawaii" });
    替换的文字.push({ "value": "Eris" });
    替换的文字.push({ "value": "WS5100" });
    替换的文字.push({ "value": "Jimmy" });
    替换的文字.push({ "value": "HWD36" });
    替换的文字.push({ "value": "Berkeley" });
    替换的文字.push({ "value": "Haydn" });
    替换的文字.push({ "value": "FRD" });
    替换的文字.push({ "value": "ME919Bs-127a" });
    替换的文字.push({ "value": "STF" });
    替换的文字.push({ "value": "B610s-79a" });
    替换的文字.push({ "value": "Vicky" });
    替换的文字.push({ "value": "Warsaw" });
    替换的文字.push({ "value": "Duke" });
    替换的文字.push({ "value": "PLC" });
    替换的文字.push({ "value": "VTR" });
    替换的文字.push({ "value": "Bell" });
    替换的文字.push({ "value": "Walle" });
    替换的文字.push({ "value": "Charlotte" });
    替换的文字.push({ "value": "PT8020" });
    替换的文字.push({ "value": "Picasso" });
    替换的文字.push({ "value": "Barca" });
    替换的文字.push({ "value": "Selina" });
    替换的文字.push({ "value": "Orion" });
    替换的文字.push({ "value": "WS5280" });
    替换的文字.push({ "value": "HIM" });
    替换的文字.push({ "value": "ME309-562" });
    替换的文字.push({ "value": "E5573s-606" });
    替换的文字.push({ "value": "CUN" });
    替换的文字.push({ "value": "HWD35" });
    替换的文字.push({ "value": "Wallex" });
    替换的文字.push({ "value": "B310" });
    替换的文字.push({ "value": "Leo" });
    替换的文字.push({ "value": "Prague" });
    替换的文字.push({ "value": "Grace" });
    替换的文字.push({ "value": "B612" });
    替换的文字.push({ "value": "Florida" });
    替换的文字.push({ "value": "Beethoven" });
    替换的文字.push({ "value": "Munich" });
    替换的文字.push({ "value": "M380" });
    替换的文字.push({ "value": "Anne" });
    替换的文字.push({ "value": "B610" });
    替换的文字.push({ "value": "Faraday" });
    替换的文字.push({ "value": "Manhattan" });
    替换的文字.push({ "value": "eA680-950" });
    替换的文字.push({ "value": "NYX" });
    替换的文字.push({ "value": "E5787s-33a" });
    替换的文字.push({ "value": "LON" });
    替换的文字.push({ "value": "B311" });
    替换的文字.push({ "value": "Hydra" });
    替换的文字.push({ "value": "NEO" });
    替换的文字.push({ "value": "MS2372h-517" });
    替换的文字.push({ "value": "E5573Cs-322" });
    替换的文字.push({ "value": "F662-20" });
    替换的文字.push({ "value": "eA780-118" });
    替换的文字.push({ "value": "ME909u-523" });
    替换的文字.push({ "value": "ME906J" });
    替换的文字.push({ "value": "Micro" });
    替换的文字.push({ "value": "ME909Tu-120" });
    替换的文字.push({ "value": "ANN" });
    替换的文字.push({ "value": "MHA" });
    替换的文字.push({ "value": "PAD" });
    替换的文字.push({ "value": "B525" });
    替换的文字.push({ "value": "DA2168" });
    替换的文字.push({ "value": "Venus" });
    替换的文字.push({ "value": "Columbia" });
    替换的文字.push({ "value": "GPDZH-CTF" });
    替换的文字.push({ "value": "DA2177" });
    替换的文字.push({ "value": "Mozart" });
    替换的文字.push({ "value": "LISZT" });
    替换的文字.push({ "value": "E5577Es-932" });
    替换的文字.push({ "value": "Handel" });
    替换的文字.push({ "value": "CUN-LXX" });
    替换的文字.push({ "value": "CUN-UXX" });
    替换的文字.push({ "value": "Paris" });
    替换的文字.push({ "value": "Cancun" });
    替换的文字.push({ "value": "DA2188" });
    替换的文字.push({ "value": "ME909s-821" });
    替换的文字.push({ "value": "Maya" });
    替换的文字.push({ "value": "Cornell" });
    替换的文字.push({ "value": "ME309-810" });
    替换的文字.push({ "value": "PC" });
    替换的文字.push({ "value": "Laya" });
    替换的文字.push({ "value": "B610h-70a" });
    替换的文字.push({ "value": "Hima" });
    替换的文字.push({ "value": "WE3200" });
    替换的文字.push({ "value": "INE" });
    替换的文字.push({ "value": "耗材" });
    替换的文字.push({ "value": "SNE" });
    替换的文字.push({ "value": "E5785Lh-92a" });
    替换的文字.push({ "value": "DA2268" });
    替换的文字.push({ "value": "Lelandplus" });
    替换的文字.push({ "value": "E5573s-853" });
    替换的文字.push({ "value": "Johnson" });
    替换的文字.push({ "value": "Hermes" });
    替换的文字.push({ "value": "Talos" });
    替换的文字.push({ "value": "WS5102" });
    替换的文字.push({ "value": "Munich2" });
    替换的文字.push({ "value": "Jackman" });
    替换的文字.push({ "value": "E5772T-938" });
    替换的文字.push({ "value": "Tony" });
    替换的文字.push({ "value": "HWD37" });
    替换的文字.push({ "value": "SydneyM(SNE)" });
    替换的文字.push({ "value": "Sydney(INE)" });
    替换的文字.push({ "value": "Sydney INE" });
    替换的文字.push({ "value": "ME919Bs" });
    替换的文字.push({ "value": "ME909Au-821" });
    替换的文字.push({ "value": "DA2138" });
    替换的文字.push({ "value": "CD29-10" });
    替换的文字.push({ "value": "E5783B-230" });
    替换的文字.push({ "value": "ME909s" });
    替换的文字.push({ "value": "ME909Au" });
    替换的文字.push({ "value": "Everest" });
    替换的文字.push({ "value": "Harry&Potter" });
    替换的文字.push({ "value": "Princeton" });
    替换的文字.push({ "value": "Princetong" });
    替换的文字.push({ "value": "HWS33" });
    替换的文字.push({ "value": "Harry" });
    替换的文字.push({ "value": "SB08" });
    替换的文字.push({ "value": "DA2201" });
    替换的文字.push({ "value": "DC06" });
    替换的文字.push({ "value": "B618" });
    替换的文字.push({ "value": "CD15" });
    替换的文字.push({ "value": "Potter" });
    替换的文字.push({ "value": "CD29" });
    替换的文字.push({ "value": "Venice" });
    替换的文字.push({ "value": "Elle" });
    替换的文字.push({ "value": "CHQ" });
    替换的文字.push({ "value": "Vogue" });
    替换的文字.push({ "value": "Ven" });
    替换的文字.push({ "value": "Chongqing" });
    替换的文字.push({ "value": "Madrid&Jakarta" });
    替换的文字.push({ "value": "SydneyM" });
    替换的文字.push({ "value": "DA2221" });
    替换的文字.push({ "value": "SydneyI" });
    替换的文字.push({ "value": "ME909s-821p" });
    替换的文字.push({ "value": "marie" });
    替换的文字.push({ "value": "WS5200V2" });
    替换的文字.push({ "value": "Jakarta" });
    替换的文字.push({ "value": "Everes" });
    替换的文字.push({ "value": "Sydney(SNE)" });
    替换的文字.push({ "value": "Tahiti" });
    替换的文字.push({ "value": "Madrid" });
    替换的文字.push({ "value": "CD30" });
    替换的文字.push({ "value": "B818-260" });
    替换的文字.push({ "value": "Munich3" });
    替换的文字.push({ "value": "Mar" });
    替换的文字.push({ "value": "Dazzle" });
    替换的文字.push({ "value": "Mars" });
    替换的文字.push({ "value": "Ravel" });
    替换的文字.push({ "value": "Cannes" });
    替换的文字.push({ "value": "Victoria" });
    替换的文字.push({ "value": "Sydney" });
    替换的文字.push({ "value": "DC07" });
    替换的文字.push({ "value": "Dubai" });
    替换的文字.push({ "value": "801HW" });
    替换的文字.push({ "value": "PMD" });
    替换的文字.push({ "value": "Hetian" });
    替换的文字.push({ "value": "Yale" });
    替换的文字.push({ "value": "DBAEG5_ME909s" });
    替换的文字.push({ "value": "DBAEG6_ME909s" });
    替换的文字.push({ "value": "E5885Ls-93a" });
    替换的文字.push({ "value": "E8372h-155" });
    替换的文字.push({ "value": "E5788u-96a" });
    替换的文字.push({ "value": "E5577s-932" });
    替换的文字.push({ "value": "LG3030" });
    替换的文字.push({ "value": "Stark" });
    替换的文字.push({ "value": "PT8020-11" });
    替换的文字.push({ "value": "H112-370" });
    替换的文字.push({ "value": "Verdi" });
    替换的文字.push({ "value": "Hulk" });
    替换的文字.push({ "value": "LION" });
    替换的文字.push({ "value": "Q2" });
    替换的文字.push({ "value": "ME906s" });
    替换的文字.push({ "value": "Rossini" });
    替换的文字.push({ "value": "Seine" });
    替换的文字.push({ "value": "Seattle" });
    替换的文字.push({ "value": "Taurus" });
    替换的文字.push({ "value": "DBMF76_E5785Lh-92a" });
    替换的文字.push({ "value": "DBMF77_E5785Lh-92" });
    替换的文字.push({ "value": "CT31" });
    替换的文字.push({ "value": "Saipan" });
    替换的文字.push({ "value": "B316-855" });
    替换的文字.push({ "value": "WS6500-11" });
    替换的文字.push({ "value": "WS5200" });
    替换的文字.push({ "value": "B625-261" });
    替换的文字.push({ "value": "B520" });
    替换的文字.push({ "value": "Seatlle" });
    替换的文字.push({ "value": "DA2138-05" });
    替换的文字.push({ "value": "laura" });
    替换的文字.push({ "value": "ME959" });
    替换的文字.push({ "value": "Panda" });
    替换的文字.push({ "value": "DXD" });
    替换的文字.push({ "value": "HAAVE" });
    替换的文字.push({ "value": "eM600" });
    替换的文字.push({ "value": "Chart" });
    替换的文字.push({ "value": "Asoka" });
    替换的文字.push({ "value": "H312-371" });
    替换的文字.push({ "value": "Asoka&Arthur" });
    替换的文字.push({ "value": "E5785-92c" });
    替换的文字.push({ "value": "B311-221" });
    替换的文字.push({ "value": "E8372h-608" });
    替换的文字.push({ "value": "EC3372-871" });
    替换的文字.push({ "value": "NG3042" });
    替换的文字.push({ "value": "MS2131i-8" });
    替换的文字.push({ "value": "CD15-16" });
    替换的文字.push({ "value": "Marx" });
    替换的文字.push({ "value": "YaleP" });
    替换的文字.push({ "value": "B535-232" });

    getDrawing();
});

/*
恢复物料齐套数据
*/
function 去重(urltype, pageurl, data, func) {
    showLoading();
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
            hideLoading();
            if (data.errcode == 0) {
                var 总页数 = data.totalnum;

                pagecount = data.pagecount;
                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {
                            //content += '<tr>';
                            //content += '<td class="ProcessNo">' + obj.流程单号 + '</td>';
                            //content += '<td class="PM">' + obj.项目经理 + '</td>';
                            //content += '<td class="TrialNo">' + obj.试制号 + '</td>';
                            //content += '<td class="ImageNo">' + obj.图档号 + '</td>';
                            //content += '<td class="Name">' + obj.规格型号及夹具名称 + '</td>';
                            //content += '<td class="DemandNum">' + obj.需求数量 + '</td>';
                            //content += '<td class="Classified">' + obj.归类 + '</td>';
                            //content += '<td class="Lading">' + obj.提单人 + '</td>';
                            //content += '<td class="Sysnotifydate">' + obj.系统通知日期 + '</td>';
                            //content += '<td class="Scenario">' + obj.需求场景 + '</td>';
                            //content += '<td class="SubprocessNo">' + obj.子流程单号 + '</td>';
                            //content += '</tr>';

                            var 项目名称 = obj.规格型号及夹具名称;
                            for (var i = 0; i < 替换的文字.length; i++) {
                                var 需替换值 = 替换的文字[i].value;
                                项目名称 = 项目名称.replace(new RegExp(需替换值, 'g'), "");
                            }

                            content += '<div class="infolist" data-ProcessNo="' + obj.流程单号 + '" data-PM="' + obj.项目经理 + '" data-TrialNo="' + obj.试制号 + '" ';
                            content += 'data-ImageNo="' + obj.图档号 + '" data-Name="' + obj.规格型号及夹具名称 + '" data-DemandNum="' + obj.需求数量 + '" ';
                            content += 'data-Classified="' + obj.归类 + '" data-Lading="' + obj.提单人 + '" data-Sysnotifydate="' + obj.系统通知日期 + '" ';
                            content += 'data-Scenario="' + obj.需求场景 + '" data-SubprocessNo="' + obj.子流程单号 + '" >';
                            content += '    <div class="maininfo">';
                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + 项目名称 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '            <div class="left">';
                            content += '                <div class="box1">流程单号：' + obj.流程单号 + '</div>';
                            content += '                <div class="box2">图档号：' + obj.图档号 + '</div>';
                            content += '            </div>';
                            content += '            <div class="mid">';
                            content += '                <div class="box1">' + obj.需求数量 + '</div>';
                            content += '            </div>';
                            content += '            <div class="right">';
                            content += '                <div class="box1">' + obj.需求场景 + '</div>';
                            content += '            </div>';
                            content += '        </div>';
                            content += '        <div class="rows3">';
                            content += '            <div class="box1">系统通知日期：' + obj.系统通知日期.substr(0, 9) + '</div>';
                            content += '            <div class="box2">归类：' + obj.归类 + '</div>';
                            content += '            <div class="box3">';
                            content += '                <i class="iconfont">&#xe784;</i>';
                            content += '            </div>';
                            content += '        </div>';
                            content += '    </div>';
                            content += '    <div class="detialinfo">';
                            content += '        <div class="rows1">';
                            content += '            <div class="box1">试制号：' + obj.试制号 + '</div>';
                            content += '            <div class="box2">子流程单号：' + obj.子流程单号 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '            <div class="box1">项目经理：' + obj.项目经理 + '</div>';
                            content += '            <div class="box2">提单人：' + obj.提单人 + '</div>';
                            content += '        </div>';
                            content += '    </div>';
                            content += '</div>';
                        });

                    }
                    else {
                        A = $('#div_form_table');
                        B = ' — 没有更多的订单啦 —';
                        show_bottom(A, B);
                    }
                }
                else {
                    A = $('#div_form_table');
                    B = ' — 没有更多的订单啦 —';
                    show_bottom(A, B);
                }
                $('#div_form_table').append(content);
                var 当前加载页数 = $('#div_form_table > .infolist').length;
                $('#bottom_footer > .left > .box1').text(当前加载页数 + '/' + 总页数);

                查询是否轮到当前用户审核
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
  查询是否轮到当前用户审核
  */
function 查询是否轮到当前用户审核(urltype, pageurl, data) {
   
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

        },
        success: function (data) {
            if (data.errcode == 0) {
                $('#bottom_footer > .right > .box1').addClass('contor');
                $('#bottom_footer > .left > .box2').addClass('contor');
            }
            else//提取失败
            {
                $('#bottom_footer > .right > .box1').removeClass('contor');
                $('#bottom_footer > .left > .box2').removeClass('contor');
            }

        }
    });
}

/*
  是长期
  */
function 是长期(urltype, pageurl, data) {

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

        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("提交成功");
                window.location.reload();
            }
            else//提取失败
            {
                $('#bottom_footer > .right > .box1').removeClass('contor');
                $('#bottom_footer > .left > .box2').removeClass('contor');
            }

        }
    });
}

/*
  不是长期
  */
function 不是长期(urltype, pageurl, data) {

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

        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("提交成功");
                window.location.reload();
            }
            else//提取失败
            {
                $('#bottom_footer > .right > .box1').removeClass('contor');
                $('#bottom_footer > .left > .box2').removeClass('contor');
            }

        }
    });
}