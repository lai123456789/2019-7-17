using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequestTable
    {
//        public string usercode { get; set; }
//        public string pagename { get; set; }
//        public string superior { get; set; }

//        public Addtable[] Addtable { get; set; }

//    }
//    public class Addtable
//    {
//        public string usercode { get; set; }
//        public string audits { get; set; }


//    }




//{
                public string pagename { get; set; }// 表名
                public string usercode { get; set; }///创建人
                public 审核用户[] 审核用户 { get; set; }
                }

                public class 审核用户
                {
                    public string createname { get; set; }//审核人
                    public string sort { get; set; }//审核等级

                    public string markt { get; set; }//备注


              
                }

}
