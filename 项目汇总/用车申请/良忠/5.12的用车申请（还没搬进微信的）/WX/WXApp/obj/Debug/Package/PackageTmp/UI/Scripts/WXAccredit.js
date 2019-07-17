

$(document).on('tap', '#mid > .moudle > .content > .box', function () {
    var url = $(this).attr('data-url');
    if (url != null && url != '') {
        location.href = url;
    }
    else {

    }
});