//var add_page = '';
//add_page += '<div class="index">';
//add_page += '<div class="page5">';
//add_page += '<ul class="jump">';
//add_page += '<li><input type="text"><a href="javascript:;" class="butn">GO＞</a></li>';
//add_page += '</ul>';
//add_page += '<ul class="pre">';
//add_page += '<li class=""><a href="javascript:;" class="butn"> ← 上一页</a></li>';
//add_page += '</ul>';
//add_page += '<ul class="num">';
//add_page += '</ul>';
//add_page += '<ul class="next"><li><a href="javascript:;" class="butn">下一页 → </a></li></ul>';
//add_page += '</div>';
//add_page += '<p>第 <b class="number" style="color:red;">1</b> 页 / 共 <b class="all"></b> 页</p>';
//add_page += '</div>';
var add_page = '';
add_page += '<div class="index" style="text-align:center;">';
add_page += '<div class="page5" style="text-align:center;">';
add_page += '<ul class="pre pagination" style="margin-left:20px;">';
add_page += '<li class="page-item"><a href="javascript:;" class="butn page-link"> ← 上一页</a></li>';
add_page += '</ul>';
add_page += '<ul class="num pagination">';
add_page += '</ul>';
add_page += '<ul class="next pagination"><li class="page-item"><a href="javascript:;" class="butn page-link">下一页 → </a></li></ul>';
add_page += '<ul class="jump pagination"  style="margin-left:20px;">';
add_page += '<li class="page-item"><input type="text" style="height:27px;"><a href="javascript:;" class="butn">GO＞</a></li>';
add_page += '</ul>';
add_page += '</div>';
add_page += '<p>第 <b class="number" style="color:red;">1</b> 页 / 共 <b class="all"></b> 页</p>';
add_page += '</div>';


$(function () {
    $('.yy_pagegps').empty();
    $('.yy_pagegps').each(function (index, el) {
        $(el).append(add_page);
        var pagenums = $(el).attr('data-pagenums');
        $(el).find('b.all').text(pagenums);
    });
    pagenum();
})
//--第几页
$(document).on('click', '.yy_pagegps .num>li', function () {
    var page_gps = $(this).parents('.yy_pagegps');
    var num = $(this).text();
    page_gps.find('.jump li>span').remove();
    if ($(this).hasClass('contor')) {
        page_gps.find('.jump li').prepend('<span>亲，已经是当前页面！</span>');
        setTimeout(function () {
            page_gps.find('.jump li>span').remove();
        }, 1000)
        return;
    } else {
        page_gpsajax(page_gps, num);
    }
})
//--下一页
$(document).on('click', '.yy_pagegps .next>li', function () {
    var page_gps = $(this).parents('.yy_pagegps');
    page_gps.find('.jump li>span').remove();

    var page = page_gps.attr('data-page');
    var pagenums = page_gps.attr('data-pagenums');

    if (page == pagenums) {
        page_gps.find('.jump li').prepend('<span>亲，已经是最后一页了！</span>');
        setTimeout(function () {
            page_gps.find('.jump li>span').remove();
        }, 1000);
        return;
    } else {
        page++;
        page_gpsajax(page_gps, page);
    }
})
//--上一页
$(document).on('click', '.yy_pagegps .pre>li', function () {
    var page_gps = $(this).parents('.yy_pagegps');
    page_gps.find('.jump li>span').remove();

    var page = page_gps.attr('data-page');
    var pagenums = page_gps.attr('data-pagenums');

    if (page == 1) {
        page_gps.find('.jump li').prepend('<span>亲，已经是第一页了！</span>');
        setTimeout(function () {
            page_gps.find('.jump li>span').remove();
        }, 1000);
        return;
    } else {
        page--;
        page_gpsajax(page_gps, page);
    }
})
//--跳页
$(document).on('click', '.yy_pagegps .jump .butn', function () {
    var page_gps = $(this).parents('.yy_pagegps');
    page_gps.find('.jump li>span').remove();

    var pagenums = Number(page_gps.attr('data-pagenums'));
    var num = Number($(this).siblings('input').val());
    var text = /^[0-9]*[1-9][0-9]*$/;

    if (!text.test(num) || num > pagenums) {
        page_gps.find('.jump li').prepend('<span>亲，请输入1-' + pagenums + '的整数！</span>');
        //$(this).siblings('input').val(page_gps.attr('data-page'))
        setTimeout(function () {
            page_gps.find('.jump li>span').remove();
        }, 1000);
        return;
    }
    page_gpsajax(page_gps, num);
})

