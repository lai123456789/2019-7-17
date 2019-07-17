function wordStatic(input) {
    // 获取要显示已经输入字数文本框对象
    var content = document.getElementById('cnt');
    if (content && input) {
        // 获取输入框输入内容长度并更新到界面
        var value = input.value;
        // 将换行符不计算为单词数
        value = value.replace(/\n|\r/gi, "");
        // 更新计数
        content.innerText = value.length;
    }
}






$(document).on('click', '#btn_sure', function () {
    var WORDTYPECODE = $("#sel option:selected").val();
    if (WORDTYPECODE == "装配部") {
        var APPTITTLE = $("#zp option:selected").val();
    }
    if (WORDTYPECODE == "品质部") {
        var APPTITTLE = $("#pz option:selected").val();
    }
    if (WORDTYPECODE == "设计部") {
        var APPTITTLE = $("#sj option:selected").val();
    }
    if (WORDTYPECODE == "精益科") {
        var APPTITTLE = $("#jy option:selected").val();
    }
    if (WORDTYPECODE == "采购部") {
        var APPTITTLE = $("#cg option:selected").val();
       
    }
    if (WORDTYPECODE == "机加部") {
        var APPTITTLE = $("#jj option:selected").val();
    }
    if (WORDTYPECODE == "外发部") {
        var APPTITTLE = $("#wf option:selected").val();
    }

    var CONTENT = $("#descrip_content").val();

    var token = localStorage.getItem("token");
    var usercode = localStorage.getItem("usercode");
    var base64_1 = '';
    var base64_2 = '';
    var base64_3 = '';
    var length = $('.weui_uploader_files .weui_uploader_file').length;
    if (length > 0 && length < 2) {
        var obj = $('.weui_uploader_files li:eq(0)');
        var topimg = $(obj).css("backgroundImage");    //拿到base64地址
        topimg1 = topimg.split('("')[1].split('")')[0];//截取base64地址 
        base64_1 = topimg1;
    }
    if (length > 1 && length < 3) {
        var obj = $('.weui_uploader_files li:eq(0)');
        var topimg = $(obj).css("backgroundImage");    //拿到base64地址
        topimg1 = topimg.split('("')[1].split('")')[0];//截取base64地址 
        base64_1 = topimg1;
        var obj1 = $('.weui_uploader_files li:eq(1)');            
            var topimg = $(obj1).css("backgroundImage");    //拿到base64地址
            topimg2 = topimg.split('("')[1].split('")')[0];//截取base64地址 
            base64_2 = topimg2; 
           
    }
    if (length > 2 && length < 4) {
        var obj = $('.weui_uploader_files li:eq(0)');
        var topimg = $(obj).css("backgroundImage");    //拿到base64地址
        topimg1 = topimg.split('("')[1].split('")')[0];//截取base64地址 
        base64_1 = topimg1;
        var obj1 = $('.weui_uploader_files li:eq(1)');
        var topimg = $(obj1).css("backgroundImage");    //拿到base64地址
        topimg2 = topimg.split('("')[1].split('")')[0];//截取base64地址 
        base64_2 = topimg2;
        var obj2 = $('.weui_uploader_files li:eq(2)');        
            var topimg = $(obj2).css("backgroundImage");    //拿到base64地址
            topimg3 = topimg.split('("')[1].split('")')[0];//截取base64地址 
            base64_3 = topimg3;           
    }
    GetGoodsType(WORDTYPECODE, APPTITTLE, usercode, CONTENT, token, base64_1, base64_2, base64_3)
});
/*
创建工单
*/
function GetGoodsType(WORDTYPECODE, APPTITTLE, usercode, CONTENT, token, base64_1, base64_2, base64_3) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UpdateWx",
        data: {
            "WORDTYPECODE": WORDTYPECODE,
            "usercode": usercode,
            "APPTITTLE": APPTITTLE,
            "CONTENT": CONTENT,
            "token": token,
            "base64_1": base64_1,
            "base64_2": base64_2,
            "base64_3": base64_3
        },
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            console.log(data);
            if (data.errcode == 0)//提取成功
            {
                var loading = weui.loading('正在提交');
                setTimeout(function () {
                    loading.hide(function () {
                        weui.toast('提交成功！', 2000);
                        setTimeout(function () {
                            location.href = "create_gongdan__success.aspx";
                        }, 2000);

                    });
                }, 3000);
            }
            else//提取失败   
            {
                //   alert(data.errmsg);   //token验证失败  重新登录
                alert("身份验证失败！");
                window.location.href = "index.html";
            }
        }
    });
}


////--添加图片
//$(document).on('tap', '#addimg', function (e) {
//    stopDefault(e);
//    var length = $('.faqbillimg').length;
//    if (length >= 3) {
//        $(this).hide();
//    } else {
//        $('#imgfile').click();
//    }
//})


////--图片放大
//$(document).on("click", "#jz .img", function (e) {
//    //stopDefault(e);
//    $(this).addClass('.bigimg');
//    var src = $(this).children('img').attr('src');
//    $('#bigimg').remove();
//    $('body').append('<div id="bigimg" class="img"><div id="delimg" class="iconfont">&#xe61c;</div><img src="/BI/微信端/BasicUI/UI/Images/biaoge1.png" alt=""></div>')
//    $('#bigimg>img').attr('src', src);
    
//})
////--图片删除
//$(document).on("tap", "#delimg", function (e) {
//    stopDefault(e);
//    $('#bigimg').remove();
//    $("#personaldata .img.contor").remove();
//    var length = $('.faqbillimg').length;
//    if (length < 3) {
//        $('#addimg').show();
//    }
//})

