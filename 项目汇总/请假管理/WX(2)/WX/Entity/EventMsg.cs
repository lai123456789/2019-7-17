using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{

    public static class EventMsgList
    {
        //public List<EventMsg> eventmsg { get; set; }
    }

    public class EventMsg
    {
        /// <summary>
        /// 微信AppID
        /// </summary>
        public string fromusername { get; set; }
        /// <summary>
        /// 创建事件
        /// </summary>
        public double createtime { get; set; }
    }
}
