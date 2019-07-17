using Common;
using DataOperator;
using Entity;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace DAL
{
    public class DALUserManage
    {
        /// <summary>
        /// 更新微信
        /// </summary>
        /// <param name="wxfansinfo">微信粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool UpdateWXFansInfo(WXFansInfo wxfansinfo, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                string sql1 = @"select count(*) from sys_s_wxfansinfo t where t.wxopenid = :wxopenid";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":wxopenid";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = wxfansinfo.openid;

                int num = Convert.ToInt32(mydbo.ExecuteScalar(sql1, oparam1));
                if (num == 0)
                {
                    #region 添加粉丝
                    string sql2 = @"insert into sys_s_wxfansinfo
                                      (wxopenid,
                                       nickname,
                                       sex,
                                       province,
                                       city,
                                       country,
                                       headimgurl,
                                       subscribed)
                                    values
                                      (:wxopenid,
                                       :nickname,
                                       :sex,
                                       :province,
                                       :city,
                                       :country,
                                       :headimgurl,
                                       :subscribed)";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[8];
                    oparam2[0].Name = ":wxopenid";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = wxfansinfo.openid;

                    oparam2[1].Name = ":nickname";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = wxfansinfo.nickname;

                    oparam2[2].Name = ":sex";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = wxfansinfo.sex == "1" ? "男" : "女";

                    oparam2[3].Name = ":province";
                    oparam2[3].Type = OracleDbType.Varchar2;
                    oparam2[3].Value = wxfansinfo.province;

                    oparam2[4].Name = ":city";
                    oparam2[4].Type = OracleDbType.Varchar2;
                    oparam2[4].Value = wxfansinfo.city;

                    oparam2[5].Name = ":country";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = wxfansinfo.country;

                    oparam2[6].Name = ":headimgurl";
                    oparam2[6].Type = OracleDbType.Varchar2;
                    oparam2[6].Value = wxfansinfo.headimgurl;

                    oparam2[7].Name = ":subscribed";
                    oparam2[7].Type = OracleDbType.Int32;
                    oparam2[7].Value = 1;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam2); 
                    #endregion
                }
                else
                {
                    #region 更新粉丝数据
                    string sql2 = @"update sys_s_wxfansinfo t
                                       set t.nickname   = :nickname,
                                           t.sex        = :sex,
                                           t.province   = :province,
                                           t.city       = :city,
                                           t.country    = :country,
                                           t.headimgurl = :headimgurl
                                     where t.wxopenid = :wxopenid";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[7];

                    oparam2[0].Name = ":wxopenid";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = wxfansinfo.openid;

                    oparam2[1].Name = ":nickname";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = wxfansinfo.nickname;

                    oparam2[2].Name = ":sex";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = wxfansinfo.sex == "1" ? "男" : "女";

                    oparam2[3].Name = ":province";
                    oparam2[3].Type = OracleDbType.Varchar2;
                    oparam2[3].Value = wxfansinfo.province;

                    oparam2[4].Name = ":city";
                    oparam2[4].Type = OracleDbType.Varchar2;
                    oparam2[4].Value = wxfansinfo.city;

                    oparam2[5].Name = ":country";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = wxfansinfo.country;

                    oparam2[6].Name = ":headimgurl";
                    oparam2[6].Type = OracleDbType.Varchar2;
                    oparam2[6].Value = wxfansinfo.headimgurl;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam2); 
                    #endregion
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

        /// <summary>
        /// 获取微信粉丝绑定的用户列表
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="dt">返回列表</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        //public bool GetWXFansBindUserInfo(string wxopenid, ref DataTable dt,  ref string errmsg)
        //{
        //    bool result = true;
        //    OracleDBO mydbo = new OracleDBO();
        //    mydbo.IsByParamName = true;
        //    mydbo.IsThrowException = true;
     
        //    try
        //    {
        //        string sql2 = @"select t.usercode,t.username,t.account,t.wxopenid,t.usertype,t.state from WOW_A_USERINFO t where t.wxopenid='oeZqt5jQPCvZubmkNqXwhaE4q-cE'";
        //        OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[1];
        //        oparam2[0].Name = ":wxopenid";
        //        oparam2[0].Type = OracleDbType.Varchar2;
        //        oparam2[0].Value = wxopenid;

        //        dt = mydbo.GetDataTable(sql2, oparam2);
                          
        //    }
        //    catch (Exception ex)
        //    {
        //        errmsg = ex.Message.ToString();
        //        result = false;
        //        LogWriter.WriteLog(ex);
        //    }
        //    finally
        //    {
        //        mydbo.Close();
        //    }
        //    return result;
        //}


        public bool GetWXFansBindUserInfo(string wxopenid, ref DataTable dt, ref DataTable dt1, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string sql2 = @"select t.usercode,t.username,t.account,t.wxopenid,t.usertype,t.state from wow_a_userinfo t where t.wxopenid=:wxopenid";
                OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[1];
                oparam2[0].Name = ":wxopenid";
                oparam2[0].Type = OracleDbType.Varchar2;
                oparam2[0].Value = wxopenid;

                dt = mydbo.GetDataTable(sql2, oparam2);

              
             
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

        /// <summary>
        /// 存
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="dt">返回列表</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Getopenid(string wxopenid, string account, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.IsByParamName = true;
            mydbo.AutoClose = false;
            try
            {

                string sql12 = @"select * from W_LOGIN t where t.opcode=:opcode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":opcode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = account;

                DataTable dt = mydbo.GetDataTable(sql12, oparam12);
                if (dt.Rows.Count > 0)
                {

                    string sql1 = @"update  W_LOGIN t set t.wxopenid=:wxopenid  where t.opcode=:opcode";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                    oparam1[0].Name = ":wxopenid";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = wxopenid;

                    oparam1[1].Name = ":opcode";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = account;

                    int n = mydbo.ExecuteNonQuery(sql1, oparam1);
                }
                else
                {
                    string sql1 = @"insert into W_LOGIN(wxopenid,opcode) values(:wxopenid,:opcode)";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                    oparam1[0].Name = ":wxopenid";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = wxopenid;

                    oparam1[1].Name = ":opcode";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = account;

                    int n = mydbo.ExecuteNonQuery(sql1, oparam1);
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


        public bool GetUsercode(string id, string account, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.IsByParamName = true;
            mydbo.AutoClose = false;
            try
            {
                string wxopenid = "";
                int n = 0;
                account = account.Trim();

                    string sql12 = @"select t.wxopenid from W_LOGIN t where t.opcode=:account";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                    oparam12[0].Name = ":account";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = account;

                    DataTable dt1 = mydbo.GetDataTable(sql12, oparam12);

                    if (dt1.Rows.Count > 0)
                    {
                        wxopenid = dt1.Rows[0]["wxopenid"].ToString();

                    } 
                if (id == "0")
                {
                    string sql1 = @"update  WOW_A_USERINFO t2 set t2.wxopenid=:wxopenid where t2.username=:username";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                    oparam1[0].Name = ":wxopenid";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = wxopenid;

                    oparam1[1].Name = ":username";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = account;
                    n = mydbo.ExecuteNonQuery(sql1, oparam1);
                }

                if (id == "1")
                {

                    DALWXMessageHandleBasic mysend = new DALWXMessageHandleBasic();

                    bool success = mysend.Sendfalse(WXApiInfo.wxappid, wxopenid, "绑定被拒绝", DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"), ref errmsg);
                    //推送绑定不被允许
                    string sql4 = @"delete from W_LOGIN t t.opcode=:opcode";
                    OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                    oparam4[0].Name = ":opcode";
                    oparam4[0].Type = OracleDbType.Varchar2;
                    oparam4[0].Value = account;
                    int n4 = mydbo.ExecuteNonQuery(sql4, oparam4);
                    result = false;

                }

                    if (n > 0)
                    {
                        //推送绑定允许

                        DALWXMessageHandleBasic mysend = new DALWXMessageHandleBasic();

                        bool success = mysend.SendSecss(WXApiInfo.wxappid, wxopenid, "绑定已同意", DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"), ref errmsg);

                        string sql4 = @"delete from W_LOGIN t t.opcode=:opcode";
                        OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                        oparam4[0].Name = ":opcode";
                        oparam4[0].Type = OracleDbType.Varchar2;
                        oparam4[0].Value = account;
                        int n4 = mydbo.ExecuteNonQuery(sql4, oparam4);
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
