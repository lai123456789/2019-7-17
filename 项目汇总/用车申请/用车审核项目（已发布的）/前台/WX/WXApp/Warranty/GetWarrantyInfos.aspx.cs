using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Warranty
{
   public partial class GetWarrantyInfos : WXAppBasic
    {
        public string salescode = "";
        public string usercode = "";
        public string username = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            usercode = wxuserinfo.usercode;
            username = wxuserinfo.username;

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