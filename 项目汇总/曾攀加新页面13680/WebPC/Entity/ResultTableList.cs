using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public class ResultTableList
    {
        public int errcode { get; set; }
        public string errmsg { get; set; }

        public ResultTableListInfo[] data { get; set; }
    }

    public class ResultTableListInfo
    {
        public string 表格代码 { get; set; }

        public string url类型 { get; set; }

        public string 页面url { get; set; }

        public string 备注 { get; set; }
    }

    public class ResultTableFieldList
    {
        public int errcode { get; set; }
        public string errmsg { get; set; }

        public ResultTableFieldListInfo[] data { get; set; }
    }

    public class ResultTableFieldListInfo
    {
        public string 字段名 { get; set; }

        public string 别名 { get; set; }

        public string 是否显示 { get; set; }

        public string 宽度大小 { get; set; }

        public string 排序 { get; set; }

        public string 表代码 { get; set; }
    }
}
