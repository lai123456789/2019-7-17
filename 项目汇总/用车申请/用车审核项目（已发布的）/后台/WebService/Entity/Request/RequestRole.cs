using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequestRole
    {
         /// <summary>
        /// 用户代码
        /// </summary>
        public string usercode { get; set; }
        /// <summary>
        /// 表代码
        /// </summary>
        public string pagecode { get; set; }
         public string rolecode { get; set; }
        

        public List<RequestRolePage> rolepage { get; set; }
    }

    public class RequestRolePage
    {
        /// <summary>
        /// 权限代码
        /// </summary>
        public string autcode { get; set; }
    }
    
}
