using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Warranty
{
    public partial class Message : WXAppBasic
    {
        public string usercode = "";
        public string salescode = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            usercode = wxuserinfo.usercode;

            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "processed"://点击设计图纸跳转

                        salescode = Request["salescode"];
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