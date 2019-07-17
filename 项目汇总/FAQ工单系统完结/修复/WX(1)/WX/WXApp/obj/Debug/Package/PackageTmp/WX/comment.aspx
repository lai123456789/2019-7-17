<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="comment.aspx.cs" Inherits="WXApp.Wx.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>
    <title>工单问题详情页</title>
    <link href="css/font-awesome.min.css" rel="stylesheet"/><!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />
    <link rel="stylesheet" href="css/example.css" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/weui.js"></script>
    <%--<script src="comment.js"></script>--%>
    <script src="js/comment.js"></script>
    <script>

    </script>
</head>
<body>
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <p style="font-size: 19px;"><a href="javascript:history.back();" class="weui-cells__title"><i class="fa fa-chevron-left"></i></a></p>
            </div>
            <div class="weui-cell__bd" style="text-align:center;font-size: 16px;line-height: 50px;">
                评价
            </div>

        </div>
    </div>

    <!-- 工单描述 -->
    <div class="weui-cells__title weui-cell__bd" style="text-align: center;">
        工单评价
    </div>
    <div class="weui-cells">
        <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">服务态度</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2" id="attitude">
                    <option value="1">非常好</option>
                    <option value="2">很好</option>
                    <option value="3">好</option>
                    <option value="4">一般</option>
                    <option value="5">中</option>
                </select>
                <select class="weui-select" name="select2" id="select_attitude" style="display:none">
                    <option value="1">非常好</option>
                    <option value="2">很好</option>
                    <option value="3">好</option>
                    <option value="4">一般</option>
                    <option value="5">中</option>
                </select>
                <div id="attitude1"></div>
            </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">产品功能</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="select2" id="function">
                    <option value="1">非常好</option>
                    <option value="2">很好</option>
                    <option value="3">好</option>
                    <option value="4">一般</option>
                    <option value="5">中</option>
                </select>
                <select class="weui-select" name="select2" id="select_function" style="display:none">
                    <option value="1">非常好</option>
                    <option value="2">很好</option>
                    <option value="3">好</option>
                    <option value="4">一般</option>
                    <option value="5">中</option>
                </select>
                <div id="function1"></div>
            </div>
        </div>
    </div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="您的建议或鼓励，都是我们进步的动力" rows="3" id="appraise-textarea"></textarea>
                <textarea class="weui-textarea" placeholder="您的建议或鼓励，都是我们进步的动力" rows="3" id="select_appraise-textarea" style="display:none"></textarea>

                <!--这里插入评价内容-->
                <div id="content1"></div>
            </div>
        </div>
    </div>
    <div class="weui-btn-area queding">
        <a class="weui-btn weui-btn_warn" id="showTooltips" >确定</a>
    </div>
    <div class="weui-btn-area queding_xiugai" style="display:none">
        <a class="weui-btn weui-btn_warn" id="queding_xiugai">确定</a>
    </div>
    <div class="weui-btn-area" id="xiugai" style="display:none">
        <a class="weui-btn weui-btn_warn  update">修改评价</a>
    </div>
</body>
</html>
