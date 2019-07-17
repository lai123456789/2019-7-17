using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    //public class RequesContent
    //  {


    //    public Reques2[][] ExcelH { get; set; }

    //  }
    //public class Reques2
    //{
    //    public string pagecode { get; set; }
    //    public string hname { get; set; }
    //    public string breadth { get; set; }
    //    public string nowrow { get; set; }
    //    public string nowline { get; set; }
    //    public string content { get; set; }
    //    public string takeline { get; set; }

    //    public string usercode { get; set; }

    //    public string hcode { get; set; }

    //    // t.pagecode,t.hcode,t.nowrow,t.nowline,t.content,t.createname
    //}




    public class RequesContent
  {
    public 字段值数组[] 字段值数组 { get; set; }
    }

    public class 字段值数组
    {
    public string pagecode { get; set; }
    public string nowline { get; set; }
    public string nowrow { get; set; }
    public string hcode { get; set; }
    public string content { get; set; }
    public string usercode { get; set; }
  //  public string line { get; set; }

    }



}
