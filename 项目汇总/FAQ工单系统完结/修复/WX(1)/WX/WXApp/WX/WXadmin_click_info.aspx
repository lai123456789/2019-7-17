<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WXadmin_click_info.aspx.cs" Inherits="WXApp.WX.WXadmin_click_info" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <title>工单问题回复详情页</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />
    <script src="js/WXadmin_click_info.js"></script>
    <link href="css/scale.css" rel="stylesheet" />
    <script src="js/scale.js"></script>  
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/weui.js"></script>  
    <style>
        #gongdan_picture img{
            width:50px;
            height:50px;
        }
        .list img{
            width:50px;
            height:50px;
        }
        .imgzoom_img img{  /*调整图片居中对齐*/
            position: absolute;
            top:50%;
            left:50%;
            width:100%;
            transform:translate(-50%,-50%);
            text-align: center;
        }
    </style>
</head>
<body>
    
    <!--<div class="list"><img src="images/mtt.jpg" /><img src="images/2.jpg" /></div>-->
    <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> <%--获取usercode--%>
    <input type="hidden" name="name" value="<%=usertype%>" id="usertype"/> <%--获取usertype--%>
    <input type="hidden" name="name" value="<%=username%>" id="username"/> <%--获取usertype--%>
    
    <section class="imgzoom_pack">
        <div class="imgzoom_x">X</div>
        <div class="imgzoom_img"><img src="" /></div>
    </section>
    <script src="scale.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function (event) {
            ImagesZoom.init({
                "elem": ".list"
            });
        }, false);
    </script>


    <div class="quanbu">
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd" id="gongdanhao">
                    <p style="font-size: 19px;"><a href="javascript:history.back();" class="weui-cells__title"><i class="fa fa-chevron-left"></i></a></p>
                </div>  <!--这里拿到工单号-->
                <!--<div class="weui-cell__ft" style="color: blue"><a href="../comment/comment.html">确认</a></div>-->
                <div id="queren"> </div>
            </div>
        </div>

        <!-- 工单描述 -->
        <div id="WordID">
            <!--这里通过js获取到工单问题的详情-->
        </div>

        <div id="admin_reply">
            <!-- 工单回复  技术员回复的内容显示在这里 -->
        </div>


        <div class="weui-cells" style="position:fixed;bottom:0;width:100%;">
            <!-- 这里获取技术员继续回复用户内容 -->
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入回复内容" id="admin_reply_input" style="font-size: 14px;">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default" onclick="admin_huifu()">发送</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
