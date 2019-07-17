using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLSequence
    {
        /// <summary>
        /// 获取用户代码
        /// </summary>
        /// <param name="UserCode">返回流水用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUserCode(ref string UserCode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("UserCode", 10, "mt", ref Sequence, ref errmsg);
            UserCode = "mt" + Sequence.ToString().PadLeft(8, '0');
            return result;
        }
        /// 获取excle表头代码
        /// </summary>
        /// <param name="code">业务通知类型代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetExcelCode(ref string code, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("exheardecode", 10, "eh", ref Sequence, ref errmsg);
            code = "eh" + Sequence.ToString().PadLeft(8, '0');
            return result;
        }
       

        /// <summary>
        /// 获取部门代码
        /// </summary>
        /// <param name="UserCode">返回流水部门代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetDepartmentCode(ref string DepartmentCode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("DepartmentCode", 6, "d", ref Sequence, ref errmsg);
            DepartmentCode = "d" + Sequence.ToString().PadLeft(5, '0');
            return result;
        }
        /// <summary>
        /// 获取工单号代码
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetWORDERCODE(ref string WORDERCODE, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("WORDERCODE", 10, "gd", ref Sequence, ref errmsg);
            WORDERCODE = "gd" + Sequence.ToString().PadLeft(8, '0');
            return result;
        }

        public bool GetUSERCODE(ref string USERCODE, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("USERCODE", 6, "mgd", ref Sequence, ref errmsg);
            USERCODE = "mgd" + Sequence.ToString().PadLeft(5, '0');
            return result;
        }



        /// <summary>
        /// 创建表id
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetExT(ref string createcode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("createcode", 5, "T", ref Sequence, ref errmsg);
            createcode = "T" + Sequence.ToString().PadLeft(4, '0');
            return result;
        }

        /// 创建表头
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetEx(ref string Hcode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("Hcode", 5, "F", ref Sequence, ref errmsg);
            Hcode = "F" + Sequence.ToString().PadLeft(4, '0');
            return result;
        }


        /// 添加表表
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool addPage(ref string pagecode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("pagecode", 5, "EP", ref Sequence, ref errmsg);
            pagecode = "EP" + Sequence.ToString().PadLeft(3, '0');
            return result;
        }

        /// 提交申请用车表
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Apply(ref string applycode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("applycode", 7, "U", ref Sequence, ref errmsg);
            applycode = "U" + Sequence.ToString().PadLeft(6, '0');
            return result;
        }


        /// 提交申请用车表
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool ApplyD(ref string applycode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("applycode", 7, "D", ref Sequence, ref errmsg);
            applycode = "D" + Sequence.ToString().PadLeft(6, '0');
            return result;
        }


        /// 驳回表自增
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool addfalse(ref string recode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("recode", 5, "b", ref Sequence, ref errmsg);
            recode = "b" + Sequence.ToString().PadLeft(4, '0');
            return result;
        }



        /// 申请用车表 筛选车牌
        /// </summary>
        /// <param name="WORDERCODE">返回流水图片代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Application(ref string playcode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("playcode", 8, "P", ref Sequence, ref errmsg);
            playcode = "P" + Sequence.ToString().PadLeft(7, '0');
            return result;
        }

    }
}
