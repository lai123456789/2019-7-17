<%@ Page Language="C#"  MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="car_application_submit.aspx.cs" Inherits="WXApp.Use_car.car_application_submit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script src="js/zepto.min.js"></script>
<script src="js/weui.min.js"></script>
<script src="script/car_application_submit.js"></script>
    <style>
        input::-webkit-input-placeholder{            
            font-size: 15px;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            font-size: 15px;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            font-size: 15px;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            
            font-size: 15px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">     
    <div class="weui-msg" style="margin-top:1rem">
    <div class="weui-msg__icon-area" style=""><i class="weui-icon-waiting weui-icon_msg"></i></div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">提交申请成功</h2>
        <p class="weui-msg__desc">审核人已收到你提交的用车申请，请等待回复，申请结果将通过微信通知</p>
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area" id="href">  
            <!-- <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回上一页</a> -->
            <a class="weui-btn weui-btn_primary" style="background: #2196F3;color:white">用车申请</a> 
            
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
</asp:Content>
