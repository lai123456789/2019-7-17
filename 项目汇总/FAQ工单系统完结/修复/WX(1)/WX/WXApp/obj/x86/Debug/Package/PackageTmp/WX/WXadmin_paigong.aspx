<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WXadmin_paigong.aspx.cs" Inherits="WXApp.WX.WXadmin_paigong" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover" />
    <title>工单服务</title>
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <!-- 图标库 -->
    <link rel="stylesheet" href="css/weui.css" />

    <link rel="stylesheet" href="css/example.css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <%--<script src="jquery-3.3.1.min.js"></script>--%>
    <script src="UI/Scripts/Basic.js"></script>
    <!--<script src="gongdan_server_info.js"></script>-->
    <script src="js/weui.js"></script>
    <script src="js/WXadmin_paigong.js"></script>
</head>
<body>

    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <p class="weui-cells__title " style="font-size: 16px;"><a href="WXadmin_href.aspx"><i class="fa fa-chevron-left"></i></a></p>
            </div>
            <div class="weui-cell__bd" style="text-align: center; font-size: 19px; line-height: 30px;">派工管理</div>
        </div>
    </div>
    <div style="text-align: center;margin-top:20px;">
        <span style="" class="wei">
            <input type="button" class="btn btn-primary" name="name" value="查看未派工" />&nbsp;</span>
        <span class="yi">
            <input type="button" name="name" class="btn btn-primary" value="查看已派工" /></span>
    </div>
    <!--<div class="button-sp-area">        
        <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary wei">查看未派工</a>
        <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default yi">查看已派工</a>
        <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn">按钮</a>
    </div>-->


    <div class="content_WX"></div>
    <!--未派工-->
    <div class="content_WX_yi"></div>
    <!--已派工-->
    <!--上一页下一页-->
    <div class="weui-cells">
        <div class="weui-cell">
            <ul class="pagination weui-cell__bd">
                <li>
                    <div style="display: none" class="paigong_page">
                        <span class="backpage"></span>
                        <span id="now"></span>/<span id="totalpage"></span>页
                        <span class="nextpage"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!--编辑模态框弹出开始-->
    <div class="modal fade" id="AddUserModal5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div id="modalDialog" class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">派工用户</h5>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 20px;"></th>
                                <th>用户ID</th>
                                <th>工号(username)</th>
                                <th>派工名字</th>
                            </tr>
                        </thead>
                        <tbody class="tt"></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-success" data-dismiss="modal" id="add_sure5">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--编辑模态框弹出结束-->

</body>
</html>
