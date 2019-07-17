var selectedPartsColumns = [
    {field: 'PartName', title: 'Item', align: 'left', formatter:function(value, row, index){
        return row.tPartName||row.PartName||""
    }},
    {field: 'OE', title: 'Sprint内容', align: 'left',formatter:function(value, row, index){
        return row.tOE||row.OE||""
    }},
    {field: 'Spec', title: 'Activity行动', align: 'left',  formatter:function(value, row, index){
        return row.tSpec||row.Spec||""
    }},
    {field: 'Unit', title: 'Progress进度', align: 'left', width: 20,formatter:function(value, row, index){
        return row.tUnit||row.Unit||""
    }},
    {field: 'Brand', title: 'RES负责人', align: 'left', width: 20,formatter:function(value, row, index){
        return row.tBrand||row.Brand||""
    }},
    {
        field: 'OE', title: '日期', align: 'left', type:'date',formatter: function (value, row, index) {
            return row.tOE || row.OE || ""
        }
    },
    
    {
        field: 'deleteBtn', title: '操作', align: 'center', width: 20,type:"disabled", formatter: function (value, row, index) {
        return [
            '<a class="btn-delete" href="javascript:void(0)" title="Remove" data-index=' + index + ' data-rowId=' + row.ID + '>删除',
            '</a>'
        ].join('');
    }
    }
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