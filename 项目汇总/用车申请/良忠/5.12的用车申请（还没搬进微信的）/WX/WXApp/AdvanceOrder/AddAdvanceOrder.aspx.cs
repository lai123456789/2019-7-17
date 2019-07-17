using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.AdvanceOrder
{
    public partial class AddAdvanceOrder : WXAppBasic
    {
        public string 流程单号 = "";
        public string 项目经理 = "";
        public string 试制号 = "";
        public string 图档号 = "";
        public string 名称 = "";
        public string 需求数量 = "";
        public string 归类 = "";
        public string 提单人 = "";
        public string 系统通知日期 = "";
        public string 需求场景 = "";
        public string 子流程单号 = "";
        public string usercode = "";
        public string username = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            //页面权限
            pageid = "WXP0001";

            usercode = wxuserinfo.usercode;
            username = wxuserinfo.username;

            if (!checkout(pageid))
            {
                Response.Redirect("/Permissions/404.html");
            }
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "design"://点击设计图纸跳转
                        流程单号 = Request["ProcessNo"];
                        项目经理 = Request["PM"];
                        试制号 = Request["TrialNo"];
                        图档号 = Request["ImageNo"];
                        名称 = Request["Name"];
                        需求数量 = Request["DemandNum"];
                        归类 = Request["Classified"];
                        提单人 = Request["Lading"];
                        系统通知日期 = Request["Sysnotifydate"];
                        需求场景 = Request["Scenario"];
                        子流程单号 = Request["SubprocessNo"];
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