using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public class RequestMaterialQSCR
    {
        /// <summary>
        /// PJ号
        /// </summary>
        public string pj { get; set; }
        /// <summary>
        /// 物料齐套代码
        /// </summary>
        public string materialcode { get; set; }
        /// <summary>
        /// 用户代码
        /// </summary>
        public string usercode { get; set; }
    }
}
