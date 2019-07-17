<%@ Page Language="C#"  MasterPageFile="~/WXMaster.Master"  AutoEventWireup="true" CodeBehind="application_index.aspx.cs" Inherits="WXApp.application_index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <link href="css/application_index.css" rel="stylesheet" />
    
    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script> 
    <script src="script/application_index.js"></script>
    <style>
       span{
            font-size: 15px;
        }
       .lei{
            background:red;
        }
       #sel .weui-flex__item{
           margin:2px;
           border:1px solid gray;
           text-align:center
       }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> 

    <div class="weui-cells" style="margin-top:1.6rem">
        <div class="weui-cell__hd" style="text-align: center;line-height: 45px;">
            <a href="#" id="url_application"><i class="fa fa-plus-square"></i>&nbsp;&nbsp;用车申请</a>
        </div>
    </div>
    
  
    
    <div id="select_info" style="width: 100%;border:0px"><button style="text-align: center">查询</button></div>
    <div class="itemAll_select" style="display: none; background: white;margin-top:20px;"><%--查询的--%>
        
        <div class="weui-flex" id="sel">
            <div class="weui-flex__item lei">未审核</div>
            <div class="weui-flex__item">已撤销</div>
            <div class="weui-flex__item">已驳回</div>
            <div class="weui-flex__item">已审核</div>
            <div class="weui-flex__item">使用中</div>
            <div class="weui-flex__item">已还车</div>
        </div>
    </div>


    <div class="weui-cells weui-cells_form" id="user_application">
            
        <%--<div class="weui-cell">                
               <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width:20px;height:20px;"/>
            <div  class="weui-cell__bd"> <label class="weui-cells__title">申请单号：<span style="margin-left:10px;">PL00069</span></label></div>
                   
            <div class="weui-cell__ft"><img class="weui-vcode-img" src="./images/right.png" style="width:20px;height:20px;"/></div>                                 
            </div>--%>  
                      
     </div>

    <div style="display: none;" id="jujue" class="weui-dialog weui-dialog--visible">  <%--撤销的对话框--%>
         <div class="weui-cells weui-cells_form">
       <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">申请单号：<span style="margin-left: 10px;" id="application_danhao_jujue"></span></label>

        </div>
        <div class="weui-cell" style="width: 100%">
                <input id="result_chexiao" class="weui-input" type="text" placeholder="请输入撤销原因" />            
        </div>
    </div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn" id="jujue_sure">确定</a>            
            <a href="javascript:;" class="weui-dialog__btn default" id="jujue_quxiao">取消</a>
        </div>
    </div>

    <%--<div style="display: none;" id="use_car" class="weui-dialog weui-dialog--visible">  <%--立即用车的对话框
         <div class="weui-cells weui-cells_form">
       <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">申请单号：<span style="margin-left: 10px;" id="application_danhao_use"></span></label>

        </div>
        <div class="weui-cell" style="width: 100%">
                <input id="num" class="weui-input" type="text" placeholder="请输入当前车辆公里数" />
                       
        </div>
    </div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn" id="use_sure">确定</a>            
            <a href="javascript:;" class="weui-dialog__btn default" id="use_quxiao">取消</a>
        </div>
    </div>--%> 
    <script>
        $(document).on('tap', '.values', function (e) {
            stopDefault(e);
            ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
        });
        $(document).on('tap', '.values_end', function (e) {
            stopDefault(e);
            ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
        });
    </script>
</asp:Content>