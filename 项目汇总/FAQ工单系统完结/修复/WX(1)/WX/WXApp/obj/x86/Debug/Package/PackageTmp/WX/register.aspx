<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="WXApp.WX.register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover">
    <title>工单问题详情页</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css"/>
    <link rel="stylesheet" href="css/example.css"/>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/weui.js"></script>  
    <script src="js/register.js"></script>
    <style>
        .username{
            margin-top:500px;            
            z-index:9999 !important;
        }
    </style>
    
</head>
<body>
   
    <div class="weui-cell" style="margin-top: 2rem;">
        <div class="weui-cell__hd">
            <p style="font-size: 16px;"><a href="javascript:history.back();" class="weui-cells__title "><i class="fa fa-chevron-left"></i></a></p>
        </div>
        <div class="weui-cell__bd" style="text-align:center;font-size: 19px;line-height: 60px;"><img src="img/MT.png" alt=""></div>
    </div>
     
    
        <div class="weui-cell" style="margin-top: 2rem;">
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="账号" id="username">
        </div>
        </div>         
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="密码" id="pwd">
        </div>
        </div>    
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="用户名" id="name">
        </div>
        </div> 
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="手机号" id="phone">
        </div>
        </div>   
  
    <div class="weui-btn-area">
            <a class="weui-btn weui-btn_warn" id="register">点击注册</a>
    </div>

    <div class="weui-cell" id="denglu">
    <div class="weui-cell__bd" style="width:100%;bottom:0;text-align: center;position: fixed;">
        <span style="text-align: center;">已有账号？<a href="http://o24034e466.qicp.vip/WorderList.aspx">点击登录</a></span>
    </div>
    </div>

</body>
</html>
