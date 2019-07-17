var 全局搜索 = '';
var 全局页码 = 1;
var 全局字段 = '';
var 全局排序 = '';
var onetype = '';
var oneval = '';
var twotype = '';
var twoval = '';
var fourtype = '';
var fourval = '';
var datetype = '';
var startdate = '';
var enddate = '';
var numbertype = '';
var sortfield = '';
var code = '';
var name = '';
var code1 = '';
var name1 = '';
var name2 = '';
var name3 = '';
var name4 = '';
var name5 = '';
var code6 = '';
var name6 = '';
var code3 = '';
var name3 = '';

var name21 = '';
var code21 = '';
var name22 = '';
var name23 = '';

var a = '';
var code01 = '';
var name02 = '';
var name03 = '';

var page = '';
$(document).on('click', '.add', function () {

    var len = parseInt($('#form_tb > tr').length) + 1;

    var content = '';
    content += '<tr>';
    content += '    <th class="inp1' + len + '" ty><input type="text" onclick="Click01(this)" value="" data-len="' + len + '"/></th>';
    content += '    <th class="inp2' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp3' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp4' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp5' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp6' + len + '" ><input type="text" value="" /></th>';
    content += '</tr>';
    //$("#form_tb").empty();
    $("#form_tb").append(content);
});
$(document).on('click', '.add1', function () {
    var len = parseInt($('#form_tb1 > tr').length) + 1;
    var content = '';
    content += '<tr>';
    content += '    <th class="inp1' + len + '" ty><input type="text" onclick="Click03(this)" value="" data-len="' + len + '"/></th>';
    content += '    <th class="inp2' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp3' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp4' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp5' + len + '" ><input type="text" value="" /></th>';
    content += '    <th class="inp6' + len + '" ><input type="text" value="" /></th>';
    content += '</tr>';
    //$("#form_tb").empty();
    $("#form_tb1").append(content);
})
$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    //ip = $(this).attr('data-val');  //ip表示获取每一个的表头不同th的值
    ////paixu = '';
    //if ($(this).hasClass('contor')) {
    //    paixu = 'desc';
    //}
    //else {
    //    paixu = 'asc';
    //}
    //GetAllPublishedGoodsInfo(1);
});
$(document).on('click', '#form_th1 > tr > th', function () {
    $(this).toggleClass('contor');

});

//开放率01 分页
$(function () {
    $("#pagination_PringPwd").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#selectval').val();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            //startdate = $('#startdate').val();
            //enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            startdate = GetDateFormat($('#startdate').val(), "yyyy/MM/dd");
            enddate = GetDateFormat($('#enddate').val(), "yyyy/MM/dd");
            // sortfield = $('#sortfield').val();
            //  sort = $('#sort').val();
            //numbership = $('#numberval').val();
            //numberval = $('#numqty').val();
            全局页码 = currPage;
            GetPrintUserList("IIS3382", "Machine.aspx?action=getmachinedrawingtexttt", {
                "page": 全局页码,
                "plat": plat

            }, 全局页码);
        }
    });
});



function Click() {
    //alert('dddd')

    page = 1;
    $("#PrintUserModal").draggable();//为模态对话框添加拖拽
    $("#PrintUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#PrintUserModal').modal('show');
    GetPrintUserList("IIS3382", "Machine.aspx?action=getmachinedrawingtexttt", {
        "page": page,
        "plat": plat

    });


}





//查询
$(document).on('click', '.queryPrint-btn', function () {
    var plat = $('.Print-Txt').val();
    page = 1;
    GetPrintUserList("IIS3382", "Machine.aspx?action=getmachinedrawingtexttt", {
        "page": page,
        "plat": plat

    });
});

//弹窗

var plat = '';
$(document).on('click', '#add_sure2', function () {

    code = $('#form_tb_Print i.choice.contor').attr("data-code");
    name = $('#form_tb_Print i.choice.contor').attr("data-name");
    name1 = $('#form_tb_Print i.choice.contor').attr("data-name1");
    name2 = $('#form_tb_Print i.choice.contor').attr("data-name2");
    name3 = $('#form_tb_Print i.choice.contor').attr("data-name3");
    name4 = $('#form_tb_Print i.choice.contor').attr("data-name4");
    name5 = $('#form_tb_Print i.choice.contor').attr("data-name5");


    $('#j1').val(code);
    $('#j2').val(name);
    $('#j3').val(name1);
    $('#j4').val(name2);
    $('#j5').val(name3);
    $('#j6').val(name4);
    $('#j7').val(name5);


    $('#PrintUserModal').modal('hide');
});

//打印用户列表弹窗
//$(document).on('click', '#search01', function () {
//    page = 1;
//    $("#PrintUserModal").draggable();//为模态对话框添加拖拽
//    $("#PrintUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
//    $('#PrintUserModal').modal('show');
//    GetPrintUserList("IIS3382", "Machine.aspx?action=getmachineopenrates", {
//        "page": page,
//        "plat": plat

//    });
//});


$(document).on('click', '#form_tb_Print i.choice', function () {


    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
    }
    else {
        if ($('#form_tb_Print i.choice').hasClass('contor')) {
            $('#form_tb_Print i.choice').removeClass('contor');

        }

        $(this).addClass('contor');
    }

});

