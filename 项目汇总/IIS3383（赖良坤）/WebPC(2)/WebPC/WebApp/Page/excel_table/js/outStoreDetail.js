var selectedPartsColumns = [
    {field: 'PartName', title: 'Item', align: 'left', formatter:function(value, row, index){
        return row.tPartName||row.PartName||""
    }},
    {field: 'OE', title: 'Sprint内容', style:'display:none',align: 'left',formatter:function(value, row, index){
        return row.tOE||row.OE||""
    }},
    {field: 'Spec', title: 'Activity行动', align: 'left',  formatter:function(value, row, index){
        return row.tOE || row.OE || ""
    }},
    {field: 'Unit', title: 'Progress进度%', align: 'left', width: 20,formatter:function(value, row, index){
        return row.tOE || row.OE || ""
    }},
    {field: 'Brand', title: 'RES负责人', align: 'left', width: 20,formatter:function(value, row, index){
        return row.tOE || row.OE || ""
    }},
    {
        field: 'OE', title: '计划开始日期', align: 'left', width: 20, formatter: function (value, row, index) {
            return row.tOE || row.OE || ""
        }
    },
    {
        field: 'OE', title: '计划结束日期', align: 'left', width: 20, formatter: function (value, row, index) {
            return row.tOE || row.OE || ""
        }
    },
    {
        field: 'OE', title: '计划完成天数', align: 'left', width: 20, formatter: function (value, row, index) {
            return row.tOE || row.OE || ""
        }
    },
    
    //{
    //    field: 'deleteBtn', title: '操作', align: 'center', width: 20,type:"disabled", formatter: function (value, row, index) {
    //    return [
    //        '<a class="btn-delete" href="javascript:void(0)" title="Remove" data-index=' + index + ' data-rowId=' + row.ID + '>删除',
    //        '</a>'
    //    ].join('');
    //}
    //}
];
var autocompleteColumns = [
    {field: 'tPartCode', title: '配件自编号', align: 'left', width: 20},
    {field: 'tPartName', title: '配件名称', align: 'left', width: 20, sortable: true},
    {field: 'tOE', title: 'OE号', align: 'left', width: 20, sortable: true},
    {field: 'tBrand', title: '品牌', align: 'left', width: 20, sortable: true}
];

$("#selectedParts-excel").excelTable({
    columns:selectedPartsColumns,
    autocompleteColumns:autocompleteColumns,
    data:[],
});



//这里写按钮跳转对应各个接口
$(document).on("click", "#btn1", function () {
    $("#page1").show();
    $("#page2").hide();
    $("#page3").hide();
    $("#page4").hide();
    $("#page5").hide();
    $("#page6").hide();
            $.ajax({
                url: "http://192.168.2.197:3382/UserManage.aspx?action=GetEX",
                type: 'GET',
                dataType: 'json',
                success: function (data) {                    
                    var content = '';
                    $.each(data.data, function (idx, obj) {
                        content += '<tr>'
                        content += '<td style="text-align: center;">' + idx + '</td>'
                        content += '<td style="text-align: center;">' + obj.item + '</td>'
                        content += '<td style="text-align:center;">' + obj.sprint + '</td>'
                        content += '<td style="text-align: center;">' + obj.activity + '</td>'
                        content += '<td style="text-align: center;">' + obj.progress + '</td>'
                        content += '<td style="text-align: center;">' + obj.res + '</td>'
                        content += '<td style="text-align: center;display:none;">1</td>'
                        content += '<td style="text-align: center;display:none;" >2</td>'
                        content += '<td style="text-align: center;display:none;" >3</td>'
                        content += '<td style="text-align: center;" id="first">'
                        content += '<input type="date" value="' + obj.plantime + '">' //计划开始日期  第8列                    
                        content += '</td>'
                        content += '<td style="text-align: center;display:none;" >4</td>'
                        content += '<td style="text-align: center;display:none;" >5</td>'
                        content += '<td style="text-align: center;display:none;" >6</td>'
                        content += '<td style="text-align: center;"><input type="date" value="' + obj.planendtime + '"></td>' //计划结束日期    第12列              
                        content += '<td style="text-align: center;">' + obj.planday + '天</td>' //计划完成天数
                        content += "<td style='text-align: center; width: 120px;' class='disabled'><a class='btn-delete' href='javascript:void(0)' title='Remove' data-index='0' data-rowid='undefined'>删除</a></td>";
                        content += "</td>"
                        content += "</tr>"
                    });

                    $("#selectedParts-excel tbody").empty();
                    $("#selectedParts-excel tbody").prepend(content);
                    $(".RowNumber").text("")  //把原先的清空



                }
            })
      
    

})
$(document).on("click", "#btn2", function () {
    $("#page1").hide();
    $("#page2").show();
    $("#page3").hide();
    $("#page4").hide();
    $("#page5").hide();
    $("#page6").hide();
    //$.ajax({
    //    url: "http://192.168.2.197:3382/UserManage.aspx?action=GetEXB",  //查询数据
    //    type: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
               

 
    //        //var ct ='';
    //        //ct += '<iframe   src="http://www.baidu.com" width="" height=""   frameborder="1/0"  name="iframe名称"     scrolling="auto">'
    //        //ct += '</iframe>';
    //        //$("body").append(ct);
    //        var content = '';
    //        $.each(data.data, function (idx, obj) {
    //            content += '<tr>'
    //            content += '<td style="text-align: center;">' + idx + '</td>'
    //            content += '<td style="text-align: center;">' + obj.item + '</td>'
    //            content += '<td style="text-align:center;">' + obj.sprint + '</td>'
    //            content += '<td style="text-align: center;">' + obj.activity + '</td>'
    //            content += '<td style="text-align: center;">' + obj.progress + '</td>'
    //            content += '<td style="text-align: center;">' + obj.res + '</td>'
    //            content += '<td style="text-align: center;display:none;">1</td>'
    //            content += '<td style="text-align: center;display:none;" >2</td>'
    //            content += '<td style="text-align: center;display:none;" >3</td>'
    //            content += '<td style="text-align: center;" id="first">'
    //            content += '<input type="date" value="' + obj.plantime + '">' //计划开始日期  第8列                    
    //            content += '</td>'
    //            content += '<td style="text-align: center;display:none;" >4</td>'
    //            content += '<td style="text-align: center;display:none;" >5</td>'
    //            content += '<td style="text-align: center;display:none;" >6</td>'
    //            content += '<td style="text-align: center;"><input type="date" value="' + obj.planendtime + '"></td>' //计划结束日期    第12列              
    //            content += '<td style="text-align: center;">' + obj.planday + '天</td>' //计划完成天数
    //            content += "<td style='text-align: center; width: 120px;' class='disabled'><a class='btn-delete' href='javascript:void(0)' title='Remove' data-index='0' data-rowid='undefined'>删除</a></td>";
    //            content += "</td>"
    //            content += "</tr>"
    //        });

    //        $("#selectedParts-excel tbody").empty();
    //        $("#selectedParts-excel tbody").prepend(content);
    //        $(".RowNumber").text("")  //把原先的清空



    //    }
    //})



})