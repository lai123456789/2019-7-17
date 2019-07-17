<%@ Page Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="adminAll_application_index.aspx.cs" Inherits="WXApp.Use_car.adminAll_application_index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="style/weui.css" />
    <link rel="stylesheet" href="style/example.css" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/adminAll_application_index.css" rel="stylesheet" />

    <script src="js/zepto.min.js"></script>
    <script src="js/weui.min.js"></script>
    <script src="script/adminAll_application_index.js"></script>
    <style>
        .lei{
            background:red;
        }
        #sel .weui-flex__item{
           margin:2px;
           border:1px solid gray;
           text-align:center
       }
        .bground{
            background:gray;
            opacity:0.5;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" name="name" value="<%=usercode%>" id="usercode" />

    <div class="weui-cells" style="margin-top: 1.6rem">
        <div class="weui-cell__hd" style="text-align: center; line-height: 45px;">
            <a href="#">用车申请汇总</a>
        </div>
    </div>


    <div id="select_info" style="width: 100%;border:0px"><button style="text-align: center">查询</button></div>
    <div class="itemAll_select" style="display: none; background: white;margin-top:20px;"><%--查询的--%>
        
        <div class="weui-flex" id="sel">
            <div class="weui-flex__item lei">待审核</div>
            <div class="weui-flex__item">已撤销</div>
            <div class="weui-flex__item">已驳回</div>
            <div class="weui-flex__item">已审核</div>
            <div class="weui-flex__item">已还车</div>
        </div>
    </div>




    <div class="weui-cells weui-cells_form" id="all">

        <%-- <div class="" style="display: flex; width: 100%; margin-top: 8px;">

            <div class="" style="width: 42%; font-size: 14px;">
                <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />申请单号：<span style="" id="code">PL000879</span>

            </div>
            <div class="" style="width: 42%; font-size: 14px;">
                <img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />申请人：<span style="font-size: 14px;" id="name">赖良坤</span>
            </div>
            <div class="" style="width: 16%">
                <span class="weui-badge" style="background: green">已批准</span>
            </div>

        </div>

        <div class="" style="display: flex; width: 100%; margin-top: 8px;">

            <div class="" style="width: 42%; font-size: 14px;">
                <img class="weui-vcode-img" src="./images/result.png" style="width: 20px; height: 20px;" />驳回原因：<span style="font-size: 14px;" id="result">领导专用</span>

            </div>
            <div class="" style="width: 42%; font-size: 14px;">
                <img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />所在部门：<span style="font-size: 14px;" id="department">赖良坤</span>
            </div>
            <div class="" style="width: 16%" id="zhankai">  
                <i class="iconfont">&#xe784;</i>
            </div>

        </div>
       
        
        <div class="itemAll22" style="display: none;"> 

            <div class="weui-flex">
                <div class="weui-flex__item">
                    <div class="" style="font-size: 14px;">
                        <img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />目的地：<span style="margin-left: 5px; font-size: 14px;">深圳广州</span>

                    </div>
                </div>
                <div class="weui-flex__item">
                    <div class="" style="font-size: 14px;">
                        <img class="weui-vcode-img" src="./images/icon_nav_flow.png" style="width: 20px; height: 20px;" />申请用途：<span style="margin-left: 5px; font-size: 14px;">要外出公事</span>

                    </div>
                </div>

            </div>

            <div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">
                <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />用&nbsp;&nbsp;车&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;：                
                <span style="font-size: 14px;" id="use_time">2019-05-09 20:00</span>
            </div>
            <div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">
                <img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />预计还车时间：               
                <span style="font-size: 14px;" id="use_return_time">2019-05-09 20:00</span>
            </div>
            <div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">
                <div class="" style="font-size: 14px;">
                    <img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;" id="name1">赖良坤</span>

                </div>
            </div>




        </div> --%>
    </div>

    <div style="display: none;" id="tongyi" class="weui-dialog weui-dialog--visible">
        <%--同意的对话框--%>
        <div class="weui-cells weui-cells_form" style="margin-top: 1.6rem">


            <div class="weui-cell">
                <img class="weui-vcode-img" src="./images/chepai.png" style="width: 20px; height: 20px;" />
                <label class="weui-cells__title">&nbsp;车&nbsp;牌&nbsp;号：</label>

                <select id="materialtype" style="border: 0; clear: both; display: none">
                    <option id="pai">请选择车牌</option>
                </select>

                <div class="weui-cell__ft">
                    <%-- <img class="weui-vcode-img" src="./images/icon_nav_article.png"  style="width: 23px; height: 23px;">--%>
                    <i class="iconfont">&#xe750;</i>
                </div>
            </div>


            <div class="weui-cell">
                <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
                <label class="weui-cells__title">申请单号：<span style="margin-left: 10px;" id="application_danhao1"></span></label>

            </div>

            <div class="weui-cell" style="width: 100%">

                <img class="weui-vcode-img" src="./images/zhuangtai1.png" style="width: 20px; height: 20px;" />
                <label class="weui-cells__title">&nbsp;备&nbsp;&nbsp;注：<span style="margin-left: 10px;"></span></label>
                <div class="weui-cell__bd">
                    <input id="remark" class="weui-input" type="text" placeholder="请输入备注" />
                </div>
            </div>

        </div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn" id="queding_tongyi">确定</a>
            <a href="javascript:;" class="weui-dialog__btn default" id="quxiao">取消</a>
        </div>

    </div>

    <div style="display: none;" id="jujue" class="weui-dialog weui-dialog--visible">
        <%--拒绝的对话框--%>
        <div class="weui-cells weui-cells_form" style="margin-top: 1.6rem">
            <div class="weui-cell">
                <img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" />
                <label class="weui-cells__title">申请单号：<span style="margin-left: 10px;" id="application_danhao_jujue"></span></label>

            </div>
            <div class="weui-cell" style="width: 100%">
                <input id="result1" class="weui-input" type="text" placeholder="请输入原因" />
            </div>
        </div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn" id="jujue_sure">确定</a>
            <a href="javascript:;" class="weui-dialog__btn default" id="jujue_quxiao">取消</a>
        </div>
    </div>

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
