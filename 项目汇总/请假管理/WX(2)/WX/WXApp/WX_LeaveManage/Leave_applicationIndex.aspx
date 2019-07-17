<%@ Page Title="我的请假申请单" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="Leave_applicationIndex.aspx.cs" Inherits="WXApp.WX_LeaveManage.Leave_applicationIndex" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/Leave_applicationIndex.css" rel="stylesheet" />
    <script src="UI/Scripts/Leave_applicationIndex.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
      <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
  <div id="topinfo">
        <div class="box1 contor">全部</div>
        <div class="box1">未审批</div>
        <div class="box1">已审批</div>
        <div class="box1">已失效</div>
    </div>
    <div id="infodata">
        <div class="list1 contor">
            </div>
      <%--  <div class="list1 contor">

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        
                    </div>
                    <div class="box2">
                        <div class="status status1">未审批</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：
                    </div>
                    <div class="box2">
                       
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box2">
                        <div class="status status2">已批车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 11:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box2">
                        <div class="status status3">使用中</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 10:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status1">不通过</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 09:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status4">已还车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status5">已超时</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="list1">
            
            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status1">未审批</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 12:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status1">不通过</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 09:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="list1">
            
            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box2">
                        <div class="status status2">已批车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 11:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box2">
                        <div class="status status3">使用中</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 10:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="list1">

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status4">已还车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status5">已超时</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">撤销</div>
                    </div>
                </div>
            </div>

        </div>--%>
    </div>



    <div id="undo_modal">
        <div class="content">
          <textarea id="remark" placeholder="请输入撤销原因"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定</div>
        </div>
    </div>

    <div id="undo_modal_xiaojia">
        <div class="content">
          <textarea id="remark_xiaojia" placeholder="请输入销假原因"></textarea>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定</div>
        </div>
    </div>


    <div id="mask300" class=""></div>
    <div id="mask400" class=""></div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">

</asp:Content>