////第二个


//开放率02 分页
$(function () {
    $("#pagination_PringPwd2").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#selectval').val();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            //startdate = $('#startdate').val();
            //enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            startdate = GetDateFormat($('#startdate').val(), "yyyy/MM/dd");
            enddate = GetDateFormat($('#enddate').val(), "yyyy/MM/dd");
            // sortfield = $('#sortfield').val();
            //  sort = $('#sort').val();
            //numbership = $('#numberval').val();
            //numberval = $('#numqty').val();
            全局页码 = currPage;
            GetPrintUserList2("IIS3382", "Machine.aspx?action=getmachinedracitem", {
                "page": 全局页码,
                "plat": plat

            }, 全局页码);
        }
    });
});




function Click01(inputthis) {
    //alert('dddd')

    a = $($(inputthis).parent('th')).find('input').attr('data-len');

    page = 1;
    $("#PrintUserModa2").draggable();//为模态对话框添加拖拽
    $("#PrintUserModa2").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#PrintUserModa2').modal('show');
    GetPrintUserList2("IIS3382", "Machine.aspx?action=getmachinedracitem", {
        "page": page,
        "plat": plat

    });


}


//查询
$(document).on('click', '.queryPrint2-btn', function () {
    var plat = $('.Print-Txt2').val();
    page = 1;
    GetPrintUserList2("IIS3382", "Machine.aspx?action=getmachinedracitem", {
        "page": page,
        "plat": plat

    });
});

//弹窗

var plat = '';
$(document).on('click', '#add_sure3', function () {

    code21 = $('#form_tb_Print2 i.choice.contor').attr("data-code21");
    name21 = $('#form_tb_Print2 i.choice.contor').attr("data-name21");
    name22 = $('#form_tb_Print2 i.choice.contor').attr("data-name22");
    name23 = $('#form_tb_Print2 i.choice.contor').attr("data-name23");



    //$('#j12').val(code21);
    //$('#j23').val(name21);
    //$('#j34').val(name22);
    //$('#j45').val(name23);
    //$('#j5').val(name3);
    //$('#j6').val(name4);
    //$('#j7').val(name5);


    var b1 = '#form_tb > tr > th.inp1' + a
    var bb1 = $(b1).find('input').val(code21);

    var b2 = '#form_tb > tr > th.inp2' + a + ' input'
    var bb2 = $(b2).find('input').val(name21);

    var b3 = '#form_tb > tr > th.inp3' + a
    var bb3 = $(b3).find('input').val(name22);

    var b4 = '#form_tb > tr > th.in4' + a
    var bb4 = $(b4).find('input').val('');

    var b5 = '#form_tb > tr > th.inp5' + a
    var bb5 = $(b5).find('input').val(name23);

    var b6 = '#form_tb > tr > th.inp6' + a
    var bb6 = $(b6).find('input').val('');

    $('#PrintUserModa2').modal('hide');
});

//打印用户列表弹窗
//$(document).on('click', '#search01', function () {
//    page = 1;
//    $("#PrintUserModal").draggable();//为模态对话框添加拖拽
//    $("#PrintUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
//    $('#PrintUserModal').modal('show');
//    GetPrintUserList("IIS3382", "Machine.aspx?action=getmachineopenrates", {
//        "page": page,
//        "plat": plat

