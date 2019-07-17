var mask = '<div id="mask"></div>';//遮罩层
var Loading = '<div id="Loading"></div>';//加载层


//显示加载层 
function showLoading() {
    $('#Loading').remove();
    $('body').append(Loading);
};
//隐藏加载层 
function hideLoading() {
    $('#Loading').remove();
};