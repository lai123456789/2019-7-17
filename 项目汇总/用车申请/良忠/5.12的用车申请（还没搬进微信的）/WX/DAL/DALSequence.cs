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
    public class DALSequence
    {
        /// <summary>
        /// 返回序列
        /// </summary>
        /// <param name="SeqType">类型</param>
        /// <param name="SeqLength">长度</param>
        /// <param name="Prefix">前缀</param>
        /// <param name="Sequence">序列</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GenerateSequence(string SeqType, int SeqLength, string Prefix, ref int Sequence, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.IsByParamName = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询该类型在数据库中是否有记录
                int n;
                string sql1 = @"select t.seq from sys_p_sequence t where t.seqtype=:seqtype";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":seqtype";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = SeqType;

                DataTable dt = mydbo.GetDataTable(sql1, oparam1);

                #endregion
                if (dt.Rows.Count > 0)
                {
                    #region 更新该类型序列的值
                    string sql2 = @"update sys_p_sequence t set t.seq = :seq where t.seqtype = :seqtype";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[2];
                    oparam2[0].Name = ":seq";
                    oparam2[0].Type = OracleDbType.Int32;
                    oparam2[0].Value = Convert.ToInt32(dt.Rows[0]["seq"]) + 1;

                    oparam2[1].Name = ":seqtype";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = SeqType;

                    n = mydbo.ExecuteNonQuery(sql2, oparam2);
                    Sequence = Convert.ToInt32(dt.Rows[0]["seq"]);
                    #endregion
                }
                else
                {
                    #region 添加序列类型
                    string sql2 = @"insert into sys_p_sequence(seqtype,seqlength,prefix,seq) values(:seqtype,:seqlength,:prefix,:seq)";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[4];
                    oparam2[0].Name = ":seqtype";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = SeqType;

                    oparam2[1].Name = ":seqlength";
                    oparam2[1].Type = OracleDbType.Int32;
                    oparam2[1].Value = SeqLength;

                    oparam2[2].Name = ":prefix";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = Prefix;

                    oparam2[3].Name = ":seq";
                    oparam2[3].Type = OracleDbType.Int32;
                    oparam2[3].Value = 2;

                    n = mydbo.ExecuteNonQuery(sql2, oparam2);

                    Sequence = 1;
                    #endregion
                }
            }
            catch (Exception ex)
            {
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
