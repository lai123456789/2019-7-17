﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bangding.aspx.cs" Inherits="WXApp.Wx.UpateWord" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>工单问题详情页</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css"/>
    <link rel="stylesheet" href="css/example.css"/>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/weui.js"></script>  
    <%--<script src="bangding.js"></script>--%> 
    <script src="js/bangding.js"></script>
</head>
<body>
    <div class="weui-cell__bd" style="text-align:center;margin-top: 3rem;">
                <img src="../img/MT.png" alt="" />
    </div> 
    <div class="weui-cells__title" >账号</div>
    <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入账号" id="account" />
        </div>
        </div>
    </div>   
        <div class="weui-cells__title" >密码</div>
    <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请输入密码" id="pwd"/>
        </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <a class="weui-btn weui-btn_warn" id="bangding">立即绑定</a>
    </div>

    <!--<div class="weui-cell" id="zhuce">
    <div class="weui-cell__bd" style="width:100%;bottom:0;text-align: center;position: fixed;">
        <span style="text-align: center;">还没有账号？<a href="../register/register.html">立即注册</a></span>
    </div>
    </div>-->

</body>
</html>
