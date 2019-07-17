using BLL;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WXInterface;

namespace WXApp
{
    public partial class WXQRManage : System.Web.UI.Page
    {
        protected string outjson = "{\"errcode\":#code#,\"errmsg\":\"#msg#\",\"data\":null}";
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "createtmpqrcode"://创建临时二维码
                    CreateTmpQRCode();
                    break;
            }
        }

        /// <summary>
        /// 创建临时二维码
        /// </summary>
        private void CreateTmpQRCode()
        {
            string errmsg = "";
            string wxappid = WXApiInfo.wxappid;
            int scene_id = 0;
            BLLSequence myseq = new BLLSequence();
            bool result = myseq.GetCreateTmpQRCodeScene_id(ref scene_id, ref errmsg);
            if (result)
            {
                CreateQRCodeResult info = new CreateQRCodeResult();
                CallWXInterface mybll = new CallWXInterface();
                DateTime failuredate = DateTime.Now.AddSeconds(3600);
                info = mybll.CreateTmpQRCode(wxappid, 3600, scene_id);
                BLLQRManage myqr = new BLLQRManage();
                result = myqr.CreateTmpQRCode(info.ticket, info.expire_seconds, info.url, 0, scene_id, "绑定用户", failuredate, ref errmsg);
                if (result)
                {
                    string str = "\"url\":\"" + info.url + "\"";
                    Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", str));
                    Response.End();
                }
                else
                {
                    Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                    Response.End();
                }
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
        }
    }
}