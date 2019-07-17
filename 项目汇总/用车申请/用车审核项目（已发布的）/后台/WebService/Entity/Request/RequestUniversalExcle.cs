using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequestUniversalExcle
    {
        public string pagecode { get; set; }
        public TableHeaders[][] ExcelHeader { get; set; }
    }


    public class Excel信息
    {
        public string hcode { get; set; }
        public string 名称 { get; set; }

        public int 第几行 { get; set; }

        public int 第几列 { get; set; }

        public int 占几行 { get; set; }

        public int 占几列 { get; set; }
        public string selecttype { get; set; }
        public string optiontype { get; set; }
    }


    public class TableHeaders
    {
        public string hcode { get; set; }
        public string hname { get; set; }
        public string breadth { get; set; }
        public string nowrow { get; set; }
        public string nowline { get; set; }
        public string takerow { get; set; }
        public string takeline { get; set; }
        public string selecttype { get; set; }
        public string optiontype { get; set; }
    }

    public class 临时的类
    {
        public string hname { get; set; }
        public int nowrow { get; set; }
        public int nowline { get; set; }
        public string takerow { get; set; }
        public string takeline { get; set; }
    }

    public class 临时的表头
    {
        public string hname { get; set; }
        public int nowrow { get; set; }
        public int nowline { get; set; }
        public string takerow { get; set; }
        public string takeline { get; set; }
    }

    public class 填充的表头
    {
        public string hname { get; set; }
        public int nowrow { get; set; }
        public int nowline { get; set; }
        public string takerow { get; set; }
        public string takeline { get; set; }
    }

    public class 有效的表头
    {
        public string hname { get; set; }
        public int nowrow { get; set; }
        public int nowline { get; set; }
        public string takerow { get; set; }
        public string takeline { get; set; }
    }
}
