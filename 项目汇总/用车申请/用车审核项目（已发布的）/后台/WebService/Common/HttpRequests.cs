using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace Common
{
    public class HttpRequests
    {

        /// <summary>
        /// HTTP传输，传入字符串，传出字节
        /// </summary>
        /// <param name="len">文件大小</param>
        /// <param name="url">url地址</param>
        /// <param name="postData">请求数据，键名和键值</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求到的字节数组</returns>
        public static Byte[] HttpRequestByte(int len, string url, Dictionary<string, string> postData, string requestmethod)
        {
            string postStr = string.Empty;
            if (postData != null)
            {
                postData.All(o =>
                {
                    if (string.IsNullOrEmpty(postStr))
                        postStr = string.Format("{0}={1}", o.Key, o.Value);
                    else
                        postStr += string.Format("&{0}={1}", o.Key, o.Value);
                    return true;
                });
            }

            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(url));//创建一个Http连接
            if (requestmethod.ToLower() == "post")
            {
                webRequest.Method = "POST";//请求方式
                webRequest.ContentType = "application/x-www-form-urlencoded";
                byte[] bytearr = Encoding.UTF8.GetBytes(postStr);//将参数转化成字节
                Stream sw = webRequest.GetRequestStream();//字节流
                sw.Write(bytearr, 0, bytearr.Length);//输出
                sw.Close();//关闭输出流
            }

            HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();//获取响应资源
            Stream sr = response.GetResponseStream();//获取响应流
            byte[] by = new byte[len];
            int count = -1;
            int begincount = 0;
            int lencount = by.Length;//还未读取得字节数 
            while ((count = sr.Read(by, begincount, lencount)) != 0)
            {
                begincount += count;
                lencount -= count;
            }
            return by;
        }

        /// <summary>
        /// HTTP传输，传入字符串，传出字符串
        /// </summary>
        /// <param name="url">url地址</param>
        /// <param name="postData">请求数据，键名和键值</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求到的字符串</returns>
        public static string HttpRequestString(string url, Dictionary<string, string> postData, string requestmethod)
        {
            string postStr = string.Empty;
            if (postData != null)
            {
                postData.All(o =>
                {
                    if (string.IsNullOrEmpty(postStr))
                        postStr = string.Format("{0}={1}", o.Key, o.Value);
                    else
                        postStr += string.Format("&{0}={1}", o.Key, o.Value);
                    return true;
                });
            }

            HttpWebRequest webRequest;
            if (requestmethod.ToLower() == "post")
            {
                webRequest = (HttpWebRequest)WebRequest.Create(new Uri(url));//创建一个Http连接
                byte[] bytearr = Encoding.UTF8.GetBytes(postStr);//将参数转化成字节
                webRequest.Method = "POST";//请求方式
                webRequest.Timeout = 60000;
                webRequest.ContentType = "application/x-www-form-urlencoded";
                Stream sw = webRequest.GetRequestStream();//字节流
                sw.Write(bytearr, 0, bytearr.Length);//输出
                sw.Close();//关闭输出流
            }
            else
            {
                webRequest = (HttpWebRequest)WebRequest.Create(new Uri(url + postStr));//创建一个Http连接
            }
            string len = "";
            try
            {
                HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();//获取响应资源
                Stream sr = response.GetResponseStream();//获取响应流
                StreamReader srd = new StreamReader(sr);
                len = srd.ReadToEnd();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return len;
        }
    }
}
