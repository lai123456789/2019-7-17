<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="SelectMaterial.aspx.cs" Inherits="WXApp.AdvanceOrder.SelectMaterial" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/SelectMaterial.css?2019058241" rel="stylesheet" />
    <script src="UI/Scripts/SelectMaterial.js?2019058241"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/AdvanceOrder/MaterialDrawing.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="usercode" type="hidden" value="<%=usercode %>" />
    <input id="drawingcode" type="hidden" value="<%=drawingcode %>" />
     <div id="mid">
        <div class="module1">

            <div class="rows2">
                <div class="box1" style="width:100%">
                    <div class="left">名称：</div>
                    <div class="right">
                        <input type="text" value="" readonly="" />
                    </div>
                </div>        
            </div>

            <div class="rows3">
                <div class="box1">
                    <div class="left">版本号：</div>
                    <div class="right">
                        <input type="text" value="" readonly="" />
                    </div>
                </div>
                <div class="box2">
                    <div class="left">订单类型：</div>
                    <div class="right">
                        <input readonly="" />
                    </div>
                </div>
            </div>

            <div class="rows1">
                
                 <div class="box1">
                    <div class="left">数量：</div>
                    <div class="right">
                        <%--<div class="values" >1</div>--%>
                        <input readonly="" />
                    </div>
                </div>
                <div class="box2">
                    <div class="left">图纸归档：</div>
                    <div class="right">
                        <input readonly="" />
                    </div>
                </div>
            </div>


        </div>
        <div class="module2">
            <div class="title">
                <div class="column0">选择</div>
                <div class="column1">物料名称</div>
                <div class="column2">数量</div>
                <div class="column3">状态</div>
            </div>
            <div class="content">
                
            </div>
        </div>
    </div>

     <div id="shenpi">
        <div class="materialinfo">
            <div class="column4">
                <div class="left">
                    <div class="values">不备料</div>
                </div>
                <div class="right">
                    <div class="values">备料</div>
                </div>
            </div>

        </div>
    </div>

     <div id="addinfo">
        <div class="materialinfo">

            <div class="column1">
                <div class="left">原因</div>
                <div class="right">
                    <textarea></textarea>
                </div>
            </div>
            <div class="column4">
                <div class="left">
                    <div class="values">取消</div>
                </div>
                <div class="right">
                    <div class="values">确定</div>
                </div>
            </div>

        </div>
    </div>

    <div id="mask300">

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
            label: '选择类型'
        });

        $('#infotype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择类型'
        });

        $('#delivery_date').mobiscroll().date({
            dateFormat: 'yy/mm/dd',
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            showNow: true,
            lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

        });

    </script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
</asp:Content>
