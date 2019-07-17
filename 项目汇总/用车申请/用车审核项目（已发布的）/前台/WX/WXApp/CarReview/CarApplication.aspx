<%@ Page Title="用车申请" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="CarApplication.aspx.cs" Inherits="WXApp.CarReview.CarApplication" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/CarApplication.css?20190423" rel="stylesheet" />
    <script src="UI/Scripts/CarApplication.js?20190423"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
     <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="infodata">
        <div class="rows1">
            <div class="left">工号：</div>
            <div class="right" data-usercode="" id="mt_account"></div>
        </div>

        <div class="rows2">
            <div class="left">姓名：</div>
            <div class="right"id="mt_usercode"></div>
        </div>

        <div class="rows3">
            <div class="left">部门：</div>
            <div class="right" id="mt_department"></div>
        </div>

        <div class="rows4">
            <div class="left">目的地：</div>
            <div class="right">
                <input type="text"id="now1"  value="" placeholder="请输入要去的目的地" />
            </div>

        </div>

        <div class="rows5">
            <div class="left">用途：</div>
            <div class="right">
                <input type="text" id="now2" value="" placeholder="请输入借车的用途" />
            </div>
        </div>
        <div class="rows6">
            <div class="left">用车时间：</div>
            <div class="right">
                <input id="stardate"  type="text" value="" placeholder="请输入用车时间" />
            </div>
        </div>
        <div class="rows7">
            <div class="left">归还时间：</div>
            <div class="right">
                <input id="enddate"  type="text" value="" placeholder="请输入预计归还时间" />
            </div>
        </div>
    </div>
    <div id="operation_btn">
        <div class="submit_btn">申请用车</div>
    </div>


     <script>

        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang = "zh";

        $('#stardate').mobiscroll().datetime({
            dateFormat: 'yy/mm/dd',
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            showNow: true,
            lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

        });

        $('#enddate').mobiscroll().datetime({
            theme: theme,
            mode: mode,
            display: display,
            lang: lang,
            dateFormat: "yyyy/mm/dd",
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            stepMinute: 1
        });
    </script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
</asp:Content>
