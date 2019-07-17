using Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp
{
    public class ApiBasic : System.Web.UI.Page
    {
        protected string outjson = "{\"errcode\":#code#,\"errmsg\":\"#msg#\",\"data\":null}";
        protected string ApiCode = System.Configuration.ConfigurationManager.AppSettings["Open_ApiCode"];
        protected string ApiKey = System.Configuration.ConfigurationManager.AppSettings["Open_ApiKey"];
        /// <summary>
        /// Api时间戳容差，单位秒
        /// </summary>
        protected int ApiTimeTolerance = 60;
        protected override void OnInit(EventArgs e)
        {
            ApiResult apiresult = new ApiResult();
            //CheckApiAuth(ref apiresult);
            if (apiresult.errcode != 0)
            {
                Response.Write(ObjectSerializeHelper.ObjectToJson(apiresult));
                Response.End();
            }
        }

        /// <summary>
        /// 检查API接口授权
        /// </summary>
        void CheckApiAuth(ref ApiResult apiresult)
        {
            string r_ApiCode = !string.IsNullOrEmpty(Request["api_code"]) ? Request["api_code"].Trim() : "";
            string r_TimeStamp = !string.IsNullOrEmpty(Request["api_timestamp"]) ? Request["api_timestamp"].Trim() : "";//时间戳
            string r_Sign = !string.IsNullOrEmpty(Request["api_sign"]) ? Request["api_sign"].Trim() : "";//API签名
            if (string.IsNullOrEmpty(r_ApiCode))
            {
                apiresult.errcode = -1;
                apiresult.errmsg = "无ApiCode";
                return;
            }
            if (r_ApiCode.ToLower() != ApiCode.ToLower())
            {
                apiresult.errcode = -1;
                apiresult.errmsg = "ApiCode未授权";
                return;
            }
            //判断时间戳是否在容差范围之内
            try
            {
                double timestamp = 0d;
                bool success = true;
                success = double.TryParse(r_TimeStamp, out timestamp);
                if (!success)
                {
                    apiresult.errcode = -1;
                    apiresult.errmsg = "Api时间戳错误";
                    return;
                }
                DateTime now = DateTime.Now;
                DateTime newnow = TimestampToDatetime(timestamp);
                double timediff = (now - newnow).TotalSeconds;
                if (timediff > ApiTimeTolerance || ApiTimeTolerance < (-ApiTimeTolerance))
                {
                    apiresult.errcode = -1;
                    apiresult.errmsg = "Api时间戳超出范围";
                    return;
                }
            }
            catch (Exception ex)
            {
                apiresult.errcode = -1;
                apiresult.errmsg = "Api时间戳错误";
                LogWriter.WriteLog(ex);
                return;
            }
            if (string.IsNullOrEmpty(r_Sign))
            {
                apiresult.errcode = -1;
                apiresult.errmsg = "无Api签名";
                return;
            }
            if (r_Sign.ToLower() != TextEncrypt.MD5Encrypt32(ApiCode + ApiKey + r_TimeStamp, System.Text.Encoding.UTF8).ToLower())
            {
                apiresult.errcode = -1;
                apiresult.errmsg = "Api签名错误";
                return;
            }
        }

        DateTime TimestampToDatetime(double timestamp)
        {
            DateTime result = new DateTime(1970, 1, 1);
            result = result.AddSeconds(timestamp);
            return result;
        }
    }
}