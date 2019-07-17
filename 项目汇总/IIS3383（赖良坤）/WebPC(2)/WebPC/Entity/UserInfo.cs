using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{

    public class LoginResuleInfo
    {
        /// <summary>
        /// 报错状态
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 报错信息
        /// </summary>
        public string errmsg { get; set; }

        public UserInfo[] data { get; set; }
    }

    public class UserInfo
    {
        /// <summary>
        /// 用户代码
        /// </summary>
        public string usercode { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        public string password { get; set; }
        /// <summary>
        /// 状态【1.正常，0.注销，-1.删除】
        /// </summary>
        public int status { get; set; }
        /// <summary>
        /// 用户类型（0客户端用户，1后台用户，2通用）
        /// </summary>
        public int usertype { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime createdate { get; set; }
        /// <summary>
        /// 微信Openid
        /// </summary>
        public string wxopenid { get; set; }
        /// <summary>
        /// 登录账号
        /// </summary>
        public string account { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string username { get; set; }
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
        public DateTime birthday { get; set; }
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
        public DateTime hiredate { get; set; }
        /// <summary>
        /// 微信昵称
        /// </summary>
        public string nickname { get; set; }
        /// <summary>
        /// 微信头像
        /// </summary>
        public string headimgurl { get; set; }
    }
}
