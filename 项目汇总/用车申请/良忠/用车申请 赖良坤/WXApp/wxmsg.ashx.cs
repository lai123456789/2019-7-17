using BLL.WXPushMessage;
using Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;

namespace WXApp
{
    /// <summary>
    /// wxmsg 的摘要说明
    /// </summary>
    public class wxmsg : IHttpHandler
    {
        /// <summary>
        /// 成为开发者url测试，返回echoStr
        /// </summary>
        public void InterfaceTest()
        {
            //string token = "meitekwxapp";
            string token = "token";
            if (string.IsNullOrEmpty(token))
            {
                return;
            }

            string echoString = HttpContext.Current.Request.QueryString["echoStr"];
            string signature = HttpContext.Current.Request.QueryString["signature"];
            string timestamp = HttpContext.Current.Request.QueryString["timestamp"];
            string nonce = HttpContext.Current.Request.QueryString["nonce"];

            if (!string.IsNullOrEmpty(echoString))
            {
                HttpContext.Current.Response.Write(echoString);
                HttpContext.Current.Response.End();
            }
        }
        public void ProcessRequest(HttpContext context)
        {
            
            
            if (context.Request.HttpMethod.ToUpper() == "GET")
            {
                if (context.Request.QueryString["signature"] != null)
                {
                    Valid(context);
                }
            }
            else if (context.Request.HttpMethod.ToUpper() == "POST")
            {
                //post过来的是xml格式的内容，放在请求实体里面，所以要用InputStream取出来
                string xmlData = "";
                using (Stream stream = context.Request.InputStream)
                {
                    Byte[] byteData = new Byte[stream.Length];
                    stream.Read(byteData, 0, (Int32)stream.Length);
                    xmlData = Encoding.UTF8.GetString(byteData);
                }
                if (!string.IsNullOrEmpty(xmlData))
                {
                    try
                    {
                        BLLWXMessageHandle mybll = new BLLWXMessageHandle();

                        context.Response.Write(mybll.HandleMsg(xmlData));
                    }
                    catch
                    {
                        //未能正确处理 给微信服务器回复默认值
                    }
                }
            }
        }


        /// <summary>
        /// 用于验证微信公众平台接入
        /// </summary>
        /// <param name="context"></param>
        private void Valid(HttpContext context)
        {
            string echoStr = context.Request.QueryString["echoStr"];
            //这里为了方便，不验证签名，直接返回结果
            //if (CheckSignature(context))
            //{
            //    if (!string.IsNullOrEmpty(echoStr))
            //    {
            //        context.Response.Write(echoStr);
            //        context.Response.End();
            //    }
            //}
            if (!string.IsNullOrEmpty(echoStr))
            {
                context.Response.Write(echoStr);
                context.Response.End();
            }
        }

        /// <summary>
        /// 用于接入时的验证签名
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private bool CheckSignature(HttpContext context)
        {
            string signature = context.Request.QueryString["signature"];
            string timestamp = context.Request.QueryString["timestamp"];
            string nonce = context.Request.QueryString["nonce"];
            string Token = WXApiInfo.token;
            string[] ArrTmp = { Token, timestamp, nonce };
            Array.Sort(ArrTmp);     //字典排序  
            string tmpStr = string.Join("", ArrTmp);
            tmpStr = FormsAuthentication.HashPasswordForStoringInConfigFile(tmpStr, "SHA1");
            tmpStr = tmpStr.ToLower();
            if (tmpStr == signature)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}