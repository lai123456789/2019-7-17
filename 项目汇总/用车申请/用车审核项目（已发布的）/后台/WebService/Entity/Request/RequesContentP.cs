using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
  
    public class RequesContentP
    {
        public Reques2[][] 字段值数组 { get; set; }
    }

    public class Reques2
    {
        public string pagecode { get; set; }
        public string nowline { get; set; }
        public string nowrow { get; set; }
        public string hcode { get; set; }
        public string content { get; set; }
        public string line { get; set; }
        public string usercode { get; set; }
    }

}
