using Common;
using DataOperator;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace DAL
{
    public class DALWXMessageHandleBasic
    {
        /// <summary>
        /// 事件消息防复重
        /// </summary>
        /// <returns></returns>
        public bool EventMsgPreventDuplicates(string fromusername, double createtime)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.BeginTransaction();
            try
            {
                string sql = "select 1 from sys_p_wxeventmsglog t where t.fromusername=:fromusername and t.createtime=:createtime and rownum<2";
                OracleDBO.OracleCmdParam[] oparam = new OracleDBO.OracleCmdParam[2];
                oparam[0].Name = ":fromusername";
                oparam[0].Type = OracleDbType.Varchar2;
                oparam[0].Value = fromusername;

                oparam[1].Name = ":createtime";
                oparam[1].Type = OracleDbType.Double;
                oparam[1].Value = createtime;

                DataTable dt = mydbo.GetDataTable(sql, oparam);
                if (dt != null && dt.Rows.Count > 0)
                {
                    result = false;
                    mydbo.Rollback();
                    return result;
                }
                sql = "insert into sys_p_wxeventmsglog(fromusername,createtime,logtime) values(:fromusername,:createtime,sysdate)";
                mydbo.ExecuteNonQuery(sql, oparam);
                mydbo.Commit();
            }
            catch (Exception ex)
            {
                mydbo.Rollback();
                result = false;
                LogWriter.WriteLog(ex);
            }
            finally
            {
                mydbo.Close();
            }
            return result;
        }
    }
}
