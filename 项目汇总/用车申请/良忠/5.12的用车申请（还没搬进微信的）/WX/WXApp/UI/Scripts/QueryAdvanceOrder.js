
$(function () {
    scrollFunc()
})

function scrollFunc() {
    $('#maindiv').on("scrollstop", function () {
        var $this = $(this),
        viewH = $(this).height(),//可见高度
        contentH = $(this).get(0).scrollHeight,//内容高度
        scrollTop = $(this).scrollTop();//滚动高度
        if (contentH == viewH + scrollTop) { //当滚动到底部时，
            alert('1')
        }
        if (contentH - viewH - scrollTop <= 50) { //当滚动到距离底部50px时,
            alert('2')
        }
        if (scrollTop / (contentH - viewH) >= 0.98) { //当滚动到距离底部2%时
            // 这里加载数据..
            alert('3')
        }
    });
}