////--取消图片放大
//$(document).on("tap", "#bigimg", function (e) {
//    stopDefault(e);
//    $("#personaldata .img").removeClass('contor');
//    $('#bigimg').remove();
//})





/********************************** 上传图片 ****************************************/

//function getUrl(fil, id) {
//    //alert("图片类型：" + fil[0].type + "图片名称" + fil[0].name);
//    var file = $("#" + id);
//    if (fil[0].type.indexOf("image") < 0) {
//        if (fil[0].name.indexOf(".") < 0) {
//            var picname = fil[0].name.split('%');
//            if (picname.indexOf("image") < 0) {
//                alert('不允许上传非图片格式的图片');

//                file.after(file.clone().val(""));
//                file.remove();
//                return;
//            }
//        }
//        else {
//            alert('不允许上传非图片格式的图片');

//            file.after(file.clone().val(""));
//            file.remove();
//            return;
//        }
//    }
//    var Cnv = document.getElementById('myCanvas');
//    var Cntx = Cnv.getContext('2d');//获取2d编辑容器
//    var imgss = new Image();//创建一个图片
//    var agoimg = document.getElementById("ago");
//    for (var intI = 0; intI < fil.length; intI++) {//图片回显
//        var tmpFile = fil[intI];
//        var reader = new FileReader();
//        reader.readAsDataURL(tmpFile);
//        reader.onload = function (e) {
//            url = e.target.result;
//            imgss.src = url;
//            agoimg.src = url;

//            var ImgHorW = 500;   //图片清晰度  影响压缩后的清晰度
//            agoimg.onload = function () {
//                //等比缩放
//                var m = imgss.width / imgss.height;
//                Cnv.height = ImgHorW;//该值影响缩放后图片的大小
//                Cnv.width = ImgHorW * m;
//                //img放入画布中
//                //设置起始坐标，结束坐标
//                Cntx.drawImage(agoimg, 0, 0, ImgHorW * m, ImgHorW);
//                //获取canvas压缩后的图片数据
//                var Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
//                var img_temp = new Image();
//                img_temp.src = Pic;
//                var imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
//                while (imgpic.length > 1024 * 1024 * 0.4) {
//                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
//                    ImgHorW -= 50;
//                    Cnv.height = ImgHorW;//该值影响缩放后图片的大小
//                    Cnv.width = ImgHorW * m;
//                    img_temp = new Image();
//                    img_temp.src = Pic;
//                    Cntx.drawImage(img_temp, 0, 0, ImgHorW * m, ImgHorW);
//                    //获取canvas压缩后的图片数据
//                    Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
//                    imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
//                }

//                $('#addimg').before('<div class="img" style="float:left;margin-left:20px;"><img width="70px" height="60px" class="faqbillimg" alt="" src="' + Pic + '"><p class="del" style="margin-top:-3px;font-size:10px;cursor:pointer;text-align:center;color:#808080;"><i>删除</i></p></div>')
//                var content = '';
//                //content += '<ul data-am-widget="gallery" class="am-gallery am-avg-sm-2 am-avg-md-3 am-avg-lg-4 am-gallery-overlay" data-am-gallery="{ pureview: true }">';
//                //content += '<li style="float:left;">';    
//                //content += '<div class="am-gallery-item" style="width:70px;height:50px;">';
//                content += '<img  alt="" src="' + Pic + '">';
//                //content += '</div>';
//                //content += '</li>';
//                //content += '</ul>';
//                $('#zheli').append(content);
//                //$(".am-gallery-item").append('<img width="70px" height="60px" class="faqbillimg" alt="" src="' + Pic + '">');
//                var length = $('.faqbillimg').length;
//                if (length > 2) {
//                    $('#faqbillimg').hide();
//                }
//            }
//        }
//    }
//}

////回车键 enter   按下回车键登录成功！
//$(document).on("keydown", document, function (e) {
//    var ev = document.all ? window.event : e;
//    if (ev.keyCode == 13) {
//        //if ($('#search_content').is(':focus')) {
//        //    var search = $('#search_content').val();
//        //    全局搜索 = search;
//        //    全局页码 = 1;
//        //    GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
//        //        "search": search,
//        //        "page": 1
//        //    });
//        //}
//        requestjson();
//    }
//})


////登录
//function requestjson() {
//    var pw = $("#pwd").val();
//    var username = $("#user").val();
//    $.ajax({
//        type: "post",
//        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=Login",
//        data: $("#login").serialize(),  //该方法拿到后台所有的参数
//        // data:{
//        //    "username":username,
//        //    "pwd":pw,  //pw获取上面的密码值
//        // },
//        dataType: "json",
//        cache: false,
//        error: function (result) { },
//        success: function (result) {
//            if (result.errcode == 0) {
//                alert(result.errmsg);   //弹出登录成功                
//                var list = result.data[0];
//                var jsonusercode = list.usercode;
//                var usercode1 = jsonusercode;
//                var usertype = list.usertype;
//                localStorage.setItem("usertype", usertype); //获取设置缓存usertype 判断用户 管理员 
//                //localStorage.getItem("usertype");                
//                if (list.usertype == 2) {
//                    location.href = "admin_info.html";

//                } else if (list.usertype == 3) {
//                    location.href = "admin_user.html";
//                }
//                else {
//                    location.href = "create_gongdan.html";
//                }

//                var jsontoken = list.token;
//                var nfcno1 = jsontoken;
//                var username = list.username;
//                localStorage.setItem("usercode", usercode1);
//                localStorage.setItem("username", username);
//                localStorage.setItem("token", nfcno1);


//            } else {
//                alert(result.errmsg);
//            }

//        }
//    })
//};

