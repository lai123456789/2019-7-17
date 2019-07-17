using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class PalmAPIHelper
    {

        /// <summary>
        /// API调用方法
        /// </summary>
        /// <param name="url">调用地址</param>
        /// <param name="postData">参数</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求结果</returns>
        public static string PalmCoreIISAPI(string url, Dictionary<string, string> postData, string requestmethod)
        {
            string str = "";
            string iis_host = System.Configuration.ConfigurationManager.AppSettings["CoreApiHostIIS"];//核心程序IIS的API接口链接
            string api_code = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiCode"];//调用接口所需的Code
            string api_key = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiKey"];//调用接口所需的Key
            string api_timestamp = GetTimeStamp();//调用接口所需的时间戳
            string api_sign = TextEncrypt.MD5Encrypt32(api_code + api_key + api_timestamp, System.Text.Encoding.UTF8).ToLower();//调用接口所需的签名

            url = iis_host + url;
            try
            {

                postData.Add("api_code", api_code);
                postData.Add("api_timestamp", api_timestamp);
                postData.Add("api_sign", api_sign);
                str = HttpRequests.HttpRequestString(url, postData, requestmethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }




        /// <summary>
        /// API调用方法
        /// </summary>
        /// <param name="url">调用地址</param>
        /// <param name="postData">参数</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求结果</returns>
        public static string PalmCoreIIS3676API(string url, Dictionary<string, string> postData, string requestmethod)
        {
            string str = "";
            string iis_host = System.Configuration.ConfigurationManager.AppSettings["CoreApiHostIIS3676"];//核心程序IIS的API接口链接
            string api_code = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiCode"];//调用接口所需的Code
            string api_key = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiKey"];//调用接口所需的Key
            string api_timestamp = GetTimeStamp();//调用接口所需的时间戳
            string api_sign = TextEncrypt.MD5Encrypt32(api_code + api_key + api_timestamp, System.Text.Encoding.UTF8).ToLower();//调用接口所需的签名

            url = iis_host + url;
            try
            {

                postData.Add("api_code", api_code);
                postData.Add("api_timestamp", api_timestamp);
                postData.Add("api_sign", api_sign);
                str = HttpRequests.HttpRequestString(url, postData, requestmethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }



        /// <summary>
        /// API调用方法
        /// </summary>
        /// <param name="url">调用地址</param>
        /// <param name="postData">参数</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求结果</returns>
        public static string PalmCoreIIS3380API(string url, Dictionary<string, string> postData, string requestmethod)
        {
            string str = "";
            string iis_host = System.Configuration.ConfigurationManager.AppSettings["CoreApiHostIIS3380"];//核心程序IIS的API接口链接
            string api_code = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiCode"];//调用接口所需的Code
            string api_key = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiKey"];//调用接口所需的Key
            string api_timestamp = GetTimeStamp();//调用接口所需的时间戳
            string api_sign = TextEncrypt.MD5Encrypt32(api_code + api_key + api_timestamp, System.Text.Encoding.UTF8).ToLower();//调用接口所需的签名

            url = iis_host + url;
            try
            {

                postData.Add("api_code", api_code);
                postData.Add("api_timestamp", api_timestamp);
                postData.Add("api_sign", api_sign);
                str = HttpRequests.HttpRequestString(url, postData, requestmethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }

        /// <summary>
        /// API调用方法
        /// </summary>
        /// <param name="url">调用地址</param>
        /// <param name="postData">参数</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求结果</returns>
        public static string PalmCoreIIS3382API(string url, Dictionary<string, string> postData, string requestmethod)
        {
            string str = "";
            string iis_host = System.Configuration.ConfigurationManager.AppSettings["CoreApiHostIIS3382"];//核心程序IIS的API接口链接
            string api_code = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiCode"];//调用接口所需的Code
            string api_key = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiKey"];//调用接口所需的Key
            string api_timestamp = GetTimeStamp();//调用接口所需的时间戳
            string api_sign = TextEncrypt.MD5Encrypt32(api_code + api_key + api_timestamp, System.Text.Encoding.UTF8).ToLower();//调用接口所需的签名

            url = iis_host + url;
            try
            {

                postData.Add("api_code", api_code);
                postData.Add("api_timestamp", api_timestamp);
                postData.Add("api_sign", api_sign);
                str = HttpRequests.HttpRequestString(url, postData, requestmethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }


        /// <summary>
        /// API调用方法
        /// </summary>
        /// <param name="url">调用地址</param>
        /// <param name="postData">参数</param>
        /// <param name="requestmethod">请求方式：POST或者GET</param>
        /// <returns>返回请求结果</returns>
        public static string PalmCoreAPI(string url, Dictionary<string, string> postData, string requestmethod)
        {
            string str = "";
            string faq_host = System.Configuration.ConfigurationManager.AppSettings["CoreApiHost"];//核心程序的API接口链接
            string api_code = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiCode"];//调用接口所需的Code
            string api_key = System.Configuration.ConfigurationManager.AppSettings["Call_CoreApiKey"];//调用接口所需的Key
            string api_timestamp = GetTimeStamp();//调用接口所需的时间戳
            string api_sign = TextEncrypt.MD5Encrypt32(api_code + api_key + api_timestamp, System.Text.Encoding.UTF8).ToLower();//调用接口所需的签名

            url = faq_host + url;
            try
            {

                postData.Add("api_code", api_code);
                postData.Add("api_timestamp", api_timestamp);
                postData.Add("api_sign", api_sign);
                str = HttpRequests.HttpRequestString(url, postData, requestmethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }

        /// <summary>  
        /// 获取时间戳  
        /// </summary>  
        /// <returns></returns>  
        public static string GetTimeStamp()
        {
            TimeSpan ts = DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        }
    }
}
