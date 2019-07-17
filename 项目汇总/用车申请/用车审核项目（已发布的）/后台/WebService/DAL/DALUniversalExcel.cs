using Common;
using DataOperator;
using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace DAL
{
    public class DALUniversalExcel
    {

        /// <summary>
        /// 添加表头
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="hcode"></param>
        /// <param name="hname"></param>
        /// <param name="breadth"></param>
        /// <param name="nowrow"></param>
        /// <param name="nowline"></param>
        /// <param name="takerow"></param>
        /// <param name="takeline"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool AddExcleHeader(string pagecode, string hcode, string hname, string breadth, string nowrow, string nowline, string takerow, string takeline, string selecttype, string optiontype, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.IsByParamName = true;
            try
            {
                mydbo.BeginTransaction();

                List<OracleDBO.OracleCmdParam> oparam = new List<OracleDBO.OracleCmdParam>();

                string sql = @"select max(to_number(m.nowrow)) nowrow,max(to_number(m.nowline)) nowline  from m_p_excel_header m where m.pagecode = :pagecode";
                oparam.Add(OracleDBO.Param("pagecode", pagecode));
                DataTable dt = mydbo.GetDataTable(sql, oparam);

                //if (dt.Rows[0]["nowrow"].ToString().Equals("") && dt.Rows[0]["nowline"].ToString().Equals(""))
                //{
                //    nowline = "1";
                //    nowrow = "1";
                //}
                //else
                //{
                //    nowline = dt.Rows[0]["nowline"].ToString();
                //    nowrow = dt.Rows[0]["nowrow"].ToString();
                //}

                string sql1 = @"insert into m_p_excel_header
                                    (pagecode, hcode, hname, nowrow, nowline, takerow, takeline)
                               values
                                    (:pagecode, :hcode, :hname, :nowrow, :nowline, :takerow, :takeline)";

                oparam.Add(OracleDBO.Param("hcode", hcode));
                oparam.Add(OracleDBO.Param("hname", hname));
                oparam.Add(OracleDBO.Param("nowrow", nowrow));
                oparam.Add(OracleDBO.Param("nowline", nowline));
                oparam.Add(OracleDBO.Param("takerow", takerow));
                oparam.Add(OracleDBO.Param("takeline", takeline));
                int n = mydbo.ExecuteNonQuery(sql1, oparam);

                if (n > 0)
                {
                    List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();
                    string sql2 = @"insert into m_p_inputattribute(hcode,selecttype,optiontype) values(:hcode,:selecttype,:optiontype)";
                    oparam1.Add(OracleDBO.Param("hcode", hcode));
                    oparam1.Add(OracleDBO.Param("selecttype", selecttype));
                    oparam1.Add(OracleDBO.Param("optiontype", optiontype));
                    mydbo.ExecuteNonQuery(sql2, oparam1);
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
        /// 添加有效的表头
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="hcode"></param>
        /// <param name="hname"></param>
        /// <param name="breadth"></param>
        /// <param name="nowrow"></param>
        /// <param name="nowline"></param>
        /// <param name="takerow"></param>
        /// <param name="takeline"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool AddEffectiveExcleHeader(string pagecode, string hcode, string hname, int takeline, string selecttype, string optiontype, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.IsByParamName = true;
            try
            {

                List<OracleDBO.OracleCmdParam> oparam = new List<OracleDBO.OracleCmdParam>();

                string sql = @"select m.nowline nowline  from m_p_excel_header m where m.pagecode = :pagecode and m.hname=:hname";
                oparam.Add(OracleDBO.Param("pagecode", pagecode));
                oparam.Add(OracleDBO.Param("hname", hname));
                DataTable dt = mydbo.GetDataTable(sql, oparam);

                string sql1 = @"insert into m_p_excel_effective
                                    (pagecode,hcode, effectivename,  linesort, takeline)
                               values
                                    (:pagecode,:hcode, :hname, :nowline, :takeline)";

                oparam.Add(OracleDBO.Param("nowline", dt.Rows[0]["nowline"]));
                oparam.Add(OracleDBO.Param("takeline", takeline + ""));
                oparam.Add(OracleDBO.Param("hcode", hcode));
                int n = mydbo.ExecuteNonQuery(sql1, oparam);

                //if (n > 0)
                //{
                //    List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();
                //    string sql2 = @"insert into m_p_inputattribute(hcode,selecttype,optiontype) values(:hcode,:selecttype,:optiontype)";
                //    oparam1.Add(OracleDBO.Param("hcode", hcode));
                //    oparam1.Add(OracleDBO.Param("selecttype", selecttype));
                //    oparam1.Add(OracleDBO.Param("optiontype", optiontype));
                //    mydbo.ExecuteNonQuery(sql2, oparam1);
                //}


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
        /// 更新添加有效的表头
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="hcode"></param>
        /// <param name="hname"></param>
        /// <param name="breadth"></param>
        /// <param name="nowrow"></param>
        /// <param name="nowline"></param>
        /// <param name="takerow"></param>
        /// <param name="takeline"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool updataAddEffectiveExcleHeader(string pagecode, string hcode, string oldhode, string hname, int takeline, string selecttype, string optiontype, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.IsByParamName = true;
            try
            {

                List<OracleDBO.OracleCmdParam> oparam = new List<OracleDBO.OracleCmdParam>();

                string sql = @"select m.nowline from M_P_EXCEL_CONTENT m where m.pagecode =:pagecode order by m.nowline desc";
                //   string sql = @"select m.nowline from m_p_excel_header m where m.pagecode = :pagecode and m.hname=:hname";
                oparam.Add(OracleDBO.Param("pagecode", pagecode));

                DataTable dt1 = mydbo.GetDataTable(sql, oparam);
                string aaa = dt1.Rows[0]["nowline"].ToString();
                int A = Convert.ToInt32(aaa);
                int a = A + 1;
                string a1 = Convert.ToString(a);

                if (!string.IsNullOrEmpty(hcode))
                {
                    string sql1 = @"insert into m_p_excel_effective
                                    (pagecode,hcode, effectivename,  linesort, takeline)
                               values
                                    (:pagecode,:hcode, :hname, :nowline, :takeline)";

                    oparam.Add(OracleDBO.Param("nowline", a1));
                    oparam.Add(OracleDBO.Param("takeline", takeline + ""));
                    oparam.Add(OracleDBO.Param("hcode", hcode));
                    oparam.Add(OracleDBO.Param("hname", hname));
                    int n = mydbo.ExecuteNonQuery(sql1, oparam);

                    if (n > 0)
                    {
                        List<OracleDBO.OracleCmdParam> oparam2 = new List<OracleDBO.OracleCmdParam>();
                        string sql121 = @"select * from m_p_excel_content c where c.pagecode=:pagecode";
                        oparam2.Add(OracleDBO.Param("pagecode", pagecode));
                        DataTable dt = mydbo.GetDataTable(sql121, oparam2);
                        int y = 0;
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {

                            List<OracleDBO.OracleCmdParam> oparam21 = new List<OracleDBO.OracleCmdParam>();
                            if (y != ParseInteger.ParseInt(dt.Rows[i]["nowrow"].ToString()))
                            {
                                List<OracleDBO.OracleCmdParam> oparam20 = new List<OracleDBO.OracleCmdParam>();
                                string sql1210 = @"select * from m_p_excel_content c where c.pagecode=:pagecode and c.hcode=:hcode and c.nowrow=:nowrow";
                                oparam20.Add(OracleDBO.Param("pagecode", pagecode));
                                oparam20.Add(OracleDBO.Param("nowrow", dt.Rows[i]["nowrow"].ToString()));
                                oparam20.Add(OracleDBO.Param("hcode", hcode));
                                DataTable dt12 = mydbo.GetDataTable(sql1210, oparam20);

                                if (dt12.Rows.Count < 1)
                                {
                                    string sql12 = @"insert into m_p_excel_content
                                            (pagecode, hcode, nowrow, nowline)
                                        values
                                            (:pagecode, :hcode, :nowrow, :nowline)";

                                    oparam21.Add(OracleDBO.Param("nowrow", dt.Rows[i]["nowrow"].ToString()));
                                    oparam21.Add(OracleDBO.Param("nowline", a1));
                                    oparam21.Add(OracleDBO.Param("pagecode", pagecode));
                                    oparam21.Add(OracleDBO.Param("hcode", hcode));
                                    int n1 = mydbo.ExecuteNonQuery(sql12, oparam21);
                                }
                                y = ParseInteger.ParseInt(a1);

                            }

                        }

                        //List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();
                        //string sql2 = @"insert into m_p_inputattribute(hcode,selecttype,optiontype) values(:hcode,:selecttype,:optiontype)";
                        //oparam1.Add(OracleDBO.Param("hcode", hcode));
                        //oparam1.Add(OracleDBO.Param("selecttype", selecttype));
                        //oparam1.Add(OracleDBO.Param("optiontype", optiontype));
                        //mydbo.ExecuteNonQuery(sql2, oparam1);                       
                    }
                }
                else
                {
                    List<OracleDBO.OracleCmdParam> oparam11 = new List<OracleDBO.OracleCmdParam>();
                    string sql1 = @"update m_p_excel_effective h set h.linesort = :nowline where h.hcode = :hcode";
                    oparam11.Add(OracleDBO.Param("nowline", dt1.Rows[0]["nowline"]));
                    oparam11.Add(OracleDBO.Param("hcode", oldhode));
                    int n = mydbo.ExecuteNonQuery(sql1, oparam11);
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
        //keyboard
        /// <summary>
        /// 更新添加表头
        /// </summary>
        /// <param name="pagecode"></param>
        /// <param name="hcode"></param>
        /// <param name="hname"></param>
        /// <param name="breadth"></param>
        /// <param name="nowrow"></param>
        /// <param name="nowline"></param>
        /// <param name="takerow"></param>
        /// <param name="takeline"></param>
        /// <param name="errmsg"></param>
        /// <returns></returns>
        public bool updataAddExcleHeader(string pagecode, string hcode, string oldhcode, string hname, string breadth, string nowrow, string nowline, string takerow, string takeline, string selecttype, string optiontype, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.IsByParamName = true;
            try
            {
                List<OracleDBO.OracleCmdParam> oparam = new List<OracleDBO.OracleCmdParam>();

                if (!string.IsNullOrEmpty(hcode))
                {
                    string sql1 = @"insert into m_p_excel_header
                                    (pagecode, hcode, hname, nowrow, nowline, takerow, takeline)
                               values
                                    (:pagecode, :hcode, :hname, :nowrow, :nowline, :takerow, :takeline)";
                    oparam.Add(OracleDBO.Param("pagecode", pagecode));
                    oparam.Add(OracleDBO.Param("hcode", hcode));
                    oparam.Add(OracleDBO.Param("hname", hname));
                    oparam.Add(OracleDBO.Param("nowrow", nowrow));
                    oparam.Add(OracleDBO.Param("nowline", nowline));
                    oparam.Add(OracleDBO.Param("takerow", takerow));
                    oparam.Add(OracleDBO.Param("takeline", takeline));
                    int n = mydbo.ExecuteNonQuery(sql1, oparam);

                    if (n > 0)
                    {
                        List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();
                        string sql2 = @"insert into m_p_inputattribute(hcode,selecttype,optiontype) values(:hcode,:selecttype,:optiontype)";
                        oparam1.Add(OracleDBO.Param("hcode", hcode));
                        oparam1.Add(OracleDBO.Param("selecttype", selecttype));
                        oparam1.Add(OracleDBO.Param("optiontype", optiontype));
                        mydbo.ExecuteNonQuery(sql2, oparam1);
                    }


                }
                else
                {
                    List<OracleDBO.OracleCmdParam> oparam2 = new List<OracleDBO.OracleCmdParam>();

                    string sql12 = @"update M_P_EXCEL_HEADER h set h.nowrow = :nowrow,h.nowline = :nowline where h.hcode = :hcode";
                    oparam2.Add(OracleDBO.Param("nowline", nowline));
                    oparam2.Add(OracleDBO.Param("hcode", oldhcode));
                    oparam2.Add(OracleDBO.Param("nowrow", nowrow));
                    int n = mydbo.ExecuteNonQuery(sql12, oparam2);
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



        public bool updataAddExcleHeader(int pagesize, int page, ref int totalnum, ref int pagecount,
                                         ref DataTable dt, string pagecode, string onetypehcode, string onetype,
                                          string onetypevalues, string datetypehcode, string datetypeselecttype, string startdate,
                                            string enddata, string startdata_time, string enddata_time,
                                            string digitaltypehcode, string digitaltypeselecttype, string twotypetype,
                                            string oneval1, string oneval2, string choosetypehcode, string choosetypeselecttype, string choosetype, ref string errmsg)
        {
            bool result = true;
            OracleDBO mydbo = new OracleDBO();
            mydbo.IsThrowException = true;
            mydbo.AutoClose = false;
            mydbo.IsByParamName = true;
            try
            {
                List<OracleDBO.OracleCmdParam> oparam1 = new List<OracleDBO.OracleCmdParam>();

                #region 查询记录总数

                string sql = "";
                switch (onetype)
                {
                    case "文本":
                        sql = "(t.hcode = :onetypehcode and c.content like '%' || :onetypevalues || '%')";
                        oparam1.Add(OracleDBO.Param("onetypehcode", onetypehcode));
                        oparam1.Add(OracleDBO.Param("onetypevalues", onetypevalues));
                        break;
                    default:
                        sql = "";
                        break;
                }

                string sql4 = "";
                switch (choosetype)
                {
                    case "已选中":

                        if (string.IsNullOrWhiteSpace(sql))
                        {
                            sql4 = " (t.hcode = :choosetypehcode and c.content = '0')";
                        }
                        else
                        {
                            sql4 = "  or (t.hcode = :choosetypehcode and c.content = '0')";
                        }

                        oparam1.Add(OracleDBO.Param("choosetypehcode", choosetypehcode));
                        break;

                    case "未选中":
                        if (string.IsNullOrWhiteSpace(sql))
                        {
                            sql4 = " (t.hcode = :choosetypehcode and c.content = '1')";
                        }
                        else
                        {
                            sql4 = "  or (t.hcode = :choosetypehcode and c.content = '1')";
                        }
                        oparam1.Add(OracleDBO.Param("choosetypehcode", choosetypehcode));
                        break;
                    default:
                        sql4 = "";
                        break;
                }

                string sql2 = "";
                switch (datetypeselecttype)
                {
                    case "时间":

                        if (string.IsNullOrWhiteSpace(sql) && string.IsNullOrWhiteSpace(sql4))
                        {
                            sql2 = " (t.hcode = :datetypehcode and  to_date(c.content, 'yyyy/MM/dd') BETWEEN to_date(:startdate, 'yyyy/MM/dd') AND to_date(:enddata, 'yyyy/MM/dd'))";
                        }
                        else
                        {
                            sql2 = " or (t.hcode = :datetypehcode and  to_date(c.content, 'yyyy/MM/dd') BETWEEN to_date(:startdate, 'yyyy/MM/dd') AND to_date(:enddata, 'yyyy/MM/dd'))";
                        }


                        oparam1.Add(OracleDBO.Param("startdate", startdate));
                        oparam1.Add(OracleDBO.Param("enddata", enddata));
                        oparam1.Add(OracleDBO.Param("datetypehcode", datetypehcode));
                        break;
                    default:
                        sql2 = "";
                        break;
                }

                string sql3 = "";
                switch (digitaltypeselecttype)
                {
                    case "数字":
                        if (string.IsNullOrWhiteSpace(sql) && string.IsNullOrWhiteSpace(sql4) && string.IsNullOrWhiteSpace(sql2))
                        {
                            sql3 = " t.pagecode = :pagecode and t.nowrow in (select h.nowrow from (select c.content, c.nowrow from M_P_EXCEL_CONTENT c where c.hcode = :hcode) h where h.content " + twotypetype + " (select round(:oneval2) || '%' from dual))";
                        }
                        else
                        {
                            sql3 = " or t.pagecode = :pagecode and t.nowrow in (select h.nowrow from (select c.content, c.nowrow from M_P_EXCEL_CONTENT c where c.hcode = :hcode) h where h.content " + twotypetype + " (select round(:oneval2) || '%' from dual))";
                        }


                        oparam1.Add(OracleDBO.Param("oneval2", oneval2));
                        oparam1.Add(OracleDBO.Param("hcode", digitaltypehcode));
                        oparam1.Add(OracleDBO.Param("pagecode", pagecode));
                        break;
                    case "百分比":
                        if (string.IsNullOrWhiteSpace(sql) && string.IsNullOrWhiteSpace(sql4) && string.IsNullOrWhiteSpace(sql2))
                        {
                            sql3 = " t.pagecode = :pagecode and t.nowrow in (select h.nowrow from (select c.content, c.nowrow from M_P_EXCEL_CONTENT c where c.hcode = :hcode) h where h.content " + twotypetype + " (select round(:oneval2) || '%' from dual))";
                        }
                        else
                        {
                            sql3 = " or t.pagecode = :pagecode and t.nowrow in (select h.nowrow from (select c.content, c.nowrow from M_P_EXCEL_CONTENT c where c.hcode = :hcode) h where h.content " + twotypetype + " (select round(:oneval2) || '%' from dual))";
                        }

                        oparam1.Add(OracleDBO.Param("oneval2", oneval2));
                        oparam1.Add(OracleDBO.Param("hcode", digitaltypehcode));

                        break;
                    default:
                        sql3 = "";
                        break;
                }


                #endregion

                string sql11 = " and 1=1";


                if (!string.IsNullOrWhiteSpace(sql) || !string.IsNullOrWhiteSpace(sql2) || !string.IsNullOrWhiteSpace(sql3))
                {
                    sql11 = " and t.nowrow in (select c.nowrow  from M_P_EXCEL_EFFECTIVE t left join m_p_excel_content c on t.hcode = c.hcode where " + sql + sql4 + sql2 + ")" + sql3;
                }
                else if (!(string.IsNullOrWhiteSpace(sql) && string.IsNullOrWhiteSpace(sql2) && string.IsNullOrWhiteSpace(sql3)))
                {
                    sql11 = sql3;
                }



                #region 查询记录总数
                string sql13 = @"select count(*) from M_P_EXCEL_CONTENT t
                                               left join m_p_inputattribute i
                                                 on t.hcode = i.hcode
                                               left join M_P_EXCEL_EFFECTIVE t1
                                                 on t.hcode = t1.hcode
                                                and t.pagecode = t1.pagecode
                                              where t.pagecode = :pagecode " + sql11;
                oparam1.Add(OracleDBO.Param("pagecode", pagecode));
                totalnum = Convert.ToInt32(mydbo.ExecuteScalar(sql13, oparam1));
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



                string sql10 = @"select t.pagecode,
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
                                  where t.pagecode = :pagecode " + sql11;

                string sql111 = @"select *
                            from (select paging1.*, rownum 序号
                                    from (" + sql10 + @") paging1
                                    where ( select count(*) from (" + sql10 + @") paging1 group by paging1.nowrow having count(*) > 1) pp） <= :maxrownum) paging2
                                 where paging2.序号 > :startrownum";



                oparam1.Add(OracleDBO.Param("maxrownum", page * pagesize));
                oparam1.Add(OracleDBO.Param("startrownum", pagesize * (page - 1)));
                //OracleDBO.PagingSQL(ref sql10, ref oparam1, page, pagesize, ref errmsg);
                dt = mydbo.GetDataTable(sql111, oparam1);
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
