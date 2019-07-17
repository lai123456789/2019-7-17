using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLRequestData
    {
        /// <summary>
        /// 登录请求
        /// </summary>
        /// <param name="pageurl">页面URL</param>
        /// <param name="data">数据</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool RequestIIS3676Data(string pageurl, string data, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("data", data);//用户密码
                string url = pageurl;
                json = PalmAPIHelper.PalmCoreIIS3676API(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确:" + ex.Message.ToString();
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }


        /// <summary>
        /// 登录请求
        /// </summary>
        /// <param name="pageurl">页面URL</param>
        /// <param name="data">数据</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool RequestIIS3380Data(string pageurl, string data, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                data = System.Web.HttpContext.Current.Server.UrlEncode(data);
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("data", data);//用户密码
                string url = pageurl;
                json = PalmAPIHelper.PalmCoreIIS3380API(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确:" + ex.Message.ToString();
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }
    }
}
