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
    public class DALProposer
    {


        /// <summary>
        /// 提交申请表
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Apply(string applycode, string applyname, string accent, string department, string purpose, string endsite, string servicetime, string returntime, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sql88 = @"select *
                            from M_C_APPLY t
                           where t.status < 3
                             and t.drivercode = '0'
                             and t.servicetime = :servicetime
                             and t.returntime = :returntime
                             and t.usercode = :usercode";
                OracleDBO.OracleCmdParam[] oparam88 = new OracleDBO.OracleCmdParam[3];
                oparam88[0].Name = ":servicetime";
                oparam88[0].Type = OracleDbType.Varchar2;
                oparam88[0].Value = servicetime;

                oparam88[1].Name = ":returntime";
                oparam88[1].Type = OracleDbType.Varchar2;
                oparam88[1].Value = returntime;

                oparam88[2].Name = ":usercode";
                oparam88[2].Type = OracleDbType.Varchar2;
                oparam88[2].Value = usercode;

                DataTable dt88 = mydbo.GetDataTable(sql88, oparam88);

                if (dt88.Rows.Count > 0)
                {
                    errmsg = "亲！您在同一时间段已经提交过申请";
                    result = false;
                    return result;
                }


                DateTime begintime = Convert.ToDateTime(servicetime);
                DateTime heartbeattime = Convert.ToDateTime(returntime);

                TimeSpan timeSpan = heartbeattime - begintime;
                double playtime = timeSpan.TotalMinutes;
                double pl = timeSpan.TotalMinutes;

                DateTime now = DateTime.Now;
                now = now.AddMinutes(5);            //加1分钟
                if (playtime < 10.0)
                {
                    errmsg = "用车时间与还车时间最少相差10分钟哦！";
                    result = false;
                    return result;
                }
                if (heartbeattime < now)
                {
                    errmsg = "请填写正确的预计归还日期哦！";
                    result = false;
                    return result;
                }
                if (begintime < now)
                {
                    errmsg = "请填写正确的申请日期哦！需要离现在提前5分钟哦！";
                    result = false;
                    return result;
                }


                string sql1 = @"insert into M_C_APPLY
                              (applycode, applyname, accent,department, purpose, endsite,servicetime, returntime,usercode,usetime)
                            values
                              (:applycode,
                               :applyname,
                                :accent,
                               :department,
                               :purpose,
                               :endsite,
                               :servicetime,
                               :returntime,:usercode,:usetime)";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[10];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                oparam12[1].Name = ":applyname";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = applyname;

                oparam12[2].Name = ":accent";
                oparam12[2].Type = OracleDbType.Varchar2;
                oparam12[2].Value = accent;

                oparam12[3].Name = ":department";
                oparam12[3].Type = OracleDbType.Varchar2;
                oparam12[3].Value = department;

                oparam12[4].Name = ":purpose";
                oparam12[4].Type = OracleDbType.Varchar2;
                oparam12[4].Value = purpose;

                oparam12[5].Name = ":endsite";
                oparam12[5].Type = OracleDbType.Varchar2;
                oparam12[5].Value = endsite;

                oparam12[6].Name = ":servicetime";
                oparam12[6].Type = OracleDbType.Varchar2;
                oparam12[6].Value = servicetime;


                oparam12[7].Name = ":returntime";
                oparam12[7].Type = OracleDbType.Varchar2;
                oparam12[7].Value = returntime;

                oparam12[8].Name = ":usercode";
                oparam12[8].Type = OracleDbType.Varchar2;
                oparam12[8].Value = usercode;

                oparam12[9].Name = ":usetime";
                oparam12[9].Type = OracleDbType.Varchar2;
                oparam12[9].Value = pl;

                int n = mydbo.ExecuteNonQuery(sql1, oparam12);
                if (n > 0)
                {
                    ///推送审核人
                    ///
                    DALMessageHandle h = new DALMessageHandle();
                    h.selectnotify2(applycode, applyname, department, purpose, servicetime, returntime, ref errmsg);
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
        /// 拒绝填入原因
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool ApplyFalse(string applycode, string reason, string susercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sql1 = @"update M_C_APPLY t  set  t.reason=:reason ,t.status='6' where t.applycode=:applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                oparam12[1].Name = ":reason";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = reason;

                int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                if (n > 0)
                {

                    string sql2 = @"select t3.username
                      from SYS_S_USERINFO t3
                     where t3.usercode = :usercode";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                    oparam13[0].Name = ":usercode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = susercode;
                    DataTable dt = mydbo.GetDataTable(sql2, oparam13);

                    string susername = dt.Rows[0]["username"].ToString();

                    ///推送申请成功 （点击立即用车） 
                    ///
                    string sql6 = @"insert into M_C_PLAYCAR
                                  (applycode, susername)
                                values
                                  (:applycode, :susername)";
                    OracleDBO.OracleCmdParam[] oparam6 = new OracleDBO.OracleCmdParam[2];
                    oparam6[0].Name = ":susername";
                    oparam6[0].Type = OracleDbType.Varchar2;
                    oparam6[0].Value = susername;

                    oparam6[1].Name = ":applycode";
                    oparam6[1].Type = OracleDbType.Varchar2;
                    oparam6[1].Value = applycode;
                    int n6 = mydbo.ExecuteNonQuery(sql6, oparam6);


                    DALMessageHandle h = new DALMessageHandle();
                    h.selectnotify1(applycode, reason, ref errmsg);
                    //                 ///推送驳回消息
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
        /// 申请成功！
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Application(string applycode, string playcode, string platenumber, string remark, string susercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                if (platenumber == "" || platenumber == null)
                {
                    errmsg = "您忘记选择车牌咯！";
                    result = false;
                    return result;
                }
                string sql44 = @"select t.returntime,t.servicetime from M_C_APPLY t   where t.applycode=:applycode ";
                OracleDBO.OracleCmdParam[] oparam144 = new OracleDBO.OracleCmdParam[1];
                oparam144[0].Name = ":applycode";
                oparam144[0].Type = OracleDbType.Varchar2;
                oparam144[0].Value = applycode;
                DataTable dt44 = mydbo.GetDataTable(sql44, oparam144);
                string returntime = dt44.Rows[0]["returntime"].ToString();
                string starttime = dt44.Rows[0]["servicetime"].ToString();

                bool bol = false;

                string sql99 = @"select t.platenumber from M_C_GARAGE t where t.returntime<:returntime or t.carstate='1'";
                OracleDBO.OracleCmdParam[] oparam99 = new OracleDBO.OracleCmdParam[1];
                oparam99[0].Name = ":returntime";
                oparam99[0].Type = OracleDbType.Varchar2;
                oparam99[0].Value = starttime;
                DataTable dt99 = mydbo.GetDataTable(sql99, oparam99);
                if (dt99.Rows.Count > 0)
                {
                    for (int i = 0; i < dt99.Rows.Count; i++)
                    {
                        if (dt99.Rows[i]["platenumber"].ToString() == platenumber)
                        {
                            bol = true;
                        }
                    }
                }

                if (bol)
                {

                    string sql1 = @"insert into M_C_PLAYCAR
                                  (applycode, playcode, platenumber, remark,susercode)
                                values
                                  (:applycode, :playcode, :platenumber, :remark,:susercode)";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[5];
                    oparam12[0].Name = ":applycode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = applycode;

                    oparam12[1].Name = ":playcode";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = playcode;

                    oparam12[2].Name = ":platenumber";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = platenumber;

                    oparam12[3].Name = ":remark";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = remark;

                    oparam12[4].Name = ":susercode";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = susercode;

                    int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                    if (n > 0)
                    {
                        string sql2 = @"select t3.username
                      from SYS_S_USERINFO t3
                     where t3.usercode = :usercode";
                        OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                        oparam13[0].Name = ":usercode";
                        oparam13[0].Type = OracleDbType.Varchar2;
                        oparam13[0].Value = susercode;
                        DataTable dt = mydbo.GetDataTable(sql2, oparam13);

                        string susername = dt.Rows[0]["username"].ToString();

                        ///修改表里申请是否成功
                        string sql4 = @"update M_C_APPLY t  set t.status='1'where t.applycode=:applycode";
                        OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                        oparam4[0].Name = ":applycode";
                        oparam4[0].Type = OracleDbType.Varchar2;
                        oparam4[0].Value = applycode;
                        int n1 = mydbo.ExecuteNonQuery(sql4, oparam4);
                        ////修改车库状态
                        ///修改表里申请是否成功
                        ///
                        //string sql44 = @"select t.returntime,t1.platenumber ,t.servicetime from M_C_APPLY t  , M_C_PLAYCAR t1  where t.applycode=:applycode and t1.applycode=t.applycode";
                        //OracleDBO.OracleCmdParam[] oparam144 = new OracleDBO.OracleCmdParam[1];
                        //oparam144[0].Name = ":applycode";
                        //oparam144[0].Type = OracleDbType.Varchar2;
                        //oparam144[0].Value = applycode;
                        //DataTable dt44 = mydbo.GetDataTable(sql44, oparam144);
                        //string returntime = dt44.Rows[0]["returntime"].ToString();
                        //string starttime = dt44.Rows[0]["servicetime"].ToString();


                        string sql5 = @"update M_C_GARAGE t set t.returntime = :returntime,t.starttime=:starttime ,t.code =:code ,t.carstate='0' where t.platenumber =:platenumber";
                        OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[4];
                        oparam5[0].Name = ":platenumber";
                        oparam5[0].Type = OracleDbType.Varchar2;
                        oparam5[0].Value = platenumber;

                        oparam5[1].Name = ":returntime";
                        oparam5[1].Type = OracleDbType.Varchar2;
                        oparam5[1].Value = returntime;

                        oparam5[2].Name = ":code";
                        oparam5[2].Type = OracleDbType.Varchar2;
                        oparam5[2].Value = applycode;

                        oparam5[3].Name = ":starttime";
                        oparam5[3].Type = OracleDbType.Varchar2;
                        oparam5[3].Value = starttime;
                        int n2 = mydbo.ExecuteNonQuery(sql5, oparam5);

                        ///推送申请成功 （点击立即用车） 
                        ///
                        string sql6 = @"update M_C_PLAYCAR t set t.susername=:susername where t.applycode=:applycode";
                        OracleDBO.OracleCmdParam[] oparam6 = new OracleDBO.OracleCmdParam[2];
                        oparam6[0].Name = ":susername";
                        oparam6[0].Type = OracleDbType.Varchar2;
                        oparam6[0].Value = susername;

                        oparam6[1].Name = ":applycode";
                        oparam6[1].Type = OracleDbType.Varchar2;
                        oparam6[1].Value = applycode;
                        int n6 = mydbo.ExecuteNonQuery(sql6, oparam6);


                        DALMessageHandle h = new DALMessageHandle();
                        h.selectnotify3(applycode, playcode, platenumber, ref errmsg);
                    }

                }
                else
                {
                    errmsg = "此时间车辆无档期哦，如有疑问请联系管理员！";
                    result = false;
                    return result;
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
        /// 点击立即用车
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Appli(string applycode, string begin, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                if (begin == "" || begin == "0")
                {
                    errmsg = "请输入正确的公里数";
                    result = false;
                    return result;
                }

                string sql4 = @"select t.platenumber from M_C_PLAYCAR t where t.applycode=:applycode";
                OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                oparam4[0].Name = ":applycode";
                oparam4[0].Type = OracleDbType.Varchar2;
                oparam4[0].Value = applycode;
                DataTable dt = mydbo.GetDataTable(sql4, oparam4);

                string platenumber = dt.Rows[0]["platenumber"].ToString();
                string sql5 = @"select t.endplay  from M_C_PLAYCAR t where t.platenumber=:platenumber  order by t.endplay desc nulls last";
                OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[1];
                oparam5[0].Name = ":platenumber";
                oparam5[0].Type = OracleDbType.Varchar2;
                oparam5[0].Value = platenumber;
                DataTable dt2 = mydbo.GetDataTable(sql5, oparam5);
                string endplay = dt2.Rows[0]["endplay"].ToString();

                double b111 = 0;
                if (!double.TryParse(endplay, out b111))
                {
                    //失败执行的方法
                    errmsg = "转换" + endplay + "失败";
                }

                double b11 = 0;
                if (!double.TryParse(begin, out b11))
                {
                    //失败执行的方法
                    errmsg = "转换" + begin + "失败";
                }

                bool bo = false;
                double b2 = b111;
                b111 = b111 + 5;//误差5公里
                if (b11 >= b2 || b11 >= b111)
                {
                    bo = true;
                }

                if (bo)
                {

                    string begintime = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
                    string sql1 = @"update m_c_playcar t  set t.begin=:begin , t.begintime=:begintime,  t.carstart = '1'  where  t.applycode=:applycode";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[3];
                    oparam12[0].Name = ":applycode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = applycode;

                    oparam12[1].Name = ":begin";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = begin;

                    oparam12[2].Name = ":begintime";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = begintime;

                    int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                    if (n > 0)
                    {

                        string sql11 = @"update M_C_APPLY t  set t.status='2' where t.applycode=:applycode";
                        OracleDBO.OracleCmdParam[] oparam121 = new OracleDBO.OracleCmdParam[1];
                        oparam121[0].Name = ":applycode";
                        oparam121[0].Type = OracleDbType.Varchar2;
                        oparam121[0].Value = applycode;


                        int n1 = mydbo.ExecuteNonQuery(sql11, oparam121);
                        //  推送还车    


                        DALMessageHandle h = new DALMessageHandle();
                        h.selectnotify4(applycode, begin, ref errmsg);
                    }
                }
                else
                {

                    errmsg = "请输入正确的公里数";
                    result = false;
                    return result;
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
        /// 点击还车
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool AppliReturn(string applycode, string endplay, string returnremark, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {


                if (endplay == "" || endplay == "0")
                {
                    errmsg = "请输入正确的公里数";
                    result = false;
                    return result;
                }


                string sql7 = @"select t.servicetime,t1.begintime,t1.begin,t1.platenumber,t1.endplay
                                  from M_C_APPLY t,M_C_PLAYCAR t1
                                 where t.applycode = :applycode and t.applycode=t1.applycode";
                OracleDBO.OracleCmdParam[] oparam7 = new OracleDBO.OracleCmdParam[1];
                oparam7[0].Name = ":applycode";
                oparam7[0].Type = OracleDbType.Varchar2;
                oparam7[0].Value = applycode;
                DataTable dt4 = mydbo.GetDataTable(sql7, oparam7);
                if (dt4.Rows.Count > 0)
                {
                    string begin = dt4.Rows[0]["begin"].ToString();
                    string p = dt4.Rows[0]["platenumber"].ToString();
                    string b = dt4.Rows[0]["servicetime"].ToString();
                    string b1 = dt4.Rows[0]["begintime"].ToString();
                    string b2 = dt4.Rows[0]["endplay"].ToString();
                    double b111 = 0;
                    if (!double.TryParse(endplay, out b111))
                    {
                        //失败执行的方法
                        errmsg = "转换" + endplay + "失败";
                    }

                    double b11 = 0;
                    if (!double.TryParse(begin, out b11))
                    {
                        //失败执行的方法
                        errmsg = "转换" + begin + "失败";
                    }

                    if (b11 > b111)
                    {

                        errmsg = "请输入正确的公里数";
                        result = false;
                        return result;
                    }

                    double a = b111 - b11;

                    if (a > 2000.0)
                    {

                        errmsg = "请输入正确的公里数";
                        result = false;
                        return result;
                    }

                    DateTime begintime = Convert.ToDateTime(b1);
                    DateTime dtttttt = DateTime.Now;
                    TimeSpan ts = dtttttt - begintime;
                    double pl = ts.TotalMinutes;
                    string str1 = String.Format("{0:F}", pl);
                    string playtime = ts.Days + "天" + ts.Hours + "小时" + ts.Minutes + "分" + ts.Seconds + "秒";


                    string endtime = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
                    string sql1 = @"update m_c_playcar t
                               set t.endplay  = :endplay,
                                   t.returnremark = :returnremark,
                                   t.endtime  = :endtime,
                                   t.playtime  = :playtime,
                                   t.carstart = '2',
                                     t.playkm = :playkm,
                                       t.playkmtimes=:playkmtimes
                             where t.applycode = :applycode";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[7];
                    oparam12[0].Name = ":applycode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = applycode;

                    oparam12[1].Name = ":endplay";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = endplay;

                    oparam12[2].Name = ":returnremark";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = returnremark;

                    oparam12[3].Name = ":endtime";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = endtime;

                    oparam12[4].Name = ":playtime";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = playtime;

                    oparam12[5].Name = ":playkm";
                    oparam12[5].Type = OracleDbType.Double;
                    oparam12[5].Value = a;


                    oparam12[6].Name = ":playkmtimes";
                    oparam12[6].Type = OracleDbType.Varchar2;
                    oparam12[6].Value = str1;

                    int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                    if (n > 0)
                    {
                        ///修改车库里车辆状态
                        string sql4 = @"select t.platenumber, t1.usercode
                                from M_C_PLAYCAR t, M_C_APPLY t1
                              where t.applycode = :applycode and t.applycode=t1.applycode";
                        OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                        oparam4[0].Name = ":applycode";
                        oparam4[0].Type = OracleDbType.Varchar2;
                        oparam4[0].Value = applycode;
                        DataTable dt = mydbo.GetDataTable(sql4, oparam4);
                        if (dt.Rows.Count > 0)
                        {
                            string platenumber = dt.Rows[0]["platenumber"].ToString();
                            string usercode = dt.Rows[0]["usercode"].ToString();

                            ///修改表里申请是否成功
                            string sql5 = @"update M_C_GARAGE t set t.carstate = '1',t.returntime='',t.starttime='',t.code='' where t.platenumber = :platenumber";
                            OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[1];
                            oparam5[0].Name = ":platenumber";
                            oparam5[0].Type = OracleDbType.Varchar2;
                            oparam5[0].Value = platenumber;
                            int n2 = mydbo.ExecuteNonQuery(sql5, oparam5);


                            string sql11 = @"update M_C_APPLY t  set t.status='4' where t.applycode=:applycode";
                            OracleDBO.OracleCmdParam[] oparam121 = new OracleDBO.OracleCmdParam[1];
                            oparam121[0].Name = ":applycode";
                            oparam121[0].Type = OracleDbType.Varchar2;
                            oparam121[0].Value = applycode;
                            int n1 = mydbo.ExecuteNonQuery(sql11, oparam121);



                            ////   推送申请人还车成功！（审核人，）

                            DALMessageHandle h = new DALMessageHandle();
                            h.selectnotify5(applycode, usercode, ref errmsg);
                        }
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



        /// <summary>
        /// 查询库存
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetGarage(ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询库存
                string sql2 = @"select * from M_C_GARAGE t order by t.carstate asc";
                dt = mydbo.GetDataTable(sql2);
                #endregion
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
        /// 查询申请单
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApply(string usercode, int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询记录总数
                string sql111 = @"select count(t.applycode) from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                 where t1.driver=:driver or t.usercode=:driver and t.drivercode='0'";
                OracleDBO.OracleCmdParam[] oparam1111 = new OracleDBO.OracleCmdParam[1];
                oparam1111[0].Name = ":driver";
                oparam1111[0].Type = OracleDbType.Varchar2;
                oparam1111[0].Value = usercode;
                totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql111, oparam1111));
                #endregion

                #region 统计页数
                if (totalnum == 0)
                {
                    return true;
                }

                if (totalnum % pagesize > 0)
                {
                    pagecount = totalnum / pagesize + 1;
                }
                else
                {
                    pagecount = totalnum / pagesize;
                }

                if (page > pagecount)
                {
                    page = pagecount;
                }

                if (page < 1)
                {
                    page = 1;
                }
                #endregion

                string sql1 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                 where t.usercode=:driver and t.drivercode='0' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam11 = new OracleDBO.OracleCmdParam[1];
                oparam11[0].Name = ":driver";
                oparam11[0].Type = OracleDbType.Varchar2;
                oparam11[0].Value = usercode;
                dt = mydbo.GetDataTable(sql1, oparam11);


                string sql2 = @"select  *  from M_C_APPLY t  where t.status='0'and t.usercode=:usercode and t.drivercode='0' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":usercode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = usercode;
                dt1 = mydbo.GetDataTable(sql2, oparam12);


                string sql3 = @"select *
                                      from M_C_APPLY t
                                      left join M_C_PLAYCAR t1
                                        on t.applycode = t1.applycode
                                     where t.usercode = :usercode
                                       and t.status <= 2
                                       and t.status > 0 and t.drivercode='0' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":usercode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = usercode;
                dt2 = mydbo.GetDataTable(sql3, oparam13);



                string sql4 = @"select *
                                      from M_C_APPLY t
                                      left join M_C_PLAYCAR t1
                                        on t.applycode = t1.applycode
                                     where t.usercode = :usercode
                                       and t.status <= 6
                                       and t.status > 2 and t.drivercode='0' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam14 = new OracleDBO.OracleCmdParam[1];
                oparam14[0].Name = ":usercode";
                oparam14[0].Type = OracleDbType.Varchar2;
                oparam14[0].Value = usercode;
                dt3 = mydbo.GetDataTable(sql4, oparam14);


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
        /// 查询派车申请单
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApplyPL(string usercode, int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                #region 查询记录总数
                string sql111 = @"select count(t.applycode) from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                 where t1.driver=:driver or t.usercode=:driver and t.drivercode='1'";
                OracleDBO.OracleCmdParam[] oparam1111 = new OracleDBO.OracleCmdParam[1];
                oparam1111[0].Name = ":driver";
                oparam1111[0].Type = OracleDbType.Varchar2;
                oparam1111[0].Value = usercode;
                totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql111, oparam1111));
                #endregion

                #region 统计页数
                if (totalnum == 0)
                {
                    return true;
                }

                if (totalnum % pagesize > 0)
                {
                    pagecount = totalnum / pagesize + 1;
                }
                else
                {
                    pagecount = totalnum / pagesize;
                }

                if (page > pagecount)
                {
                    page = pagecount;
                }

                if (page < 1)
                {
                    page = 1;
                }
                #endregion


                string sql1 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                 where t1.driver=:driver or t.usercode=:driver and t.drivercode='1' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam11 = new OracleDBO.OracleCmdParam[1];
                oparam11[0].Name = ":driver";
                oparam11[0].Type = OracleDbType.Varchar2;
                oparam11[0].Value = usercode;
                dt = mydbo.GetDataTable(sql1, oparam11);


                string sql2 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode  where t.status='0'and  t1.driver=:driver or t.usercode=:driver  and t.drivercode='1' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":driver";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = usercode;
                dt1 = mydbo.GetDataTable(sql2, oparam12);


                string sql3 = @"select *
                                      from M_C_APPLY t
                                      left join M_C_PLAYCAR t1
                                        on t.applycode = t1.applycode
                                     where t.usercode = :driver or t1.driver=:driver 
                                       and t.status <= 2
                                       and t.status > 0 and t.drivercode='1'  order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":driver";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = usercode;
                dt2 = mydbo.GetDataTable(sql3, oparam13);



                string sql4 = @"select *
                                      from M_C_APPLY t
                                      left join M_C_PLAYCAR t1
                                        on t.applycode = t1.applycode
                                     where t.usercode = :driver or t1.driver=:driver 
                                       and t.status <= 6
                                       and t.status > 2 and t.drivercode='1' order by t.servicetime asc";
                OracleDBO.OracleCmdParam[] oparam14 = new OracleDBO.OracleCmdParam[1];
                oparam14[0].Name = ":driver";
                oparam14[0].Type = OracleDbType.Varchar2;
                oparam14[0].Value = usercode;
                dt3 = mydbo.GetDataTable(sql4, oparam14);


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
        /// 依据单号查数据
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCar(string returntime, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {  //select t.platenumber from M_C_GARAGE t where t.returntime<:returntime or t.carstate='1'
                //  string sql22 = @"select t.platenumber from M_C_GARAGE t where t.returntime<:returntime or t.returntime is null";
                string sql22 = @"select t.platenumber from M_C_GARAGE t where t.returntime<:returntime or t.carstate='1'";
                OracleDBO.OracleCmdParam[] oparam132 = new OracleDBO.OracleCmdParam[1];
                oparam132[0].Name = ":returntime";
                oparam132[0].Type = OracleDbType.Varchar2;
                oparam132[0].Value = returntime;
                dt = mydbo.GetDataTable(sql22, oparam132);


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
        /// 依据单号查司机数据
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCardata(string applycode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string sql22 = @"select * from  M_C_PLAYCAR t ,M_C_APPLY t1  where t.applycode=:applycode and t.applycode=t1.applycode";
                OracleDBO.OracleCmdParam[] oparam132 = new OracleDBO.OracleCmdParam[1];
                oparam132[0].Name = ":applycode";
                oparam132[0].Type = OracleDbType.Varchar2;
                oparam132[0].Value = applycode;
                dt = mydbo.GetDataTable(sql22, oparam132);


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
        ///司机
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCard(ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string sql22 = @"select * from   M_C_DRIVER t  order by t.starts";

                dt = mydbo.GetDataTable(sql22);

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
        /// 依据单号查数据
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApplyCode(string applycode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string sql22 = @"select t.usercode
                              from sys_s_userinfo t, M_C_PLAYCAR t1
                             where t.position = '司机'
                               and usercode = t1.driver
                               and t1.applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam132 = new OracleDBO.OracleCmdParam[1];
                oparam132[0].Name = ":applycode";
                oparam132[0].Type = OracleDbType.Varchar2;
                oparam132[0].Value = applycode;
                DataTable dt1 = mydbo.GetDataTable(sql22, oparam132);
                if (dt1.Rows.Count > 0)
                {
                    string sql1 = @"update M_C_PLAYCAR t  set  t.drid='1'";

                    int n = mydbo.ExecuteNonQuery(sql1);
                }
                else
                {
                    string sql1 = @"update M_C_PLAYCAR t  set  t.drid='0'";
                    int n = mydbo.ExecuteNonQuery(sql1);
                }
                #region
                string sql2 = @"select *
                          from M_C_APPLY t
                          left join M_C_PLAYCAR t1
                            on t.applycode = t1.applycode
                            where  t.applycode=:applycode order by t.applycode desc";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":applycode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = applycode;

                dt = mydbo.GetDataTable(sql2, oparam13);
                #endregion

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
        /// 查询汇总
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAll(int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询记录总数
                string sql111 = @"select count(t.applycode) from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode where t.drivercode='0'";
                totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql111));
                #endregion

                #region 统计页数
                if (totalnum == 0)
                {
                    return true;
                }

                if (totalnum % pagesize > 0)
                {
                    pagecount = totalnum / pagesize + 1;
                }
                else
                {
                    pagecount = totalnum / pagesize;
                }

                if (page > pagecount)
                {
                    page = pagecount;
                }

                if (page < 1)
                {
                    page = 1;
                }
                #endregion


                string sql1 = @"select *
                                  from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode where t.drivercode='0'
                                 order by t.cretetime desc";
                dt = mydbo.GetDataTable(sql1);


                string sql2 = @"select *
                              from M_C_APPLY t
                              left join M_C_PLAYCAR t1
                                on t.applycode = t1.applycode
                             where t.status = '0' and t.drivercode='0'
                             order by t.cretetime desc";
                dt1 = mydbo.GetDataTable(sql2);


                string sql3 = @"select *
                              from M_C_APPLY t
                              left join M_C_PLAYCAR t1
                                on t.applycode = t1.applycode
                             where t.status <= 2
                               and t.status > 0 and t.drivercode='0'
                             order by t.cretetime desc";

                dt2 = mydbo.GetDataTable(sql3);


                string sql4 = @"select *
                              from M_C_APPLY t
                              left join M_C_PLAYCAR t1
                                on t.applycode = t1.applycode
                             where t.status <= 6
                               and t.status > 2 and t.drivercode='0'
                             order by t.cretetime desc";
                dt3 = mydbo.GetDataTable(sql4);
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
        /// 查询汇总
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAllCar(int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询记录总数
                string sql111 = @"select count(t.applycode) from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode where t.drivercode='1'";
                totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql111));
                #endregion

                #region 统计页数
                if (totalnum == 0)
                {
                    return true;
                }

                if (totalnum % pagesize > 0)
                {
                    pagecount = totalnum / pagesize + 1;
                }
                else
                {
                    pagecount = totalnum / pagesize;
                }

                if (page > pagecount)
                {
                    page = pagecount;
                }

                if (page < 1)
                {
                    page = 1;
                }
                #endregion


                string sql1 = @"select *
                                  from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode where t.drivercode='1'
                                order by t.cretetime desc";
                dt = mydbo.GetDataTable(sql1);


                string sql2 = @"select *
                              from M_C_APPLY t
                              left join M_C_PLAYCAR t1
                                on t.applycode = t1.applycode
                             where t.status = '0' and t.drivercode='1'
                              order by t.cretetime desc";
                dt1 = mydbo.GetDataTable(sql2);


                string sql3 = @"select *
                              from M_C_APPLY t
                              left join M_C_PLAYCAR t1
                                on t.applycode = t1.applycode
                             where t.status <= 2
                               and t.status > 0 and t.drivercode='1'
                             order by t.cretetime desc";

                dt2 = mydbo.GetDataTable(sql3);


                string sql4 = @"select *
                              from M_C_APPLY t
                              left join M_C_PLAYCAR t1
                                on t.applycode = t1.applycode
                             where t.status <= 6
                               and t.status > 2 and t.drivercode='1'
                             order by t.cretetime desc";
                dt3 = mydbo.GetDataTable(sql4);
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
        /// 姓名
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUsercode(string usercode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region
                string sql2 = @"select t.username, t1.account,t2.departmentname
                      from SYS_S_USERINFO t, SYS_S_USER t1, SYS_S_DEPARTMENTINFO t2
                     where t.usercode = t1.usercode
                       and t.department = t2.departmentcode
                       and t.usercode=:usercode";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":usercode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = usercode;

                dt = mydbo.GetDataTable(sql2, oparam13);
                #endregion

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



        /// </summary> 用户 依据条件筛选
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUsercodeAll(string usercode, string dome, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string SortContent = "";

                if (dome != "未审核" && dome != "已审核" && dome != "已撤销" && dome != "使用中" && dome != "已还车" && dome != "已驳回" && dome != "" && dome != null)
                {
                    string sql2 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                 where t.usercode=:usercode 
                                and t.applycode=:applycode";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                    oparam13[0].Name = ":usercode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = usercode;

                    oparam13[1].Name = ":applycode";
                    oparam13[1].Type = OracleDbType.Varchar2;
                    oparam13[1].Value = dome;
                    dt = mydbo.GetDataTable(sql2, oparam13);
                }
                else
                {
                    switch (dome)
                    {
                        case "未审核":
                            SortContent = "t.status = '2' ";
                            break;

                        case "已审核":
                            SortContent = "t.status = '0' and t1.carstart='0'";
                            break;
                        case "已撤销":
                            SortContent = "  t.status = '3' ";
                            break;
                        case "使用中":
                            SortContent = " t.status = '0'  and t1.carstart='1'";
                            break;
                        case "已还车":
                            SortContent = " t.status = '0' and t1.carstart='2'";
                            break;
                        case "已驳回":
                            SortContent = " t.status = '1' ";
                            break;
                        default:
                            SortContent = " 1 = 1 order by  t.applycode desc ";
                            break;
                    }

                    string sql2 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                 where t.usercode=:usercode 
                                 " + SortContent + "";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                    oparam13[0].Name = ":usercode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = usercode;
                    dt = mydbo.GetDataTable(sql2, oparam13);
                }



                //               dome = dome.Trim();//去除空白
                //                if (dome == "未审核") { 
                //                string sql2 = @"select *from M_C_APPLY t
                //                                  left join M_C_PLAYCAR t1
                //                                    on t.applycode = t1.applycode
                //                                 where t.status = '2' and t.usercode=:usercode
                //                                 order by t.applycode desc ";
                //                            OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                //                            oparam13[0].Name = ":usercode";
                //                            oparam13[0].Type = OracleDbType.Varchar2;
                //                            oparam13[0].Value = usercode;
                //                        dt = mydbo.GetDataTable(sql2, oparam13);
                //                }
                //                if (dome == "审核通过")
                //                {
                //                    string sql2 = @"select *
                //                                      from M_C_APPLY t
                //                                      left join M_C_PLAYCAR t1
                //                                        on t.applycode = t1.applycode
                //                                     where t.status = '0' and t1.carstart='0' and t.usercode=:usercode
                //                                     order by t.applycode desc ";
                //                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                //                    oparam13[0].Name = ":usercode";
                //                    oparam13[0].Type = OracleDbType.Varchar2;
                //                    oparam13[0].Value = usercode;
                //                    dt = mydbo.GetDataTable(sql2, oparam13);
                //                }

                //                if (dome == "已撤销")
                //                {
                //                    string sql2 = @"select *from M_C_APPLY t
                //                                  left join M_C_PLAYCAR t1
                //                                    on t.applycode = t1.applycode
                //                                 where t.status = '3' and t.usercode=:usercode
                //                                 order by t.applycode desc ";
                //                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                //                    oparam13[0].Name = ":usercode";
                //                    oparam13[0].Type = OracleDbType.Varchar2;
                //                    oparam13[0].Value = usercode;
                //                    dt = mydbo.GetDataTable(sql2, oparam13);
                //                }

                //                if (dome == "使用中")
                //                {
                //                    string sql2 = @"select *
                //                                      from M_C_APPLY t
                //                                      left join M_C_PLAYCAR t1
                //                                        on t.applycode = t1.applycode
                //                                     where t.status = '0' and t1.carstart='1' and t.usercode=:usercode
                //                                     order by t.applycode desc ";
                //                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                //                    oparam13[0].Name = ":usercode";
                //                    oparam13[0].Type = OracleDbType.Varchar2;
                //                    oparam13[0].Value = usercode;
                //                    dt = mydbo.GetDataTable(sql2, oparam13);
                //                }

                //                if (dome == "已还车")
                //                {
                //                    string sql2 = @"select *
                //                                      from M_C_APPLY t
                //                                      left join M_C_PLAYCAR t1
                //                                        on t.applycode = t1.applycode
                //                                     where t.status = '0' and t1.carstart='2' and t.usercode=:usercode
                //                                     order by t.applycode desc ";
                //                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                //                    oparam13[0].Name = ":usercode";
                //                    oparam13[0].Type = OracleDbType.Varchar2;
                //                    oparam13[0].Value = usercode;
                //                    dt = mydbo.GetDataTable(sql2, oparam13);
                //                }

                //                if (dome == "已驳回")
                //                {
                //                    string sql2 = @"select *
                //                                      from M_C_APPLY t
                //                                      left join M_C_PLAYCAR t1
                //                                        on t.applycode = t1.applycode
                //                                     where t.status = '1' and t.usercode=:usercode
                //                                     order by t.applycode desc ";
                //                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                //                    oparam13[0].Name = ":usercode";
                //                    oparam13[0].Type = OracleDbType.Varchar2;
                //                    oparam13[0].Value = usercode;
                //                    dt = mydbo.GetDataTable(sql2, oparam13);
                //                }

                //                else
                //                {
                //                    string sql2 = @"select * from M_C_APPLY t
                //                                  left join M_C_PLAYCAR t1
                //                                    on t.applycode = t1.applycode
                //                                 where t.applycode = :applycode
                //                                   and t.usercode = :usercode
                //                                 order by t.applycode desc";
                //                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                //                    oparam13[0].Name = ":applycode";
                //                    oparam13[0].Type = OracleDbType.Varchar2;
                //                    oparam13[0].Value = dome;

                //                    oparam13[1].Name = ":usercode";
                //                    oparam13[1].Type = OracleDbType.Varchar2;
                //                    oparam13[1].Value = usercode;

                //                    dt = mydbo.GetDataTable(sql2, oparam13);
                //                }
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


        /// </summary> 管理员依据条件筛选
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAdmin(string dome, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string SortContent = "";

                if (dome != "待审核" && dome != "已驳回" && dome != "审核通过" && dome != "已还车" && dome != "" && dome != null)
                {
                    string sql2 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                  where  t1.applycode=:applycode";
                    OracleDBO.OracleCmdParam[] oparam = new OracleDBO.OracleCmdParam[1];
                    oparam[0].Name = ":applycode";
                    oparam[0].Type = OracleDbType.Varchar2;
                    oparam[0].Value = dome;

                    dt = mydbo.GetDataTable(sql2, oparam);
                }
                else
                {
                    switch (dome)
                    {
                        case "待审核":
                            SortContent = "t.status = '2' ";
                            break;

                        case "已驳回":
                            SortContent = "t.status = '1'";
                            break;
                        case "已撤销":
                            SortContent = "  t.status = '3' ";
                            break;
                        case "审核通过":
                            SortContent = " t.status = '0' ";
                            break;
                        case "已还车":
                            SortContent = " t.status = '0' and t1.carstart='2'";
                            break;
                        default:
                            SortContent = " 1 = 1 order by  t.applycode desc ";
                            break;
                    }

                    string sql2 = @"select * from M_C_APPLY t
                                  left join M_C_PLAYCAR t1
                                    on t.applycode = t1.applycode
                                  where " + SortContent + "";
                    dt = mydbo.GetDataTable(sql2);
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
        /// 撤销申请单
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool ApplyRepeal(string applycode, string repeal, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                ///修改表里申请是否成功
                string sql5 = @"update M_C_GARAGE t set t.carstate = '1',t.returntime='',t.starttime='',t.code='' where t.code = :code";
                OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[1];
                oparam5[0].Name = ":code";
                oparam5[0].Type = OracleDbType.Varchar2;
                oparam5[0].Value = applycode;
                int n2 = mydbo.ExecuteNonQuery(sql5, oparam5);

                string sql55 = @"update M_C_DRIVER t set t.starts ='1', t.platenumber= '',t.starttime='',t.CODE='' where t.code =:code ";
                OracleDBO.OracleCmdParam[] oparam55 = new OracleDBO.OracleCmdParam[1];
                oparam55[0].Name = ":code";
                oparam55[0].Type = OracleDbType.Varchar2;
                oparam55[0].Value = applycode;
                int n5 = mydbo.ExecuteNonQuery(sql55, oparam55);


                string sql1 = @"update M_C_APPLY t  set  t.repeal=:repeal ,t.status='3' where t.applycode=:applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                oparam12[1].Name = ":repeal";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = repeal;

                int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                if (n > 0)
                {
                    DALMessageHandle h = new DALMessageHandle();
                    h.selectnotify7(applycode, repeal, ref errmsg);
                    //                 ///推送撤销消息
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
        /// 提交派车申请单
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SendCar(string applycode, string applyname, string department, string accent, string proposernomber, string endsite, string purpose, string servicetime, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string sql88 = @"select *
                                from M_C_APPLY t
                               where t.status < 3
                                 and t.drivercode = '1'
                                 and t.servicetime = :servicetime
                                 and t.usercode = :usercode";
                OracleDBO.OracleCmdParam[] oparam88 = new OracleDBO.OracleCmdParam[2];
                oparam88[0].Name = ":servicetime";
                oparam88[0].Type = OracleDbType.Varchar2;
                oparam88[0].Value = servicetime;

                oparam88[1].Name = ":usercode";
                oparam88[1].Type = OracleDbType.Varchar2;
                oparam88[1].Value = usercode;

                DataTable dt88 = mydbo.GetDataTable(sql88, oparam88);

                if (dt88.Rows.Count > 0)
                {
                    errmsg = "亲！您在同一时间段已经提交过申请";
                    result = false;
                    return result;
                }




                DateTime begintime = Convert.ToDateTime(servicetime);
                DateTime now = DateTime.Now;
                now = now.AddMinutes(5);            //加1分钟


                if (begintime < now)
                {
                    errmsg = "请填写正确的申请日期哦！需要离现在提前5分钟哦！";
                    result = false;
                    return result;
                }

                bool bol = false;

                string sql99 = @"select t.platenumber from M_C_GARAGE t where t.returntime<:returntime or t.carstate='1'";
                OracleDBO.OracleCmdParam[] oparam99 = new OracleDBO.OracleCmdParam[1];
                oparam99[0].Name = ":returntime";
                oparam99[0].Type = OracleDbType.Varchar2;
                oparam99[0].Value = servicetime;
                DataTable dt99 = mydbo.GetDataTable(sql99, oparam99);
                if (dt99.Rows.Count > 0)
                {
                    for (int i = 0; i < dt99.Rows.Count; i++)
                    {
                        if (dt99.Rows[i]["platenumber"].ToString() == proposernomber)
                        {
                            bol = true;
                        }
                    }
                }
                if (proposernomber == "")
                {
                    bol = true;
                }

                if (bol)
                {
                    //string sql88 = @"select t.*, t.rowid from M_C_APPLY t where  t.usercode=:usercode and t.status<3 and t.drivercode='1'";
                    //OracleDBO.OracleCmdParam[] oparam88 = new OracleDBO.OracleCmdParam[1];
                    //oparam88[0].Name = ":usercode";
                    //oparam88[0].Type = OracleDbType.Varchar2;
                    //oparam88[0].Value = usercode;
                    //DataTable dt88 = mydbo.GetDataTable(sql88, oparam88);

                    //if (dt88.Rows.Count > 0)
                    //{
                    //    errmsg = "抱歉！您之前的申请单还未结单！";
                    //    result = false;
                    //    return result;
                    //}

                    string sql1 = @"insert into M_C_APPLY
                                  (applycode,
                                   applyname,
                                   department,
                                   accent,
                                   proposernomber,
                                   endsite,
                                   purpose, 
                                   servicetime,
                                   usercode)
                                values
                                  (:applycode,
                                   :applyname,
                                    :department,
                                   :accent,
                                   :proposernomber,
                                   :endsite,
                                   :purpose,
                                   :servicetime,
                                    :usercode)";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[9];
                    oparam12[0].Name = ":applycode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = applycode;

                    oparam12[1].Name = ":applyname";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = applyname;

                    oparam12[2].Name = ":accent";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = accent;

                    oparam12[3].Name = ":proposernomber";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = proposernomber;


                    oparam12[4].Name = ":endsite";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = endsite;

                    oparam12[5].Name = ":purpose";
                    oparam12[5].Type = OracleDbType.Varchar2;
                    oparam12[5].Value = purpose;

                    oparam12[6].Name = ":servicetime";
                    oparam12[6].Type = OracleDbType.Varchar2;
                    oparam12[6].Value = servicetime;

                    oparam12[7].Name = ":usercode";
                    oparam12[7].Type = OracleDbType.Varchar2;
                    oparam12[7].Value = usercode;

                    oparam12[8].Name = ":department";
                    oparam12[8].Type = OracleDbType.Varchar2;
                    oparam12[8].Value = department;
                    int n = mydbo.ExecuteNonQuery(sql1, oparam12);
                    ///创建车牌
                    string sql12 = @"                                
                                insert into M_C_PLAYCAR
                                  (applycode, platenumber)
                                values
                                  (:applycode, :platenumber)";
                    OracleDBO.OracleCmdParam[] oparam122 = new OracleDBO.OracleCmdParam[2];
                    oparam122[0].Name = ":applycode";
                    oparam122[0].Type = OracleDbType.Varchar2;
                    oparam122[0].Value = applycode;

                    oparam122[1].Name = ":platenumber";
                    oparam122[1].Type = OracleDbType.Varchar2;
                    oparam122[1].Value = proposernomber;


                    int n1 = mydbo.ExecuteNonQuery(sql12, oparam122);



                    if (n > 0)
                    {
                        ///修改表是派车单
                        string sql6 = @"update M_C_APPLY t  set t.drivercode='1' where t.applycode=:applycode";
                        OracleDBO.OracleCmdParam[] oparam6 = new OracleDBO.OracleCmdParam[1];
                        oparam6[0].Name = ":applycode";
                        oparam6[0].Type = OracleDbType.Varchar2;
                        oparam6[0].Value = applycode;
                        int n3 = mydbo.ExecuteNonQuery(sql6, oparam6);

                        DALMessageHandle h = new DALMessageHandle();
                        h.selectnotify11(applycode, applyname, department, proposernomber, endsite, purpose, servicetime, ref errmsg);
                        //                 ///推送派车申请单
                    }
                }
                else
                {
                    errmsg = "此时间车辆无档期哦，请重新挑选！";
                    result = false;
                    return result;
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
        /// 查询司机
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetDriver(ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询司机
                string sql2 = @"select t.username,t.usercode from SYS_S_USERINFO t where t.position='司机'";
                dt = mydbo.GetDataTable(sql2);
                #endregion
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
        /// 审批挑选车牌和司机
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Approve(string applycode, string playcode, string platenumber, string driver, string remark, string susercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                if (platenumber == "" || platenumber == null)
                {
                    errmsg = "您忘记选择车牌咯！";
                    result = false;
                    return result;
                }


                //string sql88 = @"select * from M_C_DRIVER t  where t.driver=:driver and t.starts='1'";
                //OracleDBO.OracleCmdParam[] oparam88 = new OracleDBO.OracleCmdParam[1];
                //oparam88[0].Name = ":driver";
                //oparam88[0].Type = OracleDbType.Varchar2;
                //oparam88[0].Value = driver;
                //DataTable dt88 = mydbo.GetDataTable(sql88, oparam88);

                //if (dt88.Rows.Count < 1)
                //{
                //    errmsg = "抱歉！您选中的司机！正在执行任务哦";
                //    result = false;
                //    return result;
                //}


                string sql1 = @"update M_C_PLAYCAR 
                                     set applycode = :applycode,
                                         playcode    = :playcode,
                                         platenumber = :platenumber,
                                         driver      = :driver,
                                         remark      =:remark,
                                         susercode = :susercode 
                                         where applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[6];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                oparam12[1].Name = ":playcode";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = playcode;

                oparam12[2].Name = ":platenumber";
                oparam12[2].Type = OracleDbType.Varchar2;
                oparam12[2].Value = platenumber;

                oparam12[3].Name = ":driver";
                oparam12[3].Type = OracleDbType.Varchar2;
                oparam12[3].Value = driver;

                oparam12[4].Name = ":remark";
                oparam12[4].Type = OracleDbType.Varchar2;
                oparam12[4].Value = remark;

                oparam12[5].Name = ":susercode";
                oparam12[5].Type = OracleDbType.Varchar2;
                oparam12[5].Value = susercode;


                int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                if (n > 0)
                {
                    string be = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
                    ///修改表里申请是否成功
                    string sql55 = @"update M_C_DRIVER t set t.starts ='0', t.platenumber= :platenumber,t.starttime=:starttime,t.code=:code where t.driver =:driver";
                    OracleDBO.OracleCmdParam[] oparam55 = new OracleDBO.OracleCmdParam[4];
                    oparam55[0].Name = ":driver";
                    oparam55[0].Type = OracleDbType.Varchar2;
                    oparam55[0].Value = driver;

                    oparam55[1].Name = ":platenumber";
                    oparam55[1].Type = OracleDbType.Varchar2;
                    oparam55[1].Value = platenumber;

                    oparam55[2].Name = ":starttime";
                    oparam55[2].Type = OracleDbType.Varchar2;
                    oparam55[2].Value = be;

                    oparam55[3].Name = ":code";
                    oparam55[3].Type = OracleDbType.Varchar2;
                    oparam55[3].Value = applycode;
                    int n5 = mydbo.ExecuteNonQuery(sql55, oparam55);


                    string sql2 = @"select t3.username
                      from SYS_S_USERINFO t3
                     where t3.usercode = :usercode";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                    oparam13[0].Name = ":usercode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = susercode;
                    DataTable dt = mydbo.GetDataTable(sql2, oparam13);

                    string susername = dt.Rows[0]["username"].ToString();

                    ///修改表里申请是否成功
                    string sql4 = @"update M_C_APPLY t  set t.status='1'where t.applycode=:applycode";
                    OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                    oparam4[0].Name = ":applycode";
                    oparam4[0].Type = OracleDbType.Varchar2;
                    oparam4[0].Value = applycode;
                    int n1 = mydbo.ExecuteNonQuery(sql4, oparam4);
                    ////修改车库状态
                    ///修改表里申请是否成功
                    string sql5 = @"update M_C_GARAGE t set t.carstate = '0', t.code=:code where t.platenumber = :platenumber";
                    OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[2];
                    oparam5[0].Name = ":platenumber";
                    oparam5[0].Type = OracleDbType.Varchar2;
                    oparam5[0].Value = platenumber;

                    oparam5[1].Name = ":code";
                    oparam5[1].Type = OracleDbType.Varchar2;
                    oparam5[1].Value = applycode;
                    int n2 = mydbo.ExecuteNonQuery(sql5, oparam5);
                    string sql7 = @"select t3.username, t3.phonenumber
                                      from SYS_S_USERINFO t3
                                     where t3.usercode = :usercode";
                    OracleDBO.OracleCmdParam[] oparam7 = new OracleDBO.OracleCmdParam[1];
                    oparam7[0].Name = ":usercode";
                    oparam7[0].Type = OracleDbType.Varchar2;
                    oparam7[0].Value = driver;
                    DataTable dt4 = mydbo.GetDataTable(sql7, oparam7);
                    string drivernames = dt4.Rows[0]["username"].ToString();
                    string phone = dt4.Rows[0]["phonenumber"].ToString();
                    /////
                    string sql6 = @"update M_C_PLAYCAR t set t.susername=:susername,t.drivernames=:drivernames,t.phone=:phone where t.applycode=:applycode";
                    OracleDBO.OracleCmdParam[] oparam6 = new OracleDBO.OracleCmdParam[4];
                    oparam6[0].Name = ":susername";
                    oparam6[0].Type = OracleDbType.Varchar2;
                    oparam6[0].Value = susername;

                    oparam6[1].Name = ":applycode";
                    oparam6[1].Type = OracleDbType.Varchar2;
                    oparam6[1].Value = applycode;

                    oparam6[2].Name = ":drivernames";
                    oparam6[2].Type = OracleDbType.Varchar2;
                    oparam6[2].Value = drivernames;

                    oparam6[3].Name = ":phone";
                    oparam6[3].Type = OracleDbType.Varchar2;
                    oparam6[3].Value = phone;
                    int n6 = mydbo.ExecuteNonQuery(sql6, oparam6);


                    DALMessageHandle h = new DALMessageHandle();//推送给司机
                    h.selectnotify8(applycode, playcode, platenumber, susername, ref errmsg);
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
        /// 拒绝派车申请
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SendFalse(string applycode, string reason, string susercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sql1 = @"update M_C_APPLY t  set  t.reason=:reason ,t.status='6' where t.applycode=:applycode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":applycode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = applycode;

                oparam12[1].Name = ":reason";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = reason;

                int n = mydbo.ExecuteNonQuery(sql1, oparam12);


                if (n > 0)
                {

                    string sql2 = @"select t3.username
                      from SYS_S_USERINFO t3
                     where t3.usercode = :usercode";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                    oparam13[0].Name = ":usercode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = susercode;
                    DataTable dt = mydbo.GetDataTable(sql2, oparam13);
                    if (dt.Rows.Count > 0)
                    {
                        string susername = dt.Rows[0]["username"].ToString();

                        ///推送申请成功 （点击立即用车） 
                        ///
                        string sql6 = @"update M_C_PLAYCAR t  set  t.susername=:susername  where t.applycode=:applycode";
                        OracleDBO.OracleCmdParam[] oparam6 = new OracleDBO.OracleCmdParam[2];
                        oparam6[0].Name = ":susername";
                        oparam6[0].Type = OracleDbType.Varchar2;
                        oparam6[0].Value = susername;

                        oparam6[1].Name = ":applycode";
                        oparam6[1].Type = OracleDbType.Varchar2;
                        oparam6[1].Value = applycode;
                        int n6 = mydbo.ExecuteNonQuery(sql6, oparam6);

                    }
                    DALMessageHandle h = new DALMessageHandle();
                    h.selectnotify9(applycode, reason, ref errmsg);
                    //                 ///推送驳回消息
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
        /// 点击立即用车
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool PAppli(string applycode, string begin, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                if (begin == "" || begin == "0")
                {
                    errmsg = "请输入正确的公里数";
                    result = false;
                    return result;
                }

                string sql4 = @"select t.platenumber from M_C_PLAYCAR t where t.applycode=:applycode";
                OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                oparam4[0].Name = ":applycode";
                oparam4[0].Type = OracleDbType.Varchar2;
                oparam4[0].Value = applycode;
                DataTable dt = mydbo.GetDataTable(sql4, oparam4);

                string platenumber = dt.Rows[0]["platenumber"].ToString();
                string sql5 = @"select t.endplay  from M_C_PLAYCAR t where t.platenumber=:platenumber  order by t.endplay desc nulls last";
                OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[1];
                oparam5[0].Name = ":platenumber";
                oparam5[0].Type = OracleDbType.Varchar2;
                oparam5[0].Value = platenumber;
                DataTable dt2 = mydbo.GetDataTable(sql5, oparam5);
                string endplay = dt2.Rows[0]["endplay"].ToString();

                double b111 = 0;
                if (!double.TryParse(endplay, out b111))
                {
                    //失败执行的方法
                    errmsg = "转换" + endplay + "失败";
                }

                double b11 = 0;
                if (!double.TryParse(begin, out b11))
                {
                    //失败执行的方法
                    errmsg = "转换" + begin + "失败";
                }

                bool bo = false;
                double b2 = b111;
                b111 = b111 + 10;//误差5公里
                if (b11 >= b2 || b11 >= b111)
                {
                    bo = true;
                }

                if (bo)
                {
                    string begintime = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
                    string sql1 = @"update m_c_playcar t  set t.begin=:begin , t.begintime=:begintime,  t.carstart = '1' ,t.driver=:driver where t.applycode=:applycode";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[4];
                    oparam12[0].Name = ":applycode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = applycode;

                    oparam12[1].Name = ":begin";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = begin;

                    oparam12[2].Name = ":begintime";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = begintime;

                    oparam12[3].Name = ":driver";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = usercode;

                    int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                    if (n > 0)
                    {

                        string sql11 = @"update M_C_APPLY t  set t.status='2' where t.applycode=:applycode";
                        OracleDBO.OracleCmdParam[] oparam121 = new OracleDBO.OracleCmdParam[1];
                        oparam121[0].Name = ":applycode";
                        oparam121[0].Type = OracleDbType.Varchar2;
                        oparam121[0].Value = applycode;
                        int n1 = mydbo.ExecuteNonQuery(sql11, oparam121);


                        //  推送还车    

                        DALMessageHandle h = new DALMessageHandle();
                        h.selectnotify10(applycode, begin, ref errmsg);
                    }
                }
                else
                {
                    errmsg = "请输入正确的公里数";
                    result = false;
                    return result;
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
        /// 点击还车
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SendReturn(string applycode, string endplay, string returnremark, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                if (endplay == "" || endplay == "0")
                {
                    errmsg = "请输入正确的公里数";
                    result = false;
                    return result;
                }


                string sql7 = @"select t.servicetime, t1.begintime,t1.begin,t1.platenumber
                                  from M_C_APPLY t,M_C_PLAYCAR t1
                                 where t.applycode = :applycode and t.applycode=t1.applycode";
                OracleDBO.OracleCmdParam[] oparam7 = new OracleDBO.OracleCmdParam[1];
                oparam7[0].Name = ":applycode";
                oparam7[0].Type = OracleDbType.Varchar2;
                oparam7[0].Value = applycode;
                DataTable dt4 = mydbo.GetDataTable(sql7, oparam7);
                if (dt4.Rows.Count > 0)
                {
                    string begin = dt4.Rows[0]["begin"].ToString();
                    string p = dt4.Rows[0]["platenumber"].ToString();
                    string b = dt4.Rows[0]["begintime"].ToString();

                    double b111 = 0;
                    if (!double.TryParse(endplay, out b111))
                    {
                        //失败执行的方法
                        errmsg = "转换" + endplay + "失败";
                    }

                    double b11 = 0;
                    if (!double.TryParse(begin, out b11))
                    {
                        //失败执行的方法
                        errmsg = "转换" + begin + "失败";
                    }
                    if (b11 > b111)
                    {
                        errmsg = "请输入正确的公里数";
                        result = false;
                        return result;
                    }

                    double a = b111 - b11;

                    if (a > 2000.0)
                    {

                        errmsg = "请输入正确的公里数";
                        result = false;
                        return result;
                    }


                    DateTime begintime = Convert.ToDateTime(b);
                    DateTime heartbeattime = DateTime.Now;
                    TimeSpan ts = heartbeattime - begintime;
                    double pl = ts.TotalMinutes;
                    string str1 = String.Format("{0:F}", pl);
                    string playtime = ts.Days + "天" + ts.Hours + "小时" + ts.Minutes + "分" + ts.Seconds + "秒";


                    string endtime = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");

                    string sql1 = @"update m_c_playcar t
                               set t.endplay  = :endplay,
                                   t.returnremark = :returnremark,
                                   t.endtime  = :endtime,
                                   t.playtime  = :playtime,
                                   t.carstart = '2',
                                     t.playkm = :playkm,
                                      t.playkmtimes=:playkmtimes
                             where t.applycode = :applycode";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[7];
                    oparam12[0].Name = ":applycode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = applycode;

                    oparam12[1].Name = ":endplay";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = endplay;

                    oparam12[2].Name = ":returnremark";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = returnremark;

                    oparam12[3].Name = ":endtime";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = endtime;

                    oparam12[4].Name = ":playtime";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = playtime;

                    oparam12[5].Name = ":playkm";
                    oparam12[5].Type = OracleDbType.Double;
                    oparam12[5].Value = a;

                    oparam12[6].Name = ":playkmtimes";
                    oparam12[6].Type = OracleDbType.Varchar2;
                    oparam12[6].Value = str1;


                    int n = mydbo.ExecuteNonQuery(sql1, oparam12);

                    if (n > 0)
                    {
                        ///修改车库里车辆状态
                        string sql4 = @"select t.platenumber, t1.usercode
                                from M_C_PLAYCAR t, M_C_APPLY t1
                              where t.applycode = :applycode and t.applycode=t1.applycode";
                        OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[1];
                        oparam4[0].Name = ":applycode";
                        oparam4[0].Type = OracleDbType.Varchar2;
                        oparam4[0].Value = applycode;
                        DataTable dt = mydbo.GetDataTable(sql4, oparam4);
                        if (dt.Rows.Count > 0)
                        {
                            string platenumber = dt.Rows[0]["platenumber"].ToString();
                            string us = dt.Rows[0]["usercode"].ToString();

                            ///修改表里申请是否成功
                            string sql5 = @"update M_C_GARAGE t set t.carstate = '1',t.returntime='',t.starttime='',t.code='' where t.platenumber = :platenumber";
                            OracleDBO.OracleCmdParam[] oparam5 = new OracleDBO.OracleCmdParam[1];
                            oparam5[0].Name = ":platenumber";
                            oparam5[0].Type = OracleDbType.Varchar2;
                            oparam5[0].Value = platenumber;
                            int n2 = mydbo.ExecuteNonQuery(sql5, oparam5);

                            ///修改表里申请是否成功
                            string sql55 = @"update M_C_DRIVER t set t.starts ='1', t.platenumber= '',t.starttime='',t.CODE='' where t.driver =:driver ";
                            OracleDBO.OracleCmdParam[] oparam55 = new OracleDBO.OracleCmdParam[1];
                            oparam55[0].Name = ":driver";
                            oparam55[0].Type = OracleDbType.Varchar2;
                            oparam55[0].Value = usercode;
                            int n5 = mydbo.ExecuteNonQuery(sql55, oparam55);


                            string sql11 = @"update M_C_APPLY t  set t.status='4' where t.applycode=:applycode";
                            OracleDBO.OracleCmdParam[] oparam121 = new OracleDBO.OracleCmdParam[1];
                            oparam121[0].Name = ":applycode";
                            oparam121[0].Type = OracleDbType.Varchar2;
                            oparam121[0].Value = applycode;
                            int n1 = mydbo.ExecuteNonQuery(sql11, oparam121);



                            ////   推送申请人还车成功！（审核人，）

                            DALMessageHandle h = new DALMessageHandle();
                            h.selectnotify12(applycode, us, ref errmsg);
                        }
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


        /// <summary>
        /// 姓名
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApplyCar(string applycode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region
                string sql2 = @"select t.applycode,
                                   t.accent,
                                   t.applyname,
                                   t.department,
                                   t.proposernomber,
                                   t.endsite,
                                   t.purpose
                              from M_C_APPLY t
                             where t.applycode =:applycode";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":applycode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = applycode;

                dt = mydbo.GetDataTable(sql2, oparam13);
                #endregion

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
        /// 还车查询
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetEndApply(string applycode, string usercode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sql22 = @"select t.usercode
                              from sys_s_userinfo t
                             where t.position = '司机'
                               and t.usercode =:usercode";
                OracleDBO.OracleCmdParam[] oparam132 = new OracleDBO.OracleCmdParam[1];
                oparam132[0].Name = ":usercode";
                oparam132[0].Type = OracleDbType.Varchar2;
                oparam132[0].Value = usercode;
                DataTable dt1 = mydbo.GetDataTable(sql22, oparam132);

                if (dt1.Rows.Count > 0)
                {
                    string sql1 = @"update M_C_PLAYCAR t  set  t.drid='1'";

                    int n = mydbo.ExecuteNonQuery(sql1);
                }
                else
                {
                    string sql1 = @"update M_C_PLAYCAR t  set  t.drid='0'";
                    int n = mydbo.ExecuteNonQuery(sql1);
                }

                #region
                string sql2 = @"select *
                          from M_C_APPLY t
                          left join M_C_PLAYCAR t1
                            on t.applycode = t1.applycode
                         where t.applycode = :applycode";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":applycode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = applycode;

                dt = mydbo.GetDataTable(sql2, oparam13);
                #endregion

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
        /// 车辆使用情况
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUseCar(string platenumber, string plat, string startdate, string datetype, string enddate, string sort, string sortfield, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                string P = "";
                List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();

                #region 排序
                if (sort != "asc")
                {
                    sort = "desc";
                }
                string SortContent = "";
                switch (sortfield)
                {

                    case "车牌号码":
                        SortContent = " t.carnum " + sort;
                        break;
                    case "实际拿车总时长":
                        SortContent = " t.usernum " + sort;
                        break;
                    case "总行驶公里数":
                        SortContent = " t.runnum " + sort;
                        break;
                    case "借车总次数":
                        SortContent = " t.numbernum " + sort;
                        break;
                    case "预约总时长":
                        SortContent = " t.appointime " + sort;
                        break;


                    default:
                        SortContent = " t.carnum " + " asc ";
                        break;

                }

                if (SortContent.Length > 0)
                {
                    SortContent = " order by " + SortContent;
                }

                #endregion


                #region 查询记录总数

                string sql2 = "";
                switch (plat)
                {
                    case "车牌":
                        sql2 = " where  t.platenumber like '%' || :platenumber || '%'";
                        oparam1.Add(OracleDBO.Param("platenumber", platenumber));
                        break;

                    default:
                        sql2 = "";
                        break;
                }

                #endregion

                string sql22 = @"select t.platenumber from M_C_GARAGE t " + sql2 + "";
                DataTable dt1 = mydbo.GetDataTable(sql22, oparam1);
                for (int a = 0; a < dt1.Rows.Count; a++)
                {
                    double q1 = 0.0;
                    double q2 = 0.0;
                    double q3 = 0.0;

                    double q111 = 0.0;
                    double q222 = 0.0;
                    double q333 = 0.0;

                    int totalnum = 0;


                    P = dt1.Rows[a]["platenumber"].ToString();

                    List<OracleDBO.OracleCmdParam> oparam2 = new List<OracleDBO.OracleCmdParam>();


                    #region 查询时间
                    string Datetype = "";
                    switch (datetype)
                    {
                        case "筛选日期":
                            Datetype = " and t.begintime>:begintime and t.endtime<:endtime";
                            oparam2.Add(OracleDBO.Param("begintime", startdate));
                            oparam2.Add(OracleDBO.Param("endtime", enddate));
                            break;
                        default:
                            Datetype = "";
                            break;
                    }
                    #endregion

                    string sql222 = @"select t.playkm, t.playkmtimes, t1.usetime
                                  from M_C_PLAYCAR t, M_C_APPLY t1
                                 where t.platenumber = :platenumber
                                   and t.applycode = t1.applycode" + Datetype + "";
                    oparam2.Add(OracleDBO.Param("platenumber", P));
                    DataTable dt2 = mydbo.GetDataTable(sql222, oparam2);


                    if (dt2.Rows.Count > 0)
                    {
                        for (int b = 0; b < dt2.Rows.Count; b++)
                        {
                            string w1 = dt2.Rows[b]["usetime"].ToString();//预约时长
                            string w2 = dt2.Rows[b]["playkm"].ToString();//还车公里数
                            string w3 = dt2.Rows[b]["playkmtimes"].ToString();//行驶时长

                            if (!double.TryParse(w1, out q1))
                            {
                                //失败执行的方法
                                errmsg = "转换" + w1 + "失败";
                            }

                            if (!double.TryParse(w2, out q2))
                            {
                                //失败执行的方法
                                errmsg = "转换" + w1 + "失败";
                            }
                            if (!double.TryParse(w3, out q3))
                            {
                                //失败执行的方法
                                errmsg = "转换" + w1 + "失败";
                            }
                            q111 += q1;
                            q222 += q2;
                            q333 += q3;
                        }
                        List<OracleDBO.OracleCmdParam> oparam4 = new List<OracleDBO.OracleCmdParam>();
                        string sql4 = @"select COUNT(*) from M_C_PLAYCAR t where t.platenumber=:platenumber";
                        oparam4.Add(OracleDBO.Param("platenumber", P));
                        totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql4, oparam4));

                        q1 = q111 / 60;
                        q3 = q333 / 60;
                        string q33 = String.Format("{0:F}", q3);
                        string q11 = String.Format("{0:F}", q1);

                        List<OracleDBO.OracleCmdParam> oparam3 = new List<OracleDBO.OracleCmdParam>();
                        string sql3 = @"insert into M_C_COLLECT(appointime,carnum,numbernum,runnum,usernum) values(:appointime,:carnum,:numbernum,:runnum,:usernum)";
                        oparam3.Add(OracleDBO.Param("appointime", q11));
                        oparam3.Add(OracleDBO.Param("carnum", P));
                        oparam3.Add(OracleDBO.Param("numbernum", totalnum));//预约次数
                        oparam3.Add(OracleDBO.Param("runnum", q222));
                        oparam3.Add(OracleDBO.Param("usernum", q33));
                        int dt3 = mydbo.ExecuteNonQuery(sql3, oparam3);

                    }
                }

                string sq = @"select *  from M_C_COLLECT t " + SortContent + "";

                dt = mydbo.GetDataTable(sq);

            }
            catch (Exception ex)
            {
                errmsg = ex.Message.ToString();
                result = false;
                LogWriter.WriteLog(ex);
            }
            finally
            {
                string sq1 = @"delete from M_C_COLLECT t";

                int dt3 = mydbo.ExecuteNonQuery(sq1);

                mydbo.Close();



            }
            return result;
        }







        /// <summary>
        /// 车辆明细
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUseCarDetail(string platenumber, string plat, string startdate, string datetype, string enddate, string username, string applyname, string sort, string sortfield, int page, int pagesize, ref int totalnum, ref int pagecount, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();


                #region 排序
                if (sort != "asc")
                {
                    sort = "desc";
                }
                string SortContent = "";
                switch (sortfield)
                {

                    case "车牌号码":
                        SortContent = " t1.platenumber " + sort;
                        break;
                    case "借车人":
                        SortContent = " t.applyname " + sort;
                        break;
                    case "预计用车时间":
                        SortContent = " t.servicetime " + sort;
                        break;
                    case "预计还车时间":
                        SortContent = " t.returntime " + sort;
                        break;
                    case "实际拿车时间":
                        SortContent = " t1.begintime " + sort;
                        break;
                    case "实际还车时间":
                        SortContent = " t1.endtime " + sort;
                        break;
                    case "使用状态":
                        SortContent = " t.status " + sort;
                        break;
                    case "审核人":
                        SortContent = " t1.susername " + sort;
                        break;
                    case "初始公里数":
                        SortContent = " t1.begin " + sort;
                        break;
                    case "还车公里数":
                        SortContent = " t1.endplay " + sort;
                        break;
                    case "行驶总公里数":
                        SortContent = " t1.playkm " + sort;
                        break;
                    case "使用总时长":
                        SortContent = " t1.playtime " + sort;
                        break;

                    default:
                        SortContent = " t1.begintime " + " asc ";
                        break;

                }

                if (SortContent.Length > 0)
                {
                    SortContent = " order by " + SortContent;
                }

                #endregion


                string sql2 = "";
                switch (plat)
                {
                    case "车牌":
                        sql2 = " where  t1.platenumber like '%' || :platenumber || '%'";
                        oparam1.Add(OracleDBO.Param("platenumber", platenumber));
                        break;
                    default:
                        sql2 = " where 1=1 ";
                        break;
                }

                string sql3 = "";
                switch (username)
                {
                    case "借车人":
                        sql3 = " and  t.applyname like '%' || :applyname || '%'";
                        oparam1.Add(OracleDBO.Param("applyname", applyname));
                        break;
                    default:
                        sql3 = "";
                        break;
                }

                #region 查询时间
                string Datetype = "";
                switch (datetype)
                {
                    case "筛选日期":
                        Datetype = " and t1.begintime>:begintime and t1.endtime<:endtime";
                        oparam1.Add(OracleDBO.Param("begintime", startdate));
                        oparam1.Add(OracleDBO.Param("endtime", enddate));
                        break;
                    default:
                        Datetype = "";
                        break;
                }
                #endregion

                string sql1 = @"select count(*) from (select t1.platenumber,
                                                           t.applyname,
                                                           t.servicetime,
                                                           t.returntime,
                                                           t1.begintime,
                                                           t1.endtime,
                                                           t.status,
                                                           t1.susername,
                                                           t1.begin,
                                                           t1.endplay,
                                                           t1.playkm,
                                                           t1.playtime
                                                      from M_C_APPLY t
                                                      left join M_C_PLAYCAR t1
                                                        on t1.applycode = t.applycode " + sql2 + "" + sql3 + "" + Datetype + "" + SortContent + ")";

                totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql1, oparam1));

                #region 统计页数
                if (totalnum == 0)
                {
                    return true;
                }

                if (totalnum % pagesize > 0)
                {
                    pagecount = totalnum / pagesize + 1;
                }
                else
                {
                    pagecount = totalnum / pagesize;
                }

                if (page > pagecount)
                {
                    page = pagecount;
                }

                if (page < 1)
                {
                    page = 1;
                }
                #endregion



                string sql222 = @"select t1.platenumber,
                                                           t.applyname,
                                                           t.servicetime,
                                                           t.returntime,
                                                           t1.begintime,
                                                           t1.endtime,
                                                           t.status,
                                                           t1.susername,
                                                           t1.begin,
                                                           t1.endplay,
                                                           t1.playkm,
                                                           t1.playtime
                                                      from M_C_APPLY t
                                                      left join M_C_PLAYCAR t1
                                                        on t1.applycode = t.applycode " + sql2 + "" + sql3 + "" + Datetype + "" + SortContent + "";
                OracleDBO.PagingSQL(ref sql222, ref oparam1, page, pagesize, ref errmsg);
                dt = mydbo.GetDataTable(sql222, oparam1);


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
                /// 延时还车
                /// </summary>
                /// <param name="rolecode">角色代码</param>
                /// <param name="dt">返回列表：

                /// </param>
                /// <param name="errmsg">出错时返回的错误提示信息</param>
                /// <returns>是否成功执行</returns>
         public bool DelayedCar(string applycode, string delayedtime,ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sql1 = @"update M_C_PLAYCAR t  set t.delayedtime=:delayedtime  where t.applycode=:applycode";
                   OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                    oparam13[0].Name = ":applycode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = applycode;

                    oparam13[1].Name = ":delayedtime";
                    oparam13[1].Type = OracleDbType.Varchar2;
                    oparam13[1].Value = delayedtime;
                    int n = mydbo.ExecuteNonQuery(sql1, oparam13);
              
                if(n>0)
                {
                    //推送延时还车通知
                    //推送
                    DALMessageHandle h = new DALMessageHandle();
                    h.selectnotify50(applycode, delayedtime, ref errmsg);
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
         /// 重新选择车牌
         /// </summary>
         /// <param name="rolecode">角色代码</param>
         /// <param name="dt">返回列表：
         /// </param>
         /// <param name="errmsg">出错时返回的错误提示信息</param>
         /// <returns>是否成功执行</returns>
         public bool RegainCar(string applycode, string platenumber, string Oldplatenumber, string reremark, ref string errmsg)
         {
             bool result = true;
             OracleDBO mydbo = new OracleDBO();
             mydbo.IsByParamName = true;
             mydbo.IsThrowException = true;
             mydbo.AutoClose = false;
             try
             {

                 //修改车牌
                 string sql1 = @"update M_C_PLAYCAR t  set t.platenumber=:platenumber ,t.reremark=:reremark  where t.applycode=:applycode";
                 OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[3];
                 oparam13[0].Name = ":applycode";
                 oparam13[0].Type = OracleDbType.Varchar2;
                 oparam13[0].Value = applycode;

                 oparam13[1].Name = ":platenumber";
                 oparam13[1].Type = OracleDbType.Varchar2;
                 oparam13[1].Value = platenumber;

                 oparam13[2].Name = ":reremark";
                 oparam13[2].Type = OracleDbType.Varchar2;
                 oparam13[2].Value = reremark;
                 int n = mydbo.ExecuteNonQuery(sql1, oparam13);

                 //查询车库里的信息填入当前选的车辆中
                 string sql2 = @"select t.returntime,t.starttime,t.code  from M_C_GARAGE t where t.platenumber=:platenumber";
                 OracleDBO.OracleCmdParam[] oparam14 = new OracleDBO.OracleCmdParam[1];
                 oparam14[0].Name = ":platenumber";
                 oparam14[0].Type = OracleDbType.Varchar2;
                 oparam14[0].Value = Oldplatenumber;
                 DataTable dt = mydbo.GetDataTable(sql2, oparam14);
                 if (dt.Rows.Count > 0)
                 {
                     string returntime = dt.Rows[0]["returntime"].ToString();
                     string starttime = dt.Rows[0]["starttime"].ToString();
                     string code = dt.Rows[0]["code"].ToString();


                     //修改新车牌状态和信息
                     string sql5 = @"update M_C_GARAGE t  set t.returntime=:returntime ,t.starttime=:starttime ,t.code=:code,t.carstate='0'  where t.platenumber=:platenumber";
                     OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[4];
                     oparam15[0].Name = ":returntime";
                     oparam15[0].Type = OracleDbType.Varchar2;
                     oparam15[0].Value = returntime;

                     oparam15[1].Name = ":starttime";
                     oparam15[1].Type = OracleDbType.Varchar2;
                     oparam15[1].Value = starttime;

                     oparam15[2].Name = ":code";
                     oparam15[2].Type = OracleDbType.Varchar2;
                     oparam15[2].Value = code;

                     oparam15[3].Name = ":platenumber";
                     oparam15[3].Type = OracleDbType.Varchar2;
                     oparam15[3].Value = platenumber;

                     int n2 = mydbo.ExecuteNonQuery(sql5, oparam15);
                 }
                 //清空原来车辆的信息


                 string sql6 = @"update M_C_GARAGE t  set t.returntime='' ,t.starttime='' ,t.code='',t.carstate='1'  where t.platenumber=:platenumber";
                 OracleDBO.OracleCmdParam[] oparam16 = new OracleDBO.OracleCmdParam[1];
                 oparam16[0].Name = ":platenumber";
                 oparam16[0].Type = OracleDbType.Varchar2;
                 oparam16[0].Value = Oldplatenumber;
                 int n3 = mydbo.ExecuteNonQuery(sql6, oparam16);

                //推送
                 DALMessageHandle h = new DALMessageHandle();
                 h.selectnotify30(applycode, platenumber, reremark, ref errmsg);
                 
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