//    });
//});


$(document).on('click', '#form_tb_Print2 i.choice', function () {


    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
    }
    else {
        if ($('#form_tb_Print2 i.choice').hasClass('contor')) {
            $('#form_tb_Print2 i.choice').removeClass('contor');

        }

        $(this).addClass('contor');
    }

});

////第3个


//开放率03 分页
$(function () {
    $("#pagination_PringPwd3").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#selectval').val();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            //startdate = $('#startdate').val();
            //enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            startdate = GetDateFormat($('#startdate').val(), "yyyy/MM/dd");
            enddate = GetDateFormat($('#enddate').val(), "yyyy/MM/dd");
            // sortfield = $('#sortfield').val();
            //  sort = $('#sort').val();
            //numbership = $('#numberval').val();
            //numberval = $('#numqty').val();
            全局页码 = currPage;
            GetPrintUserList3("IIS3382", "Machine.aspx?action=getmachine", {
                "page": 全局页码,
                "plat": plat

            }, 全局页码);
        }
    });
});




function Click03(inputthis) {
    //alert('dddd')

    a = $($(inputthis).parent('th')).find('input').attr('data-len');

    page = 1;
    $("#PrintUserModa3").draggable();//为模态对话框添加拖拽
    $("#PrintUserModa3").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#PrintUserModa3').modal('show');
    GetPrintUserList3("IIS3382", "Machine.aspx?action=getmachine", {
        "page": page,
        "plat": plat

    });
}


//查询
$(document).on('click', '.queryPrint3-btn', function () {
    var plat = $('.Print-Txt3').val();
    page = 1;
    GetPrintUserList3("IIS3382", "Machine.aspx?action=getmachine", {
        "page": page,
        "plat": plat

    });
});

//弹窗

var plat = '';
$(document).on('click', '#add_sure4', function () {

    code01 = $('#form_tb_Print3 i.choice.contor').attr("data-code01");
    name02 = $('#form_tb_Print3 i.choice.contor').attr("data-name02");
    name03 = $('#form_tb_Print3 i.choice.contor').attr("data-name03");
    //name23 = $('#form_tb_Print3 i.choice.contor').attr("data-name23");





    //$('#j12').val(code21);
    //$('#j23').val(name21);
    //$('#j34').val(name22);
    //$('#j45').val(name23);
    //$('#j5').val(name3);
    //$('#j6').val(name4);
    //$('#j7').val(name5);


    var b13 = '#form_tb1 > tr > th.inp1' + a
    var bb13 = $(b13).find('input').val(code01);

    var b23 = '#form_tb1 > tr > th.inp2' + a + ' input'
    var bb23 = $(b23).find('input').val(name02);

    var b33 = '#form_tb1 > tr > th.inp3' + a
    var bb33 = $(b33).find('input').val(name02);

    var b43 = '#form_tb1 > tr > th.in4' + a
    var bb43 = $(b43).find('input').val('');

    var b53 = '#form_tb1 > tr > th.inp5' + a
    var bb53 = $(b53).find('input').val('');

    var b63 = '#form_tb1 > tr > th.inp6' + a
    var bb63 = $(b63).find('input').val('');

    $('#PrintUserModa3').modal('hide');
});

//打印用户列表弹窗
//$(document).on('click', '#search01', function () {
//    page = 1;
//    $("#PrintUserModal").draggable();//为模态对话框添加拖拽
//    $("#PrintUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
//    $('#PrintUserModal').modal('show');
//    GetPrintUserList("IIS3382", "Machine.aspx?action=getmachineopenrates", {
//        "page": page,
//        "plat": plat

//    });
//});


$(document).on('click', '#form_tb_Print3 i.choice', function () {


    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
    }
    else {
        if ($('#form_tb_Print3 i.choice').hasClass('contor')) {
            $('#form_tb_Print3 i.choice').removeClass('contor');

        }

        $(this).addClass('contor');
    }

});







//$(document).on('click', '#adduserinfo', function () {

