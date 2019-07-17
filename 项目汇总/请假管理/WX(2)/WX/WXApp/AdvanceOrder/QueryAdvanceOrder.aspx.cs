using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp.AdvanceOrder
{
    public partial class QueryAdvanceOrder : WXAppBasic
    {
        public string 流程单号 = "";
        public string 试制号 = "";
        public string 图档号 = "";
        public string 名称 = "";
        public string 需求数量 = "";
        public string 需求场景 = "";
        public string 图纸归档 = "";
        public string 图纸代码 = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "design"://点击设计图纸跳转
                        流程单号 = Request["ProcessNo"];
                        试制号 = Request["TrialNo"];
                        图档号 = Request["ImageNo"];
                        名称 = Request["Name"];
                        需求数量 = Request["DemandNum"];
                        需求场景 = Request["Scenario"];
                        图纸归档 = Request["ArchiveDate"];
                        图纸代码 = Request["drawingcode"];
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