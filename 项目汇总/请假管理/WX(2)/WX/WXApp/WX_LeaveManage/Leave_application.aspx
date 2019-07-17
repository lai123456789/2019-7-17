<%@ Page Title="请假申请" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="Leave_application.aspx.cs" Inherits="WXApp.WX_LeaveManage.Leave_application" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="UI/Styles/VehicleDispatching.css?20190423" rel="stylesheet" />
    <script src="UI/Scripts/VehicleDispatching.js?20190423"></script>--%>
    <link href="UI/Styles/Leave_application.css" rel="stylesheet" />
    <script src="UI/Scripts/Leave_application.js"></script>
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
        <div class="rows3">
            <div class="left">职务：</div>
            <div class="right" id="mt_position">技术员</div>
        </div>

        <div class="rows7">
            <div class="left">请假类别：</div>
            <div class="right" id="">
               <select id="result">
                    <option value="事假">事假</option>
                    <option value="病假">病假</option>
                    <option value="产假">产假</option>
                    <option value="工伤">工伤</option>
                    <option value="调休">调休</option>
                    <option value="其他">其他</option>                    
                </select>
            </div>
        </div>
        <div class="rows4">
            <div class="left">请假原因：</div>
            <div class="right">
                <input type="text"id="now1"  value="" placeholder="请输入请假原因" />
            </div>
        </div>        
        <div class="rows6">
            <div class="left">开始时间：</div>
            <div class="right">
                <input id="stardate"  type="text" value="" placeholder="请输入开始请假时间" />

            </div>
        </div>
        <div class="rows7">
            <div class="left">结束时间：</div>
            <div class="right">
                <input id="enddate"  type="text" value="" placeholder="请输入结束请假时间" />
            </div>
        </div>
        <div class="rows3">
            <div class="left">请假时长：</div>
            <div class="right" id="">1天0时0分</div>
        </div>
        <div class="rows7">
            <div class="left">代理人：</div>
            <div class="right">
                <select id="position_agent">
                    <option value="梁衡设">梁衡设</option>
                    <option value="杨晓龙">杨晓龙</option>
                        
                </select>
            </div>
        </div>
          
        <%--<div class="rows7">
            <div class="left">选择车辆：</div>
            <div class="right">
                <select id="selectcarno">
                    <option value="粤SWN86">粤SWN86</option>
                    <option value="粤SWN87">粤SWN87</option>
                    <option value="粤SWN88">粤SWN88</option>
                    <option value="粤SWN89">粤SWN89</option>
                    <option value="粤SWN90">粤SWN90</option>
                    <option id="carnum">粤S88888</option>
                </select>
            </div>
        </div>--%>
    </div>
    <div id="operation_btn">
        <div class="submit_btn">确认请假</div>
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
         $('#selectcarno').mobiscroll().select({
             theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
             mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
             display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
             lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
             label: '选择车辆'
         });
         $('#result').mobiscroll().select({
             theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
             mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
             display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
             lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
             label: '请假类别'
         });
         $('#position_agent').mobiscroll().select({
             theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
             mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
             display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
             lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
             label: '请假期间职位代理人'
         });
    </script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">

</asp:Content>
