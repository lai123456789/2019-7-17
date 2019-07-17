using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public class NotifyList
    {
        /// <summary>
        /// 报错状态
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 报错信息
        /// </summary>
        public string errmsg { get; set; }

        public List<NotifyInfo> data { get; set; }

    }

    public class TaskNotifyList
    {
        /// <summary>
        /// 报错状态
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 报错信息
        /// </summary>
        public string errmsg { get; set; }

        public List<TaskNotify> data { get; set; }
    }

    public class NotifyInfo
    {
        public string 标题 { get; set; }

        public string 内容 { get; set; }

        public string 跳转页面 { get; set; }

        public string 通知代码 { get; set; }
    }

    public class TaskNotify
    {
        public string 任务类型 { get; set; }

        public string 任务类型关联码 { get; set; }

        public string 任务标题 { get; set; }

        public string 任务创建时间 { get; set; }

        public string PC跳转页面 { get; set; }
    }

    public class MyTaskList
    {
        /// <summary>
        /// 报错状态
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 报错信息
        /// </summary>
        public string errmsg { get; set; }

        public List<MyTask> data { get; set; }
    }

    public class MyTask
    {

        public string 任务代码 { get; set; }
        public string 任务类型 { get; set; }
        public string 任务类型唯一码 { get; set; }
        public string 创建时间 { get; set; }
        public string 开始时间 { get; set; }
        public string 完成时间 { get; set; }
        public string 处理异常人员代码 { get; set; }
        public string 处理异常人员工号 { get; set; }
        public string 处理异常人员名称 { get; set; }
        public string 派工时间 { get; set; }
        public string 预计完成时间 { get; set; }
        public string 备注 { get; set; }

    }


    public class MyAcceptTaskList
    {
        /// <summary>
        /// 报错状态
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 报错信息
        /// </summary>
        public string errmsg { get; set; }

        public List<MyAcceptTask> data { get; set; }
    }

    public class MyAcceptTask
    {
        public string 任务代码 { get; set; }
        public string 任务类型 { get; set; }
        public string 任务类型关联表代码 { get; set; }
        public string 任务标题 { get; set; }
        public string 订单创建时间 { get; set; }
        public string 完成时间 { get; set; }
        public string 备注 { get; set; }
        public string 负责人代码 { get; set; }
        public string 负责人名称 { get; set; }
    }
}
