<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="look_car.aspx.cs" Inherits="WXApp.Use_car.look_car" %>

<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css" />
    <%--<link rel="stylesheet" href="style/example.css"/>--%>
    <%--<link href="css/font-awesome.min.css" rel="stylesheet"/>--%>
    <%--<script src="js/jquery-1.11.3.min.js"></script>--%>
    <script src="script/look_car.js"></script>
    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script>
    <!-- <script src="js/example.js"></script> -->
    <style>
        input::-webkit-input-placeholder {
            font-size: 15px;
        }

        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-size: 15px;
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-size: 15px;
        }

        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-size: 15px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="weui-cells weui-cells_form" style="background: #E3934B; margin-top: 0px;">
        <div class="weui-cell">
            <div class="weui-cell__hd" id="bd">
                <p style="color: white"><i class="fa fa-chevron-left"></i></p>
            </div>
            <div class="weui-cell__bd" style="text-align: center; color: white">车辆管理</div>

        </div>
    </div>
    <div class="weui-cells weui-cells_form">
        <%--这块div要通过js对接后台接口 用append的方式到这块div，现在我这里静态数据展示而已--%>

        <div class="weui-cell" style="width: 100%">
            <div style="width: 50%; display: flex">

                <p class="weui-cells__title" style="clear: both"><span style="margin-right: 10px">
                    <img class="weui-vcode-img" src="./images/chepai.png" style="width: 20px; height: 20px;" /></span>车辆车型：<span style="margin-left: 7px;">大众</span></p>

            </div>
            <div style="width: 50%;">
                <p class="weui-cells__title"><span style="margin-right: 4px">
                    <img src="./images/chepai1.png" style="width: 20px; height: 20px;" /></span>车牌号：<span style="">粤S`H3X26</span></p>
            </div>
        </div>
        <div class="weui-cell" style="width: 100%">
            <div style="width: 55%; display: flex">
                <p class="weui-cells__title" style="clear: both"><span style="margin-right: 0.1rem">
                    <img class="weui-vcode-img" src="./images/yuanyin.png" style="width: 20px; height: 20px;" /></span>使用状态：<span class="weui-badge" style="margin-left: 10px;">使用中</span></p>

            </div>
            <div style="width: 45%; margin-left: -0.5rem">
                <p class="weui-cells__title"><span style="margin-right: 4px">
                    <img src="./images/yonghu.png" style="width: 20px; height: 20px;" /></span>使用人：<span style="">赖良坤</span></p>
            </div>
        </div>
        <div class="weui-cell" style="width: 100%">
            <p class="weui-cells__title" style="clear: both"><span style="margin-right: 10px">
                <img class="weui-vcode-img" src="./images/result.png" style="width: 20px; height: 20px;" /></span>使用原因：<span style="margin-left: 10px;">外出谈判</span></p>
        </div>
        <div class="weui-cell" style="width: 100%">
           
            <span class="weui-cells__title"><span> <img class="weui-vcode-img" src="./images/zhuangtai1.png" style="width: 20px; height: 20px;" /></span>更改用车状态：</span>
            <div class="weui-cell__bd">
                <div class="page__bd page__bd_spacing">

                    <div class="weui-cells__title" id="change">
                        点击这里更改                        
                    </div>
                </div>
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/sure.png" style="width: 20px; height: 20px;"/>
            </div>
        </div>
       


    </div>   

    <div class="weui-cells weui-cells_form">
        <%--这块div要通过js对接后台接口 用append的方式到这块div，现在我这里静态数据展示而已--%>

        <div class="weui-cell" style="width: 100%">
            <div style="width: 50%; display: flex">

                <p class="weui-cells__title" style="clear: both"><span style="margin-right: 10px">
                    <img class="weui-vcode-img" src="./images/chepai.png" style="width: 20px; height: 20px;" /></span>车辆车型：<span style="margin-left: 7px;">大众</span></p>

            </div>
            <div style="width: 50%;">
                <p class="weui-cells__title"><span style="margin-right: 4px">
                    <img src="./images/chepai1.png" style="width: 20px; height: 20px;" /></span>车牌号：<span style="">粤S`H3X26</span></p>
            </div>
        </div>
        <div class="weui-cell" style="width: 100%">
            <div style="width: 55%; display: flex">
                <p class="weui-cells__title" style="clear: both"><span style="margin-right: 0.1rem">
                    <img class="weui-vcode-img" src="./images/yuanyin.png" style="width: 20px; height: 20px;" /></span>使用状态：<span class="weui-badge" style="margin-left: 10px;background:green;">空闲中</span></p>

            </div>
            <div style="width: 45%; margin-left: -0.5rem">
                <p class="weui-cells__title"><span style="margin-right: 4px">
                    <img src="./images/yonghu.png" style="width: 20px; height: 20px;" /></span>使用人：<span style="">赖良坤</span></p>
            </div>
        </div>
        <div class="weui-cell" style="width: 100%">
            <p class="weui-cells__title" style="clear: both"><span style="margin-right: 10px">
                <img class="weui-vcode-img" src="./images/result.png" style="width: 20px; height: 20px;" /></span>使用原因：<span style="margin-left: 10px;">外出谈判</span></p>
        </div>
        <div class="weui-cell" style="width: 100%">
           
            <span class="weui-cells__title"><span> <img class="weui-vcode-img" src="./images/zhuangtai1.png" style="width: 20px; height: 20px;" /></span>更改用车状态：</span>
            <div class="weui-cell__bd">
                <div class="page__bd page__bd_spacing">

                    <div class="weui-cells__title" id="change">
                        点击这里更改                        
                    </div>
                </div>
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/sure.png" style="width: 20px; height: 20px;"/>
            </div>
        </div>
       


    </div>

</asp:Content>
