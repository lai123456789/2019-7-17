using BLL;
using Common;
using DAL;

using Entity;
using Entity.Request;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApp.WebApp;

namespace WebApp
{
    public partial class UserManage : ApiBasic
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                      
                    case "RoleAu"://编辑表权限
                        RoleAu();
                        break;
                    case "RoleAuthority"://编辑表名
                        RoleAuthority();
                        break;

                    case "addPage"://添加表
                        addPage();
                        break;

                    case "GetRolePageList"://获取表名页面列表
                        GetRolePageList();
                        break;

                    case "GetRoleTableList"://获取权限页面
                        GetRoleTableList();
                        break;

                    case "GetEX"://查询表名
                        GetEX();
                        break;

              //case "UpdateEx"://表头填入表头EXCLE
                    //    UpdateEx();
                    //       break;

                    //case "UpdateExT":/// 填入表EXCLE
                    //       UpdateExT();
                    //       break;

                    //case "UpdateExRc"://表头填入对应值1
                    //    UpdateExRc();
                    //    break;


                   case "updateRow"://编辑行
                        updateRow();
                        break;
                    case "deleteRow"://删除行
                        deleteRow();
                        break;

                    case "GetRow"://查询行,表头,审核权
                        GetRow();
                        break;

                    case "deleteHead"://删除表头
                        deleteHead();
                        break;


                    case "Apply"://点击通过
                        Apply();
                        break;

                    case "Applyfalse"://点击驳回
                        Applyfalse();
                        break;

                    case "updateHeader"://编辑表头数据
                        updateHeader();
                         break;
                    //case "GetAll"://查询内容
                    //       GetAll();
                    //       break;

                    case "checkRow"://判断权限编辑行
                         checkRow();
                         break;

                     //case"Getfalse"://查询状态
                    //       Getfalse();
                    //       break;
                    //case "GetfalseB"://驳回
                    //       GetfalseB();
                    //       break;

                    //case"GetTrue"://查询通过的
                    //       GetTrue();
                    //       break;


                    case "checkUpdateHeader"://判断权限编辑标题
                         checkUpdateHeader();
                         break;

                    case "checkDeleteRow"://判断权限删除行
                         checkDeleteRow();
                         break;


