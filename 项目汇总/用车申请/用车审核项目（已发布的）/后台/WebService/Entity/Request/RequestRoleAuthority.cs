using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequestRoleAuthority
    {
        /// <summary>
        /// 用户代码
        /// </summary>
        public string usercode { get; set; }
        /// <summary>
        /// 角色代码
        /// </summary>
        public string rolecode { get; set; }

        public List<RequestRoleAuthorityPage> rolepage { get; set; }
    }

    public class RequestRoleAuthorityPage
    {
        /// <summary>
        /// 页面代码
        /// </summary>
        public string pagecode { get; set; }
    }
}
