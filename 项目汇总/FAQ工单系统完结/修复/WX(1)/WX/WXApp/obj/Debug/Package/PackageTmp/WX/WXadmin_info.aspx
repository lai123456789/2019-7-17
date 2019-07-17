<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WXadmin_info.aspx.cs" Inherits="WXApp.WX.WXadmin_info" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>管理员页面</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />    
    <link rel="stylesheet" href="css/example.css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>    
    <script src="js/weui.js"></script>  
    <script src="js/WXadmin_info.js"></script>
</head>
<body>
    
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <p class="weui-cells__title " style="font-size: 16px;"><a href="javascript:history.back();"><i class="fa fa-chevron-left"></i></a></p>
            </div>
            <div class="weui-cell__bd" style="text-align:center;font-size: 19px;line-height: 60px;">处理派工页</div>
        </div>
    </div>
    
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <p class="weui-cells__title " style="font-size: 16px;"><%--<i class="fa fa-chevron-left"></i>--%></p>
            </div>
            <div class="weui-cell__bd weui-cells__title" style="text-align:center;font-size: 16px;">工单汇总</div>
        </div>
    </div>
    

    <!-- 这里显示工单创建的内容问题结束 -->
   
    <div id="tb_account1">
        
    </div>
    <!--<div id="yy_pagegps01" class="yy_pagegps" data-page="1" data-pagenums="1"></div>-->
</body>
</html>
