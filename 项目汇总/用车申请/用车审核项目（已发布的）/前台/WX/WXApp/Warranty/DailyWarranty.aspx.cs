using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Warranty
{
    public partial class DailyWarranty : WXAppBasic
    {
        public string usercode = "";
        public string username = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            //页面权限
            pageid = "WXP0008";

            if (!checkout(pageid))
            {
                Response.Redirect("/Permissions/404.html");
            }
            username = wxuserinfo.username;
            usercode = wxuserinfo.usercode;
        }

        protected override void StateCheckConfig()
        {

        }
    }
}