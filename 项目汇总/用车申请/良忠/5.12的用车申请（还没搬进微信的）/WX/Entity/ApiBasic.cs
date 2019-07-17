using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    [Serializable]
    public class ApiBasic
    {
        /// <summary>
        /// API接口请求成功返回0，失败返回-1
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 出错时返回的错误提示信息
        /// </summary>
        public string errmsg { get; set; }
    }
}
