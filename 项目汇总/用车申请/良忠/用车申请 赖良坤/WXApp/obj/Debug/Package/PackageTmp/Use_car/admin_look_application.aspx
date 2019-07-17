<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="admin_look_application.aspx.cs" Inherits="WXApp.Use_car.admin_look_application" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css" />
    <link rel="stylesheet" href="style/example.css" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script>

    <script src="script/admin_look_application.js"></script>
    <style>
        input::-webkit-input-placeholder {
            font-size: 17px;
        }

        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-size: 17px;
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-size: 17px;
        }

        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-size: 17px;
        }

        span {
            font-size: 16px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <%--<i class="iconfont" data-url="admin_look_application.aspx">&#xe64e;</i>--%>
    <a href="javascript:history.back();"><i class="fa fa-chevron-left" style="color: white"></i></a>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="weui-cells weui-cells_form" style="margin-top: 1.5rem">
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">申请单号：<span style="margin-left: 10px;" id="application_danhao"></span></label>

        </div>
        <%--<div class="weui-cell">
            <img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">&nbsp;审&nbsp;核&nbsp;人：<span style="margin-left: 10px;">刘经理</span></label>

        </div>
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/zhuangtai.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">
                审核状态：
               
                <span class="weui-badge" style="margin-left: 10px;">拒绝</span>
            </label>

        </div>
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/yuanyin.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">审核原因：<span style="margin-left: 10px;">领导专用</span></label>

        </div>--%>
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">&nbsp;申&nbsp;请&nbsp;人：<span style="margin-left: 10px;" id="application_user"></span></label>

        </div>
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">所在部门：<span style="margin-left: 10px;" id="department"></span></label>

        </div>
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">申请用途：<span style="margin-left: 10px;" id="reason"></span></label>

        </div>
        <%--<div class="weui-cell">
            <img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">发车地址：<span style="margin-left: 10px;">广东东莞每通总部</span></label>

        </div>--%>
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">申请用车时间：<span style="margin-left: 10px;" id="use_car_time"></span></label>

        </div>

        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">预计还车时间：<span style="margin-left: 10px;" id="return_car_time"></span></label>

        </div>
        <div class="weui-cell" id="shenhe">
            <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">审核结果：<span style="margin-left: 10px;" id="jieguo"></span></label>
        </div>
        <div id="f1">
            <div class="weui-cell" id="bohui">
                <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                <label class="weui-cells__title">驳回原因：<span style="margin-left: 10px;" id="bohui_reason"></span></label>

            </div>
            <div id="f2">
                <div class="weui-cell">
                    <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                    <label class="weui-cells__title">车牌号：<span style="margin-left: 10px;" id="platenumber"></span></label>

                </div>
                <div class="weui-cell">
                    <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                    <label class="weui-cells__title">车辆状况：<span style="margin-left: 10px;" id="carstart"></span></label>

                </div>
                <div id="f3">
                    <div class="weui-cell">
                        <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                        <label class="weui-cells__title">行驶公里数：<span style="margin-left: 10px;" id="playkm"></span></label>
                    </div>
                    <div class="weui-cell">
                        <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                        <label class="weui-cells__title">行驶时长：<span style="margin-left: 10px;" id="playtime"></span></label>
                    </div>
                    <div class="weui-cell">
                        <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                        <label class="weui-cells__title">还车备注：<span style="margin-left: 10px;" id="returnremark"></span></label>
                    </div>
                    <div class="weui-cell">
                        <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />
                        <label class="weui-cells__title">还车时间：<span style="margin-left: 10px;" id="endtime"></span></label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-cells weui-cells_form" style="width: 100%; display: none" id="jujue">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-cells__title">拒绝原因：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" id="refuse_reason" placeholder="请输入拒绝原因" />
            </div>
            <div class="weui-cell__ft" id="refuse_sure" style="width:1rem">
                <img class="weui-vcode-img" src="./images/sure.png" style="width: 40px; height: 30px;"/>
            </div>
        </div>
    </div>

    <div style="width: 100%; display: flex; justify-content: center" id="btn_index">
        <div class="weui-btn-area" style="width: 50%;" id="accept">
            <a class="weui-btn weui-btn weui-btn_primary" style="cursor: pointer; color: white">同意</a>
        </div>
        <div class="weui-btn-area" style="width: 50%;">
            <a class="weui-btn weui-btn_warn" id="refuse" style="cursor: pointer; color: white">拒绝</a>
        </div>
    </div>



</asp:Content>