//    var aa1 = $('#j1').val();
//    var aa2 = $('#j2').val();
//    var aa3 = $('#j3').val();
//    var aa4 = $('#j4').val();
//    var aa5 = $('#j5').val();
//    var aa6 = $('#j6').val();
//    var aa7 = $('#j7').val();

//    var shuzu = new Array
//    var shuzu2 = new Array();
//    var tr_obj = $('#form_tb > tr');
//    for (var a = 0; a < tr_obj.length; a++) {
//        var th_obj = $(tr_obj[a]).find('th');
//        //for (var b = 0; b < th_obj.length; b++) {
//        //    var data = { "a": $(th_obj[b]).find('input').val() }
//        //    shuzu.push(data);
//        //}

//        var data = { "f": $(th_obj[0]).find('input').val(), "a": $(th_obj[1]).find('input').val(), "b": $(th_obj[2]).find('input').val(), "c": $(th_obj[3]).find('input').val(), "d": $(th_obj[4]).find('input').val(), "e": $(th_obj[5]).find('input').val() }
//        shuzu.push(data);
//    }

//    var tr_obj = $('#form_tb1 > tr');
//    for (var a = 0; a < tr_obj.length; a++) {
//        var th_obj = $(tr_obj[a]).find('th');
//        var data = { "processcode": $(th_obj[0]).find('input').val(), "drawingcode": $(th_obj[1]).find('input').val(), "resourcecode": $(th_obj[2]).find('input').val(), "processcontent": $(th_obj[3]).find('input').val(), "preparatime": $(th_obj[4]).find('input').val(), "oneworktime": $(th_obj[5]).find('input').val() }
//        shuzu2.push(data);

//        //processcode	VARCHAR2(20)		工序代码
//        //drawingcode	VARCHAR2(20)		图纸代码
//        //processcontent	VARCHAR2(20)		工序内容
//        //preparatime	number(8,2)		准备工时
//        //oneworktime	number(8,2)		单件工时
//        //totalworktime	number(8,2)		总工时（单件工时 * 生产总需求量 +准备工时）


//    }
//    Machinedrawing01("IIS3382", "Machine.aspx?action=Machinedrawing", {

//        "pjcode": aa1,
//        "batch": aa2,
//        "figurenumber": aa3,
//        "versions": aa4,
//        "designation": aa5,
//        "numbers": aa6,
//        "craftnumbers": aa7,
//        "物料": shuzu,
//        "工序": shuzu2,
//        "usercode": ""
//    });

//});







/////////////////////////////////////////////////////////////////////////////////
////确定按钮

$(document).on('click', '#adduserinfo', function () {

    var aa1 = $('#j1').val();
    var aa2 = $('#j2').val();
    var aa3 = $('#j3').val();
    var aa4 = $('#j4').val();
    var aa5 = $('#j5').val();
    var aa6 = $('#j6').val();
    var aa7 = $('#j7').val();

    var shuzu = new Array
    var shuzu2 = new Array();
    var tr_obj = $('#form_tb > tr');
    for (var a = 0; a < tr_obj.length; a++) {
        var th_obj = $(tr_obj[a]).find('th');
        //for (var b = 0; b < th_obj.length; b++) {
        //    var data = { "a": $(th_obj[b]).find('input').val() }
        //    shuzu.push(data);
        //}

        var data = { "materialcode": $(th_obj[0]).find('input').val(), "sizes": $(th_obj[3]).find('input').val(), "quantity": $(th_obj[5]).find('input').val() }
        shuzu.push(data);


    }

    var tr_obj = $('#form_tb1 > tr');
    for (var a = 0; a < tr_obj.length; a++) {
        var th_obj = $(tr_obj[a]).find('th');
        var data = { "processcode": $(th_obj[0]).find('input').val(), "processcontent": $(th_obj[2]).find('input').val(), "preparatime": $(th_obj[3]).find('input').val(), "oneworktime": $(th_obj[4]).find('input').val() }
        shuzu2.push(data);

    }
    Machinedrawing01("IIS3382", "Machine.aspx?action=Machinedrawing", {

        "pjcode": aa1,
        "batch": aa2,
        "figurenumber": aa3,
        "versions": aa4,
        "designation": aa5,
        "numbers": aa6,
        "craftnumbers": aa7,
        "物料": shuzu,
        "工序": shuzu2,
        "usercode": ""
    });

});

