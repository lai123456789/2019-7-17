using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public class ResultInfo
    {
        /// <summary>
        /// 状态：0成功执行，-1执行异常
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 出错时返回的错误提示信息
        /// </summary>
        public string errmsg { get; set; }
        /// <summary>
        /// 通知消息未通知Json对象
        /// </summary>
        public string notify { get; set; }
        /// <summary>
        /// 任务消息Json对象
        /// </summary>
        public string tasknotify { get; set; }
        /// <summary>
        /// 我的任务列表Json对象
        /// </summary>
        public string mytaskunfinished { get; set; }
        /// <summary>
        /// 分派给我的任务列表Json对象
        /// </summary>
        public string myaccepttask { get; set; }
    }
}
