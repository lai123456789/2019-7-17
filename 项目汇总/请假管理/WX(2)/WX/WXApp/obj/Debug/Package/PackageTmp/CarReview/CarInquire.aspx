<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/WXMaster.Master" CodeBehind="CarInquire.aspx.cs" Inherits="WXApp.CarReview.CarInquire" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/CarInquire.css" rel="stylesheet" />
    <script src="UI/Scripts/CarInquire.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
      <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="topinfo">
        <div class="box1 contor">全部</div>
        <div class="box1">使用中</div>
        <div class="box1">已结单</div>
        <div class="box1">已失效</div>
    </div>
    <div id="infodata">
        <div class="list1 contor">
            </div>
        </div>
   <%--    <div class="list1 contor">

           <%-- <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box2">
                        <div class="status status2">驾驶中</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                       杨晓龙
                    </div>
                    <div class="box2">
                       电话：c
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                      粤888888
                    </div>
                    <div class="box2">

                        <div class="details_btn">详情</div>
                     
                </div>--%>
           <%-- </div>--%>

            

    <div id="undo_modal">
        <div class="content">
            是否要撤回单号“<span id="orderno">PL0001</span>”用车申请单？
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure">确定</div>
        </div>
    </div>

    <div id="mask300" class=""></div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">

</asp:Content>
