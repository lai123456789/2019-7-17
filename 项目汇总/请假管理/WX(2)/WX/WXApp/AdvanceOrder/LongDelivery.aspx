<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="LongDelivery.aspx.cs" Inherits="WXApp.AdvanceOrder.LongDelivery" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/LongDelivery.css?201952111" rel="stylesheet" />
    <script src="UI/Scripts/LongDelivery.js?201952111"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="usercode" type="hidden" value="<%=usercode %>" />
    <div id="conditions">
        <div class="left">
            <select id="onetype">
                <option value="全部">全部</option>
                <option value="流程单号">流程单号</option>
                <option value="项目经理">项目经理</option>
                <option value="试制号">试制号</option>
                <option value="图档号">图档号</option>
                <option value="规格型号及夹具名称">规格型号及夹具名称</option>
                <option value="需求数量">需求数量</option>
                <option value="归类">归类</option>
                <option value="提单人">提单人</option>
                <option value="需求场景">需求场景</option>
                <option value="子流程单号">子流程单号</option>
            </select>
            <input type="text" id="oneval" value="" placeholder="请输入筛选值"/>
            <div class="query">查询</div>
        </div>
        <div class="dropdown">
            <i class="iconfont">&#xe695;</i>
        </div>
    </div>
    <div class="table-responsive" id="div_form_table">
    </div>


    <div id="yesinfo">
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

    <div id="noinfo">
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


    <div id="bottom_footer">
        <div class="left">
            <div class="box1">0/0</div>
            <div class="box2">非长交期</div>
        </div>
        <div class="right">
            <div class="box1">是长交期</div>
        </div>
    </div>



    <script>

        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang = "zh";
        $('#onetype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });
    </script>

    

    <form id="form_design" action="/AdvanceOrder/AddAdvanceOrder.aspx?action=design" target="_self" method="post">
        <input id="ProcessNo" name="ProcessNo" type="hidden" value="" />
        <input id="PM" name="PM" type="hidden" value="" />
        <input id="TrialNo" name="TrialNo" type="hidden" value="" />
        <input id="ImageNo" name="ImageNo" type="hidden" value="" />
        <input id="Name" name="Name" type="hidden" value="" />
        <input id="DemandNum" name="DemandNum" type="hidden" value="" />
        <input id="Classified" name="Classified" type="hidden" value="" />
        <input id="Lading" name="Lading" type="hidden" value="" />
        <input id="Sysnotifydate" name="Sysnotifydate" type="hidden" value="" />
        <input id="Scenario" name="Scenario" type="hidden" value="" />
        <input id="SubprocessNo" name="SubprocessNo" type="hidden" value="" />
    </form>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
</asp:Content>
