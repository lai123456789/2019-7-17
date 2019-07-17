<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="car_application.aspx.cs" Inherits="WXApp.WX.use_car.car_application" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover" />
    <title>用车申请</title>
    <link rel="stylesheet" href="style/weui.css" />
    <link rel="stylesheet" href="style/example.css" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="script/car_application.js"></script>

    <style>
        input::-webkit-input-placeholder {
            font-size: 15px;
        }

        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-size: 15px;
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-size: 15px;
        }

        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-size: 15px;
        }
    </style>
</head>
<body>
    <div class="weui-cells weui-cells_form" style="background: #E3934B; margin-top: 0px;">
        <div class="weui-cell">
            <div class="weui-cell__hd" id="bd">
                <p style="color: white"><a href=""><i class="fa fa-chevron-left"></i></a></p>
            </div>
            <div class="weui-cell__bd" style="text-align: center; color: white">每通用车申请</div>
            <div class="weui-cell__ft" id="zhankai">
                <img class="weui-vcode-img" src="./images/icon_nav_form.png" style="width:23px;height:23px;">
            </div>                     
        </div>
         <div class="itemAll22" style="display:none;background: white">                    
               <div class="weui-cell">
            
            <div class="weui-cell__bd" style="text-align: center;">
                <b><a href="#" class="weui-cells__title" style="font-size:16px">我的用车申请记录</a></b>
            </div>
                                
        </div>
        </div>
    </div>
    
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">申请人：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="tel" placeholder="请输入申请人">
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/User.png" width="37px" height="2px">
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">所在部门：</label></div>
            <div class="weui-cell__bd">
                <div class="page__bd page__bd_spacing">

                    <div class="weui-cells__title" id="showPicker" style="font-size: 16px">
                        请选择部门                        
                    </div>

                    <!-- <a href="javascript:;" class="weui-btn weui-btn_default" id="showDatePicker">日期选择器</a> -->
                </div>
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/icon_nav_article.png" width="37px" height="2px">
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">申请用途：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="tel" placeholder="请输入申请用途">
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/icon_nav_flow.png" width="37px" height="2px">
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">申请用车时间</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="date" value="">
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/time.png" width="40px" height="2px">
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">预计还车时间</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="date" value="">
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/time.png" width="40px" height="2px">
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">发车地址：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="tel" placeholder="请输入发车地址">
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/icon_nav_flow.png" width="37px" height="2px">
            </div>
        </div>
    </div>
    <!-- <div class="weui-cell">    //这个可以切换为选项卡跟选择部门一样
                <div class="weui-cells__title">预计还车时间：</div>
                <div class="">
                    <div class="weui-cells__title" id="showDatePicker">请选择日期</div>
                </div>
            </div> -->
    <div class="weui-cells__title">选择审批人</div>
    <div class="weui-cell" id="add_img">
        <div class="weui-cell__hd">
            <div onclick="tan()">
                <img class="weui-vcode-img" src="./images/add.png" width="42px" height="2px"></div>
        </div>
    </div>


    <!--性别修改弹框-->
    <div class="weui_dialog_alert" id="doctorSexDialog" style="display: none;">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_bd">
                <!--选择性别-->
                <div class="weui-cells weui-cells_radio">
                    <label class="weui-cell weui-check__label" for="r1" style="text-align: center">
                        <div class="weui-cell__bd">刘总</div>
                        <div class="weui-cell__ft">
                            <input required="" type="radio" class="weui-check" name="sex" value="刘总" id="r1" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-check__label" for="r2" style="text-align: center">
                        <div class="weui-cell__bd">王总</div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="sex" class="weui-check" value="刘总" id="r2" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                    <label class="weui-cell weui-check__label" style="text-align: center">
                        <div class="weui-cell__bd">李总</div>
                        <div class="weui-cell__ft">
                            <input type="radio" name="sex" class="weui-check" value="刘总" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                </div>
                <!--选择性别-->
            </div>

        </div>
    </div>

    <div class="weui-btn-area" style="">
        <a class="weui-btn" id="sure_application" style="background: #E3934B; cursor: pointer">提交申请</a>
    </div>







    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script>
    <%--<script src="js/example.js"></script>--%>
</body>
</html>
