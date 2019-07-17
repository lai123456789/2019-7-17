<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="re_login.aspx.cs" Inherits="WXApp.WX.re_login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title></title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />
    <link rel="stylesheet" href="css/example.css" />
    <script src="js/jquery-1.11.3.min.js"></script>
    
</head>
<body>
    <script>
        
        $(function () {
            onload = function () {
                $.ajax({
                    cache: true,
                    type: "POST",
                    url: "http://o24034e466.qicp.vip/Login.aspx?action=Logout",
                    dataType: "json",
                    async: true,
                    success: function data(data) {
                        if (data.errcode == 0)  //提取成功
                        {
                            //localStorage.setItem("usercode", data.data[0].usercode);
                            //localStorage.setItem("token", data.data[0].token);
                            //localStorage.setItem("usertype", data.data[0].usertype);
                            //localStorage.setItem("username", data.data[0].username);
                            //if (data.data[0].usertype == 2) {
                            //    location.href = "../WXadmin_info/WXadmin_info.html";

                            //} else if (data.data[0].usertype == 3) {
                            //    location.href = "../WXadmin_href/WXadmin_href.html"; //../WXadmin_info/WXadmin_info.html
                            //}
                            //else {
                            //    location.href = "../gongdan_server_info/gongdan_server_info.html";
                            //}
                            if (data.data[0].usertype == 1) {
                                location.href = "gongdan_server_info.aspx";
                                } else if (data.data[0].usertype == 2) {
                                    location.href = "WXadmin_href.aspx"; //../WXadmin_info/WXadmin_info.html
                                }
                                
                        } else//提取失败
                        {
                            alert(data.errmsg);
                        }

                    }
                });
            }
        })
    </script>
</body></html>
