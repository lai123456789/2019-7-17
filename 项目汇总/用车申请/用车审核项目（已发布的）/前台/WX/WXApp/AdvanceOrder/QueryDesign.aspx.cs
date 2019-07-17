using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.AdvanceOrder
{
    public partial class QueryDesign : WXAppBasic
    {
        public string usercode = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            usercode = wxuserinfo.usercode;

            //页面权限
            pageid = "WXP0003";

            if (!checkout(pageid))
            {
                Response.Redirect("/Permissions/404.html");
            }
        }

        protected override void StateCheckConfig()
        {
            
        }
    }
}