$(document).on('click', '#change', function () {
    weui.picker([{
        label: '使用中',
        value: '使用中'
    }, {
        label: '空闲中',
        value: '空闲中'
    }], {
        onChange: function (result) {
            $("#change").text(result);
            
        },
        onConfirm: function (result) { //确定操作
            console.log(result);
            
        }
    });
});