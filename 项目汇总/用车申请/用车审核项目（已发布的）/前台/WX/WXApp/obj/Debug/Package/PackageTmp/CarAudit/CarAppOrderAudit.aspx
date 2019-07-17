<%@ Page Title="用车审批列表" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="CarAppOrderAudit.aspx.cs" Inherits="WXApp.CarAudit.CarAppOrderAudit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/CarAppOrderAudit.css?20190423" rel="stylesheet" />
    <script src="UI/Scripts/CarAppOrderAudit.js?20190423"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
     <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="topinfo">
        <div class="box1 contor">全部</div>
        <div class="box1">未审批</div>
        <div class="box1">已审批</div>
        <div class="box1">已失效</div>
    </div>
    <div id="infodata">
        <div class="list1 contor">

            <%--<div class="infolist">
                <div class="left">--%>
                   <%-- <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status1">未审批</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 12:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">批准</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status2">已批车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 11:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status3">使用中</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 10:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status1">不通过</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 09:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status4">已还车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status5">已超时</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="list1">
            
            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status1">未审批</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 12:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                        <div class="undo_btn">批准</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status1">不通过</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 09:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="list1">
            
            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status2">已批车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 11:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000002
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status3">使用中</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/24 10:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        还车时间：05/24 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="list1">

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status4">已还车</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>

            <div class="infolist">
                <div class="left">
                    <div class="box1">
                        PL000001
                    </div>
                    <div class="box3">
                        林展浩
                    </div>
                    <div class="box2">
                        <div class="status status5">已超时</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="box1">
                        用车时间：05/23 12:00
                    </div>
                    <div class="box3">
                        回天安
                    </div>
                    <div class="box2">
                        天安数码城
                    </div>
                </div>
                <div class="right">
                    <div class="box1">
                        用车时间：05/23 18:00
                    </div>
                    <div class="box3">
                        提单时间：05/25 16:00
                    </div>
                    <div class="box2">
                        <div class="details_btn">详情</div>
                    </div>
                </div>
            </div>--%>

        </div>
    </div>
<%--   </div>
    </div>--%>
    <div id="approval_modal">
        <div class="top_title">
            <div class="left">选择车辆：</div>
            <div class="right">
                <select id="selectcar">
                  <%--  <option value="粤S8WN86">粤S8WN86</option>
                    <option value="粤S8WN87">粤S8WN87</option>
                    <option value="粤S8WN88">粤S8WN88</option>--%>
                </select>
            </div>
        </div>
        <div class="content">
            <textarea id="approval_remark" placeholder="请输入备注说明" onkeyup="isempty()"></textarea>
        </div>
        <div class="label">
            <div class="label_1">钥匙在保安室</div>
            <div class="label_2">钥匙在我桌子上</div>
        </div>
        <div class="bottom">
            <div class="btn_cancel">取消</div>
            <div class="btn_sure" id="btn_1">批准</div>
        </div>
    </div>

    <div id="mask300" class=""></div>



     <script>

        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang = "zh";


        $('#selectcar').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择车辆'
        });
    </script>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
</asp:Content>
