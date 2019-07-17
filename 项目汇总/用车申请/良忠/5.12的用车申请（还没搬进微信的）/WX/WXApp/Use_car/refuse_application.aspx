<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="refuse_application.aspx.cs" Inherits="WXApp.WX.use_car.refuse_application" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>用车申请通知</title>
    <link rel="stylesheet" href="style/weui.css"/>
    <link rel="stylesheet" href="style/example.css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="script/refuse_application.js"></script>
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
                <div class="weui-cell__bd" style="text-align:center;color: white"><span>某某某</span>的用车申请</div>
                <!--<div class="weui-cell__ft" style="color: blue"><a href="../comment/comment.html">确认</a></div>-->
                <div id="queren"> </div> <!--确认按钮-->
                <div id="chakan"> </div> <!--查看按钮-->
            </div>
    </div>
      <div class="weui-cells weui-cells_form"> 
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/yonghu.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">&nbsp;审&nbsp;核&nbsp;人：<span style="margin-left:10px;">刘经理</span></label>                
                                    
            </div>  
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/zhuangtai.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">审核状态：
                        <%--<span class="weui-badge" style="margin-left: 10px;background:green">通过</span>--%>
                        <span class="weui-badge" style="margin-left: 10px;">拒绝</span>
                    </label>      
                                    
            </div> 
            <div class="weui-cell">                
                    <img class="weui-vcode-img" src="./images/yuanyin.png" style="width:20px;height:20px;"/>
                    <label class="weui-cells__title">审核原因：<span style="margin-left:10px;">领导专用</span></label>                
                                    
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
                    <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width:20px;height:20px;"/>
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
            <!-- <div class="weui-cell">    //这个可以切换为选项卡跟选择部门一样
                <div class="weui-cells__title">预计还车时间：</div>
                <div class="">
                    <div class="weui-cells__title" id="showDatePicker">请选择日期</div>
                </div>
            </div> -->
        
         
           <%-- <div class="weui-btn-area" style="">
                    <a class="weui-btn" id="sure_application" style="background: #E3934B;cursor:pointer">提交申请</a>
                </div>--%>
                                          

<script src="js/zepto.min.js"></script>
<script src="js/weui.min.js"></script>
<!-- <script src="js/example.js"></script> -->    
</body>
</html>
