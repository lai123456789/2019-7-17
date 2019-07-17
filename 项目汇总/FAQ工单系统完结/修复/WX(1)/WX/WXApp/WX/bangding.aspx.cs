using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.Wx
{
    public partial class UpateWord : WXAppBasic
    {
       
             /// <summary>
        /// 用户代码
        /// </summary>
        //public string username = "";
        //public string usercode = "";
        //public string usertype = "";
        public string wxopenid = "";
        
        protected void Page_Load(object sender, EventArgs e)
        {          
            //username = wxuserinfo.username;

            string wxopenid = wxuserinfo.wxopenid;
                    //   wxopenid = wxinfo.openid;  
            // string usertype = wxuserinfo.usertype;
        }
           

            

        protected override void StateCheckConfig()
        {

        }

    }
}