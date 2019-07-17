using DAL;

using Entity;
using Entity.Request;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using WebApp.WebApp;

namespace BLL
{
    public class BLLUserManage
    {
        
      
       

        ////e插入数据
        //public bool UpdateExT(RequesEX[] ext, ref string errmsg)
        //{
        //    bool result = true;          
        //    string createcode = "";
        //    BLLSequence mybll = new BLLSequence();
        //    result = mybll.GetExT(ref createcode, ref errmsg);
        //    if (result)
        //    { 
        //        DALUserManage mydal = new DALUserManage();
        //        result = mydal.UpdateExT( ext,createcode, ref errmsg);
        //    }                 
        //    return result;
        //}


        //e插入数据表头
        public bool UpdateEx(Reques1[][] extt, ref string errmsg)
        {
            bool result = true;
            for (int i = 0; i < extt.Length; i++)
            {
                for (int j = 0; j < extt[i].Length; j++)
                {

                    string pagecode = extt[i][j].pagecode;
                    string hname = extt[i][j].Hname;
                    string breadth = extt[i][j].breadth;
                    int nowrow = extt[i][j].nowrow;
                    int nowline = extt[i][j].nowline;
                    string takerow = extt[i][j].takerow;
                    string takeline = extt[i][j].takeline;
                    string usercode = extt[i][j].usercode;

                    string Hcode = "";
                    BLLSequence mybll = new BLLSequence();
                    result = mybll.GetEx(ref Hcode, ref errmsg);
                    if (result)
                    {
                        DALUserManage mydal = new DALUserManage();
                        result = mydal.UpdateEx(Hcode, pagecode, hname, breadth, nowrow, nowline, takerow,takeline, usercode, ref errmsg);
                    }

                }
            }
                    return result;
             
        }


        ///// <summary>
        ///// 插入对应值
        ///// </summary>
        ///// <param name="errmsg">出错时返回的错误提示信息</param>
        ///// <returns>出错时返回的错误提示信息</returns>
        //public bool UpdateExRc(字段值数组[] rqc, ref string errmsg)
        //{
        //    bool result = true;
        //    DALUserManage d = new DALUserManage();
        //    result = d.UpdateExRc( rqc, ref errmsg);
        //    return result;
        //}



        /// <summary>
        /// 插入对应值
        /// </summary>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>出错时返回的错误提示信息</returns>
        public bool UpdateExRc(Reques2[][] extt, ref string errmsg)
        {
            bool result = true;
            DALUserManage d = new DALUserManage();
            int aaa = 0;
            for (int i = 0; i < extt.Length; i++)
            {
                for (int j = 0; j <extt[i].Length; j++)
                {
                 
                    string pagecode = extt[i][j].pagecode;
                    string hcode = extt[i][j].hcode;
                   // string content = extt[i][j].line;
                    string nowline = extt[i][j].nowline;
                    string nowrow = extt[i][j].nowrow;
                    string content = extt[i][j].content;
                    string usercode = extt[i][j].usercode;
                    
                    if( j== extt[i].Length - 1)
                    {
                        aaa = 1;
                    }
                    DALUserManage mydal = new DALUserManage();
                    result = mydal.UpdateExRc(hcode, pagecode, content,nowrow, nowline, usercode, aaa,ref errmsg);
                 
                   
                }
                    
            }

            return result;
        }
        /// <summary>
        /// 查询表名
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetEX(string usercode, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.GetEX(usercode, ref dt, ref errmsg);
            return result;
        }



        /// <summary>
        /// 查询表内容
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAll(string pagecode, string usercode, ref DataTable dt, ref  DataTable dt1, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.GetAll(pagecode, usercode, ref dt, ref dt1, ref errmsg);
            return result;
        }

        /// <summary>
        /// 角色授权使用页面
        /// </summary>
        /// <param name="rolecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool RoleAuthority(string rolecode, List<RequestRoleAuthorityPage> rolepage, string usercode, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.RoleAuthority(rolecode, rolepage, usercode, ref errmsg);
            return result;
        }


        /// <summary>
        /// 角色授权使用权限
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool RoleAu(string pagecode, List<RequestRolePage> rolepage, string usercode, string rolecode, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.RoleAu(pagecode, rolepage, usercode, rolecode, ref errmsg);
            return result;
        }

        /// <summary>
        /// 添加微信端页面信息
        /// </summary>
    
