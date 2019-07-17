<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="WXAccredit.aspx.cs" Inherits="WXApp.WXAccredit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/WXAccredit.css" rel="stylesheet" />
    <script src="UI/Scripts/WXAccredit.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="mid">
         
        <div class="moudle">
                 <%if (checkout("WXP0001") || checkout("WXP0002") || checkout("WXP0003") || checkout("WXP0004"))
                   {%>
                   
             <div class="title">预订单管理</div>
             <% }%>
            <div class="content">
                 <%if(checkout("WXP0001")) {%>
                <div class="box" data-url="/AdvanceOrder/AddAdvanceOrder.aspx?type=1">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe60a;</i>
                    </div>
                    <div class="boxname">图纸设计</div>
                </div>
                 <% }%>
                    <%if(checkout("WXP0002")) {%>
                <div class="box" data-url="/AdvanceOrder/NotFigure.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">未出图</div>
                </div>
                   <% }%>
                <%--
                <div class="box" data-url="AdvanceOrder.aspx?type=3">
                    <div class="boxpic orange">
                        <i class="iconfont">&#xe61e;</i>
                    </div>
                    <div class="boxname">特殊</div>
                </div>--%>
                  <%if(checkout("WXP0003")) {%>
                <div class="box" data-url="/AdvanceOrder/QueryDesign.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">设计完成</div>
                </div> 
                <% }%>

                <%if(checkout("WXP0004")) {%>
                <div class="box" data-url="/AdvanceOrder/SelectAllAdvanceOrder.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">设计查询</div>
                </div> 
                <% }%>
            </div> 
              
        </div>
     
        <div class="moudle">
              <%if (checkout("WXP0005") || checkout("WXP0006") || checkout("WXP0007") || checkout("WXP0008"))
                {%>
            <div class="title">售后服务</div>
              <% }%>
            <div class="content">
                <%if(checkout("WXP0005")) {%>
                 <div class="box"  data-url="/Warranty/IssueTracking.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe65b;</i>
                    </div>
                    <div class="boxname">问题跟踪</div>
                </div>
                 <% }%>
                <%if(checkout("WXP0006")) {%>
                <div class="box" data-url="/Warranty/Processed.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe65b;</i>
                    </div>
                    <div class="boxname">待处理</div>
                </div>
                <% }%>
                <%if(checkout("WXP0007")) {%>
                <div class="box" data-url="/Warranty/GetWarranty.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">售后查询</div>
                </div>
                <% }%>

                <%if(checkout("WXP0008")) {%>
                <div class="box"  data-url="/Warranty/DailyWarranty.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe65b;</i>
                    </div>
                    <div class="boxname">日常维修</div>
                </div>
                <% }%>
            </div>
        </div>
        <div class="moudle">
               <%if(checkout("WXP0009")) {%>
            <div class="title">装配管理</div>
              <% }%>
            <div class="content">

                <%if(checkout("WXP0009")) {%>
                <div class="box" data-url="/Assembly/A001.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe63b;</i>
                    </div>
                    <div class="boxname">装配汇总</div>
                </div>
                 <% }%>
            </div>
        </div>

        <div class="moudle">
               <%if(checkout("WXP0009")) {%>
            <div class="title">用车申请</div>
              <% }%>
            <div class="content">

                <%if(checkout("WXP0009")) {%>
                <div class="box" data-url="/Use_car/adminAll_application_index.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">申请汇总</div>
                </div>
                 <% }%>

                <%if(checkout("WXP0009")) {%>
                <div class="box" data-url="/Use_car/application_index.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">用车申请</div>
                </div>
                 <% }%>

            </div>
        </div>
        <%--<div class="moudle">
            <div class="title">业务应用</div>
            <div class="content">
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
                <div class="box">
                    <div class="boxpic">
                        <i class="iconfont">&#xe61c;</i>
                    </div>
                    <div class="boxname">属性管理</div>
                </div>
            </div>
        </div>--%>
    </div>
</asp:Content>
