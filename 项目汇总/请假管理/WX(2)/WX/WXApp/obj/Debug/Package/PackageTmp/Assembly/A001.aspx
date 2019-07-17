<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="A001.aspx.cs" Inherits="WXApp.Assembly.A001" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/A001.css?20190423" rel="stylesheet" />
    <script src="UI/Scripts/A001.js?20190423"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="usercode" value="<%=wxuserinfo.usercode %>" />
    <div id="conditions">
        <div class="left">
            <div class="rows">
                <select id="onetype">
                    <option value="全部">全部</option>
                    <option value="PJ">PJ号</option>
                    <option value="名称">名称</option>
                    <option value="下单人">下单人</option>
                </select>
                <input type="text" id="oneval" value="" placeholder="请输入筛选值"/>
            </div>

            <div class="rows">
                <select id="twotype">
                    <option value="全部">全部</option>
                    <option value="下单时间">下单时间</option>
                </select>
                <input type="text" id="stardate" value="" readonly="" placeholder="开始时间" />
                <input type="text" id="enddate" value="" readonly="" placeholder="结束时间" />
            </div>

            <div class="rows">
                <select id="threetype">
                    <option value="全部">全部</option>
                    <option value="未开始">未开始</option>
                    <option value="进行中">进行中</option>
                    <option value="已完成">已完成</option>
                    <option value="异常">异常</option>
                </select>
                <%--<input type="text" id="threeval" value="" placeholder="请输入筛选值"/>--%>
            </div>

            <div class="query">查询</div>
        </div>
        <div class="dropdown">
            <i class="iconfont">&#xe695;</i>
        </div>
    </div>
    <div class="table-responsive" id="div_form_table">
        
        <%--<div class="infolist">
            <div class="rows1">
                <div class="box1">夹具-W-BTF-1-DKBA44327135-MH-H112-370单板CBT测试夹具(W-BTF-1)</div>
            </div>
            <div class="rows2">
                <div class="left">
                    <div class="box1">191509</div>
                    <div class="box2">胡菊姣</div>
                </div>
                <div class="mid">
                    <div class="box1">6</div>
                </div>
                <div class="right">
                    <div class="box1">
                        <div class="column1">5</div>
                        <div class="column2">1</div>
                    </div>
                    <div class="box2">
                        <div class="column1">0</div>
                        <div class="column2">0</div>
                    </div>
                </div>
            </div>
            <div class="rows3">
                <div class="left">
                    <div class="box1">打印</div>
                    <div class="box2">详情</div>
                    <div class="box3">编工艺</div>
                </div>
                <div class="right">
                    <div class="box1">2019/4/15 8:39:10</div>
                </div>
            </div>
        </div>--%>

    </div>

    <div id="bottom_footer">
        <div class="left">
            <div class="box1">0/0</div>
        </div>
        <div class="right">
            <div class="box1">添加信息</div>
        </div>
    </div>


    <select id="modulestatus" style="position: fixed;width: 0px;height: 0px;top: 1rem;">
        
    </select>



    <script>

        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang = "zh";

        $('#modulestatus').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '作业明细'
        });
        $('#onetype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });

        $('#twotype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });

        $('#threetype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择筛选条件'
        });

        $('#stardate').mobiscroll().date({
            dateFormat: 'yy/mm/dd',
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            showNow: true,
            lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

        });

        $('#enddate').mobiscroll().date({
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
