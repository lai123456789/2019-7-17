using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Warranty
{
    public partial class UpdateWarranty : WXAppBasic
    {

        public string 售后代码 = "";
        public string usercode = "";
        public string username = "";
        public string dealusercode = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            username = wxuserinfo.username;
            usercode = wxuserinfo.usercode;
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "processed"://点击编辑售后跳转
                        售后代码 = Request["salescode"];
                        dealusercode = Request["dealusercode"];
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