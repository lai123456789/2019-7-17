<%@ Page Language="C#"  MasterPageFile="~/WXMaster.Master"  AutoEventWireup="true" CodeBehind="success_application.aspx.cs" Inherits="WXApp.WX.use_car.success" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/zepto.min.js"></script>
<script src="js/weui.min.js"></script>
<!-- <script src="js/example.js"></script> -->
    <script src="script/success_application.js"></script>
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
     
      <div class="weui-cells weui-cells_form" style="margin-top:1.6rem;"> 
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/yonghu.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">&nbsp;审&nbsp;核&nbsp;人：<span style="margin-left:10px;">刘经理</span></label>                
                                    
            </div>  
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/zhuangtai.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">审核状态：
                        <span class="weui-badge" style="margin-left: 10px;background:green">通过</span>                        
                    </label>      
                                    
            </div> 
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/chepai.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">&nbsp;车&nbsp;牌&nbsp;号：<span style="margin-left:10px;">粤S-5F67X3</span></label>                
                                    
            </div>        
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/yonghu.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">&nbsp;申&nbsp;请&nbsp;人：<span style="margin-left:10px;">赖良坤</span></label>                
                                    
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
            
            
        </div>
    <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-cells__title">车辆初始公里数：</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" id="star_num" type="number" placeholder="请输入初始公里数"/>
                </div>
                <div class="weui-cell__ft">
                    <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width:20px;height:20px;">
                </div>
            </div>
        </div>
            <!-- <div class="weui-cell">    //这个可以切换为选项卡跟选择部门一样
                <div class="weui-cells__title">预计还车时间：</div>
                <div class="">
                    <div class="weui-cells__title" id="showDatePicker">请选择日期</div>
                </div>
            </div> -->
        
    <div style="width:100%;display:flex;justify-content:center">
        <div class="weui-btn-area" style="width:50%;">
                    <a class="weui-btn" id="use_car" style="background: #2196F3;cursor:pointer;color:white">立即用车</a>
        </div>
    </div>
</asp:Content>
