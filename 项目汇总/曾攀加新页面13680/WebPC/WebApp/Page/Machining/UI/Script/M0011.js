$(document).on('click', '#form_tb03 i.choice', function () {
    $(this).toggleClass('contor');
});


$(document).on('click', '#form_th03 i.choice', function () {
    $(this).toggleClass('contor');
    var index = $(this).parents('th').index();
    if ($(this).hasClass('contor')) {
        var obj = $('#form_tb03 > tr');
        for (var i = 0; i < obj.length; i++) {
            $(obj[i]).find('td:eq(' + index + ') > i.choice').addClass('contor');
        }
        
    }
    else {
        var obj = $('#form_tb03 > tr');
        for (var i = 0; i < obj.length; i++) {
            $(obj[i]).find('td:eq(' + index + ') > i.choice').removeClass('contor');
        }
    }
});