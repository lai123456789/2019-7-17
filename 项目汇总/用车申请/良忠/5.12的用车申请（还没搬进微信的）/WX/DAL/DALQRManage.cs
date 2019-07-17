using Common;
using DataOperator;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class DALQRManage
    {
        /// <summary>
        /// 创建临时二维码
        /// </summary>
        /// <param name="ticket">获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码。</param>
        /// <param name="expire_seconds">该二维码有效时间，以秒为单位。 最大不超过2592000（即30天）。</param>
        /// <param name="url">二维码图片解析后的地址，开发者可根据该地址自行生成需要的二维码图片</param>
        /// <param name="qrtype">二维码类型，0为临时二维码，1为永久二维码</param>
        /// <param name="scene_id">二维码的场景ID</param>
        /// <param name="intentions">意图，【关注公众号】【绑定用户】</param>
        /// <param name="failuredate">失效时间</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool CreateTmpQRCode(string ticket, int expire_seconds, string url, int qrtype, int scene_id, string intentions, DateTime failuredate, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 获取微信二维码是否存在记录
                string sql1 = @"select coun(*)
                                  from sys_p_wxqrmanage t
                                 where t.valid = 1
                                   and t.scene_id = :scene_id";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":scene_id";
                oparam1[0].Type = OracleDbType.Int32;
                oparam1[0].Value = scene_id;

                int num = Convert.ToInt32(mydbo.ExecuteScalar(sql1, oparam1)); 
                #endregion

                if (num == 0)
                {
                    #region 添加二维码信息
                    string sql2 = @"insert into sys_p_wxqrmanage
                                  (ticket, expire_seconds, url, qrtype, scene_id, intentions, failuredate)
                                values
                                  (:ticket,
                                   :expire_seconds,
                                   :url,
                                   :qrtype,
                                   :scene_id,
                                   :intentions,
                                   :failuredate)";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[7];
                    oparam2[0].Name = ":ticket";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = ticket;

                    oparam2[1].Name = ":expire_seconds";
                    oparam2[1].Type = OracleDbType.Int32;
                    oparam2[1].Value = expire_seconds;

                    oparam2[2].Name = ":url";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = url;

                    oparam2[3].Name = ":qrtype";
                    oparam2[3].Type = OracleDbType.Int32;
                    oparam2[3].Value = qrtype;

                    oparam2[4].Name = ":scene_id";
                    oparam2[4].Type = OracleDbType.Int32;
                    oparam2[4].Value = scene_id;

                    oparam2[5].Name = ":intentions";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = intentions;

                    oparam2[6].Name = ":failuredate";
                    oparam2[6].Type = OracleDbType.Date;
                    oparam2[6].Value = failuredate;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam2);
                    #endregion
                }
                else
                {
                    errmsg = "该场景ID已存在";
                    result = false;
                }
            }
            catch (Exception ex)
            {
                errmsg = ex.Message.ToString();
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
