<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="shuaixuan_car.aspx.cs" Inherits="WXApp.shuaixuan_car" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css" />
    <link rel="stylesheet" href="style/example.css" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script>
    <script src="script/shuaixuan_car.js"></script>
    <style>
        #materialtype_dummy {
            border: 0;
            font-size: 15px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <%--<i class="iconfont" data-url="admin_look_application.aspx">&#xe64e;</i>--%>    
    <a href="javascript:history.back();"><i class="fa fa-chevron-left"  style="color:white"></i></a> 
      
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" name="name" value="<%=usercode%>" id="usercode" />
    <%-- <input type="hidden" name="name" value="<%=usertype%>" id="usertype"/> --%>
    
    <div class="weui-cells weui-cells_form" style="margin-top:1.6rem">

        
        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/chepai.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">&nbsp;车&nbsp;牌&nbsp;号：</label>
            
            <select id="materialtype" style="border: 0; clear: both;display:none">
                <option id="pai">请选择车牌</option>
            </select>

            <div class="weui-cell__ft">
                <%-- <img class="weui-vcode-img" src="./images/icon_nav_article.png"  style="width: 23px; height: 23px;">--%>
                <i class="iconfont">&#xe750;</i>
            </div>
        </div>


        <div class="weui-cell">
            <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">申请单号：<span style="margin-left: 10px;" id="danhao"></span></label>

        </div>

        <div class="weui-cell" style="width: 100%">

            <img class="weui-vcode-img" src="./images/zhuangtai1.png" style="width: 20px; height: 20px;" />
            <label class="weui-cells__title">&nbsp;备&nbsp;&nbsp;注：<span style="margin-left: 10px;"></span></label>
            <div class="weui-cell__bd">
                <input id="remark" class="weui-input" type="text" placeholder="请输入备注" />
            </div>
        </div>

    </div>



    <div style="width: 100%; display: flex; justify-content: center">
        <div class="weui-btn-area" style="width: 50%;">
            <a class="weui-btn" id="remark_sure" style="background: #2196F3; cursor: pointer; color: white">确定</a>
        </div>
    </div>

    <%-- <div class="column3">
                <div class="left">类型</div>
                <div class="right">
                    <select id="materialtype">
                        <option>标准件备料</option>
                        <option>加工件备料</option>
                        <option>人力准备</option>
                        <option>技术准备</option>
                        <option>材料备料</option>
                    </select>
                </div>
            </div>--%>

    <script>
        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang = "zh";
        $('#materialtype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '车牌'
        });
    </script>

</asp:Content>

