using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.WX
{
    public partial class WebForm3 : WXAppBasic
    {

        /// <summary>
        /// 用户代码
        /// </summary>
        public string username = "";
        public string usercode = "";
        public string usertype = "";
        protected override void StateCheckConfig()
        {

        }
        protected void Page_Load(object sender, EventArgs e)
        {

            username = wxuserinfo.username;

            usercode = wxuserinfo.usercode;

            usertype = wxuserinfo.usertype;
        }


    }
}