$(function () {
    if ($('.ico img:eq(1)').attr('src') == 'UI/images/2.png') {
        $(".fileName").hide();
        $(".quan_select").show();
        $(".change-icon").hide();
        //$(".file_name").hide();
        $(".file_size").hide();
        $(".date").hide();
        $(".action").hide();
        $(".index > div").addClass("word_contor");
        $(".index > div").addClass("word_div_border");
        //$(".index > div").addClass("word_contor_filename");
        $(".index").mouseover(function () { //鼠标移入事件
            $(this).find($(".ion")).show();
            $(this).find($(".ion_download")).show();

        });
        $(".index").mouseout(function () {  //鼠标移出事件
            $(this).find($(".ion_download")).hide();

            if ($(this).hasClass("ion_contorBorder")) {
                $(this).find($(".ion")).show();
            } else {
                $(this).find($(".ion")).hide();
            }

        })
    }
})

$(document).on('click', '.top_div > div', function () {
    $(this).addClass("top_contor").siblings().removeClass("top_contor");
});

$(document).on('click', '.ico img:eq(1)', function () {
    if ($('.ico img:eq(1)').attr('src') == 'UI/images/2.png') { //设置图片的切换
        $('.ico img:eq(1)').attr('src', 'UI/images/3.png');

    } else {
        $('.ico img:eq(1)').attr('src', 'UI/images/2.png');
    }

    if ($('.ico img:eq(1)').attr('src') == 'UI/images/3.png') {
        $(".file_name").show();
        $(".file_size").show();
        $(".date").show();
        $(".action").show();
        $(".fileName").show();
        $(".quan_select").hide();
        $(".change-icon").show();
        $(".index > div").removeClass("word_contor");
        $(".change_tb div .change_tb_icon").css("display", "block");
        $(".viewer > div").toggleClass("change_tb");
        $(".index > div > img").css("width", "35px");
        $(".index > div > img").css("height", "35px");
        $(".index div span.ion").addClass("change_tb_icon");
        $(".index div img").addClass("change_tb_img");
        $(".index > div").removeClass("word_div_border");

        $(".index").mouseover(function () {     //列表展示时  下载图标不会鼠标移上显示
            $(this).find($(".ion_download")).hide();
        });
        $(".index").mouseout(function () {
            $(this).find($(".ion_download")).hide();
        })


        //$(document).on('click', '.index', function () {  //点击一行变
        //    $(this).find("span").toggleClass("ion_contor");
        //    $(this).toggleClass("ion_contorBorder");
        //})
    }

    if ($('.ico img:eq(1)').attr('src') == 'UI/images/2.png') {
        $(".fileName").hide();
        $(".quan_select").show();
        $(".change-icon").hide();
        //$(".file_name").hide();
        $(".file_size").hide();
        $(".date").hide();
        $(".action").hide();
        $(".viewer > div").removeClass("change_tb");
        $(".index > div > img").css("width", "150px");
        $(".index > div > img").css("height", "150px");
        $(".index div span.ion").removeClass("change_tb_icon");
        $(".index div img").removeClass("change_tb_img");

        $(".index > div").addClass("word_contor");
        $(".index > div").addClass("word_div_border");

        $(".index").mouseover(function () { //鼠标移入事件
            $(this).find($(".ion")).show();
            $(this).find($(".ion_download")).show();

        });
        $(".index").mouseout(function () {  //鼠标移出事件
            $(this).find($(".ion_download")).hide();

            if ($(this).hasClass("ion_contorBorder")) {
                $(this).find($(".ion")).show();
            } else {
                $(this).find($(".ion")).hide();
            }

        })
        //$(".index").mouseover(function () { //鼠标移入事件
        //    $(this).find($(".ion")).show();
        //});
        //$(".index").mouseout(function () {  //鼠标移出事件
        //    if ($(this).hasClass("ion_contorBorder")) {
        //        $(this).find($(".ion")).show();
        //    } else {
        //        $(this).find($(".ion")).hide();
        //    }

        //})
    }

})

$(document).on('click', '#wangpan', function () {
    $(".pan").show();
    $(".share_div").hide();
    $(".more_div").hide();
});
$(document).on('click', '#share', function () {
    $(".share_div").show();
    $(".pan").hide();
    $(".more_div").hide();
});
$(document).on('click', '#more', function () {
    $(".more_div").show();
    $(".pan").hide();
    $(".share_div").hide();
});

$(document).on('click', '#share_left_text > div', function () {
    $(this).addClass("share_contor").siblings().removeClass("share_contor");
})
$(document).on('click', '.session', function () {
    $(".session_div").show();
    $(".friend_div").hide();

});
$(document).on('click', '.friend', function () {
    $(".friend_div").show();
    $(".session_div").hide();

});

$(document).on('click', '.anniu', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');


});

$(document).on('click', '.tutxt', function () {
    $(".file-live-thumbs > .file-preview-frame").each(function () {
        var a = $(this).find(".kv-file-content img").attr("src");
        var b = $(this).find(".file-thumbnail-footer span").text();
        console.log(a);
        console.log(b);

    });
});

//这里图片模块的  开始
$(document).ready(function () {

})
$(document).on('click', '.index > div > span > i', function () {
    $(this).parent().toggleClass("ion_contor");
    $(this).parents(".index").toggleClass("ion_contorBorder");

});

$(document).on("click", '.selectInput', function () {
    var a = $(".selectInput > div > input").is(':checked');
    if (a == true) {  //全选checkbox 选中
        $(".ion").show();
        $(".index > div > span").addClass("ion_contor");
        $(".index").addClass("ion_contorBorder");
    }
    if (a == false) {
        $(".ion").hide();
        $(".index > div > span").removeClass("ion_contor");
        $(".index").removeClass("ion_contorBorder");
    }

})

$(document).on('click', '.change-icon > span', function () {  //排序图标切换上下
    $(this).toggleClass('contor1');
    //ip = $(this).attr('data-val');  //ip表示获取每一个的表头不同th的值
    ////paixu = '';
    //if ($(this).hasClass('contor')) {
    //    paixu = 'desc';
    //}
    //else {
    //    paixu = 'asc';
    //}

});
