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
    public class DALWXFansManage
    {
        /// <summary>
        /// 关注微信公众号
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="wxuser">粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Subscribe(string wxopenid, WXFansInfo wxuser, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询是否存在该粉丝
                string sql1 = @"select count(*) from sys_s_wxfansinfo t where t.wxopenid = :wxopenid";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":wxopenid";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = wxopenid;

                int num = Convert.ToInt32(mydbo.ExecuteScalar(sql1, oparam1)); 
                #endregion
                if (num == 0)
                {
                    #region 添加微信粉丝信息
                    string sql2 = @"insert into sys_s_wxfansinfo
                                      (wxopenid,
                                       nickname,
                                       sex,
                                       province,
                                       city,
                                       country,
                                       headimgurl,
                                       subscribetime,
                                       subscribed)
                                    values
                                      (:wxopenid,
                                       :nickname,
                                       :sex,
                                       :province,
                                       :city,
                                       :country,
                                       :headimgurl,
                                       :subscribetime,
                                       :subscribed)";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[9];
                    oparam2[0].Name = ":wxopenid";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = wxopenid;

                    oparam2[1].Name = ":nickname";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = wxuser.nickname;

                    oparam2[2].Name = ":sex";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = wxuser.sex;

                    oparam2[3].Name = ":province";
                    oparam2[3].Type = OracleDbType.Varchar2;
                    oparam2[3].Value = wxuser.province;

                    oparam2[4].Name = ":city";
                    oparam2[4].Type = OracleDbType.Varchar2;
                    oparam2[4].Value = wxuser.city;

                    oparam2[5].Name = ":country";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = wxuser.country;

                    oparam2[6].Name = ":headimgurl";
                    oparam2[6].Type = OracleDbType.Varchar2;
                    oparam2[6].Value = wxuser.headimgurl;

                    oparam2[7].Name = ":subscribetime";
                    oparam2[7].Type = OracleDbType.Date;
                    oparam2[7].Value = DateTime.Now;

                    oparam2[8].Name = ":subscribed";
                    oparam2[8].Type = OracleDbType.Varchar2;
                    oparam2[8].Value = 1;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam2); 
                    #endregion
                }
                else
                {
                    #region 更新微信粉丝信息
                    string sql2 = @"update sys_s_wxfansinfo t
                                       set t.nickname      = :nickname,
                                           t.sex           = :sex,
                                           t.province      = :province,
                                           t.city          = :city,
                                           t.country       = :country,
                                           t.headimgurl    = :headimgurl,
                                           t.subscribetime = :subscribetime,
                                           t.subscribed    = :subscribed
                                     where t.wxopenid = :wxopenid";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[9];
                    oparam2[0].Name = ":wxopenid";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = wxopenid;

                    oparam2[1].Name = ":nickname";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = wxuser.nickname;

                    oparam2[2].Name = ":sex";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = wxuser.sex;

                    oparam2[3].Name = ":province";
                    oparam2[3].Type = OracleDbType.Varchar2;
                    oparam2[3].Value = wxuser.province;

                    oparam2[4].Name = ":city";
                    oparam2[4].Type = OracleDbType.Varchar2;
                    oparam2[4].Value = wxuser.city;

                    oparam2[5].Name = ":country";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = wxuser.country;

                    oparam2[6].Name = ":headimgurl";
                    oparam2[6].Type = OracleDbType.Varchar2;
                    oparam2[6].Value = wxuser.headimgurl;

                    oparam2[7].Name = ":subscribetime";
                    oparam2[7].Type = OracleDbType.Date;
                    oparam2[7].Value = DateTime.Now;

                    oparam2[8].Name = ":subscribed";
                    oparam2[8].Type = OracleDbType.Varchar2;
                    oparam2[8].Value = 1;

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
        /// 二维码扫描关注
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="scene_id">场景ID</param>
        /// <param name="wxuser">粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool QRCodeApplication(string wxopenid, string scene_id, WXFansInfo wxuser, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询是否存在该粉丝
                string sql1 = @"select count(*) from sys_s_wxfansinfo t where t.wxopenid = :wxopenid";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":wxopenid";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = wxopenid;

                int num = Convert.ToInt32(mydbo.ExecuteScalar(sql1, oparam1));
                #endregion

                mydbo.BeginTransaction();
                if (num == 0)
                {
                    #region 添加微信粉丝信息
                    string sql2 = @"insert into sys_s_wxfansinfo
                                      (wxopenid,
                                       nickname,
                                       sex,
                                       province,
                                       city,
                                       country,
                                       headimgurl,
                                       subscribetime,
                                       subscribed)
                                    values
                                      (:wxopenid,
                                       :nickname,
                                       :sex,
                                       :province,
                                       :city,
                                       :country,
                                       :headimgurl,
                                       :subscribetime,
                                       :subscribed)";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[9];
                    oparam2[0].Name = ":wxopenid";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = wxopenid;

                    oparam2[1].Name = ":nickname";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = wxuser.nickname;

                    oparam2[2].Name = ":sex";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = wxuser.sex;

                    oparam2[3].Name = ":province";
                    oparam2[3].Type = OracleDbType.Varchar2;
                    oparam2[3].Value = wxuser.province;

                    oparam2[4].Name = ":city";
                    oparam2[4].Type = OracleDbType.Varchar2;
                    oparam2[4].Value = wxuser.city;

                    oparam2[5].Name = ":country";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = wxuser.country;

                    oparam2[6].Name = ":headimgurl";
                    oparam2[6].Type = OracleDbType.Varchar2;
                    oparam2[6].Value = wxuser.headimgurl;

                    oparam2[7].Name = ":subscribetime";
                    oparam2[7].Type = OracleDbType.Date;
                    oparam2[7].Value = DateTime.Now;

                    oparam2[8].Name = ":subscribed";
                    oparam2[8].Type = OracleDbType.Varchar2;
                    oparam2[8].Value = 1;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam2);
                    #endregion
                }
                else
                {
                    #region 更新微信粉丝信息
                    string sql2 = @"update sys_s_wxfansinfo t
                                       set t.nickname      = :nickname,
                                           t.sex           = :sex,
                                           t.province      = :province,
                                           t.city          = :city,
                                           t.country       = :country,
                                           t.headimgurl    = :headimgurl,
                                           t.subscribetime = :subscribetime,
                                           t.subscribed    = :subscribed
                                     where t.wxopenid = :wxopenid";
                    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[9];
                    oparam2[0].Name = ":wxopenid";
                    oparam2[0].Type = OracleDbType.Varchar2;
                    oparam2[0].Value = wxopenid;

                    oparam2[1].Name = ":nickname";
                    oparam2[1].Type = OracleDbType.Varchar2;
                    oparam2[1].Value = wxuser.nickname;

                    oparam2[2].Name = ":sex";
                    oparam2[2].Type = OracleDbType.Varchar2;
                    oparam2[2].Value = wxuser.sex;

                    oparam2[3].Name = ":province";
                    oparam2[3].Type = OracleDbType.Varchar2;
                    oparam2[3].Value = wxuser.province;

                    oparam2[4].Name = ":city";
                    oparam2[4].Type = OracleDbType.Varchar2;
                    oparam2[4].Value = wxuser.city;

                    oparam2[5].Name = ":country";
                    oparam2[5].Type = OracleDbType.Varchar2;
                    oparam2[5].Value = wxuser.country;

                    oparam2[6].Name = ":headimgurl";
                    oparam2[6].Type = OracleDbType.Varchar2;
                    oparam2[6].Value = wxuser.headimgurl;

                    oparam2[7].Name = ":subscribetime";
                    oparam2[7].Type = OracleDbType.Date;
                    oparam2[7].Value = DateTime.Now;

                    oparam2[8].Name = ":subscribed";
                    oparam2[8].Type = OracleDbType.Varchar2;
                    oparam2[8].Value = 1;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam2);
                    #endregion
                }

                string sql3 = @"select t.val1
                                  from sys_p_wxqrmanage t
                                 where t.scene_id = :scene_id
                                   and t.intentions = '绑定用户'
                                   and t.valid = 1";
                OracleDBO.OracleCmdParam[] oparam3 = new OracleDBO.OracleCmdParam[1];
                oparam3[0].Name = ":scene_id";
                oparam3[0].Type = OracleDbType.Int32;
                oparam3[0].Value = Convert.ToInt32(scene_id);

                DataTable dt = mydbo.GetDataTable(sql3, oparam3);
                if (dt != null && dt.Rows.Count > 0)
                {
                    string usercode = dt.Rows[0]["val1"].ToString();

                    #region 更新二维码为已使用
                    string sql4 = @"update sys_p_wxqrmanage t
                                       set t.valid = 0
                                     where t.scene_id = :scene_id
                                       and t.intentions = '绑定用户'
                                       and t.valid = 1";
                    OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                    oparam4[0].Name = ":scene_id";
                    oparam4[0].Type = OracleDbType.Int32;
                    oparam4[0].Value = scene_id;

                    int n = mydbo.ExecuteNonQuery(sql4, oparam4); 
                    #endregion

                    #region 更新用户绑定微信信息
                    string sql5 = @"update sys_s_user t set t.wxopenid = :wxopenid where t.usercode = :usercode";
                    OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[2];

                    oparam5[0].Name = ":wxopenid";
                    oparam5[0].Type = OracleDbType.Varchar2;
                    oparam5[0].Value = wxopenid;

                    oparam5[1].Name = ":usercode";
                    oparam5[1].Type = OracleDbType.Varchar2;
                    oparam5[1].Value = usercode;

                    n = mydbo.ExecuteNonQuery(sql5, oparam5); 
                    #endregion

                    string sql6 = @"select t.username from sys_s_userinfo t where t.usercode=:usercode";
                    OracleDBO.OracleCmdParam[] oparam6 = new OracleDBO.OracleCmdParam[1];
                    oparam6[0].Name = ":usercode";
                    oparam6[0].Type = OracleDbType.Varchar2;
                    oparam6[0].Value = usercode;

                    DataTable dt2 = mydbo.GetDataTable(sql6, oparam6);
                    if (dt2 != null && dt2.Rows.Count > 0)
                    {
                        errmsg = "成功绑定用户：" + dt2.Rows[0]["username"].ToString();
                    }

                    mydbo.Commit();
                }
                else
                {
                    result = false;
                    errmsg = "该二维码已失效";
                    mydbo.Commit();
                }
            }
            catch (Exception ex)
            {
                mydbo.Rollback();
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
        /// 关注取消日志记录
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="subscribed">是否关注，0取消关注，1关注</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SubscribeLog(string wxopenid, int subscribed, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                string sql1 = @"insert into sys_p_wxsubscribelog
                                  (wxopenid, createdate, subscribed)
                                values
                                  (:wxopenid, :createdate, :subscribed)";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[3];
                oparam1[0].Name = ":wxopenid";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = wxopenid;

                oparam1[1].Name = ":createdate";
                oparam1[1].Type = OracleDbType.Date;
                oparam1[1].Value = DateTime.Now;

                oparam1[2].Name = ":subscribed";
                oparam1[2].Type = OracleDbType.Int32;
                oparam1[2].Value = subscribed;

                int n = mydbo.ExecuteNonQuery(sql1, oparam1);
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
        /// 取消关注
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool UnSubscribe(string wxopenid, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                string sql1 = @"update sys_s_wxfansinfo t
                                   set t.subscribed = 0, t.subscribetime = :subscribetime
                                 where t.wxopenid = :wxopenid";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                oparam1[0].Name = ":subscribetime";
                oparam1[0].Type = OracleDbType.Date;
                oparam1[0].Value = DateTime.Now;

                oparam1[1].Name = ":wxopenid";
                oparam1[1].Type = OracleDbType.Varchar2;
                oparam1[1].Value = wxopenid;

                int n = mydbo.ExecuteNonQuery(sql1, oparam1);
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

