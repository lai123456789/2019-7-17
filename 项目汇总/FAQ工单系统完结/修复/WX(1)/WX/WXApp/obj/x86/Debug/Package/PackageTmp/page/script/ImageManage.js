
$(document).on('click', '#faqbillimg', function () {
    $('#imgfile').click();
});
$(document).on('click','#index > li',function(){ //左边导航栏点击变红字体
    
});
$(document).on('click', '#y', function () {
    $(this).remove();
});
$(document).on('click', '.del', function () {
    $(this).parent().remove();
    $('#faqbillimg').show();
});
$(document).on('click', '.lowin-box-inner img', function () {
    //$(this).toggleClass('min');
    //$(this).toggleClass('max');
    var src = $(this).attr("src");
    $("#imgid").attr("src", src);
    $("#divid").css("display", "block");
});

$(function () {
    //var username = localStorage.getItem("username");
    $("#name").text("用户账号：  " + username);
    
                    
                        
               
    var divvv = '';
    divvv += '<li class="level-1-item">';   //获取id值
    divvv += '<a class="toggle-item" href="create_gongdan.html?Wid=' + usercode + '&token=' + token + '&username=' + username + '">';
    divvv += ' <i class="iconfont"></i>';
    divvv += '<span>创建工单</span>';
    divvv += '</a>';
    divvv += '</li>';
    divvv += '<li class="level-1-item active">';
    divvv += '<a class="toggle-item" href="gongdan_list.html?Wid=' + usercode + '&token=' + token + '&username=' + username + '">';
    divvv += '<i class="iconfont"></i>';
    divvv += '<span>工单分页列表</span>';
    divvv += ' </a>';
    divvv += '</li>';
    $("#index").empty();
    $("#index").append(divvv);
})

$(document).on('click', '#btn_sure', function () {
    //var WORDTYPECODE = $(".a option:selected").val();
    //var APPTITTLE = $(".a_a option:selected").text();
    //if (WORDTYPECODE == "选择部门") {
    //    alert("请先选择部门");
    //    return;
    //};
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
    //var usercode = $(".d").val();
    var CONTENT = $(".c").val();
    //var token = $(".k").val();
    //var base64 = $('#ago').attr('src');
    
    var base64_1 = '';
    var base64_2 = '';
    var base64_3 = '';
    var obj = $('#jz .img');
    for (var i = 0; i < obj.length; i++) {
        switch (i) {
            case 0:
                base64_1 = $(obj[i]).find('img').attr('src');
                break;
            case 1:
                base64_2 = $(obj[i]).find('img').attr('src');
                break;
            case 2:
                base64_3 = $(obj[i]).find('img').attr('src');
                break;
        }
    }
    GetGoodsType(WORDTYPECODE, APPTITTLE, usercode, CONTENT,token, base64_1, base64_2, base64_3)
});

$(document).on('click', '.aa', function () {

    $getAttribute("usercode")

});



//--添加图片
$(document).on('tap', '#addimg', function (e) {
    stopDefault(e);
    var length = $('.faqbillimg').length;
    if (length >= 3) {
        $(this).hide();
    } else {
        $('#imgfile').click();
    }
})
//--图片放大
$(document).on("tap", "#jz .img", function (e) {
    alert("img");
    //stopDefault(e);
    $(this).addClass('contor');
    var src = $(this).children('img').attr('src');
    $('#bigimg').remove();
    $('body').append('<div id="bigimg" class="img"><div id="delimg" class="iconfont">&#xe61c;</div><img src="/BI/微信端/BasicUI/UI/Images/biaoge1.png" alt=""></div>')
    $('#bigimg>img').attr('src', src);
})
//--图片删除
$(document).on("tap", "#delimg", function (e) {
    stopDefault(e);
    $('#bigimg').remove();
    $("#personaldata .img.contor").remove();
    var length = $('.faqbillimg').length;
    if (length < 3) {
        $('#addimg').show();
    }
})

//--取消图片放大
$(document).on("tap", "#bigimg", function (e) {
    stopDefault(e);
    $("#personaldata .img").removeClass('contor');
    $('#bigimg').remove();
})

