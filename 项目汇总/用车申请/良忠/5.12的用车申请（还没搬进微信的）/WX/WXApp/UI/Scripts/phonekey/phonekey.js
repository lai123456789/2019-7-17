$(function () {
    if ($('.Smallkeyboard').length == 0) {
        var content = '';
        content += '<div class="Smallkeyboard">';
        content += '    <div class="mask"></div>';
        content += '    <div class="keyboard" data-min="" data-max="" data-isfirst="true" data-firstclear="true" data-obj_id="">';
        content += '        <div class="showcontent">';
        content += '            <div class="topcontent">';
        content += '                <div class="tittlecontent" style="">标题</div>';
        content += '            </div>';
        content += '            <div class="bottomcontent">';
        content += '                <div class="left">';
        content += '                    <div class="subtract">-</div>';
        content += '                </div>';
        content += '                <div class="mid">';
        content += '                    <div class="content"></div>';
        content += '                </div>';
        content += '                <div class="right">';
        content += '                    <div class="add">+</div>';
        content += '                </div>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="showbutton">';
        content += '            <div class="key">1</div>';
        content += '            <div class="key">2</div>';
        content += '            <div class="key">3</div>';
        content += '            <div class="key">←</div>';
        content += '            <div class="key">4</div>';
        content += '            <div class="key">5</div>';
        content += '            <div class="key">6</div>';
        content += '            <div class="key">清空</div>';
        content += '            <div class="key">7</div>';
        content += '            <div class="key">8</div>';
        content += '            <div class="key">9</div>';
        content += '            <div class="key">返回</div>';
        content += '            <div class="key W_50">0</div>';
        content += '            <div class="key">.</div>';
        content += '            <div class="key success">确定</div>';
        content += '        </div>';
        content += '    </div>';
        content += '</div>';
        $('body').append(content);
    }
})


$(document).on('tap', '.Smallkeyboard > .keyboard > .showbutton > .key', function (e) {
    stopDefault(e);
    var defaultval = $('.Smallkeyboard > .keyboard').attr('data-defaultval');//默认为空时的值
    var obj_id = $('.Smallkeyboard > .keyboard').attr('data-obj_id');//对象ID
    var val = $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text();//当前值
    var content = $(this).text();//按键的值
    var min = $('.Smallkeyboard > .keyboard').attr('data-min');//最小值，默认为空没有最小值限制
    var max = $('.Smallkeyboard > .keyboard').attr('data-max');//最大值，默认为空没有最大值限制
    var isfirst = Boolean($('.Smallkeyboard > .keyboard').attr('data-isfirst') == "false" ? false : true);//是否首次按小键盘,默认启动
    var firstclear = Boolean($('.Smallkeyboard > .keyboard').attr('data-firstclear'));//是否首次清空以前的内容，默认启动
    $('.Smallkeyboard > .keyboard').attr('data-isfirst', 'false');
    switch (content) {
        case "1":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '1';
            } else {
                val = val + '1';
            }
            break;
        case "2":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '2';
            } else {
                val = val + '2';
            }
            break;
        case "3":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '3';
            } else {
                val = val + '3';
            }
            break;
        case "4":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '4';
            } else {
                val = val + '4';
            }
            break;
        case "5":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '5';
            } else {
                val = val + '5';
            }
            break;
        case "6":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '6';
            } else {
                val = val + '6';
            }
            break;
        case "7":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '7';
            } else {
                val = val + '7';
            }
            break;
        case "8":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '8';
            } else {
                val = val + '8';
            }
            break;
        case "9":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '9';
            } else {
                val = val + '9';
            }
            break;
        case "0":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == '0' || val == null) {
                val = '0';
            } else {
                val = val + '0';
            }
            break;
        case ".":
            if (isfirst && firstclear) {
                val = defaultval;
            }
            if (val == null) {
                val = '';
            }
            if (val.indexOf('.') == -1) {
                val = val + '.';
            }
            break;
        case "←":
            if (val.length > 1) {
                val = val.substring(0, val.length - 1);
            } else {
                val = defaultval;
            }
            break;
        case "清空":
            val = defaultval;
            break;
        case "返回":
            CloseKeyBoard();
            break;
        case "确定":
            $('#' + obj_id).text(val);
            $('#' + obj_id).val(val);
            $('#' + obj_id).trigger('change');
            CloseKeyBoard();
            break;
    }
    if (val != null && val != '') {
        val = parseFloat(val);
        if (min != '' && val < parseFloat(min)) {
            val = min;
        }
        if (max != '' && val > parseFloat(max)) {
            val = max;
        }
    }
    $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text(val);
});



