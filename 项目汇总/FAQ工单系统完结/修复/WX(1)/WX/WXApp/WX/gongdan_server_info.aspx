<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="gongdan_server_info.aspx.cs" Inherits="WXApp.WX.gongdan_server_info" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>工单服务</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />

    
    <link href="css/yy_pagegps.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>    
    <script src="js/WordOrder.js"></script>
    <script src="js/yy_pagegps.js"></script>
    <script src="js/weui.js"></script>
</head>
<body>
    <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> <%--获取usercode--%>
    <input type="hidden" name="name" value="<%=usertype%>" id="usertype"/> <%--获取usertype--%>
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <p class="weui-cells__title " style="font-size: 16px;"><i class="fa fa-chevron-left"></i></p>
            </div>
            <div class="weui-cell__bd" style="text-align:center;font-size: 19px;line-height: 60px;">工单服务</div>
        </div>
    </div>
    <div class="weui-cells">
        <div class="weui-cell__hd" style="text-align: center;line-height: 45px;">
            <a href="create_gongdan/create_gongdan.aspx"><i class="fa fa-plus-square"></i>&nbsp;&nbsp;创建工单</a>
        </div>
    </div>


    <!-- 这里显示工单创建的内容问题结束 -->
   
    <div id="tb_account" style="color:red;background:gray;">

    </div>
    <div id="yy_pagegps01" class="yy_pagegps" data-page="1" data-pagenums="1" style="text-align:center;width:100%"></div>
</body>
</html>
