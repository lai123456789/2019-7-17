using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.WX.create_gongdan
{
    public partial class create_gongdan : WXAppBasic
    {
        /// <summary>
        /// 用户代码
        /// </summary>
        public string username = "";
        public string usercode = "";
        public string usertype = ""; 
      
        protected void Page_Load(object sender, EventArgs e)
        {

            username = wxuserinfo.username;

            usercode = wxuserinfo.usercode;

            usertype = wxuserinfo.usertype;
        }

       protected override void StateCheckConfig()
        {

        }
    }
}