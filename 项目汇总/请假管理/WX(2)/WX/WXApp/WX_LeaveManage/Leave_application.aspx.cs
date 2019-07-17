using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.WX_LeaveManage
{
    public partial class Leave_application : WXAppBasic
    {
        public string usercode = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            //页面权限
            pageid = "WXP0011";

            if (!checkout(pageid))
            {
                Response.Redirect("/Permissions/404.html");
            }
            usercode = wxuserinfo.usercode;
        }

        protected override void StateCheckConfig()
        {

        }
    }
}