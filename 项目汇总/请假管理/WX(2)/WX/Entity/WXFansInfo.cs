using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    [Serializable]
    public class WXFansInfo
    {
        /// <summary>
        /// 是否成功执行
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 出错时返回的错误提示信息
        /// </summary>
        public string errmsg { get; set; }
        /// <summary>
        /// 微信粉丝ID
        /// </summary>
        public string openid { get; set; }
        /// <summary>
        /// 微信昵称
        /// </summary>
        public string nickname { get; set; }
        /// <summary>
        /// 微信性别
        /// </summary>
        public string sex { get; set; }
        /// <summary>
        /// 省份
        /// </summary>
        public string province { get; set; }
        /// <summary>
        /// 城市
        /// </summary>
        public string city { get; set; }
        /// <summary>
        /// 国家
        /// </summary>
        public string country { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        public string headimgurl { get; set; }
        /// <summary>
        /// 关注时间
        /// </summary>
        public string subscribetime { get; set; }
        /// <summary>
        /// 是否关注
        /// </summary>
        public string subscribed { get; set; }
        
    }
    [Serializable]
    public class WXFansUserInfo
    {
        /// <summary>
        /// 用户代码
        /// </summary>
        public string usercode { get; set; }
        /// <summary>
        /// 工号
        /// </summary>
        public string account { get; set; }
        /// <summary>
        /// 用户名称
        /// </summary>
        public string username { get; set; }
        /// <summary>
        /// 部门代码
        /// </summary>
        public string departmentcode { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string departmentname { get; set; }
        /// <summary>
        /// 职务
        /// </summary>
        public string position { get; set; }
        /// <summary>
        /// 手机号码
        /// </summary>
        public string phonenumber { get; set; }

        public List<PageInfo> pagelist { get; set; }
    }
    public class PageInfo
    {
        /// <summary>
        /// 页面代码
        /// </summary>
        public string PageCode { get; set; }
        /// <summary>
        /// 页面名称
        /// </summary>
        //public string PageName { get; set; }
        ///// <summary>
        ///// 图标
        ///// </summary>
        //public string ico { get; set; }
        ///// <summary>
        ///// 路径
        ///// </summary>
        //public string url { get; set; }
        ///// <summary>
        ///// 上级代码
        ///// </summary>
        //public string superior { get; set; }

    }
}
