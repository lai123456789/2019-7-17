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

                <div class="box" data-url="/AdvanceOrder/LongDelivery.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">长交期确认</div>
                </div>

                <div class="box" data-url="/AdvanceOrder/MaterialDrawing.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">备料审核</div>
                </div>
            </div> 
              
        </div>
     
        <div class="moudle">
            
            <div class="title">售后服务</div>
              
            <div class="content">
              
                 <div class="box"  data-url="/Warranty/IssueTracking.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe65b;</i>
                    </div>
                    <div class="boxname">问题跟踪</div>
                </div>
                
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

              
     <%--           <div class="box"  data-url="/Warranty/DailyWarranty.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe65b;</i>
                    </div>
                    <div class="boxname">日常维修</div>
                </div>
            
            </div>
        </div>
        <div class="moudle">
             
            <div class="title">装配管理</div>
          
            <div class="content">

               
                <div class="box" data-url="/Assembly/A001.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe63b;</i>
                    </div>
                    <div class="boxname">装配汇总</div>
                </div>--%>
               
            </div>
        </div>


        
          <div class="moudle">
             
            <div class="title">用车申请</div>
             
            <div class="content">
              
                <div class="box" data-url="/CarReview/CarApplication.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">借车申请</div>
                </div>
             


                   
                <div class="box" data-url="/CarReview/VehicleDispatching.aspx">
                    <div class="boxpic green">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">派车申请</div>
                </div>
                   



                
                 
                <div class="box" data-url="/CarReview/CarAppOrder.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">我的借车单</div>
                </div>
                
              
                
            
              
                <div class="box" data-url="/CarReview/VehicleOrder.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">我的派车单</div>
                </div>
                 

            </div>
              </div>


                   <div class="moudle">
              
            <div class="title">用车审核</div>
           
            <div class="content">


                
                <div class="box" data-url="/CarAudit/CarAppOrderAudit.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">借车审核单</div>
                </div>
                

                   
                <div class="box" data-url="/CarAudit/VehicleOrderAudit.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">派车审核单</div>
                </div>
                

               

                  
                <div class="box" data-url="/CarReview/CarInquire.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">车辆情况</div>
                </div>

                 
             
                <div class="box" data-url="/CarReview/CarApplicationCar.aspx">
                    <div class="boxpic black">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">司机情况</div>
                </div> 
                
              
   
                        </div>
                       </div>

         <div class="moudle">
                  <%if (checkout("WXP0014") || checkout("WXP0015") || checkout("WXP0016") || checkout("WXP0017"))
                {%>
            <div class="title">请假管理</div>
              <% }%>
            <div class="content">
                
                <%if(checkout("WXP0014")) {%>
                <div class="box" data-url="/WX_LeaveManage/Leave_application.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">请假申请</div>
                </div>
                 <% }%>

                     <%if(checkout("WXP0015")) {%>
                <div class="box" data-url="/WX_LeaveManage/Leave_applicationIndex.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">我的申请单</div>
                </div>
                 <% }%>

   
                 </div>
               </div>
        <div class="moudle">
                  <%if (checkout("WXP0014") || checkout("WXP0015") || checkout("WXP0016") || checkout("WXP0017"))
                {%>
            <div class="title">代理审核</div>
              <% }%>
            <div class="content">
                
                <%if(checkout("WXP0014")) {%>
                <div class="box" data-url="/WX_LeaveManage/position_man.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">代理人审核</div>
                </div>
                 <% }%>

   
                 </div>
               </div>

         <div class="moudle">
                  <%if (checkout("WXP0014") || checkout("WXP0015") || checkout("WXP0016") || checkout("WXP0017"))
                {%>
            <div class="title">经理审核</div>
              <% }%>
            <div class="content">
                
                <%if(checkout("WXP0014")) {%>
                <div class="box" data-url="/WX_LeaveManage/DepartmentManager.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">经理审核单</div>
                </div>
                 <% }%>

   
                 </div>
               </div>

        <div class="moudle">
                  <%if (checkout("WXP0014") || checkout("WXP0015") || checkout("WXP0016") || checkout("WXP0017"))
                {%>
            <div class="title">人事审核</div>
              <% }%>
            <div class="content">
                
                <%if(checkout("WXP0014")) {%>
                <div class="box" data-url="/WX_LeaveManage/PersonnelManager.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">人事审核单</div>
                </div>
                 <% }%>

   
                 </div>
               </div>
         <div class="moudle">
                  <%if (checkout("WXP0014") || checkout("WXP0015") || checkout("WXP0016") || checkout("WXP0017"))
                {%>
            <div class="title">领导审核</div>
              <% }%>
            <div class="content">
                
                <%if(checkout("WXP0014")) {%>
                <div class="box" data-url="/WX_LeaveManage/Leader.aspx">
                    <div class="boxpic red">
                        <i class="iconfont">&#xe750;</i>
                    </div>
                    <div class="boxname">领导审核单</div>
                </div>
                 <% }%>

   
                 </div>
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
