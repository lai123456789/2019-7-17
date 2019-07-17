using Common;
using DataOperator;
using Entity;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;

namespace DAL
{
    public class DALMessageHandle
    {
        //public string url1 = "wx.mtworld.cn";
        public string url1 = "wxtest.mtworld.cn";
       
        /// 审核提醒
        /// </summary>
        /// <returns></returns>
      public bool SendyudingdangNotify(string wxappid, string wxopenid, string 审核人, string 待审核表, string 发生时间,  string usercode, ref string errmsg)
        {
            bool result = true;
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
           string url = "http://" + url1 + "/AdvanceOrder/QueryAdvanceOrder.aspx?dcode="  + "&usercode=" + usercode;
            string first = "到你审核";
            string remark = "订单编号：" + 审核人 + "\\n" +
                            "产品名称：" + 待审核表;
                          

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, "", first, "", "审核", "", DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {
                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }

      /// 审核成功提醒
      /// </summary>
      /// <returns></returns>
      public bool SendyudingSucceed(string wxappid, string wxopenid, string 审核人, string 待审核表, string 发生时间, string usercode, ref string errmsg)
      {
          bool result = true;
          //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
          string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
          string url = "http://" + url1 + "/AdvanceOrder/QueryAdvanceOrder.aspx?dcode=" + "&usercode=" + usercode;
          string first = " 审核成功";
          string remark = "订单编号：" + 审核人 + "\\n" +
                          "产品名称：" + 待审核表;


          #region 模板消息发送格式
          string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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

          string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "", "用车", "", DateTime.Now + "", remark });
          #endregion

          try
          {

              OracleDBO mydbo = new OracleDBO();
              mydbo.IsThrowException = true;
              mydbo.AutoClose = false;

              Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
              if (sendresult.errcode == 0)
              {
              }
          }
          catch (Exception ex)
          {

          }
          return result;
      }


