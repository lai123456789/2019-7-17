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
        public bool GetWXFansBindUserInfo(string wxopenid, ref DataTable dt, ref DataTable dt_page,ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.IsByParamName = true;
            mydbo.AutoClose = false;
            try
            {
                mydbo.BeginTransaction();
                string sql1 = @"select t1.usercode,
                                       t1.password,
                                       t1.usertype,
                                       t1.createdate,
                                       t1.wxopenid,
                                       t1.account,
                                       t2.username,
                                       t2.position,
                                       t2.sex,
                                       t2.birthday,
                                       t2.address,
                                       t2.phonenumber,
                                       t2.hiredate,
                                       t3.nickname,
                                       t3.headimgurl,
                                       t4.departmentcode,
                                       t4.departmentname department,
                                       t1.idnumber,
                                       t1.idkey
                                  from sys_s_user t1
                                  join sys_s_userinfo t2
                                    on t2.usercode = t1.usercode
                                  left join sys_s_wxfansinfo t3
                                    on t3.wxopenid = t1.wxopenid
                                  left join sys_s_departmentinfo t4
                                    on t4.departmentcode = t2.department
                                 where t1.status = 1
                                   and t1.usertype in (0, 2)
                                   and t1.wxopenid = :wxopenid";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":wxopenid";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = wxopenid;
                dt = mydbo.GetDataTable(sql1, oparam1);

                if (dt != null && dt.Rows.Count > 0)
                {
                    string usercode = dt.Rows[0]["usercode"].ToString();
                    //这里去查页面列表，dt_page

                    string rolecode = "";
                    string sql = @"select t.rolecode from SYS_S_USER t where t.usercode=:usercode";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                    oparam13[0].Name = ":usercode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = usercode;

                    DataTable abc = mydbo.GetDataTable(sql, oparam13);
                    for (int i = 0; i<abc.Rows.Count ; i++)
                    {
                        rolecode = abc.Rows[i]["rolecode"].ToString();
                    }

                    string sql2 = @"select t1.pagecode, t1.pagename, t1.ico, t1.url, t1.superior
                                      from M_WX_ROLEPAGE t, M_WX_PCPAGEMANAGE t1
                                     where t.pagecode = t1.pagecode
                                       and t.rolecode = :rolecode ";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                    oparam12[0].Name = ":rolecode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = rolecode;

                    dt_page = mydbo.GetDataTable(sql2, oparam12);
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
    }
}