//测试拿开始
var usercode = '';
var token = '';
var username = '';
var usertype = '';
//获取URL地址中的参数值
(function () { //获取url的每一个参数名
    //返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var urlParameters = location.search;
    //声明并初始化接收请求参数的对象
    var requestParameters = new Object();
    //如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
    if (urlParameters.indexOf('?') != -1) {
        //获取请求参数的字符串
        var parameters = decodeURI(urlParameters.substr(1));
        //将请求的参数以&分割中字符串数组
        parameterArray = parameters.split('&');
        //循环遍历，将请求的参数封装到请求参数的对象之中
        for (var i = 0; i < parameterArray.length; i++) {
            requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1]);
        }
        usercode = requestParameters.Wid;//这里拿到地址栏的usercode 
        token = requestParameters.token;
        username = requestParameters.username;
        usertype = requestParameters.usertype;
    }
    else {
        console.info('There is no request parameters');
    }
    return requestParameters;
})();
//测试拿结束


//$(document).ready(function () {   //拿到usercode的缓存
//    var usercode1 = localStorage.getItem("usercode");
//    console.log("usercode1 " + usercode1);
//    $("#result1").append('<p>' + "usercode：" + "<input type='text' name='usercode' class='d' value='" + usercode1 + "'>" + '</p>');
//});
//$(document).ready(function () {   //拿到usertype的缓存
//    var usertype = localStorage.getItem("usertype");
//    //console.log("usertype " + usertype);
//    //$("#result3").append('<p>' + "usertype：" + "<input type='text' name='usertype' class='f' value='" + usertype + "'>" + '</p>');
//});
//$(document).ready(function () {   //拿到token的缓存   
//    var token = localStorage.getItem("token");
//    console.log("token " + token);
//    $("#result2").append('<p>' + "token：" + "<input type='text'  name='token' class='k' value='" + token + "'>" + '</p>');
//});

/*
创建工单
*/
function GetGoodsType(WORDTYPECODE, APPTITTLE, usercode, CONTENT,token, base64_1, base64_2, base64_3) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=Update",
        data: {
            "WORDTYPECODE": WORDTYPECODE,
            "usercode": usercode,
            "APPTITTLE": APPTITTLE,
            "CONTENT": CONTENT,
            "token":token,
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
                alert(data.errmsg);
                window.location.href = "gongdan_list.html?Wid=" + usercode + '&token=' + token + '&username=' + username + '&usertype=' + usertype;//
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


/********************************** 上传图片 ****************************************/

function getUrl(fil, id) {
    //alert("图片类型：" + fil[0].type + "图片名称" + fil[0].name);
    var file = $("#" + id);
    if (fil[0].type.indexOf("image") < 0) {
        if (fil[0].name.indexOf(".") < 0) {
            var picname = fil[0].name.split('%');
            if (picname.indexOf("image") < 0) {
                alert('不允许上传非图片格式的图片');

                file.after(file.clone().val(""));
                file.remove();
                return;
            }
        }
        else {
            alert('不允许上传非图片格式的图片');

            file.after(file.clone().val(""));
            file.remove();
            return;
        }
    }
    var Cnv = document.getElementById('myCanvas');
    var Cntx = Cnv.getContext('2d');//获取2d编辑容器
    var imgss = new Image();//创建一个图片
    var agoimg = document.getElementById("ago");
    for (var intI = 0; intI < fil.length; intI++) {//图片回显
        var tmpFile = fil[intI];
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile);
        reader.onload = function (e) {
            url = e.target.result;
            imgss.src = url;
            agoimg.src = url;

            var ImgHorW = 500;   //图片清晰度  影响压缩后的清晰度
            agoimg.onload = function () {
                //等比缩放
                var m = imgss.width / imgss.height;
                Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                Cnv.width = ImgHorW * m;
                //img放入画布中
                //设置起始坐标，结束坐标
                Cntx.drawImage(agoimg, 0, 0, ImgHorW * m, ImgHorW);
                //获取canvas压缩后的图片数据
                var Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
                var img_temp = new Image();
                img_temp.src = Pic;
                var imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                while (imgpic.length > 1024 * 1024 * 0.4) {
                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
                    ImgHorW -= 50;
                    Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                    Cnv.width = ImgHorW * m;
                    img_temp = new Image();
                    img_temp.src = Pic;
                    Cntx.drawImage(img_temp, 0, 0, ImgHorW * m, ImgHorW);
                    //获取canvas压缩后的图片数据
                    Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
                    imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                }


                $('#addimg').before('<div class="img" style="float:left;margin-left:20px;"><img width="60px" height="50px" class="faqbillimg" alt="" src="' + Pic + '"><p class="del" style="margin-top:-3px;font-size:10px;cursor:pointer;text-align:center;color:#808080;"><i>删除</i></p></div>')
                var length = $('.faqbillimg').length;
                if (length > 2) {                   
                    $('#faqbillimg').hide();
                }                               
            }
        }
    }
}

