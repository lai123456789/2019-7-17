using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Request
{
    public class RequestAddUserInfo
    {
        /// <summary>
        /// 用户账号
        /// </summary>
        public string account { get; set; }
        /// <summary>
        /// 用户名称
        /// </summary>
        public string username { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        public string password { get; set; }
        /// <summary>
        /// 部门
        /// </summary>
        public string department { get; set; }
        /// <summary>
        /// 职务
        /// </summary>
        public string position { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public string sex { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        public string birthday { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string address { get; set; }
        /// <summary>
        /// 手机号码
        /// </summary>
        public string phonenumber { get; set; }
        /// <summary>
        /// 入职时间
        /// </summary>
        public string hiredate { get; set; }

        public string CREATETIME { get; set; }
    
    }
}
