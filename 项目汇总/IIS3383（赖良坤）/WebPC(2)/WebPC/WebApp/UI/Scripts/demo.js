//简易调用
$('#auto').bigAutocomplete({
	data:data1
});
//title
$('#title').bigAutocomplete({
	data:data2,
	title:'text'
});
//回调方法
$('#callback').bigAutocomplete({
	data:data2,
	title:'text',
	callback:function(row){
		alert(row.text+'|'+row.value);
		console.log(row.text+'|'+row.value);
	},
});
//自定义选择/展示-1
$('#formatItem').bigAutocomplete({
	data:data3,
	title:'text',
	formatItem:function(data, i, row){
		return row.text +' (' +row.form + ')';
	},
	callback:function(row){
		console.log('水果:'+row.text+'; 店铺:'+row.form+'; id:'+row.value);
	},
});
//自定义选择/展示-2
$('#formatSelected').bigAutocomplete({
	data:data3,
	title:'text',
	formatItem:function(data, i, row){
		return row.text +' (' +row.form + ')';
	},
	//默认formatSelected=formatItem,这里formatSelected不同,额外定义
	formatSelected:function(data, i, row){
		return row.text;
	},
	callback:function(row){
		console.log('水果:'+row.text+'; 店铺:'+row.form+'; id:'+row.value);
	},
});
//是否必须绑定data
var value1 = null;
$('#custom').bigAutocomplete({
	data:data3,
	title:'text',
	custom:false,//不允许用户自定义值
	callback: function (row,param){
		//定义custom:false后,如果用户清空值,row就是null
		if(row != null){
			value1 = row.value;
			console.log(value1);
		}else{
			//value1 = row.value;//这样会异常
			value1 = null;
			console.log(value1);
		}
	}
});
//自定义选择/展示-2
$('#width').bigAutocomplete({
	data:data3,
	title:'text',
	width : 130,
	formatItem:function(data, i, row){
		return row.text +' (' +row.form + ')';
	},
	//默认formatSelected=formatItem,这里formatSelected不同,额外定义
	formatSelected:function(data, i, row){
		return row.text;
	},
	callback:function(row){
		console.log('水果:'+row.text+'; 店铺:'+row.form+'; id:'+row.value);
	},
});
//param 自定义参数,动态构建/渲染html时可以用到
$("#param").bigAutocomplete({
	data:data3,
	//url:'/apple/queryByKeywords',//url自行研究,条件限制这里就不写demo了
	title:'text',
	formatItem:function(data, i, row){
		return row.text +' (' +row.form + ')';
	},
	formatSelected:function(data, i, row){
		return row.text;
	},
	callback:function(row,param){
		console.log('param:'+ param + 'value:' + row.value);
	},
	param:1,
});