//////////////////////////////////////////////////////////////////////////////////




function GetPrintUserList(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 10)) + '</td>';
                    //  content += '    <td class="td_classftfcode" >' + obj.classftfcode + '</td>';
                    content += '    <td class="td_ratename" >' + obj.batch + '</td>';
                    content += '    <td class="data-name1">' + obj.figurenumber + '</td>';
                    //content += '    <td class="td_modiflyusercode">' + obj.修改人 + '</td>';
                    content += '    <td class="data-name2">' + obj.versions + '</td>';
                    //content += '    <td class="td_modiflydate">' + obj.modiflydate + '</td>';
                    content += '    <td class="data-name3">' + obj.designation + '</td>';
                    content += '    <td class="data-name4">' + obj.numbers + '</td>';
                    content += '    <td class="data-name5">' + obj.craftnumbers + '</td>';
                    content += '<td>';

                    content += '   <i class="iconfont choice" data-code=' + obj.pjcode + ' data-name=' + obj.batch + ' data-name1=' + obj.figurenumber + ' data-name2=' + obj.versions + ' data-name3=' + obj.designation + ' data-name4=' + obj.numbers + '  data-name5=' + obj.craftnumbers + '>&#xe639;</i>';

                    //content += '   <i class="iconfont choice" data-code=' + obj.pjcode + ' data-name=' + obj.batch + 'data-figurenumber=' + obj.figurenumber + 'data-versions=' + obj.versions + 'data-designation=' + obj.designation + 'data-numbers=' + obj.numbers + 'data-craftnumbers=' + obj.craftnumbers + '>&#xe639;</i>';
                    content += '</td>';
                    content += '</tr>';
                    //t.pjcode ,t.batch,t.figurenumber,t.versions,t.designation,t.numbers,t.craftnumbers,
                });
                $('#form_tb_Print').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                //if (data.usercode == "mt00000491" || data.usercode == "mt00000589" || data.usercode == "mt00000001") {
                //    $('#SearchPwd').show();
                //} else {
                //    $('#SearchPwd').hide();
                //}

                $("#pagination_PringPwd").pagination('setPage', parseFloat(page), parseFloat(pagecount));



            }
            else {
                alert(data.errmsg)
            }
        }
    });
















}


function GetPrintUserList2(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 10)) + '</td>';

                    content += '    <td class="td_ratename" >' + obj.wname + '</td>';
                    content += '    <td class="data-name1">' + obj.wlength + '</td>';
                    content += '    <td class="data-name2">' + obj.wjian + '</td>';

                    content += '<td>';

                    content += '   <i class="iconfont choice" data-code21=' + obj.wcode + ' data-name21=' + obj.wname + ' data-name22=' + obj.wlength + ' data-name23=' + obj.wjian + ' >&#xe639;</i>';

                    content += '</td>';
                    content += '</tr>';
                });
                $('#form_tb_Print2').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;

                $("#pagination_PringPwd2").pagination('setPage', parseFloat(page), parseFloat(pagecount));

                //t.wcode, t.wname, t.wjian, t.wlength

            }
            else {
                alert(data.errmsg)
            }
        }
    });
















}

function GetPrintUserList3(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 10)) + '</td>';

                    content += '    <td class="td_ratename" >' + obj.flowname + '</td>';
                    content += '    <td class="data-name1">' + obj.sequenctime + '</td>';
                    //content += '    <td class="data-name2">' + obj.wjian + '</td>';

                    content += '<td>';

                    content += '   <i class="iconfont choice" data-code01=' + obj.resourcecode + ' data-name02=' + obj.flowname + ' data-name03=' + obj.sequenctime + '>&#xe639;</i>';

                    content += '</td>';
                    content += '</tr>';
                });
                $('#form_tb_Print3').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;

                $("#pagination_PringPwd3").pagination('setPage', parseFloat(page), parseFloat(pagecount));

                //t.wcode, t.wname, t.wjian, t.wlength

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

function Machinedrawing01(urltype, pageurl, data) {
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
                alert('保存成功');
                window.location.reload();
                //$('#datalist2 > .panel-heading > .edit').addClass('contor');
                //$('#datalist2 > .panel-heading > .sava.contor').removeClass('contor');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