//回车键 enter   按下回车键登录成功！
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        //if ($('#search_content').is(':focus')) {
        //    var search = $('#search_content').val();
        //    全局搜索 = search;
        //    全局页码 = 1;
        //    GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
        //        "search": search,
        //        "page": 1
        //    });
        //}
        requestjson();
    }
})


$(document).ready(function () {
    $("#pwd").blur(function () {
        //$("input").css("background-color", "#D6D6FF");
        var pw = $("#pwd").val();
        var spaceReg = /\s/g;
        if(spaceReg.test(pw)){
            alert("密码不能含有空格符！");
            $("#pwd").val("");
            return;
        }     
        
    });
});
//登录
function requestjson() {    
    var pw = $("#pwd").val();    
    var username = $("#user").val();
    $.ajax({
        type: "post",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=Login",
        data: $("#login").serialize(),  //该方法拿到后台所有的参数
       // data:{
       //    "username":username,
       //    "pwd":pw,  //pw获取上面的密码值
       // },
        dataType: "json",
        cache: false,        
        error: function (result) { },
        success: function (result) {
            if (result.errcode == 0) {
                alert(result.errmsg);   //弹出登录成功                
                var list = result.data[0];                
                var jsonusercode = list.usercode;   
                var usercode1 = jsonusercode;
                var usertype = list.usertype;
                localStorage.setItem("usertype", usertype); //获取设置缓存usertype 判断用户 管理员 
                //localStorage.getItem("usertype");                
                if (list.usertype == 2) {  
                    location.href = "admin_info.html?Wid=" + list.usercode + '&token=' + list.token + '&username=' + list.username + '&usertype=' + list.usertype;
                    
                } else if (list.usertype == 3) {
                    location.href = "admin_user.html";
                }
                else {
                    location.href = "create_gongdan.html?Wid=" + list.usercode + '&token=' + list.token + '&username=' + list.username + '&usertype=' + list.usertype;
                }
                             
            var jsontoken = list.token;
            var nfcno1 = jsontoken;
            var username = list.username;
            localStorage.setItem("usercode", usercode1);
            localStorage.setItem("username", username);
            localStorage.setItem("token", nfcno1);
            

            } else {
                alert(result.errmsg);
            }
                   
        }
    })
};

//注销模块    
$(document).on('click', '#logout', function () {
    layout();
});
function layout() {
    // var usercode = localStorage.getItem("usercode");
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=LogoutUser",
        // async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("注销成功！");
                window.location.href = "index.html";
                
            }
            else {
                alert(data.errmsg);
            }
        }
    });
};


// 轮询  发送请求给服务端 settimeout
function getResult() {
    //var usercode = localStorage.getItem("usercode");
    $.ajax({
        type: 'post',
        url: 'http://o24034e466.qicp.vip/UserManage.aspx?action=Time',
        dataType: 'json',
        // timeout: 5000,
        data: {
            // "state":state,
            "usercode": usercode
        },
        async: false,
        success: function (data) {
            console.log(data.data[0].state);  //打印出0  
            if (data.data[0].state == 0) { //如果后台传回来的参数state==0表示在线，为1表示离线   
                timer = setTimeout(getResult, 5000);
            }
            if (data.data[0].state == 1) {               
                clearTimeout(timer); //清除定时器   跳转页面就没生效
                alert("请重新登录，已超时");
                window.location.href = "index.html";
               
            }
        }
    })
};
getResult();


//// 轮询  发送请求给服务端
//a = setInterval(getResult, 3000); //间隔5秒去触发ajax 发送一次请求 重复
//function getResult(){
//    var usercode = localStorage.getItem("usercode");   
//         // var i = 0;
//        $.ajax({
//           type:'post',
//            url:'http://192.168.2.195:1680/UserManage.aspx?action=Time',
//            dataType:'json',
//            // timeout: 5000,
//            data:{
//                // "state":state,
//                "usercode":usercode
//            },
//            async: true,
//            success:function(data){
//                console.log(data.data[0].state);  //打印出0
////                 i++; //记录轮询的次数  
//                if (data.data[0].state == 0) { //如果后台传回来的参数state==0表示在线，为1表示离线   
                   
//                }
//                if (data.data[0].state == 1) {
//                    // alert("请重新登录，已超时");
//                   clearInterval(a); //清除定时器   没生效                 
//                    window.location.href = "index.html";  
//                 }              
//                }
//            })
//        };
