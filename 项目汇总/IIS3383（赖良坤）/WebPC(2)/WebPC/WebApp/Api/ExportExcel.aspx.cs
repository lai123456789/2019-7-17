using Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApp.Api
{
    public partial class ExportExcel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "excel"://导出Excel
                        Excel();
                        break;
                }
            }
        }

        /// <summary>
        /// 导出Excel
        /// </summary>
        private void Excel()
        {
            string errmsg = "";
            string table = Request["table"];
            table = table.Replace("\r\n", "").Replace("\n", "").Replace("	", "");
            string tablename = Request["tablename"];
            DataTable dt = ObjectSeriallizeHelper.JsonToDataTable(table);
            CreateExcel(dt, tablename);
        }


        /// <summary>
        /// DataTable中的数据导出到Excel并下载
        /// </summary>
        /// <param name="dt">要导出的DataTable</param>
        /// <param name="FileName">Excel的文件名</param>
        public void CreateExcel(DataTable dt, string FileName)
        {
            Response.Clear();
            Response.Charset = "UTF-8";
            Response.Buffer = true;
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
            Response.AppendHeader("Content-Disposition", "attachment;filename=\"" + System.Web.HttpUtility.UrlEncode(FileName, System.Text.Encoding.UTF8) + ".xls\"");
            //Response.ContentType = "application/ms-excel";
            Response.ContentType = "application/vnd.ms-excel;charset=utf-8";
            string colHeaders = string.Empty;
            string ls_item = string.Empty;
            int al = dt.Columns.Count;
            for (int a = 0; a < dt.Columns.Count; a++)
            {
                if (a == (al - 1))
                {
                    ls_item += dt.Columns[a].ColumnName + "\n";
                }
                else
                {
                    ls_item += dt.Columns[a].ColumnName + "\t";
                }
            }
            DataRow[] myRow = dt.Select();
            int i = 0;
            int cl = dt.Columns.Count;
            foreach (DataRow row in myRow)
            {
                for (i = 0; i < cl; i++)
                {
                    if (i == (cl - 1))
                    {
                        ls_item += "" + row[i].ToString() + "\n";
                    }
                    else
                    {
                        ls_item += "" + row[i].ToString() + "\t";
                    }
                }
                Response.Output.Write(ls_item);
                ls_item = string.Empty;
            }
            Response.Output.Flush();
            Response.End();
        }
    }
}