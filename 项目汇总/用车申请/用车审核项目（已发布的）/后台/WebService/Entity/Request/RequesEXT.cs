using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{

   
    public class RequesEXT
    {

        public Reques1[][] ExcelHeader { get; set; }
    }
    public class Reques1
    {
        public string pagecode { get; set; }
        public string Hcode { get; set; }
        public string Hname { get; set; }
        public string breadth { get; set; }
        public int nowrow { get; set; }
        public int nowline { get; set; }
        public string takerow { get; set; }
        public string takeline { get; set; }
        public string usercode { get; set; }
    }
}
