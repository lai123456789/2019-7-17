<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master"  AutoEventWireup="true" CodeBehind="refuse_result.aspx.cs" Inherits="WXApp.Use_car.refuse_result" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script> 
    <script src="script/refuse_result.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="weui-cells weui-cells_form" style="margin-top:1.5rem"> 
           
          
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">申请单号：<span style="margin-left:10px;" id="danhao1"></span></label>                
                                    
            </div> 
         
            <div class="weui-cell" style="width: 100%">
           
            <img class="weui-vcode-img" src="./images/zhuangtai1.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">拒绝原因：<span style="margin-left:10px;"></span></label>
            <div class="weui-cell__bd">
               <input id="refuse_result" class="weui-input" type="text" placeholder="请输入原因"/>
            </div>            
             </div>
            
        </div>
    
         
        
    <div style="width:100%;display:flex;justify-content:center">
        <div class="weui-btn-area" style="width:50%;">
             <a class="weui-btn" id="refuse_result_sure" style="background: #2196F3;cursor:pointer;color:white">确定</a>
        </div>
    </div>

  

</asp:Content>