<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="UpdataAdvanceOrder.aspx.cs" Inherits="WXApp.AdvanceOrder.UpdataAdvanceOrder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/UpdataAdvanceOrder.css?201941171" rel="stylesheet" />
    <script src="UI/Scripts/UpdataAdvanceOrder.js?201941711"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="ProcessNo" type="hidden" value="<%=流程单号 %>" />
    <input id="TrialNo" type="hidden" value="<%=试制号 %>" />
    <input id="ImageNo" type="hidden" value="<%=图档号 %>" />
    <input id="Name" type="hidden" value="<%=名称 %>" />
    <input id="DemandNum" type="hidden" value="<%=需求数量 %>" />
    <input id="Scenario" type="hidden" value="<%=需求场景 %>" />
    <input id="ArchiveDate" type="hidden" value="<%=图纸归档 %>" />
    <input id="drawingcode" type="hidden" value="<%=图纸代码 %>" />
       <div id="mid">
        <div class="module1">

            <div class="rows2">
                <div class="box1" style="width:100%">
                    <div class="left">名称：</div>
                    <div class="right">
                        <input type="text" value="" />
                    </div>
                </div>
               
            </div>

            
            
            <div class="rows3">
                <div class="box1">
                    <div class="left">图档编号：</div>
                    <div class="right">
                        <input type="text" value="" />
                    </div>
                </div>
                <div class="box2">
                    <div class="left">订单类型：</div>
                    <div class="right">
                        <select id="infotype">
                            <option value="新制">新制</option>
                            <option value="改制">改制</option>
                            <option value="返修">返修</option>
                            <option value="量产">量产</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="rows1">
                
                 <div class="box1">
                    <div class="left">数量：</div>
                    <div class="right">
                       <div class="values">1</div>
                    </div>
                </div>
                <div class="box2">
                    <div class="left">图纸归档：</div>
                    <div class="right">
                        <input type="text" readonly="" />
                    </div>
                </div>
            </div>

            <div class="rows4">
                <div id="addmaterial">添加列表</div>
                <div id="submitinfo">提交信息</div>
            </div>

        </div>
        <div class="module2">
            <div class="title">
                <div class="column1">名称</div>
                <div class="column2">数量</div>
                <div class="column3">类型</div>
                <div class="column4">操作</div>
            </div>
            <div class="content">
                
            </div>
        </div>
    </div>

    
    <div id="addinfo">
        <div class="materialinfo">

            <div class="column1">
                <div class="left">描述</div>
                <div class="right">
                    <%--<input type="text" value="" />--%>
                    <textarea></textarea>
                </div>
            </div>
            <div class="column2">
                <div class="left">数量</div>
                <div class="right">
                    <div class="values">1</div>
                </div>
            </div>
            <div class="column3">
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