                    case"UpdateExRc"://添加行二维数组
                         UpdateExRc();
                         break;

                }
            }
        }

         
     

        /// <summary>
        /// 表头填入数据EXCLE
        /// </summary>
        private void UpdateEx()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesEXT rm = ObjectSerializeHelper.JsonToObject<RequesEXT>(data);

            BLLUserManage mybll = new BLLUserManage();

            bool result = mybll.UpdateEx(rm.ExcelHeader, ref errmsg);
            if (!result)
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }
        }


        ///// <summary>
        ///// 表头填入对应值
        ///// </summary>
        //private void UpdateExRc()
        //{
        //    string errmsg = "";
        //    DataTable dt = new DataTable();
        //    string data = Request["data"];
        //    RequesContent rm = ObjectSerializeHelper.JsonToObject<RequesContent>(data);

        //    BLLUserManage mybll = new BLLUserManage();

        //    bool result = mybll.UpdateExRc(rm.字段值数组, ref errmsg);
        //    if (!result)
        //    {
        //        Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
        //        Response.End();
        //    }
        //    else
        //    {
        //        string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
        //        Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
        //        Response.End();
        //    }
        //}



        /// <summary>
        /// 行
        /// </summary>
        private void UpdateExRc()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesContentP rm = ObjectSerializeHelper.JsonToObject<RequesContentP>(data);

            BLLUserManage mybll = new BLLUserManage();

            bool result = mybll.UpdateExRc(rm.字段值数组, ref errmsg);
            if (!result)
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }
        }



        /// <summary>
        /// 查询表名
        /// </summary>
        private void GetEX()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesEX rm = ObjectSerializeHelper.JsonToObject<RequesEX>(data);
            string usercode = rm.usercode;
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetEX( usercode,ref dt, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }

     
        /// <summary>
        /// 角色授权权限
        /// </summary>
        private void RoleAuthority()
        {
            string errmsg = "";
            string data = Request["data"];
            RequestRoleAuthority info = ObjectSerializeHelper.JsonToObject<RequestRoleAuthority>(data);
            string rolecode = info.rolecode;
            string usercode = info.usercode;
            List<RequestRoleAuthorityPage> rolepage = info.rolepage;
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.RoleAuthority(rolecode, rolepage, usercode, ref errmsg);
            if (result)
            {
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", ""));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
        }
    
        /// <summary>
        /// 角色授权####
        /// </summary>
        private void RoleAu()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequestRole info = ObjectSerializeHelper.JsonToObject<RequestRole>(data);
            string pagecode = info.pagecode;
            string rolecode = info.rolecode;
            string usercode = info.usercode;
          

            List<RequestRolePage> rolepage = info.rolepage;
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.RoleAu(pagecode, rolepage, usercode, rolecode, ref errmsg);
            if (result)
            {
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", ""));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
        }

        /// <summary>
        /// 添加表
        /// </summary>
        private void addPage()
        {
            string errmsg = "";          
            string data = Request["data"];
            RequestTable info = ObjectSerializeHelper.JsonToObject<RequestTable>(data);
            string usercode = info.usercode;
            string pagename = info.pagename;
          //  string gader = info.gader;  //审核等级
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.addPage(pagename, usercode, info.审核用户, ref errmsg);
            if (result)
            {
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", ""));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
        }



        /// <summary>
        /// 获取表名页面列表
        /// </summary>
        private void GetRolePageList()
        {
            string errmsg = "";
              DataTable dt = new DataTable();
            string data = Request["data"];
            RequestGet info = ObjectSerializeHelper.JsonToObject<RequestGet>(data);
            string rolecode = info.rolecode;
           
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetRolePageList(rolecode,ref dt,ref errmsg);
            if (result)
            {
                string str = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", str));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
        }

        /// <summary>
        /// 获取权限页面
        /// </summary>
        private void GetRoleTableList()
        {
            string errmsg = "";
              DataTable dt = new DataTable();
            string data = Request["data"];
            RequestGetCode info = ObjectSerializeHelper.JsonToObject<RequestGetCode>(data);
            string pagecode = info.pagecode;
            string rolecode = info.rolecode;
           
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetRoleTableList(pagecode, rolecode,ref dt, ref errmsg);
            if (result)
            {
                string str = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", str));
                Response.End();
            }
            else
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
        }



        /// <summary>
        /// 查询表内容
        /// </summary>
        private void GetAll()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            RequestGetAll info = ObjectSerializeHelper.JsonToObject<RequestGetAll>(data);
            string pagecode = info.pagecode;
            string usercode = info.usercode;
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetAll(pagecode,usercode, ref dt, ref dt1,ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }


        /// <summary>
        /// 删除行
        /// </summary>
        private void deleteRow()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesDeleteRow rm = ObjectSerializeHelper.JsonToObject<RequesDeleteRow>(data);
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrow = rm.nowrow;
           
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.deleteRow(nowrow, pagecode, usercode, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }

        /// <summary>
        /// 编辑行
        /// </summary>
        private void updateRow()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesRow rm = ObjectSerializeHelper.JsonToObject<RequesRow>(data);


            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.updateRow(rm.编辑的数据, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }




        /// <summary>
        /// 查询行dengdeng
        /// </summary>
        private void GetRow()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            DataTable dt2 = new DataTable();
            DataTable dt3 = new DataTable();
            DataTable dt4 = new DataTable();
            DataTable dt5 = new DataTable();
            RequestRow info = ObjectSerializeHelper.JsonToObject<RequestRow>(data);
            string pagecode = info.pagecode;
            string usercode = info.usercode;
            string nowrow   =  info.nowrow;
          
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetRow(pagecode, usercode, nowrow, ref dt, ref dt1, ref dt2, ref dt3,ref dt4,ref  dt5,ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower)
                                + ",\"data2\":" + ObjectSerializeHelper.DataTableToJson(dt2, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data3\":" + ObjectSerializeHelper.DataTableToJson(dt3, ObjectSerializeHelper.ColumnNameLetterCase.ToLower)
                                + ",\"data4\":" + ObjectSerializeHelper.DataTableToJson(dt4, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data5\":" + ObjectSerializeHelper.DataTableToJson(dt5, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }




        /// <summary>
        /// 删除表头
        /// </summary>
        private void deleteHead()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesDelete rm = ObjectSerializeHelper.JsonToObject<RequesDelete>(data);
            //string hcode = rm.hcode;
            //string pagecode = rm.pagecode;
            //string usercode = rm.usercode;
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.deleteHead(rm.要删除的数据,ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }



        /// <summary>
        /// 判断权限
        /// </summary>
        private void checkRow()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequescheckRow rm = ObjectSerializeHelper.JsonToObject<RequescheckRow>(data);
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrow = rm.nowrow;
       

            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.checkRow(pagecode, usercode, nowrow, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }


        /// <summary>
        /// 判断编辑标题权限
        /// </summary>
        private void checkUpdateHeader()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequescheckRow rm = ObjectSerializeHelper.JsonToObject<RequescheckRow>(data);
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrow = rm.nowrow;


            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.checkUpdateHeader(pagecode, usercode, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }


        /// <summary>
        /// 判断删除行权限
        /// </summary>
        private void checkDeleteRow()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequescheckRow rm = ObjectSerializeHelper.JsonToObject<RequescheckRow>(data);
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrow = rm.nowrow;


            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.checkDeleteRow(pagecode, usercode, nowrow, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }

        /// <summary>
        /// 点击允许
        /// </summary>
        private void Apply()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesTure rm = ObjectSerializeHelper.JsonToObject<RequesTure>(data);
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrows = rm.nowrows;
            string sort = rm.sort;
        
           
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.Apply(pagecode, nowrows, sort,  usercode, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }



        /// <summary>
        /// 点击驳回
        /// </summary>
        private void Applyfalse()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesFalse rm = ObjectSerializeHelper.JsonToObject<RequesFalse>(data);
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrows = rm.nowrows;
            string sort = rm.sort;
            string cause = rm.cause;

            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.Applyfalse(pagecode, nowrows, sort, cause, usercode, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }

        /// <summary>
        /// 查询
        /// </summary>
        private void Getfalse()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            RequesGetFalse rm = ObjectSerializeHelper.JsonToObject<RequesGetFalse>(data);
            string pagecode = rm.pagecode;
            string nowrow = rm.nowrow;
          
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.Getfalse(pagecode, nowrow, ref dt,ref dt1,ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }

        /// <summary>
        /// 编辑表头数据
        /// </summary>
        private void updateHeader()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesHead rm = ObjectSerializeHelper.JsonToObject<RequesHead>(data);
            string hname = rm.hname;
            string pagecode = rm.pagecode;
            string usercode = rm.usercode;
            string nowrow = rm.nowrow;
            string nowline = rm.nowline;
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.updateHeader(pagecode, hname, usercode, nowrow, nowline, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }



        /// <summary>
        /// 查询驳回
        /// </summary>
        private void GetfalseB()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesGetFalseB rm = ObjectSerializeHelper.JsonToObject<RequesGetFalseB>(data);
            string pagecode = rm.pagecode;
            string nowrow = rm.nowrow;

            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetfalseB(pagecode, nowrow, ref dt, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }


        /// <summary>
        /// 查询通过
        /// </summary>
        private void GetTrue()
        {
            string errmsg = "";
            string data = Request["data"];
            DataTable dt = new DataTable();
            RequesGetTure rm = ObjectSerializeHelper.JsonToObject<RequesGetTure>(data);
            string pagecode = rm.pagecode;
            string nowrow = rm.nowrow;
            

            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.GetTrue(pagecode, nowrow, ref dt, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }



        ///// <summary>
        ////
        ///// </summary>
        //private void GetWork()
        //{
        //    string errmsg = "";
        //    string data = Request["data"];
        //    DataTable dt = new DataTable();
        //    RequesChoose rm = ObjectSerializeHelper.JsonToObject<RequesChoose>(data);
        //    string search = rm.search;
        //    string pagesize = rm.pagesize;
        //    string usercode = rm.page;
        //    string hcode = rm.totalnum;
        //    string pagecode = rm.pagecode;
        //    string usercode = rm.usercode;
        //    string hcode = rm.hcode;
        //    string pagecode = rm.pagecode;
        //    string usercode = rm.usercode;
        //    BLLUserManage mybll = new BLLUserManage();
        //    bool result = mybll.GetWork(search, pagesize, page, totalnum, pagecount, pagecode, rm.类型, ref dt, ref errmsg);
        //    if (!result)
        //    {

        //        Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
        //        Response.End();
        //    }
        //    else
        //    {
        //        string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
        //        Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
        //        Response.End();
        //    }

        //}


    }
    
}