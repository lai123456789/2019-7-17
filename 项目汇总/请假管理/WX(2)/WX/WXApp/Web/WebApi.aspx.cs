using BLL;
using Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.WebApi
{
    public partial class WebApi : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "requestdata"://请求数据
                        RequestData();
                        break;
                }
            }
        }

        /// <summary>
        /// 请求数据
        /// </summary>
        private void RequestData()
        {
            string errmsg = "";
            string urltype = Request["urltype"];//请求类型,IIS,Tomcat
            string pageurl = Request["pageurl"];//代码
            string data = Request["data"];//数据
            ResultInfo outjson = new ResultInfo();
            BLLRequestData mybll = new BLLRequestData();
            bool result = true;
            string json = "";
            switch (urltype)
            {
                case "IIS3676":
                    result = mybll.RequestIIS3676Data(pageurl, data, ref json, ref errmsg);
                    if (!result)
                    {
                        outjson.errcode = -1;
                        outjson.errmsg = errmsg;
                    }
                    break;
                case "IIS3380":
                    result = mybll.RequestIIS3380Data(pageurl, data, ref json, ref errmsg);
                    if (!result)
                    {
                        outjson.errcode = -1;
                        outjson.errmsg = errmsg;
                    }
                    break;
                case "IIS3382":
                    result = mybll.RequestIIS3382Data(pageurl, data, ref json, ref errmsg);
                    if (!result)
                    {
                        outjson.errcode = -1;
                        outjson.errmsg = errmsg;
                    }
                    break;
                case "Tomcat":

                    break;
                default:
                    result = false;
                    outjson.errcode = -1;
                    outjson.errmsg = "请求出错，未找到对应服务器";
                    break;
            }
            if (result)
            {
                Response.Write(json);
                Response.End();
            }
            else
            {
                Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                Response.End();
            }

        }
    }
}