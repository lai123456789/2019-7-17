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
        /// 获取业务通知类型代码
        /// </summary>
        /// <param name="bntcode">业务通知类型代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCreateTmpQRCodeScene_id(ref int scene_id, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("qrtemp", 32, "", ref Sequence, ref errmsg);
            scene_id = 1000000 + Sequence;
            return result;
        }

        /// <summary>
        /// 获取业务通知类型代码
        /// </summary>
        /// <param name="bntcode">业务通知类型代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetSlamaterialAreportCode(ref string code, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("SlAreport", 14, "slar", ref Sequence, ref errmsg);
            code = "slar" + Sequence.ToString().PadLeft(10, '0');
            return result;
        }

        /// <summary>
        /// 获取业务通知类型代码
        /// </summary>
        /// <param name="bntcode">业务通知类型代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetPCPageCode(ref string pagecode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("pagecode", 12, "pc", ref Sequence, ref errmsg);
            pagecode = "pc" + Sequence.ToString().PadLeft(9, '0');
            return result;
        }

        /// <summary>
        /// 获取业务通知类型代码
        /// </summary>
        /// <param name="bntcode">业务通知类型代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetBusinessNotifyTypeCode(ref string bntcode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("bntcode", 12, "bnt", ref Sequence, ref errmsg);
            bntcode = "bnt" + Sequence.ToString().PadLeft(9, '0');
            return result;
        }

        /// <summary>
        /// 获取订单的异常订单代码
        /// </summary>
        /// <param name="ErrorCode">异常订单代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetOrderErrorCode(ref string ErrorCode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("OrderErrorCode", 15, "eocode", ref Sequence, ref errmsg);
            ErrorCode = "eocode" + Sequence.ToString().PadLeft(9, '0');
            return result;
        }

        /// <summary>
        /// 获取任务提醒代码
        /// </summary>
        /// <param name="Code">返回流水代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetTaskNotifyCode(ref string TaskCode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("TaskNotifyCode", 15, "tncode", ref Sequence, ref errmsg);
            TaskCode = "tncode" + Sequence.ToString().PadLeft(9, '0');
            return result;
        }

        /// <summary>
        /// 获取异常类型代码
        /// </summary>
        /// <param name="Code">返回流水代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetErrorTypeCode(ref string Code, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("ErrorTypeCode", 15, "errtype", ref Sequence, ref errmsg);
            Code = "errtype" + Sequence.ToString().PadLeft(8, '0');
            return result;
        }

        /// <summary>
        /// 获取异常处理用户的唯一代码
        /// </summary>
        /// <param name="PrintCode">返回流水用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetErrorHandlingUserCode(ref string Code, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("ErrorUserCode", 15, "erruser", ref Sequence, ref errmsg);
            Code = "erruser" + Sequence.ToString().PadLeft(8, '0');
            return result;
        }

        /// <summary>
        /// 获取打印代码
        /// </summary>
        /// <param name="PrintCode">返回流水用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetPrintCode(ref string PrintCode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("PrintCode", 12, "pr", ref Sequence, ref errmsg);
            PrintCode = "pr" + Sequence.ToString().PadLeft(10, '0');
            return result;
        }

        /// <summary>
        /// 获取消息通知代码
        /// </summary>
        /// <param name="NotifyCode">返回流水用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetNotifyCode(ref string NotifyCode, ref string errmsg)
        {
            bool result = true;
            DALSequence mydal = new DALSequence();
            int Sequence = 0;
            result = mydal.GenerateSequence("NotifyCode", 10, "ny", ref Sequence, ref errmsg);
            NotifyCode = "ny" + Sequence.ToString().PadLeft(8, '0');
            return result;
        }

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
    }
}
