using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequestUserList
    {
        /// <summary>
        /// 查询内容
        /// </summary>
        public string search { get; set; }
        /// <summary>
        /// 当前页
        /// </summary>
        public int page { get; set; }
    }
}
