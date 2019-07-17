/***
 * 通用弹框提示
 * Author:Mcally
 * Date:  2019年5月27日17:58:56
 * Des:   在sweetalert2.min.js更封装一层便于调用还可以继续扩展参考地址:http://www.htmleaf.com/Demo/201606123590.html
 * ---------------------------------------------------------------------------------------
 * -------------------------------参数说明------------------------------------------------
 * --------------------------------------------------------------------------------------
 * title:标题
 * tip:描述内容
 * fn_callback:回调函数
 * type:类型弹窗主要有('success','error','warning','info','question')
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------
 */
;
$(function($, window) {
    var dialog = {
        /***
		 * 没有取消按钮只有确认按钮
		 */
        "promptNoCancle": function (title, tip, type, fn_callback) {
            swal({
                title: title,
                text: tip,
                type: type,
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确认'
            }).then(function (isConfirm) {
                (fn_callback && typeof (fn_callback) === "function") && fn_callback(isConfirm);
            });

        },
        /**
		 * 有取消按钮和确认按钮
		 */
        "prompt": function (title, tip, type, fn_callback) {
            swal({
                title: title,
                text: tip,
                type: type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                cancelButtonColor: '#7c7c7c',
               
               // cancelButtonColor: '#d33'
            }).then(function (isConfirm) {
                (fn_callback && typeof (fn_callback) === "function") && fn_callback(isConfirm);
            });
        }
    };
	window.dialog = dialog;
}(jQuery, window))