$(document).on('tap', '.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .right > .add', function (e) {
    stopDefault(e);
    var min = $('.Smallkeyboard > .keyboard').attr('data-min');//最小值，默认为空没有最小值限制
    var max = $('.Smallkeyboard > .keyboard').attr('data-max');//最大值，默认为空没有最大值限制
    var val = $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text();
    if (val == null || val == '') {
        val = '0';
    }
    val = parseFloat(val) + 1;
    if (min != null && min != '' && parseFloat(val) < parseFloat(min)) {
        val = min;
    }
    if (max != null && max != '' && parseFloat(max) < parseFloat(val)) {
        val = max;
    }
    if (val == null || val == '') {
        if (min == null) {
            min = '';
        }
        val = min;
    }
    $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text(val);
});


$(document).on('tap', '.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .left > .subtract', function (e) {
    stopDefault(e);
    var min = $('.Smallkeyboard > .keyboard').attr('data-min');//最小值，默认为空没有最小值限制
    var max = $('.Smallkeyboard > .keyboard').attr('data-max');//最大值，默认为空没有最大值限制
    var val = $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text();
    if (val == null || val == '') {
        val = '0';
    }
    val = parseFloat(val) - 1;
    if (min != null && min != '' && parseFloat(val) < parseFloat(min)) {
        val = min;
    } 
    if (max != null && max != '' && parseFloat(max) < parseFloat(val)) {
        val = max;
    }
    if (val == null || val == '') {
        if (min == null) {
            min = '';
        }
        val = min;
    }
    $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text(val);
});


/*
对象，是否首次清除，最小值，最大值
*/
function ShowKeyBoard(obj, title, defaultval, firstclear, min, max) {
    $('input').blur();
    var obj_id = $(obj).attr('id');
    $('.Smallkeyboard > .keyboard > .showcontent > .topcontent > .tittlecontent').text(title);
    if (obj_id == null || obj_id == '') {
        obj_id = 'KeyBoard_' + $('.KeyBoardContent').length;
        $(obj).attr('id', obj_id);
        $(obj).addClass('KeyBoardContent');
    }
    var val = '';
    var _val = $(obj).val();
    var _text = $(obj).text();
    
    if (_text != null && _text != '') {
        val = _text;
    } else {
        if (_val != null && _val != '') {
            val = _val;
        }
    }

    $('.Smallkeyboard > .keyboard').attr('data-defaultval', defaultval);
    if (val == null || val == '') {
        $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text(defaultval);
    }
    else
    {
        $('.Smallkeyboard > .keyboard > .showcontent > .bottomcontent > .mid > .content').text(val);
    }

    $('.Smallkeyboard > .keyboard').attr('data-obj_id', obj_id);
    if (firstclear != null && firstclear != '') {
        $('.Smallkeyboard > .keyboard').attr('data-firstclear', firstclear);
    }
    if (min != null && min != '') {
        $('.Smallkeyboard > .keyboard').attr('data-min', min);
    }
    if (max != null && max != '') {
        $('.Smallkeyboard > .keyboard').attr('data-max', max);
    }
    $('.Smallkeyboard > .mask').addClass('contor');
    $('.Smallkeyboard').addClass('contor');
}

function CloseKeyBoard() {
    $('.Smallkeyboard > .keyboard > .showcontent > .topcontent > .tittlecontent').text('');
    $('.Smallkeyboard > .keyboard').attr('data-defaultval', '');
    $('.Smallkeyboard > .keyboard').attr('data-min', '');
    $('.Smallkeyboard > .keyboard').attr('data-max', '');
    $('.Smallkeyboard > .keyboard').attr('data-isfirst', 'true');
    $('.Smallkeyboard > .keyboard').attr('data-firstclear', 'true');
    $('.Smallkeyboard > .keyboard').attr('data-obj_id', '')
    $('.Smallkeyboard > .keyboard').attr('data-valtype', 'text');
    $('.Smallkeyboard').removeClass('contor');
    setTimeout(function () {
        $('.Smallkeyboard > .mask').removeClass('contor');
    }, 350);
}