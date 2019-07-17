<%@ Page Title="我的用车申请单详情" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="CarAppOrderDetails.aspx.cs" Inherits="WXApp.CarReview.CarAppOrderDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/CarAppOrderDetails.css?20190423" rel="stylesheet" />
    <script src="UI/Scripts/CarAppOrderDetails.js?20190423"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="infodata">
       <%-- <div class="rows1">
            <div class="left">工号：</div>
            <div class="right" data-usercode="mt00000001">3350</div>
        </div>
        <div class="rows2">
            <div class="left">姓名：</div>
            <div class="right">林展浩</div>
        </div>
        <div class="rows3">
            <div class="left">部门：</div>
            <div class="right">总经办</div>
        </div>
        <div class="rows4">
            <div class="left">目的地：</div>
            <div class="right">天安数码城</div>
        </div>
        <div class="rows5">
            <div class="left">用途：</div>
            <div class="right">回天安</div>
        </div>
        <div class="rows6">
            <div class="left">用车时间：</div>
            <div class="right">2019/05/24 13:00</div>
        </div>
        <div class="rows7">
            <div class="left">归还时间：</div>
            <div class="right">2019/05/24 18:00</div>
        </div>
        <div class="rows8">
            <div class="left">审核状态：</div>
            <div class="right status1">未审批</div>
        </div>
        <div class="rows9">
            <div class="left">审批车辆：</div>
            <div class="right"></div>
        </div>
        <div class="rows10">
            <div class="left">备注：</div>
            <div class="right"></div>
        </div>
    </div>--%>
        </div>
    <div id="operation_btn1">
        <div class="submit_btn">撤销申请</div>
    </div>

    <div id="operation_btn2">
        <div class="submit_btn1">开始用车</div>
        <div class="submit_btn2">撤销申请</div>
    </div>

    <div id="operation_btn3">
        <div class="submit_btn">马上还车</div>
         <div class="submit_btn1">延时还车</div>
    </div>

    <div id="operation_btn4">
        <div class="submit_btn">重新申请</div>
    </div>

    <div id="operation_btn5">
        <div class="submit_btn">重新申请</div>
    </div>

    <div id="operation_btn6">
        <div class="submit_btn">重新申请</div>
    </div>

        <div id="operation_btn7">
        <div class="submit_btn">重新申请</div>
    </div>

    <div id="undo_modal">
        <div class="content">
            <textarea id="remark" placeholder="请输入初始公里数"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure1">确定提交</div>

        </div>
    </div>

      <div id="undo_moda2">
        <div class="content">
            <textarea id="remark1" placeholder="请输入还车公里数"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定提交</div>
        </div>
    </div>

       <div id="undo_moda3">
        <div class="content">
            <textarea id="remark2" placeholder="请输入撤销原因"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定提交</div>
        </div>
    </div>


     <div id="undo_moda4">
        <div class="content">
            <textarea id="remark4" placeholder="请输入延时还车原因"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定提交</div>
        </div>
    </div>


   <div id="mask300" class=""></div>
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
