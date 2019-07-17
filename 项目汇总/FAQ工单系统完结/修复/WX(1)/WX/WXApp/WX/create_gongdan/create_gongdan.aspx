<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="create_gongdan.aspx.cs" Inherits="WXApp.WX.create_gongdan.create_gongdan" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,viewport-fit=cover"/>    
    <title>创建工单</title>
    <link href="../css/font-awesome.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="../css/weui.css" />
    <link rel="stylesheet" href="../css/example.css" />    
    <link href="uploader-font.css" rel="stylesheet" />
    <link href="gallery.css" rel="stylesheet" />
    <link href="weui.css" rel="stylesheet" />
    <script src="../js/jquery-1.11.3.min.js"></script>
    <script src="../js/weui.js"></script>
    <script src="create_gongdan.js"></script>
    <script src="zepto.min.js"></script>
    <script src="weui-uploader.js"></script>    
    <script>
        function myFunc() {
            $("#divid").css("display", "none")
        }
        $(function () {
            onload = function () {
                $(".zp").show();
            }
            $("#sel").bind("change", function () {     //这是微信的
                if (this.value == "装配部") {
                    $(".zp").show();
                } else {
                    $(".zp").hide();                    
                }
                if (this.value == "品质部") {
                    $(".pz").show();
                } else {
                    $(".pz").hide();
                }
                if (this.value == "设计部") {
                    $(".sj").show();
                } else {
                    $(".sj").hide();
                }
                if (this.value == "精益科") {                 
                    $(".jy").show();
                } else {
                    $(".jy").hide();
                }
                if (this.value == "采购部") {
                    $(".cg").show();
                } else {
                    $(".cg").hide();
                }
                if (this.value == "机加部") {                    
                    $(".jj").show();
                } else {
                    $(".jj").hide();
                }
                if (this.value == "外发部") {
                    $(".wf").show();
                } else {
                    $(".wf").hide();
                }

            })
        });

    </script>
</head>
<body>
    <!--<div class="weui-cells__title">
        <a href="../gongdan_server_info/gongdan_server_info.html" class="weui-btn weui-btn-mini weui-btn_primary" id="btn_sure">工单服务</a>
    </div>-->
      <input type="hidden" name="name" value="<%=usercode%>" id="usercode"/> <%--获取usercode--%>
<div class="weui-cells__title" style="text-align:right;font-size: 16px;">创建工单</div>
      <div class="weui-cells">
            <div class="weui-cell weui-cell_select ">   <!--首选开始-->
            	<div class="weui-cells__title">产品类型</div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select1" id="sel">
                        <option value="装配部">装配部</option>
                        <option value="品质部">品质部</option>
                        <option value="设计部">设计部</option>
                        <option value="精益科">精益科</option>
                        <option value="采购部">采购部</option>
                        <option value="机加部">机加部</option>
                        <option value="外发部">外发部</option>
                    </select>
                </div>
            </div>    <!--首选结束-->

          <div class="weui-cell  weui-cell_select zp" style="display:none;"><!--装配部-->              
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="zp">
                      <option>物料损坏</option>
                      <option>物料丢失</option>
                      <option>原件修改</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell  weui-cell_select pz" style="display:none;"><!--品质部-->              
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="pz">
                      <option>漏刻字</option>
                      <option>漏检</option>
                      <option>刻错</option>
                      <option>刻字不清晰</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell  weui-cell_select sj" style="display:none;"><!--设计部-->              
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="sj">
                      <option>漏下、多下、少下、重复下、下错</option>
                      <option>设计更改</option>
                      <option>图纸与3D不符</option>
                      <option>程序未确定</option>
                      <option>订单未有IO表</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell  weui-cell_select jy" style="display:none;"><!--精益科-->
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="jy">
                      <option>二次发生的问题得不到解决</option>

                  </select>
              </div>
          </div>
          <div class="weui-cell  weui-cell_select cg" style="display:none;"><!--采购部-->
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="cg">
                      <option>来料错</option>
                      <option>来料不良</option>
                      <option>来料少数</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell  weui-cell_select jj" style="display:none;"><!--机加部-->              
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="jj">
                      <option selected="">孔、牙</option>
                      <option>公差</option>
                      <option>漏加工</option>
                      <option>加工错</option>
                      <option>毛刺</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell  weui-cell_select wf" style="display:none;"><!--外发部-->              
              <div class="weui-cells__title">标题</div>
              <div class="weui-cell__bd">
                  <select class="weui-select select1" name="select1" id="wf">
                      <option>孔、牙</option>
                      <option>公差</option>
                      <option>漏加工</option>
                      <option>加工错</option>
                      <option>毛刺</option>
                      <option>丝印</option>
                      <option selected>色差</option>
                  </select>
              </div>
          </div>



      </div>                        
            
			<div class="weui-cells__title">工单描述</div>           
			<div class="weui-cells weui-cells_form">
  				<div class="weui-cell">
    				<div class="weui-cell__bd">
      				<textarea class="weui-textarea" placeholder="请在此处输入具体的工单描述内容,也可不填" rows="3" id="descrip_content" onkeyup="wordStatic(this);"></textarea>
      				<div class="weui-textarea-counter"><span id="cnt">0</span>/200</div>
   			 		</div>
  				</div>
			</div>

       <!--测试开始-->
        <!--gallery start-->
        <div class="weui-gallery" id="gallery">
            <span class="weui-gallery__img" id="galleryImg"></span>
            <div class="weui-gallery__opr">
                <a href="javascript:" class="weui-gallery__del">
                    <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                </a>
            </div>
        </div>
        <!--gallery end-->
        <!--upload start-->
        <div class="weui_cells_title">上传</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="weui_uploader">
                        <div class="weui_uploader_hd weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">图片上传</div>
                            <div class="weui_cell_ft js_counter">0/3</div>
                        </div>
                        <div class="weui_uploader_bd">
                            <ul class="weui_uploader_files"></ul>
                            <div class="weui_uploader_input_wrp">
                                <input class="weui_uploader_input js_file" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--upload end-->
    
    <!--dialog start-->
    <div class="weui_dialog_alert">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd">
                <strong class="weui_dialog_title">警告</strong>
            </div>
            <div class="weui_dialog_bd">弹窗内容，告知当前页面信息等</div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
            </div>
        </div>
    </div>           <!--测试结束-->


      <div class="weui-cells">
          <a href="javascript:;" class="weui-btn weui-btn-mini weui-btn_primary" id="btn_sure">提交</a>
      </div>      
    

   
</body>
</html>
