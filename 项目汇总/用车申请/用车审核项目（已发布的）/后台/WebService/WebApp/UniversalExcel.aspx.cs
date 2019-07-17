using BLL;
using Common;
using Entity.Request;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApp
{
    public partial class UniversalExcel : ApiBasic
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "AddExcleHeader"://添加表头
                    AddExcleHeader();
                    break;
                case "updataAddExcleHeader"://更新添加表头
                    updataAddExcleHeader();
                    break;
                case "GetExcel"://excle查询
                    GetExcel();
                    break;
            }
        }

        /// <summary>
        /// 添加表头
        /// </summary>
        private void AddExcleHeader()
        {
            string errmsg = "";
            string data = Request["data"];
            RequestUniversalExcle rm = ObjectSerializeHelper.JsonToObject<RequestUniversalExcle>(data);

            BLLUniversalExcel mybll = new BLLUniversalExcel();

            bool result = mybll.AddExcleHeader(rm.pagecode, rm.ExcelHeader, ref errmsg);
            if (!result)
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", ""));
                Response.End();
            }
        }

        /// <summary>
        /// 更新添加表头
        /// </summary>
        private void updataAddExcleHeader()
        {
            string errmsg = "";
            string data = Request["data"];
            RequestUniversalExcle rm = ObjectSerializeHelper.JsonToObject<RequestUniversalExcle>(data);

            BLLUniversalExcel mybll = new BLLUniversalExcel();

            bool result = mybll.updataAddExcleHeader(rm.pagecode, rm.ExcelHeader, ref errmsg);
            if (!result)
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", ""));
                Response.End();
            }
        }

        /// <summary>
        /// excle查询
        /// </summary>

        private void GetExcel()
        {
            string errmsg = "";
            int page = 0;
            int totalnum = 0;//记录总数
            int pagecount = 0;//页总数
            int pagesize = 15;
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesExcel rm = ObjectSerializeHelper.JsonToObject<RequesExcel>(data);
            BLLUniversalExcel mybll = new BLLUniversalExcel();
            bool result = mybll.updataAddExcleHeader(pagesize, page, ref totalnum, ref pagecount,
                                            ref dt, rm.pagecode, rm.onetypehcode, rm.onetype,
                                             rm.onetypevalues, rm.datetypehcode, rm.datetypeselecttype, rm.startdate,
                                               rm.enddata, rm.startdata_time, rm.enddata_time,
                                               rm.digitaltypehcode, rm.digitaltypeselecttype, rm.twotypetype,
                                               rm.oneval1, rm.oneval2, rm.choosetypehcode, rm.choosetypeselecttype, rm.choosetype, ref errmsg);
            if (!result)
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                json += ",\"pagecount\":" + pagecount;
                json += ",\"totalnum\":" + totalnum;
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }
        }
    }
}