function page_num(bt, nums, pagenums) {
    if (pagenums < 1) {
        pagenums = 1;
    }
    if (nums > pagenums) {
        nums = pagenums
    }
    $(bt).attr('data-pagenums', pagenums)
    $(bt).attr('data-page', nums);

    $(bt).find('.num').empty();
    var page = Number($(bt).attr('data-page'));
    var pagenums = Number(pagenums);
    var add_pageli = '';
    if (pagenums <= 5) {
        for (i = 0; i < pagenums; i++) {
            add_pageli += '<li class=""><a href="javascript:;" class="butn">' + (i + 1) + '</a></li>';
        }
        $(bt).find('.num').append(add_pageli);
    } else {
        if (page < 4) {
            for (i = 0; i < 5; i++) {
                add_pageli += '<li class=""><a href="javascript:;" class="butn">' + (i + 1) + '</a></li>';
            }
            $(bt).find('.num').append(add_pageli);
        } else if (page == (pagenums - 1) || page == pagenums) {
            for (i = 0; i < 5; i++) {
                add_pageli += '<li class=""><a href="javascript:;" class="butn">' + ((pagenums - 4) + i) + '</a></li>';
            }
            $(bt).find('.num').append(add_pageli);
        } else {
            for (i = 0; i < 5; i++) {
                add_pageli += '<li class=""><a href="javascript:;" class="butn">' + ((page - 2) + i) + '</a></li>';
            }
            $(bt).find('.num').append(add_pageli);
        }
    }
    for (j = 0; j < $(bt).find('.num>li').length; j++) {
        if ($(bt).find('.num>li').eq(j).text() == page) {
            $(bt).find('.num>li').eq(j).addClass('contor');
            $(bt).find('.jump input').val(page);
            $(bt).find('b.number').text(page);
            $(bt).find('b.all').text(pagenums);
        }
    }
}


function pagenum() {
    $('.yy_pagegps').each(function (index, el) {
        $(el).find('.num').empty();
        var add_pageli = '';
        var page = Number($(el).attr('data-page'));
        var pagenums = Number($(el).attr('data-pagenums'));
        if (pagenums <= 5) {
            for (i = 0; i < pagenums; i++) {
                add_pageli += '<li class=""><a href="javascript:;" class="butn">' + (i + 1) + '</a></li>';
            }
            $(el).find('.num').append(add_pageli);
        } else {
            if (page < 3) {
                for (i = 0; i < 5; i++) {
                    add_pageli += '<li class=""><a href="javascript:;" class="butn">' + (i + 1) + '</a></li>';
                }
                $(el).find('.num').append(add_pageli);
            } else if (page == (pagenums - 1) || page == pagenums) {
                for (i = 0; i < 5; i++) {
                    add_pageli += '<li class=""><a href="javascript:;" class="butn">' + ((pagenums - 4) + i) + '</a></li>';
                }
                $(el).find('.num').append(add_pageli);
            } else {
                for (i = 0; i < 5; i++) {
                    add_pageli += '<li class=""><a href="javascript:;" class="butn">' + ((page - 2) + i) + '</a></li>';
                }
                $(el).find('.num').append(add_pageli);
            }
        }
        for (j = 0; j < $(el).find('.num>li').length; j++) {
            if ($(el).find('.num>li').eq(j).text() == page) {
                $(el).find('.num>li').eq(j).addClass('contor');
                $(el).find('.jump input').val(page);
                $(el).find('b.number').text(page);
            }
        }
    });
}




/*----------------------------------------------------------------------------------------------------*/


//---page_gps
/*设置当前页码及页总数*/
function page_gpsajax(obj, pages, pagecount) {
    if (obj.attr('id') == 'yy_pagegps01') {
        page_gps01ajax(obj, pages, pagecount);
    };
}
//---page_gps01的ajax写在这里
function page_gps01ajax(obj_, pages_, pagecount_) {
    //pages_：当前页面
    var pageallnums = pagecount_;//总页数
    var goodstype = $('#barLeftin .listext.contor').attr('data-code');

    GetAllPublishedGoodsInfo(pages_);
    //GetAllPublishedGoodsInfo(pages_, search, goodstype);

}





