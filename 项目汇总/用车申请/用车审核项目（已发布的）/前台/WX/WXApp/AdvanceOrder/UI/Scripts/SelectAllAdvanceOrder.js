var page = 1;
var onetype = '全部';
var oneval;
var numbertype;
var datetype = '全部';
var pagesize = 20;
var data;
var startdate = '';
var enddate = '';
var 流程单号 = '';
var 试制号 = '';
var 图档号 = '';
var pagecount;
var 替换的文字 = new Array();

$(document).on('tap', '#conditions > .dropdown', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $('#conditions').toggleClass('contor');
});
$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $(this).parents('.infolist').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $(this).addClass('select').siblings().removeClass('select');
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
});

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
            if (end >= $('#div_form_table').height() - $('#maindiv').height() - 100) {
                page++;
                GetPageList();
            }
        }
    })
});

function GetPageList() {
    if (page == 1) {
        $('#div_form_table').empty();
    }

    查看图纸全部('IIS3380', '/AdvanceOrder.aspx?action=getAll', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize,
        "enddate": enddate,
        "startdate": startdate
    });
}

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $('#addinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text() == "展开") {
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('收起');
    } else {
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('展开');
    }
});

$(document).on('tap', '#conditions > .left > .query', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();
    page = 1;
    numbertype = $('#threetype_dummy').val();
    datetype = $('#twotype_dummy').val();
    startdate = $('#stardate').val();
    enddate = $('#enddate').val();
    GetPageList();
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box3', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box3').text() == "添加") {
        $('#form_add').submit();
    } else {
        var name = $(this).parents('.infolist').attr('data-specifications');
        var processnum = $(this).parents('.infolist').attr('data-processnum');
        var version = $(this).parents('.infolist').attr('data-imagenum');
        var num = $(this).parents('.infolist').attr('data-demandednumber');
        var ordertype = $(this).parents('.infolist').attr('data-classified');
        var archive = $(this).parents('.infolist').attr('data-notificationdate');
        var testnumber = $(this).parents('.infolist').attr('data-testnumber');
        var PM = $(this).parents('.infolist').attr('data-PM');
        var Lading = $(this).parents('.infolist').attr('data-Lading');
        var Scenario = $(this).parents('.infolist').attr('data-Scenario');
        var SubprocessNo = $(this).parents('.infolist').attr('data-SubprocessNo');

        $('#ProcessNo1').val(processnum);
        $('#TrialNo1').val(testnumber);
        $('#ImageNo1').val(version);
        $('#Name1').val(name);
        $('#DemandNum1').val(num);
        $('#Classified1').val(ordertype);
        $('#Lading1').val(Lading);
        $('#Sysnotifydate1').val(archive);
        $('#Scenario1').val(Scenario);
        $('#SubprocessNo1').val(SubprocessNo);
        $('#PM1').val(PM);
        $('#form_design1').submit();
    }
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box2', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "添加") {
        $('#form_add').submit();
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "关闭") {
        $('input').blur();

        流程单号 = $(this).parents('.infolist').attr('data-processnum');
        试制号 = $(this).parents('.infolist').attr('data-testnumber');
        图档号 = $(this).parents('.infolist').attr('data-imagenum');

        $('#addinfo').addClass('contor');
        $('#mask300').addClass('contor');
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "恢复") {
        if (confirm("确定恢复改图纸吗？")){
            var usercode = $('#usercode').val();
            var processnum = $(this).parents('.infolist').attr('data-processnum');
            var version = $(this).parents('.infolist').attr('data-imagenum');
            var testnumber = $(this).parents('.infolist').attr('data-testnumber');

            恢复图纸('IIS3380', '/AdvanceOrder.aspx?action=recover', {
                "usercode": usercode,
                "processnum": processnum,
                "imagenum": version,
                "testnumber": testnumber
            });
        }
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "编辑") {

        var drawingcode = $(this).parents('.infolist').attr('data-drawingcode');
        var name = $(this).parents('.infolist').attr('data-specifications');
        var processnum = $(this).parents('.infolist').attr('data-processnum');
        var version = $(this).parents('.infolist').attr('data-imagenum');
        var num = $(this).parents('.infolist').attr('data-demandednumber');
        var ordertype = $(this).parents('.infolist').attr('data-classified');
        var archive = $(this).parents('.infolist').attr('data-notificationdate');
        var testnumber = $(this).parents('.infolist').attr('data-testnumber');
        $('#ProcessNo').val(processnum);
        $('#TrialNo').val(testnumber);
        $('#ImageNo').val(version);
        $('#Name').val(name);
        $('#DemandNum').val(num);
        $('#Scenario').val(ordertype);
        $('#ArchiveDate').val(archive);
        $('#drawingcode').val(drawingcode);
        $('#form_design').submit();
    }
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    var usercode = $('#usercode').val();
    var 关闭原因 = $('#addinfo > .materialinfo > .column1 > .right textarea').val();


    关闭图纸('IIS3380', '/AdvanceOrder.aspx?action=close', {
        "usercode": usercode,
        "processnum": 流程单号,
        "imagenum": 图档号,
        "testnumber": 试制号,
        "cause": 关闭原因
    });

    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
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




    查看图纸全部('IIS3380', '/AdvanceOrder.aspx?action=getAll', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize
    });
});


