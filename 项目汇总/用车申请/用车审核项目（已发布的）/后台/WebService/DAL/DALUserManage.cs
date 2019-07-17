using Common;

using DataOperator;
using Entity;
using Entity.Request;
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
        ///填入表（创建表）用不上
        /// </summary>
        //public bool UpdateExT(RequesEX[] ext,string createcode, ref string errmsg)
        //{
        //    bool result = true;
        //    OracleDBO mydbo = new OracleDBO();
        //    mydbo.IsByParamName = true;
        //    mydbo.IsThrowException = true;
        //    mydbo.AutoClose = false;
        //    try
        //    {
        //        for (int i = 0; i < ext.Length; i++)
        //        {
                    
        //            string tablename = ext[i].tablename;
        //            string createname = ext[i].createname;

        //             string sqll12 = @"insert into EX_CREATEATABLE(createcode,tablename,createname) values(:createcode,:tablename:createname)";
        //                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[3];
        //                    oparam12[0].Name = ":createcode";
        //                    oparam12[0].Type = OracleDbType.Varchar2;
        //                    oparam12[0].Value = createcode;

        //                    oparam12[1].Name = ":tablename";
        //                    oparam12[1].Type = OracleDbType.Varchar2;
        //                    oparam12[1].Value = tablename;

        //                    oparam12[2].Name = ":createname";
        //                    oparam12[2].Type = OracleDbType.Varchar2;
        //                    oparam12[2].Value = createname;

        //                    int n = mydbo.ExecuteNonQuery(sqll12, oparam12);
        //        }
        //     }
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

        /// <summary>
        ///填表头入表（表头）
        /// </summary>
        public bool UpdateEx(string Hcode, string pagecode, string hname, string breadth, int nowrow, int nowline, string takerow, string takeline, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sqll3 = @"select * from ex_header t  where   t.pagecode=:pagecode and  Hcode=:Hcode";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                oparam13[0].Name = ":pagecode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = pagecode;

                oparam13[1].Name = ":Hcode";
                oparam13[1].Type = OracleDbType.Varchar2;
                oparam13[1].Value = Hcode;

                DataTable dt3 = mydbo.GetDataTable(sqll3, oparam13);
              
                         //string sqll5 = @"select * from ex_header t  where   t.pagecode=:pagecode and  nowrow=:nowrow and nowline=;nowline";
                         //OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[3];
                         //oparam15[0].Name = ":pagecode";
                         //oparam15[0].Type = OracleDbType.Varchar2;
                         //oparam15[0].Value = pagecode;

                         //oparam15[1].Name = ":nowrow";
                         //oparam15[1].Type = OracleDbType.Int32;
                         //oparam15[1].Value = nowrow;

                         //oparam15[2].Name = ":nowline";
                         //oparam15[2].Type = OracleDbType.Int32;
                         //oparam15[2].Value = nowline;

                         //DataTable dt5 = mydbo.GetDataTable(sqll5, oparam15);

                       
                         if (dt3.Rows.Count > 0)
                         {
                             string sql = @"update ex_header
                                         set hname = :hname,
                                             takerow = :takerow,
                                             takeline = :takeline,
                                             createname = :createname
                                         
                                       where pagecode =:pagecode and 
                                           Hcode=:Hcode ";
                             OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[8];
                             oparam12[0].Name = ":pagecode";
                             oparam12[0].Type = OracleDbType.Varchar2;
                             oparam12[0].Value = pagecode;

                             oparam12[1].Name = ":Hcode";
                             oparam12[1].Type = OracleDbType.Varchar2;
                             oparam12[1].Value = Hcode;

                             oparam12[2].Name = ":hname";
                             oparam12[2].Type = OracleDbType.Varchar2;
                             oparam12[2].Value = hname;

                             oparam12[3].Name = ":takerow";
                             oparam12[3].Type = OracleDbType.Varchar2;
                             oparam12[3].Value = takerow;

                             oparam12[4].Name = ":takeline";
                             oparam12[4].Type = OracleDbType.Varchar2;
                             oparam12[4].Value = takeline;

                             oparam12[5].Name = ":createname";
                             oparam12[5].Type = OracleDbType.Varchar2;
                             oparam12[5].Value = usercode;

                             oparam12[6].Name = ":nowrow";
                             oparam12[6].Type = OracleDbType.Int32;
                             oparam12[6].Value = nowrow;

                             oparam12[7].Name = ":nowline";
                             oparam12[7].Type = OracleDbType.Int32;
                             oparam12[7].Value = nowline;

                             int n1 = mydbo.ExecuteNonQuery(sql, oparam12);
                         }
                         else
                         {
                             string sqll12 = @"insert into ex_header
                                      (pagecode, Hcode, hname, breadth, nowrow, nowline, takerow, takeline,createname)
                                    values
                                      (:pagecode,
                                       :Hcode,
                                       :hname,
                                       :breadth,
                                       :nowrow,
                                       :nowline,
                                       :takerow,
                                       :takeline,:createname)";
                             OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[9];
                             oparam12[0].Name = ":pagecode";
                             oparam12[0].Type = OracleDbType.Varchar2;
                             oparam12[0].Value = pagecode;

                             oparam12[1].Name = ":Hcode";
                             oparam12[1].Type = OracleDbType.Varchar2;
                             oparam12[1].Value = Hcode;

                             oparam12[2].Name = ":hname";
                             oparam12[2].Type = OracleDbType.Varchar2;
                             oparam12[2].Value = hname;

                             oparam12[3].Name = ":breadth";
                             oparam12[3].Type = OracleDbType.Varchar2;
                             oparam12[3].Value = breadth;

                             oparam12[4].Name = ":nowrow";
                             oparam12[4].Type = OracleDbType.Int32;
                             oparam12[4].Value = nowrow;

                             oparam12[5].Name = ":nowline";
                             oparam12[5].Type = OracleDbType.Int32;
                             oparam12[5].Value = nowline;

                             oparam12[6].Name = ":takerow";
                             oparam12[6].Type = OracleDbType.Varchar2;
                             oparam12[6].Value = takerow;

                             oparam12[7].Name = ":takeline";
                             oparam12[7].Type = OracleDbType.Varchar2;
                             oparam12[7].Value = takeline;

                             oparam12[8].Name = ":createname";
                             oparam12[8].Type = OracleDbType.Varchar2;
                             oparam12[8].Value = usercode;

                             int n = mydbo.ExecuteNonQuery(sqll12, oparam12);
                         
                               
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
        ///添加行
        /// </summary>
//        public bool UpdateExRc(字段值数组[] rqc, ref string errmsg)
//        {
//            bool result = true;
//            OracleDBO mydbo = new OracleDBO();
//            mydbo.IsByParamName = true;
//            mydbo.IsThrowException = true;
//            mydbo.AutoClose = false;
//            int A = 0;
//            try
//            {


//                for (int i = 0; i < rqc.Length; i++)
//                {
//                    string pagecode = rqc[i].pagecode;
//                    //string sqll3 = @"select t.nowrow  from M_P_EXCEL_CONTENT t  where  t.pagecode=:pagecode order   by  t.nowrow desc";
//                    //OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
//                    //oparam13[0].Name = ":pagecode";
//                    //oparam13[0].Type = OracleDbType.Varchar2;
//                    //oparam13[0].Value = pagecode; 
//                    //  DataTable dt3 = mydbo.GetDataTable(sqll3, oparam13);
//                    //  if (dt3.Rows.Count > 0) { 
//                    //    string  no = dt3.Rows[0]["nowrow"].ToString();
//                    //    A = Convert.ToInt32(no);
//                    //   }
                     
//                    //    int nowrow = A + 1;
//                       string nowrow = rqc[i].nowrow;
//                        string content = rqc[i].content;                                     
//                        string nowline = rqc[i].nowline;               
//                        string usercode = rqc[i].usercode;
//                        string hcode = rqc[i].hcode;
                      
//                        string sqll12 = @"insert into M_P_EXCEL_CONTENT
//                                      (pagecode, content, nowrow, nowline, hcode, createname)
//                                    values
//                                      (:pagecode, :content, :nowrow, :nowline, :hcode, :createname)";
//                            OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[6];
//                            oparam12[0].Name = ":pagecode";
//                            oparam12[0].Type = OracleDbType.Varchar2;
//                            oparam12[0].Value = pagecode;

//                            oparam12[1].Name = ":content";
//                            oparam12[1].Type = OracleDbType.Varchar2;
//                            oparam12[1].Value = content;

//                            oparam12[2].Name = ":nowrow";
//                            oparam12[2].Type = OracleDbType.Varchar2;
//                            oparam12[2].Value = nowrow;

//                            oparam12[3].Name = ":nowline";
//                            oparam12[3].Type = OracleDbType.Varchar2;
//                            oparam12[3].Value = nowline;

//                            oparam12[4].Name = ":hcode";
//                            oparam12[4].Type = OracleDbType.Varchar2;
//                            oparam12[4].Value = hcode;

//                            oparam12[5].Name = ":createname";
//                            oparam12[5].Type = OracleDbType.Varchar2;
//                            oparam12[5].Value = usercode;

                       
//                            int n = mydbo.ExecuteNonQuery(sqll12, oparam12);

//                            if (i == rqc.Length - 1)
//                            {

//                                #region 查询上一级d的id
//                                string sql5 = @"select t1.wxopenid,t2.username,t3.pagename
//                                                  from M_P_EXCEL_PASS t, SYS_S_USER t1, SYS_S_USERINFO t2 ,EX_EXPAGE t3 
//                                                 where t.sort = '1'
//                                                   and t.pagecode = :pagecode
//                                                   and t.createname = t1.usercode
//                                                   and t1.usercode=t2.usercode
//                                                   and t.pagecode=t3.pagecode";
//                                OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[1];
//                                oparam15[0].Name = ":pagecode";
//                                oparam15[0].Type = OracleDbType.Varchar2;
//                                oparam15[0].Value = pagecode;
//                                DataTable dt3 = mydbo.GetDataTable(sql5, oparam15);
//                                if (dt3.Rows.Count > 0)
//                                {
//                                #endregion
//                                    for (int j = 0; j < dt3.Rows.Count; j++)
//                                    {
//                                        string wxopenid = dt3.Rows[j]["wxopenid"].ToString();
//                                        string username = dt3.Rows[j]["username"].ToString();
//                                        string pagename = dt3.Rows[j]["pagename"].ToString();
//                                        ///推送第一审人
//                                        DALMessageHandle d = new DALMessageHandle();
//                                       // d.SendyudingdangNotify(WXApiInfo.wxappid, wxopenid, username, pagename, DateTime.Now + "", usercode, ref  errmsg);
//                                    }
//                                }

//                            }
                 
//                }
                             
                        
                
//            }
//            catch (Exception ex)
//            {
//                errmsg = ex.Message.ToString();
//                result = false;
//                LogWriter.WriteLog(ex);
//            }
//            finally
//            {
//                mydbo.Close();
//            }
//            return result;

//        }

        /// <summary>
        ///添加行2
        /// </summary>//Hcode, pagecode, content, line, nowrow, nowline, usercode, ref errmsg);
        public bool UpdateExRc(string hcode, string pagecode, string content, string nowrow, string nowline, string usercode,int aaa, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            
            try
            {
                mydbo.BeginTransaction();
                string sqll3 = @"select * from M_P_EXCEL_CONTENT t where t.pagecode=:pagecode and t.hcode=:hcode and t.nowrow=:nowrow and t.nowline=:nowline";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[4];
                oparam13[0].Name = ":pagecode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = pagecode;

                oparam13[1].Name = ":hcode";
                oparam13[1].Type = OracleDbType.Varchar2;
                oparam13[1].Value = hcode;


                oparam13[2].Name = ":nowrow";
                oparam13[2].Type = OracleDbType.Varchar2;
                oparam13[2].Value = nowrow;

                oparam13[3].Name = ":nowline";
                oparam13[3].Type = OracleDbType.Varchar2;
                oparam13[3].Value = nowline;

                DataTable dt3 = mydbo.GetDataTable(sqll3, oparam13);
                if (dt3.Rows.Count > 0)
                {

                    string sqll12 = @"update M_P_EXCEL_CONTENT
                                       set content = :content
                                     where pagecode = :pagecode
                                       and hcode = :hcode
                                       and nowrow = :nowrow
                                       and nowline = :nowline";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[5];
                    oparam12[0].Name = ":pagecode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = pagecode;

                    oparam12[1].Name = ":content";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = content;

                    oparam12[2].Name = ":nowrow";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = nowrow;

                    oparam12[3].Name = ":nowline";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = nowline;

                    oparam12[4].Name = ":hcode";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = hcode;

                    //oparam12[5].Name = ":createname";
                    //oparam12[5].Type = OracleDbType.Varchar2;
                    //oparam12[5].Value = usercode;


                    int n = mydbo.ExecuteNonQuery(sqll12, oparam12);

                }
                else
                {
                    string sqll12 = @"insert into M_P_EXCEL_CONTENT
                                      (pagecode, content, nowrow, nowline, hcode, createname)
                                    values
                                      (:pagecode, :content, :nowrow, :nowline, :hcode, :createname)";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[6];
                    oparam12[0].Name = ":pagecode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = pagecode;

                    oparam12[1].Name = ":content";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = content;

                    oparam12[2].Name = ":nowrow";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = nowrow;

                    oparam12[3].Name = ":nowline";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = nowline;

                    oparam12[4].Name = ":hcode";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = hcode;

                    oparam12[5].Name = ":createname";
                    oparam12[5].Type = OracleDbType.Varchar2;
                    oparam12[5].Value = usercode;

                    int n = mydbo.ExecuteNonQuery(sqll12, oparam12);

                    if (n > 0)
                    {
                        List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();
                        string sql2 = @"select m.tablename tablename  from excle_tablestorage m where m.pagecode = :pagecode";
                        oparam1.Add(OracleDBO.Param("pagecode", pagecode));
                        DataTable dt2 = mydbo.GetDataTable(sql2, oparam1);

                        if (dt2.Rows.Count > 0)
                        {
                            //List<OracleDBO.OracleCmdParam> oparam66 = new List<OracleDBO.OracleCmdParam>();
                            //string sql66 = @"select m.effectivename effectivename  from m_p_excel_effective m where m.pagecode = :pagecode and m.hcode=:hcode";
                            //oparam66.Add(OracleDBO.Param("pagecode", pagecode));
                            //oparam66.Add(OracleDBO.Param("hcode", hcode));
                            //DataTable dt66 = mydbo.GetDataTable(sql66, oparam66);

                            List<OracleDBO.OracleCmdParam> oparam88 = new List<OracleDBO.OracleCmdParam>();
                            string sql4 = @"select m.sequences sequences  from " + dt2.Rows[0]["tablename"] + " m where m.sequences = :nowrow";
                            oparam88.Add(OracleDBO.Param("nowrow", nowrow));
                            DataTable dt4 = mydbo.GetDataTable(sql4, oparam88);

                            if (dt4.Rows.Count > 0)
                            {
                                string sql22 = @"update " + dt2.Rows[0]["tablename"] + @" t set t." + hcode + " = :content where t.sequences = :sequences";
                                OracleDBO.OracleCmdParam[] oparam99 = new OracleDBO.OracleCmdParam[2];
                                oparam99[0].Name = ":content";
                                oparam99[0].Type = OracleDbType.Varchar2;
                                oparam99[0].Value = content;
                                oparam99[1].Name = ":sequences";
                                oparam99[1].Type = OracleDbType.Varchar2;
                                oparam99[1].Value = nowrow;
                                mydbo.ExecuteNonQuery(sql22, oparam99);
                            }
                            else
                            {
                                string sql22 = @"insert into " + dt2.Rows[0]["tablename"] + @"
                                      (" + hcode + @",sequences)
                                    values
                                      (:content,:sequences)";
                                OracleDBO.OracleCmdParam[] oparam99 = new OracleDBO.OracleCmdParam[2];
                                oparam99[0].Name = ":content";
                                oparam99[0].Type = OracleDbType.Varchar2;
                                oparam99[0].Value = content;
                                oparam99[1].Name = ":sequences";
                                oparam99[1].Type = OracleDbType.Varchar2;
                                oparam99[1].Value = nowrow;
                                mydbo.ExecuteNonQuery(sql22, oparam99);
                            } 
                        }
                        
                    }



                    if (aaa == 1)
                    {
                        #region 查询上一级d的id
                        string sql5 = @"select t1.wxopenid,t2.username,t3.pagename
                                                  from M_P_EXCEL_PASS t, SYS_S_USER t1, SYS_S_USERINFO t2 ,EX_EXPAGE t3 
                                                 where t.sort = '1'
                                                   and t.pagecode = :pagecode
                                                   and t.createname = t1.usercode
                                                   and t1.usercode=t2.usercode
                                                   and t.pagecode=t3.pagecode";
                        OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[1];
                        oparam15[0].Name = ":pagecode";
                        oparam15[0].Type = OracleDbType.Varchar2;
                        oparam15[0].Value = pagecode;
                        DataTable dt333 = mydbo.GetDataTable(sql5, oparam15);
                        if (dt333.Rows.Count > 0)
                        {
                        #endregion
                            for (int j = 0; j < dt333.Rows.Count; j++)
                            {
                                string wxopenid = dt333.Rows[j]["wxopenid"].ToString();
                                string username = dt333.Rows[j]["username"].ToString();
                                string pagename = dt333.Rows[j]["pagename"].ToString();
                                ///推送第一审人
                                DALMessageHandle d = new DALMessageHandle();
                                d.SendyudingdangNotify(WXApiInfo.wxappid, wxopenid, username, pagename, DateTime.Now + "", usercode, ref  errmsg);
                            }
                        }

                    }

                }

               


                mydbo.Commit();

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


        //删除行
        //
        public bool deleteRow(string nowrow,string pagecode,string usercode,ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
        //    bool end = false;
            try
            {

//                string sql2 = @"select t1.autcode
//                              from EX_AUT t1, SYS_S_USER t2
//                             where t1.pagecode =:pagecode and t2.usercode = :createname and t2.rolecode = t1.rolecode";
//                OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[2];
//                oparam2[0].Name = ":pagecode";
//                oparam2[0].Type = OracleDbType.Varchar2;
//                oparam2[0].Value = pagecode;

//                oparam2[1].Name = ":createname";
//                oparam2[1].Type = OracleDbType.Varchar2;
//                oparam2[1].Value = usercode;

//                DataTable dt1 = mydbo.GetDataTable(sql2, oparam2);
//                for (int qq = 0; qq < dt1.Rows.Count; qq++)
//                {
//                    if (dt1.Rows[qq]["autcode"].ToString() == "P003")
//                    {
//                        end = true;
//                    }
//                }

//                if (!end)
//                {


//                    string sqll = @"select t1.createname
//                              from ex_content t1
//                             where t1.pagecode =:pagecode and t1.nowrow=:nowrow";
//                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
//                    oparam1[0].Name = ":pagecode";
//                    oparam1[0].Type = OracleDbType.Varchar2;
//                    oparam1[0].Value = pagecode;

//                    oparam1[1].Name = ":nowrow";
//                    oparam1[1].Type = OracleDbType.Varchar2;
//                    oparam1[1].Value = nowrow;

//                    DataTable dt = mydbo.GetDataTable(sqll, oparam1);

//                    for (int q = 0; q < dt.Rows.Count; q++)
//                    {
//                        if (dt.Rows[q]["createname"].ToString() == usercode)
//                        {
//                            end = true;

//                        }
//                    }
//                }

//                if (end)
//                {

              
                //}
                //else {
                //    errmsg = "您没有权限删除这行哦！";//允许
                //    result = false;
                //}


                mydbo.BeginTransaction();

                    #region 获取已有的数据
                    string sql1 = @"select t.content, t.nowline, t.hcode
                                      from M_P_EXCEL_CONTENT t
                                     where t.pagecode = :pagecode
                                       and t.nowrow = :nowrow";
                    OracleDBO.OracleCmdParam[] oparam111 = new OracleDBO.OracleCmdParam[2];
                    oparam111[0].Name = ":pagecode";
                    oparam111[0].Type = OracleDbType.Varchar2;
                    oparam111[0].Value = pagecode;

                    oparam111[1].Name = ":nowrow";
                    oparam111[1].Type = OracleDbType.Varchar2;
                    oparam111[1].Value = nowrow;
                    DataTable dt1 = mydbo.GetDataTable(sql1, oparam111);
                    #endregion
                    if (dt1.Rows.Count > 0)
                    {
                        string content = dt1.Rows[0]["content"].ToString();
                        string nowline = dt1.Rows[0]["nowline"].ToString();
                        string hcode = dt1.Rows[0]["hcode"].ToString();
                    
                    
                //删除日志
                    string sql2 = @"insert into M_P_EXCEL_CONTENTLOG
                                      (pagecode, hcode, nowrow, content, createname)
                                    values
                                      (:pagecode, :hcode, :nowrow, :content, :createname)";
                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[5];
                    oparam12[0].Name = ":pagecode";
                    oparam12[0].Type = OracleDbType.Varchar2;
                    oparam12[0].Value = pagecode;

                    oparam12[1].Name = ":hcode";
                    oparam12[1].Type = OracleDbType.Varchar2;
                    oparam12[1].Value = hcode;

                    oparam12[2].Name = ":nowrow";
                    oparam12[2].Type = OracleDbType.Varchar2;
                    oparam12[2].Value = nowrow;

                    oparam12[3].Name = ":content";
                    oparam12[3].Type = OracleDbType.Varchar2;
                    oparam12[3].Value = content;

                    oparam12[4].Name = ":createname";
                    oparam12[4].Type = OracleDbType.Varchar2;
                    oparam12[4].Value = usercode;
                    int n2 = mydbo.ExecuteNonQuery(sql2, oparam12);
                  }


                    string sqll12 = @"delete from M_P_EXCEL_CONTENT t   where t.nowrow=:nowrow  and  t.pagecode=:pagecode";
                    OracleDBO.OracleCmdParam[] oparam3 = new OracleDBO.OracleCmdParam[2];
                    oparam3[0].Name = ":nowrow";
                    oparam3[0].Type = OracleDbType.Varchar2;
                    oparam3[0].Value = nowrow;

                    oparam3[1].Name = ":pagecode";
                    oparam3[1].Type = OracleDbType.Varchar2;
                    oparam3[1].Value = pagecode;
                    int n = mydbo.ExecuteNonQuery(sqll12, oparam3);

                    if (n > 0)
                    {
                        List<OracleDBO.OracleCmdParam> oparam33 = new List<OracleDBO.OracleCmdParam>();
                        string sql2 = @"select m.tablename tablename  from excle_tablestorage m where m.pagecode = :pagecode";
                        oparam33.Add(OracleDBO.Param("pagecode", pagecode));
                        DataTable dt2 = mydbo.GetDataTable(sql2, oparam33);

                        if (dt2.Rows.Count > 0)
                        {
                           
                            string sql22 = @"delete from " + dt2.Rows[0]["tablename"] + @" t where t.sequences = :sequences";
                            OracleDBO.OracleCmdParam[] oparam99 = new OracleDBO.OracleCmdParam[1];
                            oparam99[0].Name = ":sequences";
                            oparam99[0].Type = OracleDbType.Varchar2;
                            oparam99[0].Value = nowrow;
                            mydbo.ExecuteNonQuery(sql22, oparam99);
                            
                        }

                    }

                    string sql = @"delete from M_P_EXCEL_AUDIT t   where t.nowrows=:nowrows  and  t.pagecode=:pagecode";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                    oparam1[0].Name = ":nowrows";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = nowrow;

                    oparam1[1].Name = ":pagecode";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = pagecode;
                    int n1 = mydbo.ExecuteNonQuery(sql, oparam1);

                   

                    mydbo.Commit();
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


        //编辑行
        //
//        public bool updateRow(RequesRow[] ext, ref string errmsg)
//        {
//            bool result = true;
//            OracleDBO mydbo = new OracleDBO();
//            mydbo.IsByParamName = true;
//            mydbo.IsThrowException = true;
//            mydbo.AutoClose = false;
//            bool end = false;
//            try
//            {
//                for (int i = 0; i < ext.Length; i++)
//                {

//                    string nowrow = ext[i].nowrow;

//                    string pagecode = ext[i].pagecode;

//                    string content = ext[i].content;

//                    //string nowline = ext[i].nowline;

//                    //string hname = ext[i].hname;

//                    //string takerow = ext[i].takerow;

//                    //string takeline = ext[i].takeline;

//                    string usercode = ext[i].usercode;

//                    string sqll12 = @"select t1.autcode
//                              from EX_AUT t1, SYS_S_USER t2
//                             where t1.pagecode =:pagecode and t2.usercode = :usercode and t2.rolecode = t1.rolecode";
//                    OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
//                    oparam12[0].Name = ":pagecode";
//                    oparam12[0].Type = OracleDbType.Varchar2;
//                    oparam12[0].Value = pagecode;

//                    oparam12[1].Name = ":createname";
//                    oparam12[1].Type = OracleDbType.Varchar2;
//                    oparam12[1].Value = usercode;

//                    DataTable dt1 = mydbo.GetDataTable(sqll12, oparam12);
//                    for (int qq = 0; qq < dt1.Rows.Count;  qq++) { 
//                        if (dt1.Rows[0]["autcode"].ToString() == "P002")
//                        {
//                            end = true;
//                     }
//              }




//                    if (end)
//                    {
//                        string sql2 = @"update ex_content t1
//                                           set t1.content = :content, t1.createname = :createname
//                                         where t1.pagecode = :pagecode
//                                           and t1.nowrow = :nowrow";
//                        OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[4];
//                        oparam1[0].Name = ":pagecode";
//                        oparam1[0].Type = OracleDbType.Varchar2;
//                        oparam1[0].Value = pagecode;

//                        oparam1[1].Name = ":nowrow";
//                        oparam1[1].Type = OracleDbType.Varchar2;
//                        oparam1[1].Value = nowrow;

//                        oparam1[2].Name = ":content";
//                        oparam1[2].Type = OracleDbType.Varchar2;
//                        oparam1[2].Value = content;

//                        oparam1[3].Name = ":createname";
//                        oparam1[3].Type = OracleDbType.Varchar2;
//                        oparam1[3].Value = usercode;

//                        //oparam1[4].Name = ":takeline";
//                        //oparam1[4].Type = OracleDbType.Varchar2;
//                        //oparam1[4].Value = takeline;

//                        //oparam1[5].Name = ":createname";
//                        //oparam1[5].Type = OracleDbType.Varchar2;
//                        //oparam1[5].Value = usercode;

//                        //oparam1[6].Name = ":hname";
//                        //oparam1[6].Type = OracleDbType.Varchar2;
//                        //oparam1[6].Value = hname;

//                        int n = mydbo.ExecuteNonQuery(sql2, oparam1);
//                    }

//                    else
//                    {
//                        errmsg = "不能随意修改别人的数据哦！";
//                        result = false;
//                    }

//                }
//            }
//            catch (Exception ex)
//            {
//                errmsg = ex.Message.ToString();
//                result = false;
//                LogWriter.WriteLog(ex);
//            }
//            finally
//            {
//                mydbo.Close();
//            }
//            return result;

//        }

        /// <summary>
        /// 编辑表名
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool RoleAuthority(string rolecode, List<RequestRoleAuthorityPage> rolepage, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.BeginTransaction();
            try
            {
                #region 获取已有的页面权限
                string sql1 = @"select t.rolecode, t.pagecode
                                  from ex_rolepages t
                                 where t.rolecode = :rolecode";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":rolecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = rolecode;

                DataTable dt1 = mydbo.GetDataTable(sql1, oparam1);
                #endregion

                #region 删除旧的页面权限
                string sql2 = @"delete from ex_rolepages t where t.rolecode = :rolecode";
                OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[1];
                oparam2[0].Name = ":rolecode";
                oparam2[0].Type = OracleDbType.Varchar2;
                oparam2[0].Value = rolecode;

                int n = mydbo.ExecuteNonQuery(sql2, oparam2);
                #endregion

                for (int i = 0; i < rolepage.Count; i++)
                {
                    string pagecode = rolepage[i].pagecode;

                    #region 添加页面权限
                    string sql3 = @"insert into ex_rolepages
                                      (rolecode, pagecode)
                                    values
                                      (:rolecode, :pagecode)";
                    OracleDBO.OracleCmdParam[] oparam3 = new OracleDBO.OracleCmdParam[2];
                    oparam3[0].Name = ":rolecode";
                    oparam3[0].Type = OracleDbType.Varchar2;
                    oparam3[0].Value = rolecode;

                    oparam3[1].Name = ":pagecode";
                    oparam3[1].Type = OracleDbType.Varchar2;
                    oparam3[1].Value = pagecode;

                    n = mydbo.ExecuteNonQuery(sql3, oparam3);
                    #endregion
                }



                #region 更新角色最后更新时间
                string sql4 = @"update sys_s_role t
                                   set t.updatetime = :updatetime, t.updateusercode = :updateusercode
                                 where t.rolecode = :rolecode";
                OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[3];
                oparam4[0].Name = ":updatetime";
                oparam4[0].Type = OracleDbType.Date;
                oparam4[0].Value = DateTime.Now;

                oparam4[1].Name = ":updateusercode";
                oparam4[1].Type = OracleDbType.Varchar2;
                oparam4[1].Value = usercode;

                oparam4[2].Name = ":rolecode";
                oparam4[2].Type = OracleDbType.Varchar2;
                oparam4[2].Value = rolecode;

                n = mydbo.ExecuteNonQuery(sql4, oparam4);
                #endregion

                string old_pagecode = "";//修改前的页面代码
                for (int i = 0; i < dt1.Rows.Count; i++)
                {
                    if (i == 0)
                    {
                        old_pagecode = dt1.Rows[i]["pagecode"].ToString();
                    }
                    else
                    {
                        old_pagecode += "," + dt1.Rows[i]["pagecode"].ToString();
                    }
                }

                string new_pagecode = "";//新页面代码
                for (int i = 0; i < rolepage.Count; i++)
                {
                    if (i == 0)
                    {
                        new_pagecode = rolepage[i].pagecode;
                    }
                    else
                    {
                        new_pagecode += "," + rolepage[i].pagecode;
                    }
                }

                //DALLogManage mydal = new DALLogManage();
                //mydal.AddSysLog(usercode, "微信角色页面授权", "m_wx_rolepage", "rolecode/pagecode", "角色代码/页面代码", rolecode + "/" + old_pagecode, rolecode + "/" + new_pagecode, ref errmsg);

                mydbo.Commit();
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
        /// 编辑表权限
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        /// 
        //pagecode
        //autcode
        public bool RoleAu(string pagecode, List<RequestRolePage> rolepage, string usercode, string rolecode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.BeginTransaction();
            try
            {
                #region 获取已有的页面权限
                string sql1 = @"select t.pagecode, t.autcode ,t.rolecode
                                  from ex_aut t
                                 where t.pagecode = :pagecode and t.rolecode =:rolecode ";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                oparam1[0].Name = ":pagecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = pagecode;

                oparam1[1].Name = ":rolecode";
                oparam1[1].Type = OracleDbType.Varchar2;
                oparam1[1].Value = rolecode;

                DataTable dt1 = mydbo.GetDataTable(sql1, oparam1);
                #endregion

                #region 删除旧的页面权限
                string sql2 = @"delete from ex_aut t where t.pagecode = :pagecode and t.rolecode =:rolecode ";
                OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[2];
                oparam2[0].Name = ":pagecode";
                oparam2[0].Type = OracleDbType.Varchar2;
                oparam2[0].Value = pagecode;

                oparam2[1].Name = ":rolecode";
                oparam2[1].Type = OracleDbType.Varchar2;
                oparam2[1].Value = rolecode;
        
                int n = mydbo.ExecuteNonQuery(sql2, oparam2);
                #endregion

                for (int i = 0; i < rolepage.Count; i++)
                {
                    string autcode = rolepage[i].autcode;

                    #region 添加页面权限
                    string sql3 = @"insert into ex_aut
                                      (pagecode, autcode,rolecode)
                                    values
                                      (:pagecode, :autcode,:rolecode)";
                    OracleDBO.OracleCmdParam[] oparam3 = new OracleDBO.OracleCmdParam[3];
                    oparam3[0].Name = ":pagecode";
                    oparam3[0].Type = OracleDbType.Varchar2;
                    oparam3[0].Value = pagecode;

                    oparam3[1].Name = ":autcode";
                    oparam3[1].Type = OracleDbType.Varchar2;
                    oparam3[1].Value = autcode;

                    oparam3[2].Name = ":rolecode";
                    oparam3[2].Type = OracleDbType.Varchar2;
                    oparam3[2].Value = rolecode;

                    n = mydbo.ExecuteNonQuery(sql3, oparam3);
                    #endregion
                }



                #region 更新角色最后更新时间
                string sql4 = @"update sys_s_role t
                                   set t.updatetime = :updatetime, t.updateusercode = :updateusercode
                                 where t.rolecode = :rolecode ";
                OracleDBO.OracleCmdParam[] oparam4 = new OracleDBO.OracleCmdParam[3];
                oparam4[0].Name = ":updatetime";
                oparam4[0].Type = OracleDbType.Date;
                oparam4[0].Value = DateTime.Now;

                oparam4[1].Name = ":updateusercode";
                oparam4[1].Type = OracleDbType.Varchar2;
                oparam4[1].Value = usercode;

                oparam4[2].Name = ":rolecode";
                oparam4[2].Type = OracleDbType.Varchar2;
                oparam4[2].Value = rolecode;


                n = mydbo.ExecuteNonQuery(sql4, oparam4);
                #endregion

                string old_pagecode = "";//修改前的页面代码
                for (int i = 0; i < dt1.Rows.Count; i++)
                {
                    if (i == 0)
                    {
                        old_pagecode = dt1.Rows[i]["autcode"].ToString();
                    }
                    else
                    {
                        old_pagecode += "," + dt1.Rows[i]["autcode"].ToString();
                    }
                }

                string new_pagecode = "";//新页面代码
                for (int i = 0; i < rolepage.Count; i++)
                {
                    if (i == 0)
                    {
                        new_pagecode = rolepage[i].autcode;
                    }
                    else
                    {
                        new_pagecode += "," + rolepage[i].autcode;
                    }
                }

                //DALLogManage mydal = new DALLogManage();
                //mydal.AddSysLog(usercode, "微信角色页面授权", "m_wx_rolepage", "rolecode/pagecode", "角色代码/页面代码", rolecode + "/" + old_pagecode, rolecode + "/" + new_pagecode, ref errmsg);

                mydbo.Commit();
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
        /// 添加EXCLE表名
        /// </summary>
        /// <param name="pagecode">页面代码</param>
        /// <param name="pagename">页面名称</param>
        /// <param name="ico">页面图标</param>
        /// <param name="pageurl">页面链接</param>
        /// <param name="pagesort">页面排序</param>
        /// <param name="isshow">是否显示</param>
        /// <param name="superior">上级页面代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool addPage(string pagecode, string pagename, string usercode,审核用户[] ad, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                mydbo.BeginTransaction();
                #region  添加EXCLE表名
                string sql1 = @"insert into ex_expage
                                  (pagecode, pagename,usercode)
                                values
                                  (:pagecode, :pagename,:usercode)";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[3];
                oparam1[0].Name = ":pagecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = pagecode;

                oparam1[1].Name = ":pagename";
                oparam1[1].Type = OracleDbType.Varchar2;
                oparam1[1].Value = pagename;

                oparam1[2].Name = ":usercode";
                oparam1[2].Type = OracleDbType.Varchar2;
                oparam1[2].Value = usercode;

                int n = mydbo.ExecuteNonQuery(sql1, oparam1);
                #endregion
              
                    for (int i = 0; i < ad.Length; i++)
                    {

                        string createname = ad[i].createname;

                        string sort = ad[i].sort;

                        string markt = ad[i].markt;
                     
                        string sql2 = @"insert into M_P_EXCEL_AUD
                                              (pagecode,
                                               sort
                                               )
                                            values
                                              (:pagecode, :sort)";
                        OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[2];
                        oparam2[0].Name = ":pagecode";
                        oparam2[0].Type = OracleDbType.Varchar2;
                        oparam2[0].Value = pagecode;

                        oparam2[1].Name = ":sort";
                        oparam2[1].Type = OracleDbType.Varchar2;
                        oparam2[1].Value = sort;
                      
                        int n2 = mydbo.ExecuteNonQuery(sql2, oparam2);


                        string sql3 = @"insert into M_P_EXCEL_PASS
                                      (pagecode, sort, usercode, createname, markt )
                                    values
                                      (:pagecode, :sort, :usercode, :createname, :markt)";
                        OracleDBO.OracleCmdParam[] oparam3 = new OracleDBO.OracleCmdParam[5];
                        oparam3[0].Name = ":pagecode";
                        oparam3[0].Type = OracleDbType.Varchar2;
                        oparam3[0].Value = pagecode;

                        oparam3[1].Name = ":sort";
                        oparam3[1].Type = OracleDbType.Varchar2;
                        oparam3[1].Value = sort;

                        oparam3[2].Name = ":usercode";
                        oparam3[2].Type = OracleDbType.Varchar2;
                        oparam3[2].Value = usercode;

                        oparam3[3].Name = ":createname";
                        oparam3[3].Type = OracleDbType.Varchar2;
                        oparam3[3].Value = createname;

                        oparam3[4].Name = ":markt";
                        oparam3[4].Type = OracleDbType.Varchar2;
                        oparam3[4].Value = markt;

                        int n3 = mydbo.ExecuteNonQuery(sql3, oparam3);
                    }

                    string sql55 = @"select max(to_number(tb.sorting)) sorting from excle_tablestorage tb";
                    DataTable dt = mydbo.GetDataTable(sql55);


                    int sort1 = 0;

                    string sort11 = dt.Rows[0]["sorting"].ToString();

                    if (!int.TryParse(sort11, out sort1))
                    {
                        sort1 = 0;
                    }

                    OracleDBO.OracleCmdParam[] oparam55 = new OracleDBO.OracleCmdParam[4];

                    string sql33 = @"insert into excle_tablestorage
                                      (tablename, pagecode, sorting, remark)
                                    values
                                      (:tablename, :pagecode, :sorting, :remark)";

                    oparam55[0].Name = ":pagecode";
                    oparam55[0].Type = OracleDbType.Varchar2;
                    oparam55[0].Value = pagecode;

                    oparam55[1].Name = ":sorting";
                    oparam55[1].Type = OracleDbType.Varchar2;
                    oparam55[1].Value = (sort1 + 1).ToString();

                    oparam55[2].Name = ":tablename";
                    oparam55[2].Type = OracleDbType.Varchar2;
                    oparam55[2].Value = "EXCELSLEFTABLE_" + (sort1 + 1);

                    oparam55[3].Name = ":remark";
                    oparam55[3].Type = OracleDbType.Varchar2;
                    oparam55[3].Value = pagename;

                    int n33 = mydbo.ExecuteNonQuery(sql33, oparam55);

                    if (n33 > 0)
                    {
                        string createsql = @"
                                    create table " + "EXCELSLEFTABLE_" + (sort1 + 1) + @"
                                    (
                                        pagecode  VARCHAR2(50),
                                        sequences VARCHAR2(50)
                                    )
                                    tablespace MES_CONTENT
                                        pctfree 10
                                        initrans 1
                                        maxtrans 255
                                        storage
                                        (
                                        initial 64K
                                        minextents 1
                                        maxextents unlimited
                                        )".Replace("r\n", " ").Replace('\n', ' ');

                        string createsql1 = @"comment on table " + "EXCELSLEFTABLE_" + (sort1 + 1) + @"
                                        is '万能excel表名记录表'".Replace("r\n", " ").Replace('\n', ' ');


                        string createsql2 = @"comment on column EXCLE_TABLESTORAGE.pagecode
                                        is '表代码'".Replace("r\n", " ").Replace('\n', ' ');

                        string createsql3 = @"comment on column EXCLE_TABLESTORAGE.sequences
                                        is '行顺序'".Replace("r\n", " ").Replace('\n', ' ');

                        mydbo.ExecuteNonQuery(createsql);
                        mydbo.ExecuteNonQuery(createsql1);
                        mydbo.ExecuteNonQuery(createsql2);
                        mydbo.ExecuteNonQuery(createsql3);
                    }

                    mydbo.Commit();
            }
            catch (Exception ex)
            {
                mydbo.Rollback();
                errmsg = ex.Message.ToString();
                LogWriter.WriteLog(ex);
                result = false;
            }
            finally
            {
                mydbo.Close();
            }
            return result;
        }




        /// <summary>
        /// 获取表名页面列表
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// 页面代码
        /// 页面名称
        /// 图标
        /// 链接地址
        /// 上级页面代码
        /// 导航显示
        /// 排序
        /// 用户角色代码
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetRolePageList(string rolecode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.IsByParamName = true;
            try
            {
                #region 获取角色页面列表
                string sql1 = @"select b.*
                                  from (select t.pagecode 页面代码,
                                               t.pagename 页面名称,
                                              
                                               t.superior 上级页面代码,
                                               t.isshow 导航显示,
                                               t.sort 排序,
                                               (select t1.rolecode
                                                  from EX_ROLEPAGES t1
                                                 where t1.rolecode = :rolecode
                                                   and t1.pagecode = t.pagecode) 角色代码
                                          from EX_EXPAGE t
                                         where t.isshow = 1
                                         order by t.sort) b
                                 start with b.上级页面代码 is null
                                connect by prior b.页面代码 = b.上级页面代码
                                 order SIBLINGS BY b.排序";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":rolecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = rolecode;

                dt = mydbo.GetDataTable(sql1, oparam1);
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
        /// 获取权限页面
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
        /// 页面代码
        /// 页面名称
        /// 图标
        /// 链接地址
        /// 上级页面代码
        /// 导航显示
        /// 排序
        /// 用户角色代码
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetRoleTableList(string pagecode, string rolecode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                #region 获取角色页面列表
                string sql1 = @"   
                                 select b.*
                                      from (select t.autcode 页面代码,
                                                   t.autname 页面名称,
                                                   t.superior 上级页面代码,
                                                   t.isshow 导航显示,
                                                   t.sort 排序,
                                                   (select t1.rolecode
                                                      from EX_AUT t1  
                                                     where t1.pagecode = :pagecode and t1.rolecode= :rolecode 
                                                       and t1.autcode=t.autcode ) 角色代码
                                              from EX_AUTNAME t
                                             where t.isshow = 1 
                                             order by t.sort) b
                                     start with b.上级页面代码 is null
                                    connect by prior b.页面代码 = b.上级页面代码
                                     order SIBLINGS BY b.排序";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":pagecode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = pagecode;

                oparam12[1].Name = ":rolecode";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = rolecode;

                dt = mydbo.GetDataTable(sql1, oparam12);
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
        ///删除表
        /// </summary>
        /// <param name="pagecode">页面代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool DelPCPageInfo(string pagecode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                #region 删除表
                string sql1 = @"delete ex_expage t where t.pagecode = :pagecode";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":pagecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = pagecode;

                int n = mydbo.ExecuteNonQuery(sql1, oparam1);
                #endregion
            }
            catch (Exception ex)
            {
                result = false;
                LogWriter.WriteLog(ex);
                errmsg = ex.Message.ToString();
            }
            finally
            {
                mydbo.Close();
            }
            return result;
        }

        /// <summary>
        /// 修改表名？
        /// </summary>
        /// <param name="pagecode">页面代码</param>
        /// <param name="pagename">页面名称</param>
        /// <param name="ico">页面图标</param>
        /// <param name="pageurl">页面链接</param>
        /// <param name="pagesort">页面排序</param>
        /// <param name="isshow">是否在导航显示</param>
        /// <param name="superior">上级页面代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SetPCPageInfo(string pagecode, string pagename,ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                #region 修改表名
                string sql1 = @"update ex_expage t
                                   set t.pagename = :pagename                                    
                                 where t.pagecode = :pagecode";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                oparam1[0].Name = ":pagecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = pagecode;

                oparam1[1].Name = ":pagename";
                oparam1[1].Type = OracleDbType.Varchar2;
                oparam1[1].Value = pagename;

              

                int n = mydbo.ExecuteNonQuery(sql1, oparam1);
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
        /// 查询表名
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：
    
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetEX(string usercode,ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            try
            {
                #region 查询表名
                string sql1 = @"select t1.pagecode, t.pagename
                                  from ex_expage t, ex_rolepages t1, sys_s_user t2
                                 where t2.usercode = :usercode
                                   and t2.rolecode = t1.rolecode
                                   and t.pagecode = t1.pagecode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":usercode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = usercode;

                dt = mydbo.GetDataTable(sql1, oparam12);
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
        /// 查询表内容
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAll(string pagecode, string usercode, ref DataTable dt, ref  DataTable dt1 , ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询表名
                string sql1 = @"select t1.autcode
                              from EX_AUT t1, SYS_S_USER t2
                             where t1.pagecode =:pagecode and t2.usercode = :usercode and t2.rolecode = t1.rolecode";                                   
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":pagecode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = pagecode;

                oparam12[1].Name = ":usercode";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = usercode;
                 dt1 = mydbo.GetDataTable(sql1, oparam12);

                string sql2 = @"select t.pagecode,
                                   t.hname,
                                   t.breadth,
                                   t.nowrow,
                                   t.nowline,
                                   t.takerow,
                                   t.takeline,
                                   t.hcode
                              from EX_HEADER t
                             where t.pagecode = :pagecode
                             order by t.nowrow,t.hcode asc";
                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[1];
                oparam1[0].Name = ":pagecode";
                oparam1[0].Type = OracleDbType.Varchar2;
                oparam1[0].Value = pagecode;

                dt = mydbo.GetDataTable(sql2, oparam1);
        
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
        /// 查询行
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetRow(string pagecode, string usercode, string nowrow, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref DataTable dt4, ref DataTable dt5, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {

                string sqll12 = @"select t.agread from M_P_EXCEL_CONTENT t where t.pagecode=:pagecode  order by t.agread asc ";
                OracleDBO.OracleCmdParam[] oparam111 = new OracleDBO.OracleCmdParam[1];
                oparam111[0].Name = ":pagecode";
                oparam111[0].Type = OracleDbType.Varchar2;
                oparam111[0].Value = pagecode;

                //oparam111[1].Name = ":nowrow";
                //oparam111[1].Type = OracleDbType.Varchar2;
                //oparam111[1].Value = nowrow;

                DataTable dt100 = mydbo.GetDataTable(sqll12, oparam111);


                if (dt100.Rows.Count > 0)
                {
                    for (int aa = 0; aa < dt100.Rows.Count; aa++)
                    {
                        string apas = dt100.Rows[aa]["agread"].ToString();
                        int A = Convert.ToInt32(apas);
                        int a = A + 1;
                        string apass = Convert.ToString(a);
                        string sql4 = @"select t1.createname
                                      from M_P_EXCEL_PASS t1
                                     where t1.pagecode = :pagecode
                                       and t1.sort=:sort";
                        OracleDBO.OracleCmdParam[] oparam14 = new OracleDBO.OracleCmdParam[2];
                        oparam14[0].Name = ":sort";
                        oparam14[0].Type = OracleDbType.Varchar2;
                        oparam14[0].Value = apass;

                        oparam14[1].Name = ":pagecode";
                        oparam14[1].Type = OracleDbType.Varchar2;
                        oparam14[1].Value = pagecode;
                        DataTable dt6 = mydbo.GetDataTable(sql4, oparam14);

                        string us = "";
                        for (int i = 0; i < dt6.Rows.Count; i++)
                        {
                            us = dt6.Rows[i]["createname"].ToString();

                            if (us == usercode)
                            {

                                #region 修改内容表状态是否是审核人
                                string sql8 = @"update  M_P_EXCEL_CONTENT  tt set tt.ausercode=:ausercode  where tt.pagecode=:pagecode and  tt.agread=:agread";
                                OracleDBO.OracleCmdParam[] oparam18 = new OracleDBO.OracleCmdParam[3];
                                oparam18[0].Name = ":pagecode";
                                oparam18[0].Type = OracleDbType.Varchar2;
                                oparam18[0].Value = pagecode;

                                oparam18[1].Name = ":ausercode";
                                oparam18[1].Type = OracleDbType.Varchar2;
                                oparam18[1].Value = us;

                                oparam18[2].Name = ":agread";
                                oparam18[2].Type = OracleDbType.Varchar2;
                                oparam18[2].Value = apas;
                                DataTable dt10 = mydbo.GetDataTable(sql8, oparam18);
                                #endregion
                            }
                        }

                    }

                }


                #region 查询表头
                string sql1 = @"select *
                                   from M_P_EXCEL_HEADER t
                                   left join m_p_inputattribute i
                                     on t.hcode = i.hcode
                                  where t.pagecode = :pagecode
                                  order by t.nowrow, t.nowline asc";
                OracleDBO.OracleCmdParam[] oparam11 = new OracleDBO.OracleCmdParam[1];
                oparam11[0].Name = ":pagecode";
                oparam11[0].Type = OracleDbType.Varchar2;
                oparam11[0].Value = pagecode;
                dt = mydbo.GetDataTable(sql1, oparam11);
                #endregion



                #region 查询表内容
                //                   string sql2 = @"select t.pagecode,t.nowrow,t.nowline,t.hcode,t.createname,t.content,t1.linesort,t1.takeline
                //                                      from M_P_EXCEL_CONTENT t, M_P_EXCEL_EFFECTIVE t1
                //                                     where t.pagecode = :pagecode and t.hcode=t1.hcode
                //                                     order by t.nowrow, t.nowline asc";
                string sql2 = @"select t.pagecode,
                                          t.nowrow,
                                          t.nowline,
                                          t.hcode,
                                          t.createname,
                                          t.ausercode,
                                          t.agread,
                                          t.content,
                                          t1.linesort,
                                          t1.takeline,
                                          i.selecttype,
                                          i.optiontype
                                     from M_P_EXCEL_CONTENT t
                                     left join m_p_inputattribute i
                                       on t.hcode = i.hcode
                                     left join M_P_EXCEL_EFFECTIVE t1
                                       on t.hcode = t1.hcode
                                      and t.pagecode = t1.pagecode
                                    where t.pagecode = :pagecode
                                    order by t.nowrow, t.nowline asc";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[1];
                oparam12[0].Name = ":pagecode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = pagecode;
                dt1 = mydbo.GetDataTable(sql2, oparam12);
                #endregion




                #region 查询审核通过的
                string sql3 = @"select t1.pagecode, t2.username, t1.sort, t1.status, t1.nowrows, t1.cause
                                  from M_P_EXCEL_AUDIT t1, SYS_S_USERINFO t2
                                 where 
                                    t1.pagecode = :pagecode
                                   and t1.usercode = t2.usercode order by t1.nowrows ,t1.sort asc ";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[1];
                oparam13[0].Name = ":pagecode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = pagecode;

                dt2 = mydbo.GetDataTable(sql3, oparam13);
                #endregion

                #region 查询全部审核人
                string sql9 = @"select t1.pagecode, t1.sort, t1.usercode,t1.createname, t1.markt, t1.markt
                                          from m_p_excel_pass t1
                                         where t1.pagecode = :pagecode ";
                OracleDBO.OracleCmdParam[] oparam19 = new OracleDBO.OracleCmdParam[1];
                oparam19[0].Name = ":pagecode";
                oparam19[0].Type = OracleDbType.Varchar2;
                oparam19[0].Value = pagecode;
                dt3 = mydbo.GetDataTable(sql9, oparam19);
                #endregion

                string sql44 = @"select *
                              from m_p_inputattribute i
                              left join M_P_EXCEL_EFFECTIVE t1
                                on i.hcode = t1.hcode
                             where t1.pagecode = :pagecode";
                OracleDBO.OracleCmdParam[] oparam144 = new OracleDBO.OracleCmdParam[1];
                oparam144[0].Name = ":pagecode";
                oparam144[0].Type = OracleDbType.Varchar2;
                oparam144[0].Value = pagecode;
                dt4 = mydbo.GetDataTable(sql44, oparam144);

//                List<OracleDBO.OracleCmdParam> oparam333 = new List<OracleDBO.OracleCmdParam>();
//                string sql33 = @"select *
//                              from M_P_EXCEL_CONTENT t
//                             where t.createname = :createname
//                               and t.pagecode = :pagecode";
//                oparam333.Add(OracleDBO.Param("pagecode", pagecode));
//                oparam333.Add(OracleDBO.Param("createname", usercode));

//                DataTable dt55 = mydbo.GetDataTable(sql33, oparam333);
//                if (dt55.Rows.Count > 0)
//                {

//                    string sql20 = @"select t.autcode from EX_AUT t where t.pagecode=:pagecode";
//                    OracleDBO.OracleCmdParam[] oparam120 = new OracleDBO.OracleCmdParam[1];
//                    oparam120[0].Name = ":pagecode";
//                    oparam120[0].Type = OracleDbType.Varchar2;
//                    oparam120[0].Value = pagecode;
//                    dt5 = mydbo.GetDataTable(sql20, oparam120);

//                }
//                else {

                    string sql20 = @"select t.autcode from EX_AUT t ,SYS_S_USER t1 where t.rolecode=t1.rolecode and t1.usercode=:usercode and t.pagecode=:pagecode";
                    OracleDBO.OracleCmdParam[] oparam120 = new OracleDBO.OracleCmdParam[2];
                    oparam120[0].Name = ":pagecode";
                    oparam120[0].Type = OracleDbType.Varchar2;
                    oparam120[0].Value = pagecode;

                    oparam120[1].Name = ":usercode";
                    oparam120[1].Type = OracleDbType.Varchar2;
                    oparam120[1].Value = usercode;
                    dt5 = mydbo.GetDataTable(sql20, oparam120);
               // }


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
     ///  删除表头
     /// </summary>
     /// <param name="ext"></param>
     /// <param name="errmsg"></param>
     /// <returns></returns>


        public bool deleteHead(要删除的数据[] ext, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                for (int i = 0; i < ext.Length; i++)
                {

                    string  hcode = ext[i].hcode;
                    string pagecode = ext[i].pagecode;

                    string sqll3 = @"select * from M_P_EXCEL_EFFECTIVE t where t.hcode=:hcode and  t.pagecode=:pagecode";
                    OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                    oparam13[0].Name = ":hcode";
                    oparam13[0].Type = OracleDbType.Varchar2;
                    oparam13[0].Value = hcode;

                    oparam13[1].Name = ":pagecode";
                    oparam13[1].Type = OracleDbType.Varchar2;
                    oparam13[1].Value = pagecode;

                    DataTable dt = mydbo.GetDataTable(sqll3, oparam13);

                    if (dt.Rows.Count > 0)
                    {

                        string sqll12 = @"delete from M_P_EXCEL_HEADER t where t.hcode=:hcode and  t.pagecode=:pagecode";
                        OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                        oparam12[0].Name = ":hcode";
                        oparam12[0].Type = OracleDbType.Varchar2;
                        oparam12[0].Value = hcode;

                        oparam12[1].Name = ":pagecode";
                        oparam12[1].Type = OracleDbType.Varchar2;
                        oparam12[1].Value = pagecode;
                        int n = mydbo.ExecuteNonQuery(sqll12, oparam12);


                        string sql = @"delete from M_P_EXCEL_EFFECTIVE t where t.hcode=:hcode  and  t.pagecode=:pagecode";
                        OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                        oparam1[0].Name = ":hcode";
                        oparam1[0].Type = OracleDbType.Varchar2;
                        oparam1[0].Value = hcode;

                        oparam1[1].Name = ":pagecode";
                        oparam1[1].Type = OracleDbType.Varchar2;
                        oparam1[1].Value = pagecode;
                        n = mydbo.ExecuteNonQuery(sql, oparam1);

                        string sql6 = @"select * from M_P_EXCEL_CONTENT t where t.hcode=:hcode and  t.pagecode=:pagecode";
                        OracleDBO.OracleCmdParam[] oparam16 = new OracleDBO.OracleCmdParam[2];
                        oparam16[0].Name = ":hcode";
                        oparam16[0].Type = OracleDbType.Varchar2;
                        oparam16[0].Value = hcode;

                        oparam16[1].Name = ":pagecode";
                        oparam16[1].Type = OracleDbType.Varchar2;
                        oparam16[1].Value = pagecode;

                        DataTable dt6 = mydbo.GetDataTable(sql6, oparam16);
                        if (dt6.Rows.Count > 0)
                        {

                            string sql3 = @"delete from M_P_EXCEL_CONTENT t where t.hcode=:hcode  and  t.pagecode=:pagecode";
                            OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[2];
                            oparam15[0].Name = ":hcode";
                            oparam15[0].Type = OracleDbType.Varchar2;
                            oparam15[0].Value = hcode;

                            oparam15[1].Name = ":pagecode";
                            oparam15[1].Type = OracleDbType.Varchar2;
                            oparam15[1].Value = pagecode;
                            n = mydbo.ExecuteNonQuery(sql3, oparam15);
                        }
                        else {
 
                        }
                    }
                    else {

                        string sqll12 = @"delete from M_P_EXCEL_HEADER t   where t.hcode=:hcode and  t.pagecode=:pagecode";
                        OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                        oparam12[0].Name = ":hcode";
                        oparam12[0].Type = OracleDbType.Varchar2;
                        oparam12[0].Value = hcode;

                        oparam12[1].Name = ":pagecode";
                        oparam12[1].Type = OracleDbType.Varchar2;
                        oparam12[1].Value = pagecode;
                        int n = mydbo.ExecuteNonQuery(sqll12, oparam12);
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

        //删除行
        //
        //public bool deleteHead(string hcode, string pagecode, string usercode, ref string errmsg)
        //{
        //    bool result = true;
        //    OracleDBO mydbo = new OracleDBO();
        //    mydbo.IsByParamName = true;
        //    mydbo.IsThrowException = true;
        //    mydbo.AutoClose = false;
        //    try
        //    {
                
        //            //string sqll3 = @"select * from EX_CONTENT t  where t.hcode=:hcode and  t.pagecode=:pagecode";
        //            //OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
        //            //oparam13[0].Name = ":hcode";
        //            //oparam13[0].Type = OracleDbType.Varchar2;
        //            //oparam13[0].Value = hcode;

        //            //oparam13[1].Name = ":pagecode";
        //            //oparam13[1].Type = OracleDbType.Varchar2;
        //            //oparam13[1].Value = pagecode;

        //            //DataTable dt = mydbo.GetDataTable(sqll3, oparam13);


                  
        //                string sqll12 = @"delete from ex_header t   where t.hcode=:hcode and  t.pagecode=:pagecode";
        //                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
        //                oparam12[0].Name = ":hcode";
        //                oparam12[0].Type = OracleDbType.Varchar2;
        //                oparam12[0].Value = hcode;

        //                oparam12[1].Name = ":pagecode";
        //                oparam12[1].Type = OracleDbType.Varchar2;
        //                oparam12[1].Value = pagecode;
        //                int n = mydbo.ExecuteNonQuery(sqll12, oparam12);


        //                string sql = @"delete from ex_content t where t.hcode=:hcode  and  t.pagecode=:pagecode";
        //                OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
        //                oparam1[0].Name = ":hcode";
        //                oparam1[0].Type = OracleDbType.Varchar2;
        //                oparam1[0].Value = hcode;

        //                oparam1[1].Name = ":pagecode";
        //                oparam1[1].Type = OracleDbType.Varchar2;
        //                oparam1[1].Value = pagecode;
        //                n = mydbo.ExecuteNonQuery(sql, oparam1);
        //        //日志
        //                //if (n > 0)
        //                //{

        //                //    string sql2 = @"delete from ex_header t   where t.hcode=:hcode and  t.pagecode=:pagecode";
        //                //    OracleDBO.OracleCmdParam[] oparam2 = new OracleDBO.OracleCmdParam[3];
        //                //    oparam2[0].Name = ":hcode";
        //                //    oparam2[0].Type = OracleDbType.Varchar2;
        //                //    oparam2[0].Value = hcode;

        //                //    oparam2[1].Name = ":pagecode";
        //                //    oparam2[1].Type = OracleDbType.Varchar2;
        //                //    oparam2[1].Value = pagecode;

        //                //    oparam2[2].Name = ":usercode";
        //                //    oparam2[2].Type = OracleDbType.Varchar2;
        //                //    oparam2[2].Value = usercode;

        //                //    int n2 = mydbo.ExecuteNonQuery(sql2, oparam2);
        //                //}
                
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
        /// <summary>
        /// <summary>
        /// 编辑行
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="usercode"></param>
        /// <param name="nowrow"></param>
        /// <param name="content"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>

        public bool updateRow(编辑的数据[] rm, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
          
            try
            {
                mydbo.BeginTransaction();
                for (int i = 0; i < rm.Length; i++)
                {
                    string pagecode = rm[i].pagecode;
                    string nowrow = rm[i].nowrow;
                    string content = rm[i].content;
                    string nowline = rm[i].nowline;
                    string usercode = rm[i].hcode;
                    string hcode =  rm[i].hcode;
                    string sql2 = @"update m_p_excel_content t1
                                           set t1.content = :content, t1.createname = :createname 
                                         where t1.pagecode = :pagecode
                                           and t1.nowrow = :nowrow and t1.nowline=:nowline";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[5];
                    oparam1[0].Name = ":pagecode";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = pagecode;

                    oparam1[1].Name = ":nowrow";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = nowrow;

                    oparam1[2].Name = ":content";
                    oparam1[2].Type = OracleDbType.Varchar2;
                    oparam1[2].Value = content;

                    oparam1[3].Name = ":createname";
                    oparam1[3].Type = OracleDbType.Varchar2;
                    oparam1[3].Value = usercode;

                    oparam1[4].Name = ":nowline";
                    oparam1[4].Type = OracleDbType.Varchar2;
                    oparam1[4].Value = nowline;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam1);
                    if (n > 0)
                    {
                        List<OracleDBO.OracleCmdParam> oparam33 = new List<OracleDBO.OracleCmdParam>();
                        string sql33 = @"select m.tablename tablename  from excle_tablestorage m where m.pagecode = :pagecode";
                        oparam33.Add(OracleDBO.Param("pagecode", pagecode));
                        DataTable dt2 = mydbo.GetDataTable(sql33, oparam33);

                        if (dt2.Rows.Count > 0)
                        {
                            
                            string sql22 = @"update " + dt2.Rows[0]["tablename"] + @" t set t." + hcode + " = :content where t.sequences = :sequences";
                            OracleDBO.OracleCmdParam[] oparam99 = new OracleDBO.OracleCmdParam[2];
                            oparam99[0].Name = ":content";
                            oparam99[0].Type = OracleDbType.Varchar2;
                            oparam99[0].Value = content;
                            oparam99[1].Name = ":sequences";
                            oparam99[1].Type = OracleDbType.Varchar2;
                            oparam99[1].Value = nowrow;
                            mydbo.ExecuteNonQuery(sql22, oparam99);
                            
                        }

                    }

                }
                mydbo.Commit();
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
        /// 判断编辑权限
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="usercode"></param>
        /// <param name="nowrow"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool checkRow(string pagecode, string usercode, string nowrow, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            bool end = false;
            try
            {

                //#region 查询几级权限
                //string sql8 = @"select * from EX_CONTENT t  where t.pagecode=:pagecode and t.nowrow=:nowrow and t.whether='111'";
                //OracleDBO.OracleCmdParam[] oparam18 = new OracleDBO.OracleCmdParam[2];
                //oparam18[0].Name = ":pagecode";
                //oparam18[0].Type = OracleDbType.Varchar2;
                //oparam18[0].Value = pagecode;

                //oparam18[1].Name = ":nowrow";
                //oparam18[1].Type = OracleDbType.Varchar2;
                //oparam18[1].Value = nowrow;
                //DataTable dt8 = mydbo.GetDataTable(sql8, oparam18);
                //#endregion
                //if (dt8.Rows.Count > 0)
                //{
                //    errmsg = "审核已通过！不能修改哦！";
                //    result = false;
                //}


                string sqll12 = @"select t1.autcode
                              from EX_AUT t1, SYS_S_USER t2
                             where t1.pagecode =:pagecode and t2.usercode = :createname and t2.rolecode = t1.rolecode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":pagecode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = pagecode;

                oparam12[1].Name = ":createname";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = usercode;

                DataTable dt1 = mydbo.GetDataTable(sqll12, oparam12);
                for (int qq = 0; qq < dt1.Rows.Count; qq++)
                {
                    if (dt1.Rows[qq]["autcode"].ToString() == "P002")
                    {
                        end = true;
                    }
                }

                if (!end)
                {

                    string sqll = @"select t1.createname
                              from M_P_EXCEL_CONTENT t1
                             where t1.pagecode =:pagecode and t1.nowrow=:nowrow";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                    oparam1[0].Name = ":pagecode";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = pagecode;

                    oparam1[1].Name = ":nowrow";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = nowrow;

                    DataTable dt = mydbo.GetDataTable(sqll, oparam1);

                    for (int q = 0; q < dt.Rows.Count; q++)
                    {
                        if (dt.Rows[q]["createname"].ToString() == usercode)
                        {
                            end = true;
                        }
                    }
                }

                if (!end) 
                
                {
                    errmsg = "您没有权限修改这个数据哦！如需请联系管理员！";
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


        /// <summary>
        /// 判断删除行权限
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="usercode"></param>
        /// <param name="nowrow"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool checkDeleteRow(string pagecode, string usercode, string nowrow, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            bool end = false;
            try
            {

                string sqll12 = @"select t1.autcode
                              from EX_AUT t1, SYS_S_USER t2
                             where t1.pagecode =:pagecode and t2.usercode = :createname and t2.rolecode = t1.rolecode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":pagecode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = pagecode;

                oparam12[1].Name = ":createname";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = usercode;

                DataTable dt1 = mydbo.GetDataTable(sqll12, oparam12);
                for (int qq = 0; qq < dt1.Rows.Count; qq++)
                {
                    if (dt1.Rows[qq]["autcode"].ToString() == "P003")
                    {
                        end = true;
                    }
                }

                if (!end)
                {

                    string sqll = @"select t1.createname
                              from M_P_EXCEL_CONTENT t1
                             where t1.pagecode =:pagecode and t1.nowrow=:nowrow";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[2];
                    oparam1[0].Name = ":pagecode";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = pagecode;

                    oparam1[1].Name = ":nowrow";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = nowrow;

                    DataTable dt = mydbo.GetDataTable(sqll, oparam1);//删除

                    for (int q = 0; q < dt.Rows.Count; q++)
                    {
                        if (dt.Rows[q]["createname"].ToString() == usercode)
                        {
                            end = true;
                        }
                    }
                }

                if (!end)
                {
                    errmsg = "您没有权限删除这个数据哦！如需请联系管理员！";
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




        /// <summary>
        /// 判断编辑表标题权限
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="usercode"></param>
        /// <param name="nowrow"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool checkUpdateHeader(string pagecode, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            bool end = false;
            try
            {
                string sqll12 = @"select t1.autcode
                              from EX_AUT t1, SYS_S_USER t2
                             where t1.pagecode =:pagecode and t2.usercode = :createname and t2.rolecode = t1.rolecode";
                OracleDBO.OracleCmdParam[] oparam12 = new OracleDBO.OracleCmdParam[2];
                oparam12[0].Name = ":pagecode";
                oparam12[0].Type = OracleDbType.Varchar2;
                oparam12[0].Value = pagecode;

                oparam12[1].Name = ":createname";
                oparam12[1].Type = OracleDbType.Varchar2;
                oparam12[1].Value = usercode;

                DataTable dt1 = mydbo.GetDataTable(sqll12, oparam12);
                for (int qq = 0; qq < dt1.Rows.Count; qq++)
                {
                    if (dt1.Rows[qq]["autcode"].ToString() == "P004")
                    {
                        end = true;
                    }
                }
              
                if (!end)
                {
                    errmsg = "您没有权限编辑这个数据哦！如需请联系管理员！";
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





        /// <summary>
        /// 点击允许就修改状态
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Apply(string pagecode, string nowrows, string sort,  string usercode, ref string errmsg) 
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {      
                     
                #region 添加进通过表
                string sql8 = @"insert into M_P_EXCEL_AUDIT
                              (pagecode, nowrows, sort,status, usercode)
                            values
                              (:pagecode, :nowrows, :sort,'0', :usercode)";
                OracleDBO.OracleCmdParam[] oparam18 = new OracleDBO.OracleCmdParam[4];
                oparam18[0].Name = ":pagecode";
                oparam18[0].Type = OracleDbType.Varchar2;
                oparam18[0].Value = pagecode;

                oparam18[1].Name = ":nowrows";
                oparam18[1].Type = OracleDbType.Varchar2;
                oparam18[1].Value = nowrows;

                oparam18[2].Name = ":sort";
                oparam18[2].Type = OracleDbType.Varchar2;
                oparam18[2].Value = sort;

                oparam18[3].Name = ":usercode";
                oparam18[3].Type = OracleDbType.Varchar2;
                oparam18[3].Value = usercode;
               
                int n8 = mydbo.ExecuteNonQuery(sql8, oparam18);
                #endregion


                #region 添加日志
                string sql9 = @"insert into M_P_EXCEL_AUDITSLOG
                              (pagecode, nowrows, sort,status, usercode)
                            values
                              (:pagecode, :nowrows, :sort,'0', :usercode)";
                OracleDBO.OracleCmdParam[] oparam19 = new OracleDBO.OracleCmdParam[4];
                oparam19[0].Name = ":pagecode";
                oparam19[0].Type = OracleDbType.Varchar2;
                oparam19[0].Value = pagecode;

                oparam19[1].Name = ":nowrows";
                oparam19[1].Type = OracleDbType.Varchar2;
                oparam19[1].Value = nowrows;

                oparam19[2].Name = ":sort";
                oparam19[2].Type = OracleDbType.Varchar2;
                oparam19[2].Value = sort;

                oparam19[3].Name = ":usercode";
                oparam19[3].Type = OracleDbType.Varchar2;
                oparam19[3].Value = usercode;

                int n9 = mydbo.ExecuteNonQuery(sql9, oparam19);
                #endregion



                #region 修改内容表状态是否是审核人
                string sql1 = @"update  M_P_EXCEL_CONTENT  tt set  tt.agread=:agread, tt.ausercode='' where tt.pagecode=:pagecode and tt.nowrow=:nowrow ";
                OracleDBO.OracleCmdParam[] oparam11 = new OracleDBO.OracleCmdParam[3];
                oparam11[0].Name = ":pagecode";
                oparam11[0].Type = OracleDbType.Varchar2;
                oparam11[0].Value = pagecode;

                oparam11[1].Name = ":nowrow";
                oparam11[1].Type = OracleDbType.Varchar2;
                oparam11[1].Value = nowrows;

                oparam11[2].Name = ":agread";
                oparam11[2].Type = OracleDbType.Varchar2;
                oparam11[2].Value = sort;
                DataTable dt10 = mydbo.GetDataTable(sql1, oparam11);
                #endregion     
     
                
                #region 查询表的等级是否都通过了***
                string sql4 = @"select * from M_P_EXCEL_PASS t where  t.pagecode=:pagecode and t.sort > :sort";
                OracleDBO.OracleCmdParam[] oparam14 = new OracleDBO.OracleCmdParam[2];

                oparam14[0].Name = ":sort";
                oparam14[0].Type = OracleDbType.Varchar2;
                oparam14[0].Value = sort;

                oparam14[1].Name = ":pagecode";
                oparam14[1].Type = OracleDbType.Varchar2;
                oparam14[1].Value = pagecode;
                DataTable dt2 = mydbo.GetDataTable(sql4, oparam14);
                #endregion
                if (dt2.Rows.Count > 0)
                {
                    int A = Convert.ToInt32(sort);
                    int a = A + 1;
                    string a1 = Convert.ToString(a);//jia==

                    #region 查询上一级d的id
                    string sql5 = @"select t1.wxopenid,t2.username,t3.pagename
                                                  from M_P_EXCEL_PASS t, SYS_S_USER t1, SYS_S_USERINFO t2 ,EX_EXPAGE t3 
                                                 where t.sort = :sort
                                                   and t.pagecode = :pagecode
                                                   and t.createname = t1.usercode
                                                   and t1.usercode=t2.usercode
                                                   and t.pagecode=t3.pagecode";
                    OracleDBO.OracleCmdParam[] oparam15 = new OracleDBO.OracleCmdParam[2];
                    oparam15[0].Name = ":sort";
                    oparam15[0].Type = OracleDbType.Varchar2;
                    oparam15[0].Value = a1;

                    oparam15[1].Name = ":pagecode";
                    oparam15[1].Type = OracleDbType.Varchar2;
                    oparam15[1].Value = pagecode;

                    DataTable dt3 = mydbo.GetDataTable(sql5, oparam15);

                    #endregion
                    if (dt3.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt3.Rows.Count; i++)
                        {
                            string wxopenid = dt3.Rows[i]["wxopenid"].ToString();
                            string username = dt3.Rows[i]["username"].ToString();
                            string pagename = dt3.Rows[i]["pagename"].ToString();

                            //推送给上一级通知审批
                               DALMessageHandle d = new DALMessageHandle();
                           d.SendyudingdangNotify(WXApiInfo.wxappid, wxopenid, username, pagename, DateTime.Now + "", usercode, ref  errmsg);
                        }
                    }
                }
                else
                {

                    #region 创建行的id
                    string sql6 = @"select t2.wxopenid,
                                          t4.pagename，t3.createname,
                                               t5.username
                                          from m_p_excel_content t3
                                          left join sys_s_user t2
                                            on t3.createname = t2.usercode
                                          left join ex_expage t4
                                            on t3.pagecode = t4.pagecode
                                          left join sys_s_userinfo t5
                                            on t5.usercode = t3.createname
                                         where t3.pagecode = :pagecode
                                           and t3.nowrow = :nowrow";
                    OracleDBO.OracleCmdParam[] oparam16 = new OracleDBO.OracleCmdParam[2];
                    oparam16[0].Name = ":pagecode";
                    oparam16[0].Type = OracleDbType.Varchar2;
                    oparam16[0].Value = pagecode;

                    oparam16[1].Name = ":nowrow";
                    oparam16[1].Type = OracleDbType.Varchar2;
                    oparam16[1].Value = nowrows;
                    DataTable dt4 = mydbo.GetDataTable(sql6, oparam16);
                    #endregion
                    //推送给用户，提醒审核成功
                    if (dt4.Rows.Count > 0)
                    {
                        string wxopenid = dt4.Rows[0]["wxopenid"].ToString();
                        string pagename = dt4.Rows[0]["pagename"].ToString();
                        string user = dt4.Rows[0]["createname"].ToString();
                        string username = dt4.Rows[0]["username"].ToString();
                    DALMessageHandle d = new DALMessageHandle();
                      d.SendyudingSucceed(WXApiInfo.wxappid, wxopenid, username, pagename, DateTime.Now + "", user, ref  errmsg);
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
        /// 点击驳回申请
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Applyfalse(string pagecode, string nowrows, string sort, string cause, string usercode, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 驳回
                string sql8 = @"insert into M_P_EXCEL_AUDIT
                                  (pagecode, nowrows, sort, cause, status, usercode)
                                values
                                  (:pagecode, :nowrows, :sort, :cause, '1', :usercode)";
                OracleDBO.OracleCmdParam[] oparam18 = new OracleDBO.OracleCmdParam[5];
                oparam18[0].Name = ":pagecode";
                oparam18[0].Type = OracleDbType.Varchar2;
                oparam18[0].Value = pagecode;

                oparam18[1].Name = ":nowrows";
                oparam18[1].Type = OracleDbType.Varchar2;
                oparam18[1].Value = nowrows;

                oparam18[2].Name = ":sort";
                oparam18[2].Type = OracleDbType.Varchar2;
                oparam18[2].Value = sort;

                oparam18[3].Name = ":cause";
                oparam18[3].Type = OracleDbType.Varchar2;
                oparam18[3].Value = cause;

                oparam18[4].Name = ":usercode";
                oparam18[4].Type = OracleDbType.Varchar2;
                oparam18[4].Value = usercode;

                int n8 = mydbo.ExecuteNonQuery(sql8, oparam18);
                #endregion

                #region 修改内容表状态是否是审核人
                string sql1 = @"update  M_P_EXCEL_CONTENT  tt set tt.ausercode='',tt.agread ='999'where tt.pagecode=:pagecode and  tt.nowrow=:nowrow";
                OracleDBO.OracleCmdParam[] oparam11 = new OracleDBO.OracleCmdParam[2];
                oparam11[0].Name = ":pagecode";
                oparam11[0].Type = OracleDbType.Varchar2;
                oparam11[0].Value = pagecode;

                oparam11[1].Name = ":nowrow";
                oparam11[1].Type = OracleDbType.Varchar2;
                oparam11[1].Value = nowrows;

                int n11 = mydbo.ExecuteNonQuery(sql1, oparam11);
                #endregion


                 #region 创建行的id
                    string sql6 = @"select  t2.wxopenid,
                                          t4.pagename，t3.createname,
                                               t5.username
                                          from m_p_excel_content t3
                                          left join sys_s_user t2
                                            on t3.createname = t2.usercode
                                          left join ex_expage t4
                                            on t3.pagecode = t4.pagecode
                                          left join sys_s_userinfo t5
                                            on t5.usercode = t3.createname
                                         where t3.pagecode = :pagecode
                                           and t3.nowrow = :nowrow";
                    OracleDBO.OracleCmdParam[] oparam16 = new OracleDBO.OracleCmdParam[2];
                    oparam16[0].Name = ":pagecode";
                    oparam16[0].Type = OracleDbType.Varchar2;
                    oparam16[0].Value = pagecode;

                    oparam16[1].Name = ":nowrow";
                    oparam16[1].Type = OracleDbType.Varchar2;
                    oparam16[1].Value = nowrows;
                    DataTable dt4 = mydbo.GetDataTable(sql6, oparam16);
                    #endregion
                    //推送给用户，
                    if (dt4.Rows.Count > 0)
                    {
                        string wxopenid = dt4.Rows[0]["wxopenid"].ToString();
                        string pagename = dt4.Rows[0]["pagename"].ToString();
                        string user = dt4.Rows[0]["createname"].ToString();
                        string username = dt4.Rows[0]["username"].ToString();
                    DALMessageHandle d = new DALMessageHandle();
                    d.SendyudingdangFalse(WXApiInfo.wxappid, wxopenid, username, pagename, cause, DateTime.Now + "", user, ref  errmsg);
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
        /// 查询审批状态
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Getfalse(string pagecode, string nowrow,ref DataTable dt,ref DataTable dt1, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询审批状态

                string sql2 = @"select t3.username,
                                     ff.usercode,
                                     ff.audits,
                                     t2.bapass,
                                     f.apass,
                                     t2.busercode,t2.state
                                from EX_AUDIT ff
                                left join EX_CONTENT f
                                  on ff.pagecode = f.pagecode
                                left join EX_REJECTS t2
                                  on f.pagecode = t2.pagecode
                                 and f.nowrow = t2.nowrow
                                left join SYS_S_USERINFO t3
                                  on t3.usercode = t2.busercode
                               where ff.pagecode = :pagecode
                                 and f.nowrow = :nowrow
                               order by ff.audits,t2.bapass";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                oparam13[0].Name = ":pagecode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = pagecode;

                oparam13[1].Name = ":nowrow";
                oparam13[1].Type = OracleDbType.Varchar2;
                oparam13[1].Value = nowrow;
                 dt = mydbo.GetDataTable(sql2, oparam13);
                #endregion

                 #region 查询审批状态
                 string sql4 = @"select t1.username, t.nowrow, t.bapass, t.state ,t.reason
                                  from EX_REJECTS t, SYS_S_USERINFO t1
                                 where t.busercode = t1.usercode
                                   and t.pagecode=:pagecode
                                   and t.nowrow =:nowrow
                                 order by t.nowrow, t.bapass";
               
                 OracleDBO.OracleCmdParam[] oparam14 = new OracleDBO.OracleCmdParam[2];
                 oparam14[0].Name = ":pagecode";
                 oparam14[0].Type = OracleDbType.Varchar2;
                 oparam14[0].Value = pagecode;

                 oparam14[1].Name = ":nowrow";
                 oparam14[1].Type = OracleDbType.Varchar2;
                 oparam14[1].Value = nowrow;
                 dt1 = mydbo.GetDataTable(sql4, oparam14);
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
        /// 编辑表头数据
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="usercode"></param>
        /// <param name="nowrow"></param>
        /// <param name="content"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>

        public bool updateHeader(string pagecode, string hname, string usercode, string nowrow, string nowline, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;

            try
            {
                string sql2 = @"update M_P_EXCEL_HEADER t1
                           set t1.hname = :hname, t1.createname = :createname
                         where t1.pagecode = :pagecode
                           and t1.nowrow = :nowrow
                           and t1.nowline = :nowline";
                    OracleDBO.OracleCmdParam[] oparam1 = new OracleDBO.OracleCmdParam[5];
                    oparam1[0].Name = ":pagecode";
                    oparam1[0].Type = OracleDbType.Varchar2;
                    oparam1[0].Value = pagecode;

                    oparam1[1].Name = ":nowrow";
                    oparam1[1].Type = OracleDbType.Varchar2;
                    oparam1[1].Value = nowrow;

                    oparam1[2].Name = ":hname";
                    oparam1[2].Type = OracleDbType.Varchar2;
                    oparam1[2].Value = hname;

                    oparam1[3].Name = ":createname";
                    oparam1[3].Type = OracleDbType.Varchar2;
                    oparam1[3].Value = usercode;

                    oparam1[4].Name = ":nowline";
                    oparam1[4].Type = OracleDbType.Varchar2;
                    oparam1[4].Value = nowline;

                    int n = mydbo.ExecuteNonQuery(sql2, oparam1);
                
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
        /// 查询驳回
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetfalseB(string pagecode, string nowrow, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询驳回
                string sql2 = @"select * from EX_REJECTS t  where t.pagecode=:pagecode and t.nowrow=:nowrow and t.state='1'";
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                oparam13[0].Name = ":pagecode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = pagecode;

                oparam13[1].Name = ":nowrow";
                oparam13[1].Type = OracleDbType.Varchar2; 
                oparam13[1].Value = nowrow;
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
        /// 查询审批状态
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="dt">返回列表：

        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetTrue(string pagecode, string nowrow, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsByParamName = true;
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            try
            {
                #region 查询审批状态

                string sql2 = @"select t.taudits , t1.username
                                      from EX_PASS t, t1.username SYS_S_USERINFO t1
                                     where t.nowrow = :nowrow
                                     
                                       and t.pagecode = :pagecode
                                       and t1.usercode = t.tsercode";
             
                OracleDBO.OracleCmdParam[] oparam13 = new OracleDBO.OracleCmdParam[2];
                oparam13[0].Name = ":pagecode";
                oparam13[0].Type = OracleDbType.Varchar2;
                oparam13[0].Value = pagecode;

                oparam13[1].Name = ":nowrow";
                oparam13[1].Type = OracleDbType.Varchar2;
                oparam13[1].Value = nowrow;

             
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


//        public bool GetWork(string search, int pagesize, int page, ref int totalnum, ref int pagecount, string pagecode, 类型[] rm,ref DataTable dt, ref string errmsg)
//        {
//            bool result = true;
//            OracleDBO mydbo = new OracleDBO();
//            mydbo.IsThrowException = true;
//            mydbo.AutoClose = false;
//            try
//            {
//                List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();

//                string sql3="";
//                 string sql4="";
//                 string sql5="";
//                 string sql6="";

//                for (int i = 0; i < 10; i++)
//                {
//                    switch (rm[i].类型)
//                    {
//                        case "数字":
//                           sql3 = "(t.hcode =:onecode and c.content like '%' || :oneval || '%')";
//                            oparam1.Add(OracleDBO.Param("oneval", value));
//                            oparam1.Add(OracleDBO.Param("onecode", hcode));
//                            break;
//                        case "文本":

//                            sql4 = "(t.hcode =:onecode and c.content like '%' || :value || '%')";
//                            oparam1.Add(OracleDBO.Param("value", value));
//                            oparam1.Add(OracleDBO.Param("onecode", hcode));
//                            break;

//                        case "日期":
//                            sql5 = "(t.hcode =:onecode and to_date(c.content, 'yyyy/MM/dd') BETWEEN to_date(:startdata, 'yyyy/MM/dd') AND to_date(:enddata, 'yyyy/MM/dd')))";
//                            oparam1.Add(OracleDBO.Param("startdata", startdata));
//                            oparam1.Add(OracleDBO.Param("enddata", enddata));
//                            oparam1.Add(OracleDBO.Param("onecode", hcode));
//                            break;
//                        case "是否选中":
//                            sql6 = "(t.hcode =:onecode and c.content like '%' || :value || '%')";
//                            oparam1.Add(OracleDBO.Param("value", value));
//                            oparam1.Add(OracleDBO.Param("onecode", hcode));
//                            break;

//                        default:
//                            sql3 = "";
//                            break;
//                    }
//                }

//                string sql9 = @"select t.pagecode,
//                                        t.nowrow,
//                                        t.nowline,
//                                        t.hcode,
//                                        t.createname,
//                                        t.ausercode,
//                                        t.agread,
//                                        t.content,
//                                        t1.linesort,
//                                        t1.takeline,
//                                        i.selecttype,
//                                        i.optiontype
//                                   from M_P_EXCEL_CONTENT t
//                                   left join m_p_inputattribute i
//                                     on t.hcode = i.hcode
//                                   left join M_P_EXCEL_EFFECTIVE t1
//                                     on t.hcode = t1.hcode
//                                    and t.pagecode = t1.pagecode
//                                  where t.pagecode = :pagecode
//                                    and t.nowrow in
//                                        (select c.nowrow
//                                           from M_P_EXCEL_EFFECTIVE t
//                                           left join m_p_excel_content c
//                                             on t.hcode = c.hcode
//                                          where " + sql3 + " or  " + sql5 + "  or " + sql4 + "" + sql6 + "";
//                     oparam1.Add(OracleDBO.Param("pagecode", pagecode));
//                     OracleDBO.PagingSQL(ref sql9, ref oparam1, page, pagesize, ref errmsg);
//                     dt = mydbo.GetDataTable(sql9, oparam1);
             
//            }
//            catch (Exception ex)
//            {
//                errmsg = ex.Message.ToString();

//                result = false;
//                LogWriter.WriteLog(ex);
//            }
//            finally
//            {
//                mydbo.Close();
//            }
//            return result;
//        }



    }
}
