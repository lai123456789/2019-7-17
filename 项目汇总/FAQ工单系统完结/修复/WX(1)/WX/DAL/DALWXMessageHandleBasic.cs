using Common;
using DataOperator;
using Entity;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using WXInterface;

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


        /// <summary>
        /// 推送绑定消息
        /// </summary>
        /// <returns></returns>
        public bool SendSecss(string wxappid, string wxopenid, string keyword1, string keyword2, ref string errmsg)
        {
            bool result = true;
            string wxtemplateid = "PriZgAb1D7tSC6ZSgsCSKLzu8m2gBPEGtWijXKr024Q";
            string url = "http://240344pb55.qicp.vip/WX/re_login.aspx";//这里换登录空白页
            string first = "您好，绑定已允许，可放行登录";
            string remark = "点击查看详情";
            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""data"":{{
                                                ""first"":{{
                                                ""value"":""{3}"",
                                                ""color"":""#ff0000""
                                                }},
                                                ""keyword1"":{{
                                                ""value"":""{4}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword2"":{{
                                                ""value"":""{5}"",
                                                ""color"":""#000000""
                                                }},
                                              
                                                ""remark"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, keyword1, keyword2, remark });
            #endregion

            try
            {
                CallWXInterface call = new CallWXInterface();
                Ent_TemplateMsgSendResult sendresult = call.SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {

                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }




        /// <summary>
        /// 推送绑定消息
        /// </summary>
        /// <returns></returns>
        public bool Sendfalse(string wxappid, string wxopenid, string keyword1, string keyword2, ref string errmsg)
        {
            bool result = true;
            string wxtemplateid = "1MpRPdqSxpNwp8zIABiIHILo6TzH2m6cgK4kXpYhXX8";
            //string url = "http://240344pb55.qicp.vip/WebForm1.aspx";
            string first = "您好，绑定被驳回，请及时联系管理员";
           // string remark = "点击查看详情";
            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""data"":{{
                                                ""first"":{{
                                                ""value"":""{3}"",
                                                ""color"":""#ff0000""
                                                }},
                                                ""keyword1"":{{
                                                ""value"":""{4}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword2"":{{
                                                ""value"":""{5}"",
                                                ""color"":""#000000""
                                                }}
                                                                                      
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid,"", first, keyword1, keyword2 });
            #endregion

            try
            {
                CallWXInterface call = new CallWXInterface();
                Ent_TemplateMsgSendResult sendresult = call.SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {

                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }

    }
}
