<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="GetWarrantyInfos.aspx.cs" Inherits="WXApp.Warranty.GetWarrantyInfos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/GetWarrantyInfos.css?201903290111551111111" rel="stylesheet" />
    <script src="UI/Scripts/GetWarrantyInfos.js?201903290111551111111"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/Warranty/GetWarranty.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="salescode" type="hidden" value="<%=salescode %>" />
    <input id="usercode" type="hidden" value="<%=usercode %>" />
    <input id="username" type="hidden" value="<%=username %>" />

    <div id="pagethree" >
        <div class="content">
            <div class="row1">
                <div class="box1">设备编码</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <input type="text" value="" placeholder="请输入设备编码" />
                </div>
                
            </div>
            <div class="row2">
                <div class="box1">设备名称</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <input type="text" value="" placeholder="请输入设备名称" />
                </div>
                
            </div>
            <div class="row3">
               <div class="box1">厂区</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <select id="infotype">
                        <option value="长安OPPO一厂">长安OPPO一厂</option>
                        <option value="长安OPPO二厂">长安OPPO二厂</option>
                        <option value="长安OPPO三厂">长安OPPO三厂</option>
                        <option value="大朗以诺">大朗以诺</option>
                        <option value="深圳富士康">深圳富士康</option>
                        <option value="惠州龙旗">惠州龙旗</option>
                        <option value="昆山国显">昆山国显</option>
                        <option value="长安vivo M1">长安vivo M1</option>
                        <option value="长安vivo M2">长安vivo M2</option>
                        <option value="长安vivo M3">长安vivo M3</option>
                        <option value="长安vivo M5">长安vivo M5</option>
                        <option value="长安vivo M8">长安vivo M8</option>
                        <option value="长安vivo M10">长安vivo M10</option>
                        <option value="长安vivo M16">长安vivo M16</option>
                        <option value="虎门长城">虎门长城</option>
                        <option value="惠州海格">惠州海格</option>
                        <option value="惠州光宏">惠州光宏</option>
                        <option value="重庆vivo">重庆vivo</option>
                        <option value="长安vivo O4">长安vivo O4</option>
                        <option value="长安vivo D9">长安vivo D9</option>
                        <option value="印尼vivo">印尼vivo</option>
                        <option value="印尼OPPO">印尼OPPO</option>
                        <option value="印度vivo">印度vivo</option>
                        <option value="印度OPPO">印度OPPO</option>
                        <option value="江西联创">江西联创</option>
                        <option value="安徽协创">安徽协创</option>
                        <option value="深圳坚朗海贝斯">深圳坚朗海贝斯</option>
                        <option value="深圳合川">深圳合川</option>
                        <option value="深圳8848">深圳8848</option>
                        <option value="嘉达">嘉达</option>
                        <option value="天安云谷">天安云谷</option>
                        <option value="松山湖C区">松山湖C区</option>
                        <option value="松山湖B区">松山湖B区</option>
                        <option value="龙华富士康">龙华富士康</option>
                        <option value="宝龙比亚迪">宝龙比亚迪</option>
                        <option value="贵阳富士康">贵阳富士康</option>
                        <option value="长城开发">长城开发</option>
                        <option value="珠海伟创力">珠海伟创力</option>
                        <option value="光弘科技">光弘科技</option>
                        <option value="长沙伟创力">长沙伟创力</option>
                        <option value="南宁富士康">南宁富士康</option>
                    </select>
                </div>
            </div>
            <div class="row4">
                <div class="left">
                    <div class="box1">问题分类</div>
                    <div class="symbol">：</div>
                    <div class="box2">
                        <select id="gratetype">
                            <option>研发</option>
                            <option>机加</option>
                            <option>装配</option>
                            <option>标准件</option>
                            <option>指定同事</option>
                        </select>
                    </div>
                </div>
                <div class="right">
                    <div class="box1">推送列表</div>
                    <div class="symbol">：</div>
                    <div class="box2">
                        <input type="number" readonly="" value="0" min="0" />
                    </div>
                </div>
            </div>
            <div class="row5">
               <div class="box1">配件需求</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <textarea></textarea>
                </div>
            </div>
            <div class="row6">
               <div class="box1">故障描述</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <textarea></textarea>
                </div>
            </div>
            <div class="row7">
               <div class="box1">处理措施</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <textarea></textarea>
                </div>
            </div>
            <div class="row8">
               <div class="box1">故障日期</div>
                <div class="symbol">：</div>
                <div class="box2">
                    <input type="text" id="deliverydate" value="<%=DateTime.Now.ToString("yyyy/MM/dd") %>" />
                </div>
            </div>

            <div class="row10">
                <div class="box1">故障附图</div>
                <div class="symbol">：</div>
                <div class="box2">
                    
                </div>
            </div>

            <div class="row9">
                <div class="box1">处理附图</div>
                <div class="symbol">：</div>
                <div class="box2">
                  
                </div>
            </div>
        </div>
    </div>

     <form id="form_design" action="/Warranty/Message.aspx?action=processed" target="_self" method="post">
        <input id="salescode1" name="salescode" type="hidden" value="" />
    </form>

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
            label: '推送人员'
        });


        $('#infotype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择厂区'
        });

 

        $('#gratetype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '问题分类'
        });

        $('#deliverydate').mobiscroll().date({
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
     <div id="pagetwo" data-role="page" >
        <div class="img">
            <img src="" />
        </div>
        <div class="bottom_footer">
            <div class="resultbtn">
                <div class="box1 contor">返回</div>
            </div>
        </div>
    </div>
</asp:Content>

