using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Assembly
{
    public partial class A001 : WXAppBasic
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //页面权限
            pageid = "WXP0009";

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