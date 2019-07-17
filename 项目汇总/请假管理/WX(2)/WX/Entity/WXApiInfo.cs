using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    /// <summary>
    /// 微信公众号的一些信息
    /// </summary>
    public class WXApiInfo
    {
        /// <summary>
        /// 微信公众号ID
        /// </summary>
        //public const string wxappid = "wx0f28ebdec023d8b3"; // 师兄测试
        //public const string wxappid = "wx04c305db46e7fa94";
        public const string wxappid = "wxf008b2e12734e9d7";  //my
        /// <summary>
        /// 微信公众号的AppSecret
        /// </summary>
        //public const string appsecret = "0f4b41ea3164748fd9eb5e3998dca824";
        public const string appsecret = "ef9dfea0100ad379a5732ae30ca12037";//my
        //public const string appsecret = "0f9c3118a053db463529ff4e25188141";//师兄测试
        /// <summary>
        /// 微信公众号的token
        /// </summary>
        public const string token = "mtworldwxapp";
      //public const string token = "token";
        /// <summary>
        /// 微信公众号消息加密的密钥
        /// </summary>
        public const string encodingaeskey = "7uWqcHToSvV6KPkl9L8i3tjfKetOoV03YI1Da6QlNS3";
        /// <summary>
        /// 微信公众号的原始ID
        /// </summary>
        //public const string originalid = "gh_e28161c5b3a3";
        public const string originalid = "gh_c995f445799e";//my
        //public const string originalid = "gh_1c7da19a3f3b";//师兄测试
        /// <summary>
        /// 关注自动回复内容
        /// </summary>
        public const string subcriberesponse = "欢迎关注每通系统！！";
        /// <summary>
        /// 微信号
        /// </summary>
        public const string wxusername = "meitekms";

       public const string uri_befor = "http%3a%2f%2fwxtest.mtworld.cn%2f";//本地地址
        //public const string uri_befor = "http%3a%2f%2f24216io775.qicp.vip%2f";//花生壳测试地址//my
      //public const string uri_befor = "http%3a%2f%2fwx.mtworld.cn%2f";//正式地址
    }
}
