//var 全局搜索 = '';
//var 全局页码 = 1;
//var 全局字段 = '';
//var 全局排序 = '';
//var page = '';
//$(document).on('click', '#form_th > tr > th', function () {
//    $(this).toggleClass('contor');
//    //ip = $(this).attr('data-val');  //ip表示获取每一个的表头不同th的值
//    ////paixu = '';
//    //if ($(this).hasClass('contor')) {
//    //    paixu = 'desc';
//    //}
//    //else {
//    //    paixu = 'asc';
//    //}
//    //GetAllPublishedGoodsInfo(1);
//});
//$(document).on('click', '#form_th_Print > tr > th', function () {
//    $(this).toggleClass('contor');

//});

////分页
//$(function () {
//    $("#pagination_PringPwd").pagination({
//        totalPage: 0,
//        showPageNum: 5,
//        isResetPage: true,
//        isShowPageSizeOpt: false,
//        isShowRefresh: false,
//        callBack: function (currPage, pageSize) {
//            console.log('currPage:' + currPage + '     pageSize:' + pageSize);
//            GetPrintUserList("IIS3382", "Machine.aspx?action=getmachinedrawingtexttt", {
//                "page": 全局页码,
//                "plat": plat

//            }, 全局页码);
//        }
//    });
//});






////查询
//$(document).on('click', '.queryPrint-btn', function () {
//    var plat = $('.Print-Txt').val();
//    page = 1;
//    GetPrintUserList("IIS3382", "Machine.aspx?action=getmachinedrawingtexttt", {
//        //"page": page,
//        //"plat": plat
//        "pageSize": 20, //页面尺寸
//        "page": 1, //页码
//        "queryField": "xxx",//查询字段
//        "queryVal": "xxx", //查询值
//        "sortBy": "xxx", //排序字段
//        "orderBy": "asc/desc" //排序顺序

//    });
//});


//$(document).on('click', '#form_tb_Print i.choice', function () {
//    if ($(this).hasClass('contor')) {
//        $(this).removeClass('contor');
//    }
//    else {
//        if ($('#form_tb_Print i.choice').hasClass('contor')) {
//            $('#form_tb_Print i.choice').removeClass('contor');

//        }

//        $(this).addClass('contor');
//    }

//});
//function GetPrintUserList(urltype, pageurl, data, page) {
//    if (page == null) {
//        page = 1;
//    }
//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Api/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": JSON.stringify(data)
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            hideLoading();
//            if (data.errcode == 0) {
//                var content = '';
//                $.each(data.data, function (idx, obj) {
//                    content += '<tr>';
//                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 10)) + '</td>';                    
//                    content += '    <td class="td_ratename" >' + obj.batch + '</td>';
//                    content += '    <td class="data-name1">' + obj.figurenumber + '</td>';                    
//                    content += '    <td class="data-name2">' + obj.versions + '</td>';                    
//                    content += '    <td class="data-name3">' + obj.designation + '</td>';
//                    content += '    <td class="data-name4">' + obj.numbers + '</td>';
//                    content += '    <td class="data-name5">' + obj.craftnumbers + '</td>';
//                    content += '<td>';
//                    content += '   <i class="iconfont choice" data-code=' + obj.pjcode + ' data-name=' + obj.batch + ' data-name1=' + obj.figurenumber + ' data-name2=' + obj.versions + ' data-name3=' + obj.designation + ' data-name4=' + obj.numbers + '  data-name5=' + obj.craftnumbers + '>&#xe639;</i>';
//                    content += '</td>';
//                    content += '</tr>';
                    
//                });
//                $('#form_tb_Print').empty().append(content);
//                var pagecount = data.pagecount;  //总页码
//                var totalnum = data.totalnum;    //总数据 多少条            
//                $("#pagination_PringPwd").pagination('setPage', parseFloat(page), parseFloat(pagecount));
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}




////查询框开始
//$(document).on('change', '#datetype', function () {
//    var 时间类型 = $(this).val();

//    if (时间类型 == '全部') {
//        $('#datetype_date').hide();
//    }
//    else {
//        $('#datetype_date').show();
//    }
//});

//$(document).on('change', '#onetype', function () {
//    var 类型一 = $(this).val();

//    if (类型一 == '全部') {
//        $('#oneval').hide();
//    }
//    else {
//        $('#oneval').attr('placeholder', '请输入' + 类型一);
//        $('#oneval').show();
//    }
//});

//$(document).on('change', '#twotype', function () {
//    var 类型二 = $(this).val();
//    if (类型二 == '全部') {
//        $('#twoval').hide();
//    }
//    else {
//        $('#twoval').attr('placeholder', '请输入' + 类型二);
//        $('#twoval').show();
//    }
//});

//$(document).on('change', '#rn_time', function () {
//    var a = $(this).val();

//    if (a == '全部') {
//        $('#rn_time_val').hide();
//    }
//    else {
//        $('#rn_time_val').show();
//    }
//});


//$(document).on('change', '#select_input', function () {
//    var 类型二 = $('#select_input option:selected').val();
//    if (类型二 == 'time') {
//        $('#gonghao').hide();
//        $('#datetype_date').show();
//    }
//    else {
//        $('#gonghao').show();
//        $('#datetype_date').hide();
//    }
//});
////查询框结束


$(document).on('click', '#leibie i.choice', function () {
    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
    }
    else {
        if ($('#leibie i.choice').hasClass('contor')) {
            $('#leibie i.choice').removeClass('contor');
        }
        $(this).addClass('contor');
    }

});
$(document).on('click', '#rr', function () {  
    if ($("#leibie i.choice").hasClass("contor")) {
        var a1 = $("#leibie i.contor").next("span").text();//获取当前类别选中的值
    }
    
    
});