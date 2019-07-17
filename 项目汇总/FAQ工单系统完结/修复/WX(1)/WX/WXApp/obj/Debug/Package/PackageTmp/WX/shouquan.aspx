<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="shouquan.aspx.cs" Inherits="WXApp.WX.shouquan" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover">
    <title></title>
    <link href="css/font-awesome.min.css" rel="stylesheet"><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />
    <link rel="stylesheet" href="css/example.css" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/weui.js"></script>

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
                            location.href = "create_gongdan.aspx";
                        } else//提取失败
                        {
                            alert(data.errmsg);
                        }

                    }
                });
            }
        })
    </script>
</body>
</html>
