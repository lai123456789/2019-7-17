var id = "http://192.168.1.104:3380";
var page = 1;
var search = '';
var onetype;
var oneval;
var pagecount;
var 替换的文字 = new Array();

$(document).on('tap', '#conditions > .dropdown', function () {
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#conditions > .left > .query', function () {
    oneval = $('#oneval').val();
    onetype = $('#onetype_dummy').val();
    page = 1;
    GetPageList();
});

$(document).on('tap', '#form_tb > tr > td', function () {
    $(this).parents('tr').addClass('contor').siblings().removeClass('contor');
    var len = $('#form_tb > tr.contor').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
});

$(document).on('tap', '#bottom_footer > .right > .box1.contor', function () {
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        var drawingcode = $('#div_form_table > .infolist.select').attr('data-drawingcode');
       
        var name = $('#div_form_table > .infolist.select').attr('data-specifications');
        var processnum = $('#div_form_table > .infolist.select').attr('data-processnum');
        var version = $('#div_form_table > .infolist.select').attr('data-imagenum');
        var num = $('#div_form_table > .infolist.select').attr('data-demandednumber');
        var ordertype = $('#div_form_table > .infolist.select').attr('data-classified');
        var archive = $('#div_form_table > .infolist.select').attr('data-notificationdate');
        var testnumber = $('#div_form_table > .infolist.select').attr('data-testnumber');
        $('#ProcessNo1').val(processnum);
        $('#TrialNo1').val(testnumber);
        $('#ImageNo1').val(version);
        $('#Name1').val(name);
        $('#DemandNum1').val(num);
        $('#Scenario1').val(ordertype);
        $('#ArchiveDate1').val(archive);
        $('#drawingcode1').val(drawingcode);
        $('#form_design1').submit();
       
    } else {
        alert('未选中行');
        return;
    }
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




    GetPageList();
})

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .box3', function (e) {
    stopDefault(e);
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
});


function GetPageList() {
    if (page == 1) {
        $('#div_form_table').empty();
    }

    var dataarr = { "onetype": onetype, "oneval": oneval, "page": page };

    去重('IIS3380', '/AdvanceOrder.aspx?action=getDrawing', dataarr, function () {
        
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
            if (end >= $('#form_tb').height() - $('#maindiv').height() - 100) {
                page++;

                GetPageList()
            }
        }
    })
});

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});
$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    $(this).addClass('select').siblings().removeClass('select');
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
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
                pagecount = data.pagecount;
                var 总页数 = data.totalnum
                
                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {
                            hide_bottom();

                            var 项目名称 = obj.specifications;
                            for (var i = 0; i < 替换的文字.length; i++) {
                                var 需替换值 = 替换的文字[i].value;
                                项目名称 = 项目名称.replace(new RegExp(需替换值, 'g'), "");
                            }

                            content += '<div class="infolist" data-drawingcode="' + obj.drawingcode + '" data-specifications="' + obj.specifications + '" data-processnum="' + obj.processnum + '" ';
                            content += 'data-imagenum="' + obj.imagenum + '" data-demandednumber="' + obj.demandednumber + '" data-classified="' + obj.classified + '" data-notificationdate="' + obj.notificationdate + '" data-testnumber="' + obj.testnumber + '" >';
                            content += '    <div class="maininfo">';
                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + 项目名称 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '            <div class="left">';
                            content += '                <div class="box1">流程单号：' + obj.processnum + '</div>';
                            content += '                <div class="box2">图档号：' + obj.imagenum + '</div>';
                            content += '            </div>';
                            content += '            <div class="mid">';
                            content += '                <div class="box1">' + obj.demandednumber + '</div>';
                            content += '            </div>';
                            content += '            <div class="right">';
                            content += '                <div class="box1">归类：' + obj.classified + '</div>';
                            content += '            </div>';
                            content += '        </div>';
                            content += '        <div class="rows3">';
                            content += '            <div class="box1">归档日期：' + obj.notificationdate.substr(0, 9) + '</div>';
                            content += '            <div class="box2">试制号：' + obj.testnumber + '</div>';
                            if (obj.createusercode == $('#usercode').val()){
                                content += '            <div class="box3">';
                                content += '                <i class="iconfont">&#xe655;</i>';
                                content += '            </div>';
                            }
                            content += '        </div>';
                            content += '    </div>';
                            content += '</div>';


                            //content += '<tr>';
                            //content += '<td class="drawingcode" style="display:none;">' + obj.drawingcode + '</td>';
                            //content += '<td class="ProcessNo">' + obj.processnum + '</td>';
                            //content += '<td class="TrialNo">' + obj.testnumber + '</td>';
                            //content += '<td class="ImageNo">' + obj.version + '</td>';
                            //content += '<td class="Name">' + obj.name + '</td>';
                            //content += '<td class="DemandNum">' + obj.num + '</td>';
                            //content += '<td class="Scenario">' + obj.ordertype + '</td>';
                            //content += '<td class="ArchiveDate">' + obj.archive + '</td>';
                            //content += '</tr>';
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
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}