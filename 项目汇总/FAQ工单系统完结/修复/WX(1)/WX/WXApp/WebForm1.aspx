<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WXApp.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>绑定</title>
    <link href="WX/css/weui.css" rel="stylesheet" />
    <link href="WX/css/example.css" rel="stylesheet" />

    <script src="WX/js/jquery-1.11.3.min.js"></script>
    <script src="WX/js/weui.js"></script>

</head>
<body>
    
    
    
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd weui-cells__title">请输入允许绑定的工号：</div>
          <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="工号" id="gonghao" />
        </div>
        </div>
    </div>   

    

    <div class="button-sp-area" style="text-align:center">                     
            <button  class="weui-btn weui-btn_mini weui-btn_primary"  value="0" id="yes" style="margin-right:30px;">允许</button>
            <button  class="weui-btn weui-btn_mini weui-btn_warn" value="1" id="no">拒绝</button>
    </div>
    

</body>
<script>    
        $(document).on('click',"#yes", function () {  //点击允许按钮的事件
            var accont = $("#gonghao").val();
            var id = $(this).val();
            $.ajax({
                cache: true,
                type: "POST",
                url: "WebForm1.aspx?action=GetUsercod",
                dataType: "json",
                async: true,
                data: {
                    "accont": accont,
                    "id": id
                },
                success: function data(data) {
                    alert("允许成功！")

                }
            });
        })


        $(document).on('click', "#no", function () {  //点击允许按钮的事件
            var accont = $("#gonghao").val();
            var id = $(this).val();
            $.ajax({
                cache: true,
                type: "POST",
                url: "http://240344pb55.qicp.vip/WebForm1.aspx?action=GetUsercod",
                dataType: "json",
                async: true,
                data: {
                    "accont": accont,
                    "id": id
                },
                success: function data(data) {
                    alert("已拒绝绑定！")

                }
            });
        })

</script>
</html>
