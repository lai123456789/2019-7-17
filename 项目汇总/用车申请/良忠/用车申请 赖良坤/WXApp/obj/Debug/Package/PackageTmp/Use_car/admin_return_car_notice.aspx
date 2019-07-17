<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master"  AutoEventWireup="true" CodeBehind="admin_return_car_notice.aspx.cs" Inherits="WXApp.WX.use_car.admin_return_car_notice" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>还车通知</title>
    <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/zepto.min.js"></script>
<script src="js/weui.min.js"></script>
<!-- <script src="js/example.js"></script> -->  
    <script src="script/admin_return_car_notice.js"></script> <%--审核人收到还车通知--%>
    <style>
        input::-webkit-input-placeholder{            
            font-size: 15px;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            font-size: 15px;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            font-size: 15px;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            
            font-size: 15px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <div class="weui-cells weui-cells_form" style="background:#E3934B;margin-top: 0px;">
            <div class="weui-cell">
                <div class="weui-cell__hd" id="bd">
                    <p style="color: white"><i class="fa fa-chevron-left"></i></p>
                </div>
                <div class="weui-cell__bd" style="text-align:center;color: white">还车通知</div> <%--这是审核人收到的--%>
                
            </div>
    </div>
      <div class="weui-cells weui-cells_form"> 
            
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/chepai.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">&nbsp;车&nbsp;牌&nbsp;号：<span style="margin-left:10px;">粤S-5F67X3</span></label>                
                                    
            </div>        
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/yonghu.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">&nbsp;还&nbsp;车&nbsp;人：<span style="margin-left:10px;">赖良坤</span></label>                
                                    
            </div> 
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">所在部门：<span style="margin-left:10px;">咨询部</span></label>                
                                    
            </div> 
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">申请用途：<span style="margin-left:10px;">外出谈判</span></label>                
                                    
            </div> 
          <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/address.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">发车地址：<span  style="margin-left:10px;">广东东莞每通总部</span></label>                
                                    
            </div>
          <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/time.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">申请用车时间：<span  style="margin-left:10px;">2019/5/20</span></label>                
                                    
            </div> 
            
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/time.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">预计还车时间：<span  style="margin-left:10px;">2019/5/30</span></label>               
                                    
            </div>
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/time.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">实际还车时间：<span  style="margin-left:10px;">2019/5/28</span></label>              
                                    
            </div>
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/time.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">行驶时长：<span  style="margin-left:10px;">8天</span></label>              
                                    
            </div>
          <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/time.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">行驶公里数：<span  style="margin-left:10px;">354</span></label>              
                                    
            </div>
          <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/time.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">是否逾期归还：<span  style="margin-left:10px;"><b>是/否</b></span></label>              
                                    
            </div>
            
        </div>
        
</asp:Content>
