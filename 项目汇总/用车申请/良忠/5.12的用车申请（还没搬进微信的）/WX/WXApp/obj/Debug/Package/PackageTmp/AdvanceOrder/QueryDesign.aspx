<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="QueryDesign.aspx.cs" Inherits="WXApp.AdvanceOrder.QueryDesign" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/QueryDesign.css?2016429" rel="stylesheet" />
    <script src="UI/Scripts/QueryDesign.js?2016429"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <input id="usercode" type="hidden" value="<%=usercode %>" />
    <div id="conditions">
        <div class="left">
            <select id="onetype">
                <option value="全部">全部</option>
                <option value="流程单号">流程单号</option>
                <option value="试制号">试制号</option>
                <option value="图档号">图档号</option>
                <option value="规格型号及夹具名称">规格型号及夹具名称</option>
                <option value="需求数量">需求数量</option>
                <option value="归类">归类</option>
            </select>
            <input type="text" id="oneval" value="" placeholder="请输入筛选值"/>
            <div class="query">查询</div>
        </div>
        <div class="dropdown">
            <i class="iconfont">&#xe695;</i>
        </div>
    </div>
    <div class="table-responsive" id="div_form_table">
        <%--<div class="infolist">
            <div class="maininfo">
                <div class="rows1">
                    <div class="box1">夹具-全新非标-DKBA44325926-手机-Yale 整机保护套模具(非标_SH-BHT01)修改</div>
                </div>
                <div class="rows2">
                    <div class="left">
                        <div class="box1">流程单号：177697</div>
                        <div class="box2">图档号：02430XTR-002</div>
                    </div>
                    <div class="mid">
                        <div class="box1">1</div>
                    </div>
                    <div class="right">
                        <div class="box1">夹具版本升级</div>
                    </div>
                </div>
                <div class="rows3">
                    <div class="box1">系统通知日期：2019/1/14</div>
                    <div class="box2">归类：非标</div>
                    <div class="box3">
                        <i class="iconfont">&#xe784;</i>
                    </div>
                </div>
            </div>
            <div class="detialinfo">
                <div class="rows1">
                    <div class="box1">试制号：88013GNY</div>
                    <div class="box2">子流程单号：</div>
                </div>
                <div class="rows2">
                    <div class="box1">项目经理：wangjunjun_00356177</div>
                    <div class="box2">提单人：松山湖C4</div>
                </div>
            </div>
        </div>--%>

        <%--<table id="form_table" class="table table-small-font table-bordered table-striped col-selectable row-selectable" style="width:calc(100% - 2px)">
            <thead id="form_th">
                <tr>
                    <th>流程单号</th>
                    <th>项目经理</th>
                    <th>试制号</th>
                    <th>图档号</th>
                    <th>规格型号及夹具名称</th>
                    <th>需求数量</th>
                    <th>归类</th>
                    <th>提单人</th>
                    <th>系统通知日期</th>
                    <th>需求场景</th>
                    <th>子流程单号</th>
                </tr>
            </thead>
            <tbody id="form_tb">
                
            </tbody>
        </table>--%>
    </div>

    <div id="bottom_footer">
        <div class="left">
            <div class="box1">20/30</div>
        </div>
        <div class="right">
            <div class="box1">查看明细</div>
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

    

    <form id="form_design" action="/AdvanceOrder/UpdataAdvanceOrder.aspx?action=design" target="_self" method="post">
        <input id="ProcessNo" name="ProcessNo" type="hidden" value="" />
        <input id="TrialNo" name="TrialNo" type="hidden" value="" />
        <input id="ImageNo" name="ImageNo" type="hidden" value="" />
        <input id="Name" name="Name" type="hidden" value="" />
        <input id="DemandNum" name="DemandNum" type="hidden" value="" />
        <input id="Scenario" name="Scenario" type="hidden" value="" />
        <input id="ArchiveDate" name="ArchiveDate" type="hidden" value="" />
        <input id="drawingcode" name="drawingcode" type="hidden" value="" />
    </form>

    <form id="form_design1" action="/AdvanceOrder/QueryAdvanceOrder.aspx?action=design" target="_self" method="post">
        <input id="ProcessNo1" name="ProcessNo" type="hidden" value="" />
        <input id="TrialNo1" name="TrialNo" type="hidden" value="" />
        <input id="ImageNo1" name="ImageNo" type="hidden" value="" />
        <input id="Name1" name="Name" type="hidden" value="" />
        <input id="DemandNum1" name="DemandNum" type="hidden" value="" />
        <input id="Scenario1" name="Scenario" type="hidden" value="" />
        <input id="ArchiveDate1" name="ArchiveDate" type="hidden" value="" />
        <input id="drawingcode1" name="drawingcode" type="hidden" value="" />
    </form>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
