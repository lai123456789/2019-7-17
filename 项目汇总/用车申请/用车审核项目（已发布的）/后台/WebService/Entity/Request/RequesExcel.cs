using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequesExcel
    {
        public string pagesize { get; set; }
        public int page { get; set; }
        public string pagecount { get; set; }
        public string pagecode { get; set; }
        public string onetypehcode { get; set; }
        public string onetype { get; set; }
        public string onetypevalues { get; set; }
        public string datetypehcode { get; set; }
        public string datetypeselecttype { get; set; }
        public string startdate { get; set; }
        public string enddata { get; set; }
        public string startdata_time { get; set; }
        public string enddata_time { get; set; }
        public string digitaltypehcode { get; set; }
        public string twotypetype { get; set; }
        public string oneval1 { get; set; }
        public string oneval2 { get; set; }
        public string choosetypeselecttype { get; set; }
        public string choosetype { get; set; }
        public string digitaltypeselecttype { get; set; }
        public string choosetypehcode { get; set; }
    }
}
