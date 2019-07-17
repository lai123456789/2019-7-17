using BLL;
using Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            InterfaceTest();
            #region 设置行业
            //string url = "https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=16_a2SqoL5iLFnRJqhl0jHHCa5fqS2mZjct6XCqNPXxhlREDIx4xvsod1tOpuQuy3SFC-b5Rh7_3WnXDjyVWF0ZreQySw93V7nUxP6WyToBSrEuMn54j4iKeGbs2c6npx47SjQc-nvDzbUhz0aRHEYbACAXUO";
            //string postData = "{\"industry_id1\":\"3\",\"industry_id2\":\"4\"}";
            //try
            //{
            //    string json = HttpRequests.WXInterfaceHttpRequest(url, postData, "post");
            //    if (json != "")
            //    {

            //    }
            //}
            //catch (Exception ex)
            //{

            //} 
            #endregion

            
        }





        /// <summary>
        /// 成为开发者url测试，返回echoStr
        /// </summary>
        public void InterfaceTest()
        {
            string token = "meitekwxapp";
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
    }
}