<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="create_gongdan__success.aspx.cs" Inherits="WXApp.WX.create_gongdan__success" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>创建工单成功—通知</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="../css/weui.css"/>
    <link rel="stylesheet" href="../css/example.css"/>
    <script src="../js/jquery-1.11.3.min.js"></script>
    <!--<script src="js/create_gongdan.js"></script>-->
    <script src="../js/weui.js"></script>
</head>
<body>


<div class="weui-msg">
    <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">创建成功</h2>
        <p class="weui-msg__desc">管理员已收到你的工单创建提交申请，请等待问题回复，工单进度将通过微信通知</p>
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area">  
            <!-- <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回上一页</a> -->
            <a href="../gongdan_server_info.aspx" class="weui-btn weui-btn_primary">返回工单服务</a> 
           
        </p>
    </div>
    <div class="weui-msg__extra-area">
        <div class="weui-footer">
            <p class="weui-footer__links">
                <a href="javascript:void(0);" class="weui-footer__link">底部链接文本</a>
            </p>
            <p class="weui-footer__text">Copyright © 2008-2016 weui.io</p>
        </div>
    </div>
</div>


</body>
</html>
