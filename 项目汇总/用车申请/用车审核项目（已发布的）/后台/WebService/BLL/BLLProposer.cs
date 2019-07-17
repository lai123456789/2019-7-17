using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLProposer
    {

        /// <summary>
        /// 提交用车申请
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Apply(string applyname, string accent, string department, string purpose, string endsite, string servicetime, string returntime, string usercode, ref string errmsg)
        {
            string applycode = "";
            bool result = true;
            BLLSequence myseq = new BLLSequence();
            result = myseq.Apply(ref applycode, ref errmsg);
            if (result)
            {
                DALProposer mydal = new DALProposer();
                result = mydal.Apply(applycode, applyname, accent, department, purpose, endsite, servicetime, returntime, usercode, ref errmsg);
            }
            return result;
        }

        /// <summary>
        /// 筛选车牌
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Application(string applycode, string platenumber, string remark, string susercode, ref string errmsg)
        {
            string playcode = "";
            bool result = true;
            BLLSequence myseq = new BLLSequence();
            result = myseq.Application(ref playcode, ref errmsg);
            if (result)
            {
                DALProposer mydal = new DALProposer();
                result = mydal.Application(applycode, playcode, platenumber, remark, susercode, ref errmsg);
            }
            return result;
        }


        /// <summary>
        /// 拒绝原因
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool ApplyFalse(string applycode, string reason, string susercode, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.ApplyFalse(applycode, reason, susercode, ref errmsg);

            return result;
        }



        /// 立即用车
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Appli(string applycode, string begin, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.Appli(applycode, begin, ref errmsg);

            return result;
        }

        /// 点击立即还车
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool AppliReturn(string applycode, string endplay, string returnremark, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.AppliReturn(applycode, endplay, returnremark, ref errmsg);

            return result;
        }


        /// 查询车库库存
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetGarage(ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetGarage(ref dt, ref errmsg);

            return result;

        }

        /// 查询自己申清单
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApply(string usercode, int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetApply(usercode, pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            return result;
        }



        /// 查询派车自己申清单
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApplyPL(string usercode, int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetApplyPL(usercode, pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            return result;
        }


        /// 依据单号查数据
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApplyCode(string applycode, ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetApplyCode(applycode, ref dt, ref errmsg);

            return result;
        }



        /// 依据单号查数据
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCar(string returntime, ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetCar(returntime, ref dt, ref errmsg);
            return result;
        }


        /// 依据单号查siji数据
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCardata(string applycode, ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetCardata(applycode, ref dt, ref errmsg);
            return result;
        }




        /// 
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetCard(ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetCard(ref dt, ref errmsg);
            return result;
        }

        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAll(int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetAll(pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            return result;
        }



        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetAllCar(int pagesize, int page, ref int totalnum, ref int pagecount, ref DataTable dt, ref DataTable dt1, ref DataTable dt2, ref DataTable dt3, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetAllCar(pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            return result;
        }


        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUsercode(string usercode, ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetUsercode(usercode, ref dt, ref errmsg);

            return result;
        }




        /// </summary>撤销申请单
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool ApplyRepeal(string applycode, string repeal, ref string errmsg)
        {
            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.ApplyRepeal(applycode, repeal, ref errmsg);

            return result;
        }


        /// <summary>
        /// 提交派车用申请
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SendCar(string applyname, string accent, string department, string proposernomber, string endsite, string purpose, string servicetime, string usercode, ref string errmsg)
        {
            string applycode = "";
            bool result = true;
            BLLSequence myseq = new BLLSequence();
            result = myseq.ApplyD(ref applycode, ref errmsg);
            if (result)
            {
                DALProposer mydal = new DALProposer();
                result = mydal.SendCar(applycode, applyname, department, accent, proposernomber, endsite, purpose, servicetime, usercode, ref errmsg);
            }
            return result;
        }


        /// 查询司机
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetDriver(ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetDriver(ref dt, ref errmsg);

            return result;

        }



        /// 派车申请被驳回
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SendFalse(string applycode, string reason, string susercode, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.SendFalse(applycode, reason, susercode, ref errmsg);

            return result;

        }

        /// <summary>
        /// 审批通过
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Approve(string applycode, string platenumber, string driver, string remark, string susercode, ref string errmsg)
        {
            string playcode = "";
            bool result = true;
            BLLSequence myseq = new BLLSequence();
            result = myseq.Application(ref playcode, ref errmsg);
            if (result)
            {
                DALProposer mydal = new DALProposer();
                result = mydal.Approve(applycode, playcode, platenumber, driver, remark, susercode, ref errmsg);
            }
            return result;
        }


        /// 立即用车
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool PAppli(string applycode, string begin, string usercode, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.PAppli(applycode, begin, usercode, ref errmsg);

            return result;
        }



        /// 立即还车
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SendReturn(string applycode, string endplay, string returnremark, string usercode, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.SendReturn(applycode, endplay, returnremark, usercode, ref errmsg);

            return result;
        }


        /// 查询派车数据
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetApplyCar(string applycode, ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetApplyCar(applycode, ref dt, ref errmsg);

            return result;
        }



        /// 查询还车数据
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetEndApply(string applycode, string usercode, ref DataTable dt, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.GetEndApply(applycode, usercode, ref dt, ref errmsg);

            return result;
        }


        //车辆情况1
        public bool GetUseCar(string platenumber, string plat, string startdate, string datetype, string enddate, string sort, string sortfield, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            DALProposer d = new DALProposer();
            result = d.GetUseCar(platenumber, plat, startdate, datetype, enddate, sort, sortfield, ref dt, ref errmsg);
            return result;
        }



        //车辆明细1

        public bool GetUseCarDetail(string platenumber, string plat, string startdate, string datetype, string enddate, string username, string applyname, string sort, string sortfield, int page, int pagesize, ref int totalnum, ref int pagecount, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            DALProposer d = new DALProposer();
            result = d.GetUseCarDetail(platenumber, plat, startdate, datetype, enddate, username, applyname, sort, sortfield, page, pagesize, ref totalnum, ref pagecount, ref dt, ref errmsg);
            return result;
        }



        /// 
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool DelayedCar(string applycode, string delayedtime, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.DelayedCar(applycode, delayedtime, ref errmsg);

            return result;
        }


        /// 重新选车牌
        /// </summary>
        /// <param name="pagecode">角色代码</param>
        /// <param name="rolepage">授权页面集合</param>
        /// <param name="usercode">操作用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool RegainCar(string applycode, string platenumber, string Oldplatenumber, string reremark, ref string errmsg)
        {

            bool result = true;
            DALProposer mydal = new DALProposer();
            result = mydal.RegainCar(applycode, platenumber, Oldplatenumber, reremark, ref errmsg);

            return result;
        }
    }
}
