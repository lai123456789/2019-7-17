<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="question_click_info.aspx.cs" Inherits="WXApp.WX.WebForm3" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover">
    <title>工单问题详情页</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />
    <!--<link rel="stylesheet" href="../css/example.css" />-->
    
    <link href="css/scale.css" rel="stylesheet" />
    
    <script src="js/scale.js"></script>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/weui.js"></script>  
    
    <script src="js/question_click_info.js"></script>
    <style>
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

    <div class="quan">
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd" id="bd">
                    <p style="font-size: 19px;"><a href="../gongdan_server_info/gongdan_server_info.html" class="weui-cells__title"><i class="fa fa-chevron-left"></i></a></p>
                </div>
                <div class="weui-cell__bd" style="text-align:center;font-size: 16px;line-height: 50px;">
                    工单号：<span id="gd"></span>
                </div>
                <!--<div class="weui-cell__ft" style="color: blue"><a href="../comment/comment.html">确认</a></div>-->
                <div id="queren"> </div> <!--确认按钮-->
                <div id="chakan"> </div> <!--查看按钮-->
            </div>
        </div>

        <!-- 工单描述 -->
        <div id="WordID">
            <!--这里通过js获取到工单问题的详情-->
        </div>




        <div id="dd">
            <!-- 工单回复  技术员回复的答复显示在这里 -->
        </div>


        <div class="weui-cells" style="position:fixed;bottom:0;width:100%;" id="huifu_kuang">
            <!-- 这里获取用户继续回复技术员内容 -->
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入回复内容" id="user_reply_input" style="font-size: 14px;">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default" onclick="replySubmit()">提交</a>
                </div>
            </div>
        </div>

        <!--<div class="weui-cell">
            <div class="weui-cell__bd" style="width:100%;bottom:0;text-align: center;">
                <span style="text-align: center;" class="weui-cells__title" id="del">删除工单</span>
            </div>
        </div>-->
        <div id="del1"></div>

    </div>    
    



    <!-- <div>
        
            <div class="weui-tab">
    <div class="weui-tab__panel">

    </div>
    <div class="weui-tabbar">
        <div class="weui-cell">
            <div class="weui-cell__hd" > 
                <input type="text">
            </div>                  
            <div class="weui-cell__ft"> 
                 66
            </div>            
      </div>
    </div>
</div>
        
    </div> -->

    
</body>
</html>
