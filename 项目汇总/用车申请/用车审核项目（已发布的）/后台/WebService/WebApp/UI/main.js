var tableVal = [];
$(function(){
	$.ajax({
	    url: "UserManage.aspx?action=GETEXCLE",
		type: 'GET',
		dataType: 'json',
		success:function(data){
			// var data = data;
			// if (data.tableVal != "" && data.tableVal != undefined ) {
			// 	tableVal = data.tableVal;
			// 	$(".table tr").each(function(i) {
			// 		$(this).find('td').each(function(j) {
			// 			$(this).find('input').val(tableVal[i][j]);
			// 		});
			// 	});
		    // }
            
            //console.log(data);
            //console.log(data.data[0].row1);

            //var result = data.data[0];
            //$(".table tr").each(function(index) {
            //    var resultArr = result["row" + (index + 1)];
            //    for(var i = 0;i<resultArr.length;i++ ){
            //       $(this).find('td').eq(i).find("input").val(resultArr[i])
            //    }
            //});
		
            //var a = data.data[0].row1;
            //var arr = data.data[0].row1;
            //var b = arr.replace(/"([^"]*)"/g, "arr");
            //console.log(b);
            
            //var name = '["a", "b"]';
		    //console.log(name.replace(/"([^"]*)"/g, "'$1'"));

            //arr.forEach(function (item) {
            //    var num = item * 1;
            //    console.log(num)
		    //});

		}
	})
});
function clickButton() {
    var 明细 = new Array();
	tableVal = [];
	$(".table tr").each(function() {
		var trVal = [];
		$(this).find('td').each(function() {
			var tdVal = $(this).find('input').val();
			trVal.push(tdVal);
		});
		tableVal.push(trVal);
	
		for (var i = 0; i < tableVal.length; i++) {
		    switch (i) {
		        case 0:
		            ROW1 = (tableVal[i]);//拿到第一行的所有值
		            $(ROW1).children("td").each(function (i) {
		                alert("第" + i + "个td的内容：" + $(this).text());
		            });
	            break;
		        case 1:
		            ROW2 = (tableVal[i]);
		            break;
		        case 2:
		            ROW3 = (tableVal[i]);
		            break;		       
		    }		   
	    }	              
	        data = (ROW1);
	        明细.push(data);
	    			
	});
	
   
	SubmitTableValue(data);
  
	
}
function SubmitTableValue(data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "UserManage.aspx?action=UpdateExcle",
        data :
            {
                "data": JSON.stringify(data),
                
            },
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0)//提取成功
            {
                alert(data.errmsg);
            }
            else//提取失败
            {
                alert(data.errmsg);
            }

        }
    });
}
