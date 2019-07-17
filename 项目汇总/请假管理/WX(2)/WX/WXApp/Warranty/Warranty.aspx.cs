using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Warranty
{
    public partial class Warranty : WXAppBasic
    {
        
        public string 售后代码 = "";
        public string usercode = "";
        public string username = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            //页面权限
            pageid = "WXP0004";

            if (!checkout(pageid))
            {
                Response.Redirect("/Permissions/404.html");
            }
            username = wxuserinfo.username;
            usercode = wxuserinfo.usercode;
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "processed"://点击编辑售后跳转
                        售后代码 = Request["salescode"];
                        break;
                }
            }
            else
            {

            }
        }

        protected override void StateCheckConfig()
        {

        }
    }
}