/*
 查看图纸全部
*/
function 查看图纸全部(urltype, pageurl, data) {
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

                pagecount = data.pagecount;

                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {
                            hide_bottom();

                            var 项目名称 = obj.规格型号;
                            for (var i = 0; i < 替换的文字.length; i++) {
                                var 需替换值 = 替换的文字[i].value;
                                项目名称 = 项目名称.replace(new RegExp(需替换值, 'g'), "");
                            }


                            content += '<div class="infolist" data-processnum="' + obj.流程单号 + '" data-testnumber=" ' + obj.试制号 + '" data-imagenum="' + obj.图档号 + '" data-drawingcode="' + obj.已出图代码 + '" data-demandednumber="' + obj.需求数量 + '" data-classified="' + obj.归类 + '" data-notificationdate="' + obj.系统通知时间 + '" data-specifications="' + obj.规格型号 + '" data-PM="' + obj.项目经理 + '" data-Lading="' + obj.提单人 + '" data-Scenario="' + obj.需求场景 + '" data-SubprocessNo="' + obj.子流程单号 + '">';
                            content += '    <div class="maininfo">';

                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + 项目名称 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '           <div class="left">';
                            content += '               <div class="box1">流程单号：' + obj.流程单号 + '</div>';
                            content += '               <div class="box2">创建人：' + obj.创建人名字 + '</div>';
                            content += '           </div>';
                            content += '           <div class="mid">';
                            content += '                <div class="box1">' + obj.需求数量 + '</div>';
                            content += '            </div>';
                            content += '               <div class="right">';
                            content += '                   <div class="box1">';
                            if (obj.状态 == 0) {
                                content += '<div class="column2">' + '未出图' + '</div>';
                            } else if (obj.状态 == 1) {
                                content += '<div class="column3">' + '已出图' + '</div>';
                            } else {
                                content += '<div class="column4">' + '已关闭' + '</div>';
                            }
                            content += '                    </div>';
                            content += '                   <div class="box2">';
                            content += '                        <div class="column2">归类：' + obj.归类 + '</div>';
                            content += '                     </div>';
                            content += '                </div>';
                            content += '           </div>';

                            content += '           <div class="detialinfo">';
                            content += '              <div class="row1">';
                            content += '                   <div class="right">图档号：' + obj.图档号 + '</div>';
                            content += '                   <div class="left">需求场景：' + obj.需求场景 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row2">';
                            content += '                    <div class="right">子流程单号：' + obj.子流程单号 + '</div>';
                            content += '                    <div class="left">项目经理：' + obj.项目经理 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row3">';
                            content += '                    <div class="right">提单人：' + obj.提单人 + '</div>';
                            content += '                    <div class="left">试制号：' + obj.试制号 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row4">';
                            content += '                    <div class="right">关闭人：' + obj.关闭人姓名 + '</div>';
                            content += '                    <div class="left">通知时间：' + obj.系统通知时间.substr(0, 9) + '</div>';
                            content += '               </div>';
                            content += '           </div>';

                            content += '           <div class="rows3">';
                            content += '               <div class="left">';


                            content += '                    <div class="box1">展开</div>';
                            if (obj.状态 == 0) {
                                content += '<div class="box2">关闭</div>';
                            } else if (obj.状态 == 2) {
                                content += '<div class="box2">恢复</div>';
                            } else {
                                if (obj.创建人代码 == $('#usercode').val()) {
                                    content += '<div class="box2">编辑</div>';
                                } else {
                                    content += '<div class="box2">添加</div>';
                                }
                            }

                            if (obj.状态 == 0) {
                                content += '<div class="box3">设计</div>';
                            } else if (obj.状态 == 1 && obj.创建人代码 == $('#usercode').val()) {
                                content += '<div class="box3">添加</div>';
                            }
                            
                            content += '               </div>';
                            content += '               <div class="right">';
                            content += '                    <div class="box1">' + obj.创建时间 + '</div>';
                            content += '               </div>';
                            content += '           </div>';
                            content += '    </div>';
                            content += '</div>';
                        });
                    }
                    else {
                        A = $('#div_form_table');
                        B = ' — 没有更多的订单啦 —';
                        show_bottom(A, B);
                    }
                } else {
                    A = $('#div_form_table');
                    B = ' — 没有更多的订单啦 —';
                    show_bottom(A, B);
                }
                $('#div_form_table').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
 关闭图纸
*/
function 关闭图纸(urltype, pageurl, data) {
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
            var content = '';
            if (data.errcode == 0) {
                alert("关闭成功");
                $('#addinfo').removeClass('contor');
                setTimeout(function () {
                    $('#mask300').removeClass('contor');
                }, 350);
                location.reload();
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

/*
 恢复图纸
*/
function 恢复图纸(urltype, pageurl, data) {
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
            var content = '';
            if (data.errcode == 0) {
                alert("恢复图纸成功");
                location.reload();
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}