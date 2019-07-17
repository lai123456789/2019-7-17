<%@ Page Title="" Language="C#" MasterPageFile="~/WXMaster.Master" AutoEventWireup="true" CodeBehind="Message.aspx.cs" Inherits="WXApp.Warranty.Message" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="UI/Styles/Message.css?20191111111" rel="stylesheet" />
    <script src="UI/Scripts/Message.js?20191111111"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <i class="iconfont" data-url="/WXAccredit.aspx">&#xe64e;</i>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="usercode" type="hidden" value="<%=usercode %>" />
    <input id="salescode" type="hidden" value="<%=salescode %>" />
    <div class="panel panel-default" id="datalist">
            <div id="replydetails">

               <%-- <div class="centre">
                    <div class="showdate">2019/03/10 15:54</div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">陈良忠</div>
                            <div class="account">3380</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>

                <div class="left">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">林展浩</div>
                            <div class="account">3350</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了</div>
                    </div>
                </div>

                <div class="left">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">林展浩</div>
                            <div class="account">3350</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>

                <div class="left">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">林展浩</div>
                            <div class="account">3350</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了</div>
                    </div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">陈良忠</div>
                            <div class="account">3380</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">陈良忠</div>
                            <div class="account">3380</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>

                <div class="centre">
                    <div class="showdate">2019/03/10 16:54</div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">陈良忠</div>
                            <div class="account">3380</div>
                        </div>
                        <div class="img">
                            <img src="/UI/Image/head.jpg" />
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">陈良忠</div>
                            <div class="account">3380</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>

                <div class="left">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">林展浩</div>
                            <div class="account">3350</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>

                <div class="left">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">林展浩</div>
                            <div class="account">3350</div>
                        </div>
                        <div class="img">
                            <img src="/UI/Image/head.jpg" />
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="content">
                        <div class="userinfo">
                            <div class="username">陈良忠</div>
                            <div class="account">3380</div>
                        </div>
                        <div class="msg">测试一下<br />这里厉害了哗啦呼啦哗啦</div>
                    </div>
                </div>--%>
            </div>
            <div id="replyoperation">
                <div class="mid">
                    <textarea   id="input"></textarea>
                </div>
                <div class="right">
                    <div class="sure_ok">提交</div>
                </div>
            </div>
        </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">
     <div id="pagefive" data-role="page" >
        <div class="img">
            <img src="../UI/Image/每通-2.gif" />
        </div>
        <div class="bottom_footer">
            <div class="resultbtn">
                <div class="box1 contor">返回</div>
                <div class="box2 contor">删除</div>
            </div>
        </div>
    </div>

    <div id="pagesix" data-role="page" >
        <div class="img">
            <img src="../UI/Image/每通-2.gif" />
        </div>
        <div class="bottom_footer">
            <div class="resultbtn">
                <div class="box1 contor">返回</div>
                <div class="box2 contor">删除</div>
            </div>
        </div>
    </div>
</asp:Content>
