var 全局搜索 = '';
var 全局页码 = 1;
var 异常代码 = '';
$(function () {
    异常代码 = getQueryString("code");
    if (异常代码 != null && 异常代码 != '') {
        GetList("IIS", "BusinessManage/AssemblyManage.aspx?action=geterrorlist", {
            "errorcode": 异常代码
        });
        
        
    }
})

/*
初始化方法
*/
function OnIntFunc(){
    GetReply("IIS", "BusinessManage/AssemblyManage.aspx?action=getreplycontent", {
        "errorcode": 异常代码
    });
}

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});




/*
查询
*/
$(document).on('click', '#query_title > .query_content > .query_btn', function () {
    var search = $('#search_content').val();
    var statusname = $('#nestable-menu').find('.btn.btn-success').text();
    var status = 2;
    全局搜索 = search;
    switch (statusname) {
        case "进行中":
            status = 0;
            break;
        case "已完成":
            status = 1;
            break;
        default:
            status = 2;
            break;
    }
    GetList("IIS", "TaskManage.aspx?action=getmytasklist", {
        "search": 全局搜索,
        "usercode": "",
        "status": status
    });
});


/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});

$(document).on('click', '#nestable-menu > .btn', function () {
    $(this).addClass('btn-success').removeClass('btn-default').siblings().removeClass('btn-success').addClass('btn-default');
    var statusname = $(this).text();
    switch (statusname) {
        case "进行中":
            status = 0;
            break;
        case "已完成":
            status = 1;
            break;
        default:
            status = 2;
            break;
    }
    GetList("IIS", "TaskManage.aspx?action=getmytasklist", {
        "search": 全局搜索,
        "usercode": "",
        "status": status
    });
});


$(document).on('click', '.dispatching', function () {
    var taskcode = $(this).attr('data-taskcode');
    $('#WorkDispatching').modal('show');
    $('#WorkDispatching_sure').attr('data-taskcode', taskcode);
});

$(document).on('click', '#WorkDispatching_sure', function () {
    var account = $('#Work_account').val();
    var taskcode = $(this).attr('data-taskcode');
    TaskDispatching("IIS", "TaskManage.aspx?action=taskdispatching", {
        "taskcode": taskcode,
        "usercode": "",
        "account": account
    });
});




/* 上传图片 */
$(document).on('click', '#replyoperation>.left', function () {
    $('#inputimg').click();
});


$(document).on("change", "#inputimg", function () {

    showLoading();
    var imgfile = this.files[0];
    if (imgfile == null || imgfile == undefined) {
        hideLoading();
        return;
    }
    //取得新添加的img对象
    var NewImgElement = $("#divPartImgs");

    var maxSize = 200 * 1024;   //80KB

    var filereader = new FileReader();
    //定义文件加载后的处理
    filereader.onload = function () {
        var result = this.result;   //result为data url的形式
        var img = new Image();
        //定义图片加载后的处理（先定义后加载）
        img.onload = function () {
            if (result.length < maxSize) {
                //$(NewImgElement).attr("src", img.src);
                var msgcontent = img.src;
                AddReplyContent("IIS", "BusinessManage/AssemblyManage.aspx?action=addreplycontent", {
                    "errorcode": 异常代码,
                    "usercode": "",
                    "msgtype": "图片",
                    "msgcontent": msgcontent.replace(/\+/g, "%2B")
                });
                //UploadImg(img.src, $(NewImgElement));
            } else {
                var data = compress(img);    //图片首先进行压缩
                //$(NewImgElement).attr("src", data);
                var msgcontent = data;
                AddReplyContent("IIS", "BusinessManage/AssemblyManage.aspx?action=addreplycontent", {
                    "errorcode": 异常代码,
                    "usercode": "",
                    "msgtype": "图片",
                    "msgcontent": msgcontent.replace(/\+/g, "%2B")
                });
                //UploadImg(data, $(NewImgElement));
            }
            //$("#divPartImgs .adding").removeClass("adding");//去掉“处理中”状态
            hideLoading();
        }
        //加载图片
        img.src = result;
    }
    //加载文件
    filereader.readAsDataURL(imgfile);
});

//压缩图片
function compress(img) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    //最大宽度
    var maxWidth = 420;
    //高宽比
    var ratio = img.height / img.width;
    if (img.width > maxWidth) {
        canvas.width = maxWidth
        canvas.height = maxWidth * ratio;
    }
    else {
        canvas.width = img.width;
        canvas.height = img.height;
    }

    //利用canvas进行绘图
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //将原来图片的质量压缩到原先的0.6倍。
    var data = canvas.toDataURL('image/png', 0.6); //data url的形式
    return data;
}

$(document).on('click', '#replydetails > .right > .content > .img img,#replydetails > .left > .content > .img img', function () {
    var img_src = $(this).attr('src');
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#WorkDispatching").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#WorkDispatching').modal('show');
    $('#modalDialog > img').attr('src', img_src);
});


$(document).on('click', '#replyoperation > .right > .sure_ok', function () {
    var msgcontent = $('#replyoperation > .mid > textarea').val();
    AddReplyContent("IIS", "BusinessManage/AssemblyManage.aspx?action=addreplycontent", {
        "errorcode": 异常代码,
        "usercode": "",
        "msgtype": "文字",
        "msgcontent": msgcontent
    });
});


/************************************* Ajax *******************************************/

