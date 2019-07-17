using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.AdvanceOrder
{
    public partial class SelectMaterial : WXAppBasic
    {
        public string usercode = "";
        public string drawingcode = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            usercode = wxuserinfo.usercode;
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "design"://点击设计图纸跳转

                        drawingcode = Request["drawingcode"];
                        break;
                }
            }
            else
            {

            }

            //页面权限
            //pageid = "WXP0004";

            //if (!checkout(pageid))
            //{
            //    Response.Redirect("/Permissions/404.html");
            //}
        }

        protected override void StateCheckConfig()
        {

        }
    }
}