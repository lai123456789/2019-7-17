using DAL;
using Entity.Request;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLUniversalExcel
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
        public bool AddExcleHeader(string pagecode, TableHeaders[][] tableHeaders, ref string errmsg)
        {
            bool result = true;

            List<Excel信息> list = new List<Excel信息>();
            List<Excel信息> new_list = new List<Excel信息>();
            List<Excel信息> merge = new List<Excel信息>();
            List<Excel信息> effective = new List<Excel信息>();

            for (int i = 0; i < tableHeaders.Length; i++)
            {
                for (int j = 0; j < tableHeaders[i].Length; j++)
                {
                    Excel信息 info = new Excel信息();
                    info.第几行 = i;
                    info.第几列 = j;
                    info.名称 = tableHeaders[i][j].hname;
                    info.占几行 = Convert.ToInt32(tableHeaders[i][j].takerow);
                    info.占几列 = Convert.ToInt32(tableHeaders[i][j].takeline);
                    info.selecttype = tableHeaders[i][j].selecttype;
                    info.optiontype = tableHeaders[i][j].optiontype;
                    list.Add(info);
                }
            }

            //临时性的方法
            for (int i = 0; i < list.Count; i++)
            {
                for (int j = 0; j < list[i].占几行; j++)
                {
                    for (int k = 0; k < list[i].占几列; k++)
                    {

                        Excel信息 newinfo = new Excel信息();
                        if (list[i].第几行 == 0)
                        {
                            int 当前行 = j;
                            int 当前列 = k + list[i].第几列;
                            string 名称 = list[i].名称;
                            bool 是否比较完成 = false;
                            while (!是否比较完成)
                            {
                                for (int q = 0; q < new_list.Count; q++)
                                {
                                    if (new_list[q].第几行 == 当前行 && 当前列 == new_list[q].第几列)
                                    {
                                        当前列 += 1;
                                        break;
                                    }
                                    if (q == new_list.Count - 1)
                                    {
                                        是否比较完成 = true;
                                    }
                                }

                                if (new_list.Count == 0)
                                {
                                    是否比较完成 = true;
                                }
                            }
                            newinfo.第几行 = 当前行;
                            if (当前行 > 0)
                            {
                                for (int kk = 0; kk < new_list.Count; kk++)
                                {
                                    if (new_list[kk].名称 == 名称)
                                    {
                                        newinfo.第几列 = new_list[kk].第几列;
                                    }
                                }
                            }
                            else
                            {
                                newinfo.第几列 = 当前列;
                            }
                            newinfo.占几行 = 1;
                            newinfo.占几列 = 1;
                            newinfo.名称 = 名称;
                            newinfo.optiontype = list[i].optiontype;
                            newinfo.selecttype = list[i].selecttype;
                            new_list.Add(newinfo);
                        }
                        else
                        {
                            int 目前总行数 = 0;
                            int 目前第几行 = list[i].第几行;//1
                            int 目前比较列 = list[i].第几列;//0
                            string 名称 = list[i].名称;
                            bool 是否比较完成 = false;
                            while (!是否比较完成)
                            {
                                for (int a = 0; a < 目前第几行 - 1; a++)
                                {
                                    if (list[a].第几行 == a && list[a].第几列 == 目前比较列)
                                    {
                                        目前总行数 += list[a].占几行;
                                    }
                                }

                                for (int n = 0; n < new_list.Count; n++)
                                {
                                    if (目前第几行 == new_list[n].第几行 && 目前比较列 == new_list[n].第几列)
                                    {
                                        目前比较列 += 1;
                                    }
                                }
                                if (目前总行数 > 目前第几行)
                                {
                                    目前比较列 += 1;
                                    目前总行数 = 0;
                                }
                                else
                                {
                                    是否比较完成 = true;
                                }
                            }
                            newinfo.第几行 = 目前第几行;
                            newinfo.第几列 = 目前比较列;
                            newinfo.名称 = 名称;
                            newinfo.占几行 = 1;
                            newinfo.占几行 = 1;
                            newinfo.optiontype = list[i].optiontype;
                            newinfo.selecttype = list[i].selecttype;
                            new_list.Add(newinfo);
                        }
                    }
                }
            }


            List<Excel信息> 排序后 = new List<Excel信息>();
            排序后 = new_list.OrderByDescending(a => a.第几行).ThenBy(a => a.第几列).ToList();

            List<Excel信息> 有效表头 = new List<Excel信息>();
            int 下一列 = 0;
            for (int n = 0; n < 排序后.Count; n++)
            {
                if (下一列 == 排序后[n].第几列)
                {
                    下一列 += 1;
                    有效表头.Add(排序后[n]);
                }
            }

            if (有效表头.Count > 0)
            {
                Excel信息 newinfo = new Excel信息();
                newinfo.名称 = 有效表头[0].名称;
                newinfo.占几列 = 1;
                newinfo.optiontype = 有效表头[0].optiontype;
                newinfo.selecttype = 有效表头[0].selecttype;
                effective.Add(newinfo);

                for (int n = 1; n < 有效表头.Count; n++)
                {
                    Excel信息 newinfo1 = new Excel信息();
                    bool 是否只更新 = false;
                    for (int h = 0; h < effective.Count; h++)
                    {
                        if (有效表头[n].名称 == effective[h].名称)
                        {

                            effective[h].占几列 += 1;
                            是否只更新 = true;

                        }
                    }
                    if (!是否只更新)
                    {
                        newinfo1.名称 = 有效表头[n].名称;
                        newinfo1.占几列 = 1;
                        newinfo1.optiontype = 有效表头[0].optiontype;
                        newinfo1.selecttype = 有效表头[0].selecttype;
                        effective.Add(newinfo1);
                    }
                }
            }





            for (int i = 0; i < tableHeaders.Length; i++)
            {
                for (int j = 0; j < tableHeaders[i].Length; j++)
                {
                    string hcode = "";
                    BLLSequence myseq = new BLLSequence();
                    result = myseq.GetExcelCode(ref hcode, ref errmsg);
                    if (result)
                    {
                        DALUniversalExcel mydal = new DALUniversalExcel();
                        result = mydal.AddExcleHeader(pagecode, hcode, tableHeaders[i][j].hname, tableHeaders[i][j].breadth, tableHeaders[i][j].nowrow, tableHeaders[i][j].nowline, tableHeaders[i][j].takerow, tableHeaders[i][j].takeline, tableHeaders[i][j].selecttype, tableHeaders[i][j].optiontype, ref errmsg);
                        if (!result)
                        {
                            result = false;
                            break;
                        }
                    }

                    for (int h = 0; h < effective.Count; h++)
                    {
                        if (tableHeaders[i][j].hname == effective[h].名称)
                        {
                            DALUniversalExcel mydal = new DALUniversalExcel();
                            result = mydal.AddEffectiveExcleHeader(pagecode, hcode, effective[h].名称, effective[h].占几列, effective[h].selecttype, effective[h].optiontype, ref errmsg);
                        }

                    }
                }
            }



            //for (int n = 0; n < 排序后.Count; n++)
            //{

            //    bool 是否只更新 = false;
            //    for (int h = 0; h < merge.Count; h++)
            //    {
            //        if (排序后[n].第几列 == merge[h].第几列)
            //        {
            //            if (排序后[n].第几行 > merge[h].第几行)
            //            {
            //                merge[h].第几行 = 排序后[n].第几行;
            //                merge[h].名称 = 排序后[n].名称;

            //                是否只更新 = true;
            //            }

            //        }
            //    }
            //    if (!是否只更新)
            //    {
            //        Excel信息 newinfo = new Excel信息();
            //        newinfo.第几行 = 排序后[n].第几行;
            //        newinfo.第几列 = 排序后[n].第几列;
            //        newinfo.名称 = 排序后[n].名称;
            //        newinfo.占几列 = 排序后[n].占几列;
            //        merge.Add(newinfo);
            //    }
            //}


            //for (int n = 0; n < new_list.Count; n++)
            //{
            //    Excel信息 newinfo = new Excel信息();
            //    bool 是否只更新 = false;
            //    for (int h = 0; h < merge.Count; h++)
            //    {
            //        if (new_list[n].第几列 == merge[h].第几列)
            //        {
            //            if (new_list[n].第几行 > merge[h].第几行)
            //            {
            //                merge[h].第几行 = new_list[n].第几行;
            //                merge[h].名称 = new_list[n].名称;

            //                是否只更新 = true;
            //            }

            //        }
            //    }
            //    if (!是否只更新)
            //    {
            //        newinfo.第几行 = new_list[n].第几行;
            //        newinfo.第几列 = new_list[n].第几列;
            //        newinfo.名称 = new_list[n].名称;
            //        newinfo.占几列 = new_list[n].占几列;

            //    }
            //}






            //List<临时的类> testList = new List<临时的类>();
            //List<临时的类> testList1 = new List<临时的类>();
            //List<临时的类> testList2 = new List<临时的类>();
            //List<临时的类> testList3 = new List<临时的类>();
            //for (int i = 0; i < tableHeaders.Length; i++)
            //{
            //    for (int j = 0; j < tableHeaders[i].Length; j++)
            //    {
            //        for (int a = 0; a < ParseInteger.ParseInt(tableHeaders[i][j].takerow); a++)
            //        { //a=0 1
            //            for (int b = 0; b < ParseInteger.ParseInt(tableHeaders[i][j].takerow); b++)//b=1 1
            //            {
            //                int 行 = i + a; // 0 1
            //                int 列 = j + b; // 0 1

            //                for (int k = 0; k < testList.Count; k++)
            //                {
            //                    if (testList[k].nowline == 行 && testList[k].nowline == 列)
            //                    {
            //                        列 = 列 + 1;
            //                        临时的类 data = new 临时的类();
            //                        data.hname = tableHeaders[i][j].hname;
            //                        data.nowrow = 行;
            //                        data.nowline = 列;
            //                        data.takerow = tableHeaders[i][j].takerow;
            //                        data.takeline = tableHeaders[i][j].takeline;
            //                        testList.Add(data);
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}

            //for (int y = 0; y < testList.Count; y++)
            //{
            //    bool updata = true;
            //    for (int n = 0; n < testList1.Count; n++)
            //    {
            //        if (testList1[n].nowline == testList[y].nowline)
            //        {
            //            if (testList1[n].nowrow < testList[y].nowrow)
            //            {
            //                testList1[n].nowrow = testList[y].nowrow;
            //                testList1[n].nowline = testList[y].nowline;
            //                testList1[n].hname = testList[y].hname;
            //                updata = false;
            //            }
            //        }

            //        if (updata)
            //        {
            //            testList1.Add(testList[y]);
            //        }
            //    }
            //}

            //for (int y = 0; y < testList1.Count; y++)
            //{
            //    bool updata = true;
            //    for (int n = 0; n < testList2.Count; n++)
            //    {
            //        if (testList1[n].nowline == testList1[y].nowline)
            //        {
            //            if (testList2[n].hname == testList1[y].hname)
            //            {
            //                testList2[n].nowline += 1;
            //                updata = false;
            //            }
            //        }

            //        if (updata)
            //        {
            //            testList2.Add(testList1[y]);
            //        }
            //    }
            //}

            return result;
        }


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
        public bool updataAddExcleHeader(string pagecode, TableHeaders[][] tableHeaders, ref string errmsg)
        {
            bool result = true;

            List<Excel信息> list = new List<Excel信息>();
            List<Excel信息> new_list = new List<Excel信息>();
            List<Excel信息> merge = new List<Excel信息>();
            List<Excel信息> effective = new List<Excel信息>();

            for (int i = 0; i < tableHeaders.Length; i++)
            {
                for (int j = 0; j < tableHeaders[i].Length; j++)
                {
                    Excel信息 info = new Excel信息();
                    info.第几行 = i;
                    info.第几列 = j;
                    info.名称 = tableHeaders[i][j].hname;
                    info.占几行 = Convert.ToInt32(tableHeaders[i][j].takerow);
                    info.占几列 = Convert.ToInt32(tableHeaders[i][j].takeline);
                    info.selecttype = tableHeaders[i][j].selecttype;
                    info.optiontype = tableHeaders[i][j].optiontype;
                    list.Add(info);
                }
            }

            //临时性的方法
            for (int i = 0; i < list.Count; i++)
            {
                for (int j = 0; j < list[i].占几行; j++)
                {
                    for (int k = 0; k < list[i].占几列; k++)
                    {

                        Excel信息 newinfo = new Excel信息();
                        if (list[i].第几行 == 0)
                        {
                            int 当前行 = j;
                            int 当前列 = k + list[i].第几列;
                            string 名称 = list[i].名称;
                            bool 是否比较完成 = false;
                            while (!是否比较完成)
                            {
                                for (int q = 0; q < new_list.Count; q++)
                                {
                                    if (new_list[q].第几行 == 当前行 && 当前列 == new_list[q].第几列)
                                    {
                                        当前列 += 1;
                                        break;
                                    }
                                    if (q == new_list.Count - 1)
                                    {
                                        是否比较完成 = true;
                                    }
                                }

                                if (new_list.Count == 0)
                                {
                                    是否比较完成 = true;
                                }
                            }
                            newinfo.第几行 = 当前行;
                            if (当前行 > 0)
                            {
                                for (int kk = 0; kk < new_list.Count; kk++)
                                {
                                    if (new_list[kk].名称 == 名称)
                                    {
                                        newinfo.第几列 = new_list[kk].第几列;
                                    }
                                }
                            }
                            else
                            {
                                newinfo.第几列 = 当前列;
                            }
                            newinfo.占几行 = 1;
                            newinfo.占几列 = 1;
                            newinfo.名称 = 名称;
                            newinfo.optiontype = list[i].optiontype;
                            newinfo.selecttype = list[i].selecttype;
                            new_list.Add(newinfo);
                        }
                        else
                        {
                            int 目前总行数 = 0;
                            int 目前第几行 = list[i].第几行;//1
                            int 目前比较列 = list[i].第几列;//0
                            string 名称 = list[i].名称;
                            bool 是否比较完成 = false;
                            while (!是否比较完成)
                            {
                                for (int a = 0; a < 目前第几行 - 1; a++)
                                {
                                    if (list[a].第几行 == a && list[a].第几列 == 目前比较列)
                                    {
                                        目前总行数 += list[a].占几行;
                                    }
                                }

                                for (int n = 0; n < new_list.Count; n++)
                                {
                                    if (目前第几行 == new_list[n].第几行 && 目前比较列 == new_list[n].第几列)
                                    {
                                        目前比较列 += 1;
                                    }
                                }
                                if (目前总行数 > 目前第几行)
                                {
                                    目前比较列 += 1;
                                    目前总行数 = 0;
                                }
                                else
                                {
                                    是否比较完成 = true;
                                }
                            }
                            newinfo.第几行 = 目前第几行;
                            newinfo.第几列 = 目前比较列;
                            newinfo.名称 = 名称;
                            newinfo.占几行 = 1;
                            newinfo.占几行 = 1;
                            newinfo.optiontype = list[i].optiontype;
                            newinfo.selecttype = list[i].selecttype;
                            new_list.Add(newinfo);
                        }
                    }
                }
            }


            List<Excel信息> 排序后 = new List<Excel信息>();
            排序后 = new_list.OrderByDescending(a => a.第几行).ThenBy(a => a.第几列).ToList();

            List<Excel信息> 有效表头 = new List<Excel信息>();
            int 下一列 = 0;
            for (int n = 0; n < 排序后.Count; n++)
            {
                if (下一列 == 排序后[n].第几列)
                {
                    下一列 += 1;
                    有效表头.Add(排序后[n]);
                }
            }

            if (有效表头.Count > 0)
            {
                Excel信息 newinfo = new Excel信息();
                newinfo.名称 = 有效表头[0].名称;
                newinfo.占几列 = 1;
                newinfo.optiontype = 有效表头[0].optiontype;
                newinfo.selecttype = 有效表头[0].selecttype;
                effective.Add(newinfo);

                for (int n = 1; n < 有效表头.Count; n++)
                {
                    Excel信息 newinfo1 = new Excel信息();
                    bool 是否只更新 = false;
                    for (int h = 0; h < effective.Count; h++)
                    {
                        if (有效表头[n].名称 == effective[h].名称)
                        {

                            effective[h].占几列 += 1;
                            是否只更新 = true;

                        }
                    }
                    if (!是否只更新)
                    {
                        newinfo1.名称 = 有效表头[n].名称;
                        newinfo1.占几列 = 1;
                        newinfo1.optiontype = 有效表头[0].optiontype;
                        newinfo1.selecttype = 有效表头[0].selecttype;
                        effective.Add(newinfo1);
                    }
                }
            }






            for (int i = 0; i < tableHeaders.Length; i++)
            {
                for (int j = 0; j < tableHeaders[i].Length; j++)
                {
                    string hcode = "";
                    if (string.IsNullOrEmpty(tableHeaders[i][j].hcode))
                    {
                        BLLSequence myseq = new BLLSequence();
                        result = myseq.GetExcelCode(ref hcode, ref errmsg);
                    }


                    if (result)
                    {
                        DALUniversalExcel mydal = new DALUniversalExcel();
                        result = mydal.updataAddExcleHeader(pagecode, hcode, tableHeaders[i][j].hcode, tableHeaders[i][j].hname, tableHeaders[i][j].breadth, tableHeaders[i][j].nowrow, tableHeaders[i][j].nowline, tableHeaders[i][j].takerow, tableHeaders[i][j].takeline, tableHeaders[i][j].selecttype, tableHeaders[i][j].optiontype, ref errmsg);
                        if (!result)
                        {
                            result = false;
                            break;
                        }
                    }

                    for (int h = 0; h < effective.Count; h++)
                    {
                        if (tableHeaders[i][j].hname == effective[h].名称)
                        {
                            DALUniversalExcel mydal = new DALUniversalExcel();
                            result = mydal.updataAddEffectiveExcleHeader(pagecode, hcode, tableHeaders[i][j].hcode, effective[h].名称, effective[h].占几列, effective[h].selecttype, effective[h].optiontype, ref errmsg);
                        }

                    }
                }
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
            DALUniversalExcel mydal = new DALUniversalExcel();
            result = mydal.updataAddExcleHeader(pagesize, page, ref totalnum, ref pagecount,
                                        ref dt, pagecode, onetypehcode, onetype,
                                         onetypevalues, datetypehcode, datetypeselecttype, startdate,
                                           enddata, startdata_time, enddata_time,
                                           digitaltypehcode, digitaltypeselecttype, twotypetype,
                                           oneval1, oneval2, choosetypehcode, choosetypeselecttype, choosetype, ref errmsg);
            return result;

        }


    }  
}