/*
获取异常信息
*/
function GetList(urltype, pageurl, data) {
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
                    if (obj.异常负责人用户代码 == null || obj.异常负责人用户代码 == '') {
                        $('#datalist1 > .panel-heading > .panel-title').empty();
                        $('#datalist1 > .panel-heading > .panel-title').append('异常信息 <span>【未处理】</span>');
                    }
                    else
                    {
                        switch (obj.问题处理类型)
                        {
                            case "0":
                                $('#datalist1 > .panel-heading > .panel-title').empty();
                                $('#datalist1 > .panel-heading > .panel-title').append('异常信息 <span style="color: #c89309">【处理中】</span>');
                                break;
                            case "1":
                                $('#datalist1 > .panel-heading > .panel-title').empty();
                                $('#datalist1 > .panel-heading > .panel-title').append('异常信息 <span style="color: #1b9f4e;">【已完结】</span>');
                                $('#replyoperation').remove();
                                break;
                            case "-1":
                                $('#datalist1 > .panel-heading > .panel-title').empty();
                                $('#datalist1 > .panel-heading > .panel-title').append('异常信息 <span style="color: #0056d0" title="' + obj.关闭原因 + '">【已关闭】</span>');
                                $('#replyoperation').remove();
                                break;
                        }
                    }
                    /*
                    pj号: "190001002"
                    关闭原因: ""
                    创建时间: "2019/3/8 9:27:21"
                    创建订单用户代码: "mt00000005"
                    创建订单用户名: "陈良忠"
                    完成时间: "2019/3/8 19:11:18"
                    工序代码: "F002"
                    工序名: "接线"
                    工序负责人: "陈良忠,向光安,林展浩,易玉武,唐志东"
                    异常代码: "eocode000000041"
                    异常分类: "品质异常"
                    异常备注: "漏刻字"
                    异常类型代码: "errtype00000010"
                    异常负责人用户代码: "mt00000001"
                    异常负责人用户名: "林展浩"
                    操作员用户代码: "mt00000005"
                    操作员用户名: "陈良忠"
                    派工时间: ""
                    问题处理类型: "1"
                    项目名称: "测试"
                    */

                    content += '<tr>';
                    content += '    <td>PJ</td>';
                    content += '    <td>' + obj.pj号 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>名称</td>';
                    content += '    <td>' + obj.项目名称 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常提交时间</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常提交人</td>';
                    content += '    <td>' + obj.创建订单用户名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常分类</td>';
                    content += '    <td>' + obj.异常分类 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常原因</td>';
                    content += '    <td>' + obj.异常备注 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常工序</td>';
                    content += '    <td>' + obj.工序名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>工序负责人</td>';
                    content += '    <td>' + obj.工序负责人 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常负责人</td>';
                    content += '    <td>' + obj.异常负责人用户名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常处理人</td>';
                    content += '    <td>' + obj.操作员用户名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常结束时间</td>';
                    content += '    <td>' + obj.完成时间 + '</td>';
                    content += '</tr>';
                });
                $('#form_tb1').empty();
                $('#form_tb1').append(content);
                
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取回复列表
*/
function GetReply(urltype, pageurl, data) {
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
                var lastdate;
                $.each(data.data, function (idx, obj) {
                    /*
                    创建时间: "2019/3/11 14:41:18"
                    消息内容: "你好"
                    消息类型: "文字"
                    用户代码: "mt00000001"
                    用户代码1: "林展浩"
                    部门: "总经办"
                    */

                    if (lastdate != null && (obj.创建时间 != null || obj.创建时间 != '')) {
                        if (TimeSeconds(lastdate, obj.创建时间) > 300) {
                            content += '<div class="centre">';
                            content += '    <div class="showdate">' + GetDateFormat(obj.创建时间, 'yyyy-MM-dd HH:mm') + '</div>';
                            content += '</div>';
                            
                        }
                    }

                    if (lastdate == null)
                    {
                        content += '<div class="centre">';
                        content += '    <div class="showdate">' + GetDateFormat(obj.创建时间, 'yyyy-MM-dd HH:mm') + '</div>';
                        content += '</div>';
                    }
                    
                    

                    
                    lastdate = obj.创建时间;
                    var usercode = $('#userinfo').attr('data-usercode');
                    if (usercode == obj.用户代码)
                    {
                        content += '<div class="right">';
                        content += '    <div class="content">';
                        content += '        <div class="userinfo">';
                        content += '            <div class="username">' + obj.用户名称 + '</div>';
                        content += '            <div class="account">' + obj.工号 + '</div>';
                        content += '        </div>';
                        switch (obj.消息类型) {
                            case "文字":
                                content += '        <div class="msg">' + obj.消息内容.replace(/\n/g, "<br />") + '</div>';
                                break;
                            case "图片":
                                content += '        <div class="img"><img src="' + obj.消息内容 + '" /></div>';
                                break;
                        }
                        
                        content += '    </div>';
                        content += '</div>';
                    }
                    else
                    {
                        content += '<div class="left">';
                        content += '    <div class="content">';
                        content += '        <div class="userinfo">';
                        content += '            <div class="username">' + obj.用户名称 + '</div>';
                        content += '            <div class="account">' + obj.工号 + '</div>';
                        content += '        </div>';
                        switch (obj.消息类型) {
                            case "文字":
                                content += '        <div class="msg">' + obj.消息内容.replace(/\n/g, "<br />") + '</div>';
                                break;
                            case "图片":
                                content += '        <div class="img"><img src="' + obj.消息内容 + '" /></div>';
                                break;
                        }
                        content += '    </div>';
                        content += '</div>';
                    }
                });
                $('#replydetails').empty();
                $('#replydetails').append(content);
                setTimeout(function () {
                    $('#replydetails').scrollTop($("#replydetails")[0].scrollHeight + 1000)
                }, 300);
                
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
发送聊天
*/
function AddReplyContent(urltype, pageurl, data) {
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
                GetReply("IIS", "BusinessManage/AssemblyManage.aspx?action=getreplycontent", {
                    "errorcode": 异常代码
                });
                $('#replyoperation > .mid > textarea').val('');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/************************************* Ajax End *******************************************/