        /// 驳回提醒
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangFalse(string wxappid, string wxopenid, string 审核人, string 驳回表, string 驳回原因, string 发生时间,  string usercode, ref string errmsg)
        {
            bool result = true;
            string code = "";
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
             string url = "http://" + url1 + "/AdvanceOrder/QueryAdvanceOrder.aspx?dcode=" + code + "&usercode=" + usercode;
             string first = "您好,驳回提醒";
            string remark = "审核人：" + 审核人 + "\\n" +
                            "驳回表：" + 驳回表 + "\\n" +
                            "驳回原因：" + 驳回原因;


            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "", "驳回", "", DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 用车驳回通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool selectnotify1(string 申请单号, string reason,ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid ,t.applyname,t.department,t.purpose,t.reason
                                  from M_C_APPLY t, SYS_S_USER t1
                                 where t.applycode = :applycode
                                   and t1.usercode = t.usercode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = 申请单号;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify1(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", dt.Rows[0]["applyname"] + "", dt.Rows[0]["purpose"] + "", dt.Rows[0]["reason"] + "", 申请单号, ref errmsg);
                    
                
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




        /// 驳回通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify1(string wxappid, string wxopenid, string applyname, string purpose, string reason, string 申请单号, ref string errmsg)
        {
            bool result = true;
           
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/CarAppOrderDetails.aspx?type=4&pcode=" + 申请单号;
            string first = "您的用车申请被驳回！请点击查看";
            string remark = "申请单号：" + 申请单号 + "\\n" +                                                  
                            "驳回原因：" + reason;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, purpose.Trim(), "用车", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 撤销申请通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//selectnotify2(applycode, applyname, department, purpose, servicetime, returntime,  ref errmsg);
        public bool selectnotify7(string applycode, string repeal, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            DataTable dt1;
            try
            {
                string sql2 = @"select t1.wxopenid ,t.applyname,t.department,t.purpose,t.repeal,t.status
                                  from M_C_APPLY t, SYS_S_USER t1
                                 where t.applycode = :applycode
                                   and t1.usercode = t.usercode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;
                 dt1 = mydbo.GetDataTable(sql2, oparam12);


                string sql = @"select t.wxopenid  from SYS_S_USER t  where t.account='3383'";
                dt = mydbo.GetDataTable(sql);
                if (dt.Rows.Count > 0)
                {

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        SendyudingdangNotify7(WXApiInfo.wxappid, dt.Rows[i]["wxopenid"] + "", dt1.Rows[0]["applyname"] + "", dt1.Rows[0]["purpose"] + "", dt1.Rows[0]["repeal"] + "", applycode, dt1.Rows[0]["status"] + "", ref errmsg);
                    }
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

        /// 撤销通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify7(string wxappid, string wxopenid, string applyname, string purpose, string repeal, string 申请单号, string status, ref string errmsg)
        {
          
            bool result = true;
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarAudit/CarAppOrderAudit.aspx";
            string first = "您的用车申请被驳回！请点击查看";
            string remark = "申请单号：" + 申请单号 + "\\n" +
                            "撤销原因：" + repeal;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, purpose.Trim(), "撤销", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 提交申请审核通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//selectnotify2(applycode, applyname, department, purpose, servicetime, returntime,  ref errmsg);
        public bool selectnotify2(string applycode, string applyname, string department, string purpose, string servicetime, string returntime, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql2 = @"select t.status
                                  from M_C_APPLY t
                                 where t.applycode = :applycode"; 
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;
                DataTable dt1 = mydbo.GetDataTable(sql2, oparam12);



                string sql = @"select t.wxopenid  from SYS_S_USER t  where t.account='3351'";

                dt = mydbo.GetDataTable(sql);
                if (dt.Rows.Count > 0)
                {

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        SendyudingdangNotify2(WXApiInfo.wxappid, dt.Rows[i]["wxopenid"] + "", applycode, applyname, department, purpose, servicetime, returntime, dt1.Rows[0]["status"] + "", ref errmsg);
                    }
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

        /// 申请通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify2(string wxappid, string wxopenid, string applycode, string applyname, string department, string purpose, string servicetime, string returntime, string status, ref string errmsg)
        {
            bool result = true;
          

            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarAudit/CarAppOrderAuditDetails.aspx?type=1&pcode=" + applycode;
            string first = "您好,您有一条未处理用车申请单";
            string remark = "申请单号：" + applycode + "\\n" +                          
                            "申请部门：" + department + "\\n" +                       
                            "使用时间：" + servicetime + "\\n" +
                            "归还时间：" + returntime;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, purpose.Trim(), "用车", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 审核成功通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify3(string applycode, string playcode, string platenumber, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid ,t.applyname,t.department,t.purpose,t.reason,t.status
                                  from M_C_APPLY t, SYS_S_USER t1
                                 where t.applycode = :applycode
                                   and t1.usercode = t.usercode";

                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify3(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, dt.Rows[0]["applyname"] + "", platenumber, dt.Rows[0]["status"] + "", ref errmsg);
                  
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

        /// 申请成功通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify3(string wxappid, string wxopenid, string applycode, string applyname, string platenumber, string status, ref string errmsg)
        {
            

            bool result = true;
        
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/CarAppOrderDetails.aspx?type=2&pcode=" + applycode;
            string first = "您好,您的用车已审批！点击立即用车";
            string remark = "用车单号：" + applycode + "\\n" +        
                            "车牌：" + platenumber;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "", "填写初始公里数", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 重新选车通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify30(string applycode, string platenumber, string reremark, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid ,t.applyname,t.department,t.purpose,t.reason,t.status
                                  from M_C_APPLY t, SYS_S_USER t1
                                 where t.applycode = :applycode
                                   and t1.usercode = t.usercode";

                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify30(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, dt.Rows[0]["applyname"] + "", platenumber, dt.Rows[0]["status"] + "", reremark, ref errmsg);

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

        /// 申请成功通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify30(string wxappid, string wxopenid, string applycode, string applyname, string platenumber, string status, string reremark, ref string errmsg)
        {


            bool result = true;

            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/CarAppOrderDetails.aspx?type=2&pcode=" + applycode;
            string first = "您好,您使用的车辆已改变！";
            string remark = "用车单号：" + applycode + "\\n" +
                            "重选车辆原因：：" + reremark + "\\n" +
                            "车牌：" + platenumber;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "", "填写初始公里数", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 延时还车通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify50(string applycode, string delayedtime, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid,
                                        t.applyname,
                                        t.department,
                                        t.purpose,
                                        t2.endtime,
                                        t2.playtime,
                                        t2.playkm,
                                        t2.platenumber
                                   from M_C_APPLY   t,
                                        SYS_S_USER  t1,
                                        M_C_PLAYCAR t2
                                  where t.applycode = :applycode
                                    and t1.usercode = t.usercode
                                    and t.applycode=t2.applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                string sql1 = @"select t.wxopenid  from SYS_S_USER t  where t.account='3351'";
                DataTable dt1 = mydbo.GetDataTable(sql1);
                if (dt1.Rows.Count > 0)
                {

                    for (int i = 0; i < dt1.Rows.Count; i++)
                    {
                        SendyudingdangNotify50(WXApiInfo.wxappid, dt1.Rows[i]["wxopenid"] + "", applycode, dt.Rows[0]["applyname"] + "", dt.Rows[0]["department"] + "", dt.Rows[0]["endtime"] + "", dt.Rows[0]["platenumber"] + "", delayedtime, ref errmsg);
                    }
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





        /// 延时还车通知审核人
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify50(string wxappid, string wxopenid, string applycode, string applyname, string department, string endtime, string platenumber, string delayedtime, ref string errmsg)
        {
            bool result = true;
            string code = "";
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarAudit/CarAppOrderAuditDetails.aspx?type=3&pcode=" + applycode;
            string first = "您好,延时还车通知";
            string remark = "用车单号：" + applycode + "\\n" +
                            "部门：" + department + "\\n" +
                            "还车时间：" + endtime + "\\n" +
                            "延时原因：" + delayedtime;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "延时还车", platenumber.Trim(), applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 点击还车
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify4(string applycode, string begin,ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid ,t.applyname,t.department,t.purpose,t.reason,t.status
                                  from M_C_APPLY t, SYS_S_USER t1
                                 where t.applycode = :applycode
                                   and t1.usercode = t.usercode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify4(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, dt.Rows[0]["applyname"] + "", begin, dt.Rows[0]["status"] + "", ref errmsg);

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

        /// 点击还车
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify4(string wxappid, string wxopenid, string applycode, string applyname, string begin, string status, ref string errmsg)
        {
            bool result = true;
            
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/CarAppOrderDetails.aspx?type=3&pcode=" + applycode;
            string first = "您好,如您用车完毕！点击立即还车";
            string remark = "用车单号：" + applycode + "\\n" +                          
                            "初始公里数：" + begin;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "用车", "填入还车公里数", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 还车通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify5(string applycode, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid,
                                        t.applyname,
                                        t.department,
                                        t.purpose,
                                        t2.endtime,
                                        t2.playtime,
                                        t2.playkm,
                                        t2.platenumber
                                   from M_C_APPLY   t,
                                        SYS_S_USER  t1,
                                        M_C_PLAYCAR t2
                                  where t.applycode = :applycode
                                    and t1.usercode = t.usercode
                                    and t.applycode=t2.applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify6(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, dt.Rows[0]["applyname"] + "", dt.Rows[0]["department"] + "", dt.Rows[0]["endtime"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "", dt.Rows[0]["platenumber"] + "", ref errmsg);

                string sql1 = @"select t.wxopenid  from SYS_S_USER t  where t.account='3351'";
                DataTable dt1 = mydbo.GetDataTable(sql1);
                if (dt1.Rows.Count > 0)
                {

                    for (int i = 0; i < dt1.Rows.Count; i++)
                    {
                        SendyudingdangNotify5(WXApiInfo.wxappid, dt1.Rows[i]["wxopenid"] + "", applycode, dt.Rows[0]["applyname"] + "", dt.Rows[0]["department"] + "", dt.Rows[0]["endtime"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "", dt.Rows[0]["platenumber"] + "", ref errmsg);
                    }
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





        /// 还车通知推送审核人
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify5(string wxappid, string wxopenid, string applycode, string applyname, string department, string endtime, string playtime, string playkm, string platenumber, ref string errmsg)
        {
            bool result = true;
            string code = "";
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarAudit/CarAppOrderAuditDetails.aspx?type=5&pcode=" + applycode;
            string first = "您好,有新的还车通知";
            string remark = "用车单号：" + applycode + "\\n" +                          
                            "部门：" + department + "\\n" +
                            "还车时间：" + endtime + "\\n" +
                             "行驶时长：" + playtime+ "\\n" +  
                            "行驶公里数：" + playkm;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "用车", platenumber.Trim(), applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {
                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }



        /// 还车通知
        /// </summary>
        /// <returns></returns>// applycode, dt.Rows[0]["applyname"] + "", dt.Rows[0]["department"] + "", dt.Rows[0]["endtime"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "",
        public bool SendyudingdangNotify6(string wxappid, string wxopenid, string applycode, string applyname, string department, string endtime, string playtime, string playkm, string platenumber, ref string errmsg)
        {
            bool result = true;
            string code = "";
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/CarAppOrderDetails.aspx?type=5&pcode=" + applycode;
            string first = "您好,还车成功通知";
            string remark = "用车单号：" + applycode + "\\n" +                         
                            "部门：" + department + "\\n" +
                            "还车时间：" + endtime + "\\n" +
                              "行驶时长：" + playtime + "\\n" +
                            "行驶公里数：" + playkm ;


            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "用车", platenumber.Trim(), applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 审核成功通知司机
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify8(string applycode, string playcode, string platenumber, string susername, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            DataTable dt1;
            DataTable dt2;
            try
            {
                string sql = @"select t1.wxopenid,t2.drivernames,t2.phone
                          from SYS_S_USERINFO t, SYS_S_USER t1, M_C_PLAYCAR t2
                         where t.usercode = t2.driver
                           and t.usercode = t1.usercode
                           and t2.applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);//司机

                string sql2 = @"select t.purpose,t.endsite from M_C_APPLY t where t.applycode=:applycode";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":applycode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = applycode;
                dt1 = mydbo.GetDataTable(sql2, oparam13);

                SendyudingdangNotify8(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, susername, dt1.Rows[0]["purpose"] + "", dt1.Rows[0]["endsite"] + "", platenumber, dt.Rows[0]["drivernames"] + "", dt.Rows[0]["phone"] + "", ref errmsg);

                string sql5 = @"select t1.wxopenid, t2.susername
                              from SYS_S_USERINFO t, SYS_S_USER t1, M_C_PLAYCAR t2, M_C_APPLY t3
                             where t.usercode = t1.usercode
                               and t2.applycode = t3.applycode
                               and t3.usercode = t1.usercode
                               and t2.applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[1];
                oparam15[0].Name = ":applycode";
                oparam15[0].Type = OracleDbType.Varchar2;
                oparam15[0].Value = applycode;

                dt2 = mydbo.GetDataTable(sql5, oparam15);

                SendyudingdangNotify14(WXApiInfo.wxappid, dt2.Rows[0]["wxopenid"] + "", applycode, susername, dt1.Rows[0]["endsite"] + "", dt1.Rows[0]["purpose"] + "", platenumber, dt.Rows[0]["drivernames"] + "", dt.Rows[0]["phone"] + "", ref errmsg);

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

        /// 审核成功通知申请人
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify14(string wxappid, string wxopenid, string applycode, string susername, string endsite, string purpose, string platenumber, string drivernames, string phone, ref string errmsg)
        {
            bool result = true;
           
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/VehicleOrderDetails.aspx?type='2'&pcode=" + applycode;
            string first = "您好,您的派车申请已通过,司机正在准备中.";
            string remark = "用车单号：" + applycode + "\\n" +
                           "目的地：" + endsite + "\\n" +
                           "用途：" + purpose + "\\n" +
                            "司机：" + drivernames + "\\n" +
                           "司机电话：" + phone + "\\n" +
                            "审核人：" + susername + "\\n" +
                            "车牌：" + platenumber;


            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "", "派车申请", "", DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {
                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }





        /// 审核成功通知司机
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify8(string wxappid, string wxopenid, string applycode, string susername, string purpose, string endsite, string platenumber, string drivernames, string phone, ref string errmsg)
        {
            bool result = true;
            string code = "";
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/VehicleOrderDetails.aspx?type=2&pcode=" + applycode;
            string first = "您好,您有新的派工任务！点击立即用车";
            string remark = "用车单号：" + applycode + "\\n" +
                           "目的地：" + endsite + "\\n" +
                            "用途：" + purpose + "\\n" +
                            "审核人：" + susername + "\\n" +
                            "车牌：" + platenumber;


            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "", "送货", "", DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 用车驳回通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool selectnotify9(string 申请单号, string reason, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid ,t.applyname,t.department,t.purpose,t.reason
                                  from M_C_APPLY t, SYS_S_USER t1
                                 where t.applycode = :applycode
                                   and t1.usercode = t.usercode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = 申请单号;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify9(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", dt.Rows[0]["applyname"] + "", dt.Rows[0]["purpose"] + "", dt.Rows[0]["reason"] + "", 申请单号, ref errmsg);


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




        /// 驳回通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify9(string wxappid, string wxopenid, string applyname, string purpose, string reason, string 申请单号, ref string errmsg)
        {
            bool result = true;

            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/VehicleOrderDetails.aspx?type=4&pcode=" + 申请单号;
            string first = "您的派车申请被驳回！请点击查看";
            string remark = "申请单号：" + 申请单号 + "\\n" +
                            "驳回原因：" + reason;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, purpose.Trim(), "申请派车", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 点击输入公里数
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify10(string applycode, string begin, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t1.wxopenid
                          from SYS_S_USERINFO t,SYS_S_USER t1, M_C_PLAYCAR t2
                         where t.usercode = t2.driver
                           and t.usercode = t1.usercode
                           and t2.applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify10(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, begin, ref errmsg);

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

        /// 点击还车
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify10(string wxappid, string wxopenid, string applycode,  string begin, ref string errmsg)
        {
            bool result = true;
         
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/VehicleOrderDetails.aspx?type=3&pcode=" + applycode;
            string first = "您好,您的用车已启动！点击还车";
            string remark = "用车单号：" + applycode + "\\n" +
                            "初始公里数：" + begin;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "用车", "填入还车公里数",  "",DateTime.Now + "",remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 提交申请审核通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, applyname, department, proposernomber, endsite, purpose, servicetime, ref errmsg
        public bool selectnotify11(string applycode, string applyname, string department, string proposernomber, string endsite, string purpose, string servicetime, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            try
            {
                string sql = @"select t.wxopenid  from SYS_S_USER t  where t.account='3351'";
                dt = mydbo.GetDataTable(sql);
                if (dt.Rows.Count > 0)
                {

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        SendyudingdangNotify11(WXApiInfo.wxappid, dt.Rows[i]["wxopenid"] + "", applycode, applyname, department, proposernomber, endsite, purpose, servicetime, ref errmsg);
                    }
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

        /// 申请通知
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify11(string wxappid, string wxopenid, string applycode, string applyname, string department, string proposernomber, string endsite, string purpose, string servicetime, ref string errmsg)
        {
            bool result = true;

            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarAudit/VehicleOrderAuditDetails.aspx?type=1&pcode=" + applycode;
            string first = "您好,您有一条未处理派工单";
            string remark = "申请单号：" + applycode + "\\n" +
                            "申请部门：" + department + "\\n" +
                             "前往目的地：" + endsite + "\\n" +
                            "预用车牌：" + proposernomber + "\\n" +
                            "使用时间：" + servicetime;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";

            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, purpose.Trim(), "用车", applyname.Trim(), DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 还车通知
        /// </summary>
        /// <param name="订单号"></param>
        /// <param name="产品名称"></param>
        /// <param name="数量"></param>
        /// <param name="计划发货日期"></param>
        /// <param name="code"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>//applycode, platenumber, remark
        public bool selectnotify12(string applycode, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            DataTable dt;
            DataTable dt3;
            try
            {
                string sql = @"select t1.wxopenid,
                                   t.username,
                                   t2.begin,
                                   t2.endplay,
                                   t2.playkm,
                                   t2.playtime,
                                   t2.platenumber,
                                   t2.returnremark,
                                    t2.susername,
                                   t3.applyname
                              from SYS_S_USERINFO t, SYS_S_USER t1, M_C_PLAYCAR t2,M_C_APPLY t3
                             where t.usercode = t2.driver
                               and t.usercode = t1.usercode
                               and t2.applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                dt = mydbo.GetDataTable(sql, oparam12);

                SendyudingdangNotify12(WXApiInfo.wxappid, dt.Rows[0]["wxopenid"] + "", applycode, dt.Rows[0]["susername"] + "", dt.Rows[0]["applyname"] + "", dt.Rows[0]["begin"] + "", dt.Rows[0]["endplay"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "", dt.Rows[0]["platenumber"] + "", dt.Rows[0]["returnremark"] + "", ref errmsg);




                string sql2 = @"select t1.wxopenid,
                                       t.username,
                                       t2.begin,
                                       t2.endplay,
                                       t2.playkm,
                                       t2.playtime,
                                       t2.platenumber,
                                       t2.returnremark
                                  from SYS_S_USERINFO t, SYS_S_USER t1, M_C_PLAYCAR t2, M_C_APPLY t3
                                 where t.usercode = t3.usercode
                                   and t.usercode = t1.usercode
                                   and t2.applycode = :applycode
                                   and t2.applycode = t3.applycode";
                OracleDBO.OracleCmdParam[] oparam122 = new OracleDBO.OracleCmdParam[1];
                oparam122[0].Name = ":applycode";
                oparam122[0].Type = OracleDbType.Varchar2;
                oparam122[0].Value = applycode;

                dt3 = mydbo.GetDataTable(sql2, oparam122);

                SendyudingdangNotify14(WXApiInfo.wxappid, dt3.Rows[0]["wxopenid"] + "", applycode, dt.Rows[0]["username"] + "", dt.Rows[0]["susername"] + "", dt.Rows[0]["begin"] + "", dt.Rows[0]["endplay"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "", dt.Rows[0]["platenumber"] + "", dt.Rows[0]["returnremark"] + "", ref errmsg);




                string sql1 = @"select t.wxopenid  from SYS_S_USER t  where t.account='3351'";
                DataTable dt1 = mydbo.GetDataTable(sql1);
                if (dt1.Rows.Count > 0)
                {

                    for (int i = 0; i < dt1.Rows.Count; i++)
                    {
                        SendyudingdangNotify13(WXApiInfo.wxappid, dt1.Rows[i]["wxopenid"] + "", applycode, dt.Rows[0]["username"] + "", dt.Rows[0]["applyname"] + "", dt.Rows[0]["begin"] + "", dt.Rows[0]["endplay"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "", dt.Rows[0]["platenumber"] + "", dt.Rows[0]["returnremark"] + "", ref errmsg);
                    }
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





        /// 还车通知推送司机
        /// </summary>
        /// <returns></returns>
        public bool SendyudingdangNotify12(string wxappid, string wxopenid, string applycode, string susername, string applyname, string begin, string endplay, string playtime, string playkm, string platenumber, string returnremark, ref string errmsg)
        {
            bool result = true;
          
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/VehicleOrderDetails.aspx?type=5&pcode=" + applycode;
            string first = "您好,有新的还车通知";
            string remark = "用车单号：" + applycode + "\\n" +
                            "审核人：" + susername + "\\n" +
                             "车牌：" + platenumber + "\\n" +
                            "初始公里数：" + begin + "\\n" +
                             "还车公里数：" + endplay + "\\n" +
                             "行驶时长：" + playtime + "\\n" +
                             "行驶公里数：" + playkm + "\\n" +
                            "还车备注：" + returnremark;

            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "用车", "", applyname, DateTime.Now + "", remark });
            #endregion

            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {
                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }



        /// 还车通知
        /// </summary>
        /// <returns></returns>// applycode, dt.Rows[0]["applyname"] + "", dt.Rows[0]["department"] + "", dt.Rows[0]["endtime"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "",
        public bool SendyudingdangNotify13(string wxappid, string wxopenid, string applycode, string driver, string applyname, string begin, string endplay, string playtime, string playkm, string platenumber, string returnremark, ref string errmsg)
        {
            bool result = true;
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarAudit/VehicleOrderAuditDetails.aspx?type=5&pcode=" + applycode;
            string first = "您好,还车成功通知";
            string remark = "用车单号：" + applycode + "\\n" +
                            "司机：" + driver + "\\n" +
                            "车牌：" + platenumber + "\\n" +
                            "初始公里数：" + begin + "\\n" +
                             "还车公里数：" + endplay + "\\n" +
                             "行驶时长：" + playtime + "\\n" +
                             "行驶公里数：" + playkm + "\\n" +
                            "还车备注：" + returnremark;


            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "用车", "", applyname, DateTime.Now + "", remark });
            #endregion
            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {
                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }



        /// 还车推送给申请人通知
        /// </summary>
        /// <returns></returns>// applycode, dt.Rows[0]["applyname"] + "", dt.Rows[0]["department"] + "", dt.Rows[0]["endtime"] + "", dt.Rows[0]["playtime"] + "", dt.Rows[0]["playkm"] + "",
        public bool SendyudingdangNotify14(string wxappid, string wxopenid, string applycode, string driver,string usnanme, string begin, string endplay, string playtime, string playkm, string platenumber, string returnremark, ref string errmsg)
        {
            bool result = true;
            //string wxtemplateid = "alRq579s3OB-fiqJN0RrlR9Ft_T-8VaNUKwFymQio54";
            string wxtemplateid = "JhQ5nfjPlWRXESTBrhxWbE4ovmJgMkYtuHjUJshKVug";
            string url = "http://" + url1 + "/CarReview/VehicleOrderDetails.aspx?type=5&pcode=" + applycode;
            string first = "您好,您的派车已结单";
            string remark = "用车单号：" + applycode + "\\n" +
                            "司机：" + driver + "\\n" +
                             "审核人：" + usnanme + "\\n" +
                            "初始公里数：" + begin + "\\n" +
                             "还车公里数：" + endplay + "\\n" +
                             "行驶时长：" + playtime + "\\n" +
                             "行驶公里数：" + playkm + "\\n" +
                            "还车备注：" + returnremark;


            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
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
                                               ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                              ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, "派车", platenumber.Trim(), "", DateTime.Now + "", remark });
            #endregion
            try
            {

                OracleDBO mydbo = new OracleDBO();
                mydbo.IsThrowException = true;
                mydbo.AutoClose = false;

                Ent_TemplateMsgSendResult sendresult = SendTemplateMessage(wxappid, sendWXTemplate);
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
        /// 发送模板消息
        /// </summary>
        /// <param name="wxappid"></param>
        /// <param name="sendcontent"></param>
        /// <returns>返回接口调用结果（非发送结果）</returns>
        public Ent_TemplateMsgSendResult SendTemplateMessage(string wxappid, string sendcontent)
        {
            Ent_TemplateMsgSendResult wxresult = null;
            int retrycount = 0;
            int maxretrycount = 3;
            string access_token = GetAccessToken(wxappid);
            string url = @"https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + access_token;
            while (retrycount < maxretrycount)
            {
                wxresult = ObjectSerializeHelper.JsonToObject<Ent_TemplateMsgSendResult>(WXInterfaceHttpRequest(url, sendcontent, "post"));
                if (wxresult.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (wxresult.errcode == 40014 || wxresult.errcode == 42001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return wxresult;
        }

        public string WXInterfaceHttpRequest(string interfaceurl, string sendcontent, string requestmethod)
        {
            string result = "";
            HttpWebRequest hwr = (HttpWebRequest)WebRequest.Create(interfaceurl);
            if (requestmethod.ToLower() == "post")
            {
                hwr.ContentType = "application/x-www-form-urlencoded";
                hwr.Method = requestmethod;
                byte[] btBodys = Encoding.UTF8.GetBytes(sendcontent);
                hwr.ContentLength = btBodys.Length;
                hwr.GetRequestStream().Write(btBodys, 0, btBodys.Length);
            }

            HttpWebResponse httpWebResponse = (HttpWebResponse)hwr.GetResponse();
            System.IO.StreamReader streamReader = new System.IO.StreamReader(httpWebResponse.GetResponseStream());
            string responseContent = streamReader.ReadToEnd();
            result = responseContent;

            httpWebResponse.Close();
            streamReader.Close();
            hwr.Abort();
            httpWebResponse.Close();
            return result;
        }
        public string GetAccessToken(string wxappid, bool refresh = false)
        {
            string result = "";

            int maxtrytimes = 3;
            int currtry = 0;
            string appsecret = WXApiInfo.appsecret;
            DateTime stateupdatetime;
            int maxfreshingtime = 10;//最大刷新时间（秒），超过则不等待
            OracleDBO mydbo = new OracleDBO();
            mydbo.AutoClose = false;
            try
            {

                string token;
                DateTime gettime;
                int expires_in;
                string status;

                DataRow dr;
                while (currtry < maxtrytimes)
                {
                    dr = mydbo.GetDataRow("select * from sys_p_wxappaccesstoken t where t.wxappid='" + wxappid + "'");
                    if (dr != null)
                    {
                        token = dr["access_token"].ToString();
                        gettime = Convert.ToDateTime(dr["gettime"]);
                        expires_in = Convert.ToInt32(dr["expires_in"]);
                        status = dr["state"].ToString();
                        stateupdatetime = Convert.ToDateTime(dr["stateupdatetime"]);
                        if (status == "Normal")
                        {
                            //是否已超时
                            if ((DateTime.Now - gettime).TotalSeconds < (expires_in - 5) && !refresh)
                            {
                                //未超时并且不要求更新
                                result = token;
                                break;
                            }
                            else
                            {

                                #region 更新access_token流程
                                mydbo.BeginTransaction();
                                int effnum = mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken set state='Refreshing',stateupdatetime=sysdate where WXAppID='" + wxappid + "' and state='Normal' and gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss')");
                                mydbo.Commit();
                                //如果影响数大于零，说明更新状态成功，则即是取得了更新权。
                                if (effnum > 0)
                                {
                                    UserAccessToken tokeninfo = GetNewAccessToken(wxappid, appsecret);
                                    if (tokeninfo.errcode == 0)
                                    {
                                        result = tokeninfo.access_token;
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken set access_token='" + tokeninfo.access_token + "',expires_in=" + tokeninfo.expires_in.ToString() + ",gettime=to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'),state='Normal',stateupdatetime=sysdate where WXAppID='" + wxappid + "'");
                                        mydbo.Commit();
                                        break;
                                    }
                                    else
                                    {
                                        //如果未成功，先将状态改回来
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken t set t.state='Normal',t.stateupdatetime=sysdate where t.access_token='" + token + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                        mydbo.Commit();
                                    }
                                }
                                else
                                {
                                    //如果不是Normal状态，可能是其他请求正在刷新中，等半秒再取
                                    if ((DateTime.Now - stateupdatetime).TotalSeconds > maxfreshingtime)
                                    {
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken t set t.state='Normal',t.stateupdatetime=sysdate where t.access_token='" + token + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                        mydbo.Commit();
                                    }
                                    System.Threading.Thread.Sleep(500);
                                }
                                #endregion
                            }
                        }
                        else
                        {
                            //如果不是Normal状态，可能是其他请求正在刷新中，等半秒再取
                            if ((DateTime.Now - stateupdatetime).TotalSeconds > maxfreshingtime)
                            {
                                mydbo.BeginTransaction();
                                mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken t set t.state='Normal',t.stateupdatetime=sysdate where t.access_token='" + token + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                mydbo.Commit();
                            }
                            System.Threading.Thread.Sleep(500);
                        }
                    }
                    else
                    {

                        UserAccessToken tokeninfo = GetNewAccessToken(wxappid, appsecret);
                        if (tokeninfo.errcode == 0)
                        {
                            result = tokeninfo.access_token;
                            mydbo.BeginTransaction();
                            mydbo.ExecuteNonQuery("insert into sys_p_wxappaccesstoken(WXAppID,access_token,expires_in,state,gettime,stateupdatetime) values('" + wxappid + "','" + tokeninfo.access_token + "'," + tokeninfo.expires_in.ToString() + ",'Normal',to_date('" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'),to_date('" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'))");
                            mydbo.Commit();
                            break;
                        }
                    }
                    currtry++;
                }
            }
            catch (Exception ex)
            {
                LogWriter.WriteLog(ex);
            }
            mydbo.Close();
            return result;
        }

        public UserAccessToken GetNewAccessToken(string wxappid, string appsecret)
        {
            UserAccessToken tokeninfo = null;
            try
            {
                string url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + wxappid + "&secret=" + appsecret;
                string strresult = WXInterfaceHttpRequest(url, "", "get");
                tokeninfo = ObjectSerializeHelper.JsonToObject<UserAccessToken>(strresult);
            }
            catch (Exception ex)
            {
                LogWriter.WriteLog(ex);
            }
            return tokeninfo;
        }

    }
}
