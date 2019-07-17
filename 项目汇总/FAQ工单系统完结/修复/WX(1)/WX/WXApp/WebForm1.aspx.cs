using BLL;
using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WXApp
{
    public partial class WebForm1 : ApiBasi
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
              string action = Request["action"];
              if (!string.IsNullOrWhiteSpace(action))
              {
                  switch (action)
                  {
                      case "GetUsercod":
                          GetUsercod();
                          break;

                  }
              }
          
        }


        /// 00
        /// </summary>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>出错时返回的错误提示信息</returns>
        private void GetUsercod()
        {
            string errmsg = "";
            string id = Request["id"];//你传回的值0或1
            string accont = Request["accont"]; // 给一个输入框 输入要允许绑定工号


            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetUsercode(id ,accont, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {

                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", errmsg));
                Response.End();
            }
        }


    
    }
}