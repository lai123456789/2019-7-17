<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WXadmin_href.aspx.cs" Inherits="WXApp.WX.WXadmin_href" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>工单服务</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />    
    <link rel="stylesheet" href="css/example.css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>    
    <script src="js/weui.js"></script>    
</head>
<body>
    <a href="WXadmin_info.aspx">        
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd">                    
                </div>
                <div class="weui-cell__bd" style="text-align:center;font-size: 19px;line-height: 80px;">处理派工</div>
            </div>
        </div>
    </a> 

    <a href="WXadmin_user.aspx">        
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    
                </div>
                <div class="weui-cell__bd" style="text-align:center;font-size: 19px;line-height: 80px;">查看所有用户</div>
            </div>
        </div>
    </a> 

    <a href="WXadmin_paigong.aspx">
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <!--<p class="weui-cells__title " style="font-size: 16px;"><i class="fa fa-chevron-left"></i></p>-->
                </div>
                <div class="weui-cell__bd" style="text-align:center;font-size: 19px;line-height: 80px;">分派工单</div>
            </div>
        </div>
    </a>




</body>
</html>
