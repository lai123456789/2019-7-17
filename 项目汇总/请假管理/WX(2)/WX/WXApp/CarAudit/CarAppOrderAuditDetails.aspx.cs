using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.CarAudit
{
    public partial class CarAppOrderAuditDetails : WXAppBasic
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