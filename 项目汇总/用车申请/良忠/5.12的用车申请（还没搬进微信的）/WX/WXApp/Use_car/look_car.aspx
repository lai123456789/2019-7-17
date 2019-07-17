<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="look_car.aspx.cs" Inherits="WXApp.Use_car.look_car" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>查看车辆状况</title>
    <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="script/look_car.js"></script>
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
</head>
<body>
    
    <div class="weui-cells weui-cells_form" style="background:#E3934B;margin-top: 0px;">
            <div class="weui-cell">
                <div class="weui-cell__hd" id="bd">
                    <p style="color: white"><i class="fa fa-chevron-left"></i></p>
                </div>
                <div class="weui-cell__bd" style="text-align:center;color: white">车辆管理</div>
                
            </div>
    </div>
      <div class="weui-cells weui-cells_form"> <%--这块div要通过js对接后台接口 用append的方式到这块div，现在我这里静态数据展示而已--%>
             
            <div class="weui-cell" style="width:100%">  
                <div style="width:45%">
                    <img class="weui-vcode-img" src="./images/chepai.png" style="width:20px;height:20px;"/>
                    <label style="" class="weui-cells__title">车辆车型：<span style="margin-left:10px;">大众</span></label>

                </div> 
                <div style="width:55%">
                   <img class="weui-vcode-img" src="./images/chepai1.png" style="width:20px;height:20px;margin-left:1.5rem"/>
                    <label class="weui-cells__title">车牌号：<span style="">粤S`H3X26</span></label> 
                </div>             
            </div> 
            <div class="weui-cell" style="width:100%">  
                <div style="width:50%">
                    <img class="weui-vcode-img" src="./images/yuanyin.png" style="width:20px;height:20px;"/>
                    <label style="" class="weui-cells__title">使用状况：<span class="weui-badge" style="margin-left: 10px;">使用中</span></label> <%--这里js判断一下，如果状态是使用中就是红色，绿色就是空闲中--%>

                </div> 
                <div style="width:50%">
                   <img class="weui-vcode-img" src="./images/yonghu.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">使用人：<span style="margin-left:10px;">赖良坤</span></label> 

                </div>             
            </div>  
          <div class="weui-cell" style="width:100%">  
                <div>
                    <img class="weui-vcode-img" src="./images/result.png" style="width:20px;height:20px;"/>
                    <label style="" class="weui-cells__title">使用原因：<span style="margin-left:10px;">外出谈判</span></label>
                </div>                           
            </div>          
        <div class="weui-cell">
           <img class="weui-vcode-img" src="./images/zhuangtai1.png" style="width:20px;height:20px;"/>
                <label class="weui-cells__title">更改用车状态：</label>
            <div class="weui-cell__bd">
                <div class="page__bd page__bd_spacing">

                    <div class="weui-cells__title" id="change">
                        点击这里更改                        
                    </div>
                </div>
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/sure.png"  style="width:20px;height:20px;">
            </div>
        </div>
    
            
            
            
        </div>
                        

<script src="js/zepto.min.js"></script>
<script src="js/weui.min.js"></script>
<!-- <script src="js/example.js"></script> -->    
</body>
</html>
