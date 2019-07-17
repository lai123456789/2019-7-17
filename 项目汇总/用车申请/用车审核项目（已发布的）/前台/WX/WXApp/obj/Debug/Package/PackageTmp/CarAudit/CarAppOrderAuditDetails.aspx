<%@ Page Title="我的用车审核单明细" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="CarAppOrderAuditDetails.aspx.cs" Inherits="WXApp.CarAudit.CarAppOrderAuditDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/CarAppOrderAuditDetails.css?201901423" rel="stylesheet" />
    <script src="UI/Scripts/CarAppOrderAuditDetails.js?201910423"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont">&#xe64e;</i>
     <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> 
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
        </div>--%>
    </div>
    <div id="operation_btn2">
        <div class="submit_btn1">批准</div>
        <div class="submit_btn2">驳回</div>
    </div>




     <div id="undo_modal">
        <div class="content">
            <textarea id="remark" placeholder="请输入备注说明"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定驳回</div>
        </div>
    </div>

    <div id="approval_modal">

        <div class="top_title">
            <div class="left">选择车辆：</div>
            <div class="right">
                <select id="selectcar">

                </select>
            </div>
        </div>



        <div class="content">
            <textarea id="approval_remark" placeholder="请输入备注说明" onkeyup="isempty()"></textarea>
        </div>
        <div class="label">
            <div class="label_1">钥匙在保安室</div>
            <div class="label_2">钥匙在我桌子上</div>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">批准</div>
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


        $('#selectcar').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择车辆'
        });
    </script>


</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
</asp:Content>
