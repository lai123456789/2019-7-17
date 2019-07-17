var tableVal = [];
$(function () {
    onload = function () {
        $.ajax({
            url: "http://192.168.2.194:3382/UserManage.aspx?action=GetEX",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data.data);
                //$("#tb").empty();
                // var data = data;
                // if (data.tableVal != "" && data.tableVal != undefined ) {
                //  tableVal = data.tableVal;
                //  $(".table tr").each(function(i) {
                //      $(this).find('td').each(function(j) {
                //          $(this).find('input').val(tableVal[i][j]);
                //      });
                //  });
                // }


                //var result = data.data[0];
                //$(".table tr").each(function(index) {
                //    var resultArr = result["row" + (index + 1)];
                //    for(var i = 0;i<resultArr.length;i++ ){
                //       $(this).find('td').eq(i).find("input").val(resultArr[i])
                //    }
                //});


                //var result = data.data; //返回的data数据               
                //$("#tb tr").each(function (data) {
                //    var trVal = [];  //获取每一行
                //    $(this).find('td').each(function () {
                //        //$(this).find('input').val(result[1].item);//拿到每一个item
                //        var tdVal = $(this).find('input').val();
                //        trVal.push(tdVal);//拿到每一行的所有Td的值        
                //    });
                //    // tableVal.push(trVal); 
                //    var Item = trVal[0];//获取每一行的第一个td的值
                //    for (var i = 0; i < result.length; i++) {
                //        Item = result[i].item;                        
                //    }                    
                //    $(this).find('td:eq(0) > input').val(Item);
                //    var Sprint内容 = trVal[1];
                //    var Activity行动 = trVal[2];
                //    var Progress进度 = trVal[3];
                //    var RES负责人 = trVal[4];
                //    var usercode = $("#userinfo").attr("data-usercode");

                //});
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr>';
                    content += '<td><input type="text" class="form-control" value="' + obj.item + '"></td>';
                    //if ($('#userinfo').attr('data-usercode') == 'mt00000002') {

                    //    if (obj.是否关闭 == "1") {
                    //        content += '    <td class="noexport"></td>';
                    //        content += '    <td class="noexport"><a class="restore" href="JavaScript:;">还原</a></td>';
                    //    }
                    //    else {
                    //        content += '    <td class="noexport"><i class="select fa fa-check-square"></i></td>';
                    //        content += '    <td class="noexport"><a class="closeorder" href="JavaScript:;">关闭</a></td>';
                    //    }
                    //}                    
                    content += '<td><input type="text" class="form-control" value="' + obj.sprint + '"></td>';
                    content += '<td><input type="text" class="form-control" value="' + obj.activity + '"></td>';
                    content += '<td><input type="text" class="form-control" value="' + obj.progress + '"></td>';
                    content += '<td><input type="text" class="form-control" value="' + obj.res + '"></td>';
                    content += '</tr>';

                });
                $('#tb').empty();
                $('#tb').append(content);



            }
        })
    }
});



function tijiao() {

    var rows = $("#tb tr");
    var 明细 = new Array();
    tableVal = [];
    $("#tb tr").each(function () {
        var trVal = [];  //获取每一行
        $(this).find('td').each(function () {
            var tdVal = $(this).find('input').val();
            trVal.push(tdVal);//拿到每一行的所有值        
        });
        // tableVal.push(trVal); 
        var Item = trVal[0];
        var Sprint内容 = trVal[1];
        var Activity行动 = trVal[2];
        var Progress进度 = trVal[3];
        var RES负责人 = trVal[4];
        var usercode = $("#userinfo").attr("data-usercode");
        var data = {
            "Item": Item, "Sprint内容": Sprint内容, "Activity行动": Activity行动,
            "Progress进度": Progress进度, "RES负责人": RES负责人, "usercode": usercode
        };

        明细.push(data);
        // console.log(item,内容,行动,进度,负责人);
        // console.log(明细)          
    });

    getDrawing(明细);
}

function getDrawing(明细) {
    var dataarr = { "data": 明细, };
    去重1('IIS3382', '/UserManage.aspx?action=UpdateExcle', 明细, function () {
    });
}
function 去重1(urltype, pageurl, data, func) {
    // var usercode = $("#userinfo").attr("data-usercode");
    // alert(usercode);
    // showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            // hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0)//提取成功
            {
                //hideLoading();
                //location.reload();
                alert("提交成功");
                //location.href = "home.aspx";
            }
            else//提取失败
            {
                //hideLoading();
                alert(data.errmsg);
            }
        }
    });
}

