<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="Warranty.aspx.cs" Inherits="WXApp.Warranty.Warranty" %>
<asp:Content ID="Content4" ContentPlaceHolderID="head" runat="server">
    <script src="UI/Scripts/Warranty.js?2019032901714"></script>
    <link href="UI/Styles/Warranty.css?20190329017143" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <input id="usercode" type="hidden" value="<%=usercode %>" />
    <input id="username" type="hidden" value="<%=username %>" />

     <div id="pageone"  data-role="page">
        <div class="module11">
            
        </div>
        <div class="rows4">
            <div id="addmateria2">添加列表</div>
            <div id="submitinfo2">提交信息</div>
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
            label: '选择类型'
        });

        $('#infotype').mobiscroll().select({
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
            label: '选择类型'
        });

        $('#gratetype').mobiscroll().select({
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

        $('#delivery_date2').mobiscroll().date({
            dateFormat: 'yy/mm/dd',
            theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
            mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
            display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
            minDate: new Date(2000, 3, 10, 9, 22),
            maxDate: new Date(2030, 7, 30, 15, 44),
            showNow: true,
            lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

        });

        $('#delivery_date3').mobiscroll().date({
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
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
    <div id="mid" data-role="page">
        <div class="module1">

             <div class="rows4">
                <div class="box1">
                    <div class="left">设备编号：</div>
                    <div class="right">
                        <input type="text" value=""  onkeyup="wordStatic(this);"/>
                    </div>
                </div>
               
                <div class="box2">
                    <div id="submitinfo1">验证</div>
                </div>
            </div>   

            <div class="rows2">
                <div class="box1" style="width:100%">
                    <div class="left">设备名称：</div>
                    <div class="right">
                        <input type="text" value="" />
                    </div>
                </div>
            </div>        
            
            <div class="rows3">
                <div class="box2">
                    <div class="left">厂区：</div>
                    <div class="right">
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
            </div>

            <div class="rows5">
                
                 <div class="box1">
                    <div class="left">上位机版本：</div>
                    <div class="right">
                       <input type="text" value="" />
                    </div>
                </div>
                <div class="box2">
                    <div class="left">下位机版本：</div>
                    <div class="right">
                        <input type="text" value=""/>
                    </div>
                </div>
            </div>

            <div class="rows1">
                
                 <div class="box1">
                    <div class="left">问题分类：</div>
                    <div class="right">
                       <select id="gratetype">
                  
                        </select>
                    </div>
                </div>
                <div class="box3">
                    <div class="left">指定人数：</div>
                    <div class="right">
                       <div class="number">0</div>
                    </div>
                </div>
                <div class="box2">
                    <div class="left">配件需求：</div>
                    <div class="right">
                        <input type="text" value=""/>
                    </div>
                </div>
            </div>

            <div class="rows7">
                <div class="box1">
                    <div class="left">故障描述：</div>
                    <div class="right">
                        <input type="text" value="" />
                    </div>
                </div>
            </div> 

             <div class="rows8">
                <div class="box1" style="width:100%">
                    <div class="left">故障原因：</div>
                    <div class="right">
                        <input type="text" value="" />
                    </div>
                </div>
            </div>

             <div class="rows9">
                <div class="box1" style="width:100%">
                    <div class="left">处理措施：</div>
                    <div class="right">
                        <input type="text" value="" />
                    </div>
                </div>
            </div>

            <div class="rows12">
                
                 <div class="box1">
                    <div class="left">故障起时间：</div>
                    <div class="right">
                       <input type="text" value="" id="delivery_date2" readonly="" />
                    </div>
                </div>
            </div>

            <div class="rows16">
                 <span>故障图片：</span>
            </div>

            <div class="rows15">

                 <div class="left">
                     <canvas id="myCanvas" data-filetype="" style="display:none;" ></canvas>
                    <img src="" style="display:none;" alt="" id="ago"  />
                        <i class="iconfont1">&#xe672;</i>
                        <input id="imgfile" style="display:none;" type="file" accept="image/*;capture=camera"   name="imgfile" onchange="getUrl(this.files,this.id);"/>                
                 </div>
            </div>

            <div class="rows14">
                <div class="left">
                    <div class="values">取消</div>
                </div>
                <div class="right">
                    <div class="values">确定</div>
                </div>
            </div>
    </div>
    <div id="mask300">

    </div>

    <div id="personnelmodul">
        <div class="top">推送人员列表<i class="iconfont">&#xe624;</i></div>
        <div class="mid">
           
        </div>
    </div>

   </div>
</asp:Content>