        /// <returns>是否成功执行</returns>
        public bool addPage(string pagename, string usercode, 审核用户[] ad, ref string errmsg)
        {
            bool result = true;
            string pagecode = "";
            BLLSequence myseq = new BLLSequence();
            result = myseq.addPage(ref pagecode, ref errmsg);
            if (result)
            {
                DALUserManage mydal = new DALUserManage();
                result = mydal.addPage(pagecode, pagename, usercode,  ad, ref errmsg);
            }
            return result;
        }



        /// <summary>
        /// 获取表名页面列表
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetRolePageList(string rolepage, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.GetRolePageList(rolepage,ref dt, ref errmsg);
            return result;
        }


        /// <summary>
        /// 获取权限页面
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetRoleTableList(string pagecode, string rolecode,ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.GetRoleTableList(pagecode, rolecode,  ref dt, ref errmsg);
            return result;
        }




        /// <summary>
        /// 删除行
        /// </summary>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>出错时返回的错误提示信息</returns>
        public bool deleteRow(string nowrow, string pagecode, string usercode, ref string errmsg)
        {
            bool result = true;
            DALUserManage d = new DALUserManage();
            result = d.deleteRow(nowrow, pagecode, usercode,ref errmsg);
            return result;
        }


        /// 查询行
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetRow(string pagecode, string usercode, string nowrow, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref DataTable dt4, ref DataTable dt5, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.GetRow(pagecode, usercode, nowrow, ref dt, ref dt1, ref dt2, ref dt3,ref dt4,ref  dt5,ref errmsg);
            return result;
        }


        ////e插入数据
        public bool updateRow(编辑的数据[] rm,ref string errmsg)
        {
            bool result = true;
         
                DALUserManage mydal = new DALUserManage();
                result = mydal.updateRow(rm, ref errmsg);
            
            return result;
        }

        ////e插入数据
        public bool deleteHead(要删除的数据[] ext, ref string errmsg)
        {
            bool result = true;
            
            DALUserManage mydal = new DALUserManage();
            result = mydal.deleteHead(ext, ref errmsg);

            return result;
        }



        ////判断权限
        public bool checkRow(string pagecode, string usercode, string nowrow, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.checkRow(pagecode, usercode, nowrow, ref errmsg);

            return result;
        }


        ////判断删除权限
        public bool checkDeleteRow(string pagecode, string usercode, string nowrow, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.checkDeleteRow(pagecode, usercode, nowrow, ref errmsg);

            return result;
        }


        ////判断编辑表标题权限
        public bool checkUpdateHeader(string pagecode, string usercode, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.checkUpdateHeader(pagecode, usercode,ref errmsg);

            return result;
        }



        ///点击允许
        public bool Apply(string pagecode, string nowrows, string sort, string usercode, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.Apply(pagecode, nowrows, sort, usercode, ref errmsg);

            return result;
        }


        ///点击驳回
        public bool Applyfalse(string pagecode, string nowrows, string sort, string cause, string usercode, ref string errmsg)
        {
            bool result = true;
                 DALUserManage mydal = new DALUserManage();
                 result = mydal.Applyfalse(pagecode, nowrows, sort, cause, usercode, ref errmsg);
            
            return result;
        }



        ///查询状态
        public bool Getfalse(string pagecode, string nowrow,ref DataTable dt ,ref DataTable dt1,ref string errmsg)
        {
            bool result = true;
         
            DALUserManage mydal = new DALUserManage();
            result = mydal.Getfalse(pagecode, nowrow, ref dt, ref dt1,ref errmsg);

            return result;
        }



        ////编辑表头的数据
        public bool updateHeader(string pagecode, string hname, string usercode, string nowrow, string nowline, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.updateHeader(pagecode, hname, usercode, nowrow, nowline, ref errmsg);

            return result;
        }


        ///查询驳回
        public bool GetfalseB(string pagecode, string nowrow, ref DataTable dt, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.GetfalseB(pagecode, nowrow, ref dt, ref errmsg);

            return result;
        }



        ///查询驳回
        public bool GetTrue(string pagecode, string nowrow,  ref DataTable dt, ref string errmsg)
        {
            bool result = true;

            DALUserManage mydal = new DALUserManage();
            result = mydal.GetTrue(pagecode, nowrow, ref dt, ref errmsg);

            return result;
        }



        //public bool GetWork(string search, int pagesize, int page, ref int totalnum, ref int pagecount, string pagecode, 类型[] rm, ref DataTable dt, ref string errmsg)
        //{
        //    bool result = true;

        //    DALUserManage mydal = new DALUserManage();
        //    result = mydal.GetWork(search, pagesize, page, totalnum, pagecount, pagecode, rm, ref dt, ref errmsg);

        //    return result;
        //}
    }
}
