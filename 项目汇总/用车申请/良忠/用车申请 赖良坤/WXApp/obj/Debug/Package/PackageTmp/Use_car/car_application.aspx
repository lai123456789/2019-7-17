<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="car_application.aspx.cs" Inherits="WXApp.WX.use_car.car_application" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css" />
    <link rel="stylesheet" href="style/example.css" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />

    <link href="style/demos.css" rel="stylesheet" />
    <link href="style/jquery-weui.css" rel="stylesheet" />
    <script src="js/fastclick.js"></script>
    <script src="js/jquery-2.1.4.js"></script>
    <script src="js/jquery-weui.js"></script>

    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script>
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

        .weui-input {
            font-size: 15px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <%--<i class="iconfont" data-url="admin_look_application.aspx">&#xe64e;</i>--%>
    <a href="javascript:history.back();"><i class="fa fa-chevron-left" style="color: white"></i></a>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" name="name" value="<%=usercode%>" id="usercode" />
    <div class="weui-cells weui-cells_form" style="margin-top: 1.5rem">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label-ren">&nbsp;&nbsp;申&nbsp;请&nbsp;人：</label>
            </div>
            <div class="weui-cell__bd">
                <input readonly="readonly" style="margin-left:15px;" class="weui-input" type="text" value="" id="application_user" placeholder="请输入申请人" />
            </div>
            <div class="weui-cell__ft">
                <i class="iconfont">&#xe63b;</i>
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">&nbsp;&nbsp;&nbsp;工&nbsp;&nbsp;号：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text"  value="" readonly="readonly" id="application_user_num" placeholder="请输入工号" />
            </div>
            <div class="weui-cell__ft">
                <i class="iconfont">&#xe63b;</i>
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">所在部门：</label>
            </div>
            <div class="weui-cell__bd">

                <input class="weui-input" value=""  type="text" readonly="readonly"  id="application_departmentname"/>
                <%--<div class="page__bd page__bd_spacing">

                    <div class="weui-cells__title" id="showPicker" style="font-size: 16px">
                        请选择部门                        
                    </div>


                </div>--%>
            </div>
            <div class="weui-cell__ft">
                <%-- <img class="weui-vcode-img" src="./images/icon_nav_article.png"  style="width: 23px; height: 23px;">--%>
                <i class="iconfont">&#xe750;</i>
            </div>
        </div>
    </div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">前往目的地：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="tel" placeholder="请输入地址" id="application_address" />
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width: 23px; height: 23px;">
            </div>
        </div>
    </div>

    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">申请用途：</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="tel" placeholder="请输入申请用途" id="application_result"/>
            </div>
            <div class="weui-cell__ft">
                <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width: 23px; height: 23px;">
            </div>
        </div>
    </div>

      
    <div class="weui-cells weui-cells_form">       
        <div class="weui-cell">
        <div class="weui-cell__hd"><label for="time-format" class="weui-label">申请用车时间:</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="years-monthes" type="text" value="2019-05-21 12:00"/>
        </div>
      </div>
    </div>


   <%-- <a class="weui-cell weui-cell_access font14" href="javascript:;" onclick="ShowTimePicker()">
						<div class="weui-cell__hd">
							时间 时 分 的选择
						</div>
						<div class="weui-cell__bd">
							<p id="time">服务时间</p>
						</div>
						<div class="weui-cell__ft public-color">
							<input class="weui-input text-right" readonly="readonly" type="text" placeholder="请选择服务时间" />
						</div>
					</a>--%>

    <div class="weui-cells weui-cells_form">       
        <div class="weui-cell">
        <div class="weui-cell__hd"><label for="time-format" class="weui-label">预计还车时间:</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="years-monthes-return" type="text" value="2019-05-23 12:00"/>
        </div>
      </div>
    </div>


    <div class="weui-btn-area" style="">
        <a class="weui-btn" id="sure_application" style="background: #2196F3; cursor: pointer; color: white">提交申请</a>
    </div>
    
    <script>
        $("#years-monthes").datetimePicker({
            // title: '限定年月',
            // years: [2017, 2018],
            // monthes: ['06', '07'],
            onChange: function (picker, values, displayValues) {
                console.log(values);
            }
        });
        $("#years-monthes-return").datetimePicker({
            // title: '限定年月',
            // years: [2017, 2018],
            // monthes: ['06', '07'],
            onChange: function (picker, values, displayValues) {
                console.log(values);
            }
        });
        //function ShowTimePicker() { //选择时间 时分
        //    var hours = [];
        //    var minites = [];
        //    if (!hours.length) {
        //        for (var i = 0; i < 25; i++) {
        //            hours.push({
        //                label: ('' + i).length === 1 ? '0' + i + "时" : '' + i + "时",
        //                value: i
        //            });
        //        }
        //    }
        //    if (!minites.length) {
        //        for (var j = 0; j < 60; j++) {
        //            minites.push({
        //                label: ('' + j).length === 1 ? +j + "分" : '' + j + "分",
        //                value: j
        //            });
        //        }
        //    }
        //    weui.picker(hours, minites, {
        //        defaultValue: [new Date().getHours() + 1, 0],
        //        onConfirm: function (result) {
        //            var timeend = result[1] < 10 ? ("0" + result[1]) : result[1];
        //            var time = result[0] + ':' + timeend;
        //            $("#time").text(time)
        //        }
        //    });
        //}

    </script>
</asp:Content>
