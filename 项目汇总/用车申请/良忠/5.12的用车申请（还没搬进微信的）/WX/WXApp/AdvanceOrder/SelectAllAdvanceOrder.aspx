<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="SelectAllAdvanceOrder.aspx.cs" Inherits="WXApp.AdvanceOrder.SelectAllAdvanceOrder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/SelectAllAdvanceOrder.css?2016429111" rel="stylesheet" />
    <script src="UI/Scripts/SelectAllAdvanceOrder.js?20164291111"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="usercode" type="hidden" value="<%=usercode %>" />
    <div id="conditions">
        <div class="left">
            <div class="rows">
                <select id="onetype">
                    <option value="全部">全部</option>
                    <option value="流程单号">流程单号</option>
                    <option value="图档号">图档号</option>
                    <option value="名称">名称</option>
                    <option value="归类">归类</option>
                    <option value="需求场景">需求场景</option>
                    <option value="试制号">试制号</option>
                    <option value="子流程单号">子流程单号</option>
                     <option value="提单人">提单人</option>
                    <option value="创建人">创建人</option>
                    <option value="关闭人">关闭人</option>
                </select>
                <input type="text" id="oneval" value="" placeholder="请输入筛选值"/>
            </div>

            <div class="rows">
                <select id="twotype">
                    <option value="全部">全部</option>
                    <option value="系统通知时间">系统通知时间</option>
                    <option value="创建时间">创建时间</option>
                </select>
                <input type="text" id="stardate" value="" readonly="" placeholder="开始时间" />
                <input type="text" id="enddate" value="" readonly="" placeholder="结束时间" />
            </div>

            <div class="rows">
                <select id="threetype">
                    <option value="全部">全部</option>
                    <option value="未出图">未出图</option>
                    <option value="已出图">已出图</option>
                    <option value="已关闭">已关闭</option>

                </select>
            </div>

            <div class="query">查询</div>
        </div>
        <div class="dropdown">
            <i class="iconfont">&#xe695;</i>
        </div>
    </div>

    <div class="table-responsive" id="div_form_table">
   
    </div>




    <div id="addinfo">
        <div class="materialinfo">

            <div class="column1">
                <div class="left">关闭原因</div>
                <div class="right">
                    <textarea></textarea>
                </div>
            </div>
            <div class="column4">
                <div class="left">
                    <div class="values">取消</div>
                </div>
                <div class="right">
                    <div class="values">确定</div>
                </div>
            </div>

        </div>
    </div>

    <div id="mask300">

    </div>

     <form id="form_add" action="/AdvanceOrder/AddAdvanceOrder.aspx" target="_self" method="post">
    </form>

    <form id="form_design" action="/AdvanceOrder/UpdataAdvanceOrder.aspx?action=design" target="_self" method="post">
        <input id="ProcessNo" name="ProcessNo" type="hidden" value="" />
        <input id="TrialNo" name="TrialNo" type="hidden" value="" />
        <input id="ImageNo" name="ImageNo" type="hidden" value="" />
        <input id="Name" name="Name" type="hidden" value="" />
        <input id="DemandNum" name="DemandNum" type="hidden" value="" />
        <input id="Scenario" name="Scenario" type="hidden" value="" />
        <input id="ArchiveDate" name="ArchiveDate" type="hidden" value="" />
        <input id="drawingcode" name="drawingcode" type="hidden" value="" />
    </form>

    <form id="form_design1" action="/AdvanceOrder/AddAdvanceOrder.aspx?action=design" target="_self" method="post">
        <input id="ProcessNo1" name="ProcessNo" type="hidden" value="" />
        <input id="PM1" name="PM" type="hidden" value="" />
        <input id="TrialNo1" name="TrialNo" type="hidden" value="" />
        <input id="ImageNo1" name="ImageNo" type="hidden" value="" />
        <input id="Name1" name="Name" type="hidden" value="" />
        <input id="DemandNum1" name="DemandNum" type="hidden" value="" />
        <input id="Classified1" name="Classified" type="hidden" value="" />
        <input id="Lading1" name="Lading" type="hidden" value="" />
        <input id="Sysnotifydate1" name="Sysnotifydate" type="hidden" value="" />
        <input id="Scenario1" name="Scenario" type="hidden" value="" />
        <input id="SubprocessNo1" name="SubprocessNo" type="hidden" value="" />
    </form>

     <script>

        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang = "zh";
        $('#onetype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });

        $('#twotype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });

        $('#threetype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });

        $('#stardate').mobiscroll().date({
            dateFormat: 'yy/mm/dd',
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            showNow: true,
            lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

        });

        $('#enddate').mobiscroll().date({
            dateFormat: 'yy/mm/dd',
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            showNow: true,
            lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

        });

    </script>
</asp:Content>
