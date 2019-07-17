using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.CarReview
{
    public partial class CarAppOrderDetails : WXAppBasic
    {
        public string usercode = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            usercode = wxuserinfo.usercode;
        }

        protected override void StateCheckConfig()
        {

        }
    }
}