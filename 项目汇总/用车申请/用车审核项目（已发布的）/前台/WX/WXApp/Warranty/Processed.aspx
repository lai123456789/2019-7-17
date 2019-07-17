<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="Processed.aspx.cs" Inherits="WXApp.Warranty.Processed" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/Processed.css?201905711" rel="stylesheet" />
    <script src="UI/Scripts/Processed.js?201905711"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="username" type="hidden" value="<%=username %>" />
    <input id="usercode" type="hidden" value="<%=usercode %>" />
    <div id="conditions">
        <div class="left">
            <div class="rows">
                <select id="onetype">
                    <option value="全部">全部</option>
                    <option value="设备编号">设备编号</option>
                    <option value="设备名称">设备名称</option>
                    <option value="厂区">厂区</option>
                    <option value="问题分类">问题分类</option>
                    <option value="提单人">提单人</option>
                    <option value="处理人">处理人</option>
                </select>
                <input type="text" id="oneval" value="" placeholder="请输入筛选值"/>
            </div>

            <div class="rows">
                <select id="twotype">
                    <option value="全部">全部</option>
                    <option value="处理时间">处理时间</option>
                    <option value="创建时间">创建时间</option>
                    <option value="故障解除时间">故障解除时间</option>
                </select>
                <input type="text" id="stardate" value="" readonly="" placeholder="开始时间" />
                <input type="text" id="enddate" value="" readonly="" placeholder="结束时间" />
            </div>

            <div class="rows">
                <select id="threetype">
                    <option value="全部">全部</option>
                    <option value="未处理">未处理</option>
                    <option value="处理中">处理中</option>
                    <option value="已处理">已处理</option>
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

    <div id="mask300">

    </div>

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

    <form id="form_sales" action="/Warranty/UpdateWarranty.aspx?action=processed" target="_self" method="post">
        <input id="salescode" name="salescode" type="hidden" value="" />
        <input id="dealusercode" name="dealusercode" type="hidden" value="" />
    </form>

     <form id="form_design1" action="/Warranty/Message.aspx?action=processed" target="_self" method="post">
        <input id="salescode1" name="salescode" type="hidden" value="" />
    </form>

</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
     <div id="pagetwo" data-role="page" >
        <div class="img">
            <img src="" />
        </div>
        <div class="bottom_footer">
            <div class="resultbtn">
                <div class="box1 contor">返回</div>
            </div>
        </div>
    </div>
</asp:Content>
