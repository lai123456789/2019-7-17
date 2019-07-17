using BLL;
using Common;
using Entity.Request;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApp
{
    public partial class Proposer : ApiBasic
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {

                    case "Apply"://提交用车申请
                        Apply();
                        break;

                    case "Application"://管理员筛选车牌
                        Application();
                        break;

                    case "ApplyFalse"://拒绝原因
                        ApplyFalse();
                        break;

                    case "Appli"://立即用车
                        Appli();
                        break;

                    case "AppliReturn"://立即还车
                        AppliReturn();
                        break;

                    case "GetGarage"://查询车辆库存
                        GetGarage();
                        break;

                    case "GetApply"://查询自己清单
                        GetApply();
                        break;

                    case "GetApplyCode"://依据单号查数据
                        GetApplyCode();
                        break;

                    case "GetAll"://汇总用车
                        GetAll();
                        break;

                    case "GetAllCar"://汇总派车
                        GetAllCar();
                        break;

                    case "GetUsercode"://提交申请查出用户
                        GetUsercode();
                        break;

                    case "ApplyRepeal"://撤销申请单
                        ApplyRepeal();
                        break;
                    case "SendCar"://提交派车申请
                        SendCar();
                        break;
                    case "GetDriver"://查询司机
                        GetDriver();
                        break;

                    case "SendFalse"://拒绝派车申请
                        SendFalse();
                        break;

                    case "Approve"://审批挑选司机和车牌
                        Approve();
                        break;

                    case "PAppli"://立即用车
                        PAppli();
                        break;
                    case "SendReturn"://立即还车
                        SendReturn();
                        break;

                    case "GetApplyCar"://查询派车数据
                        GetApplyCar();
                        break;
                    case "GetEndApply"://查询还车数据
                        GetEndApply();
                        break;
                    case "GetApplyPL"://查看自己派车
                        GetApplyPL();
                        break;

                    case "GetCar":
                        GetCar();
                        break;

                    case "GetCard":
                        GetCard();
                        break;

                    case "GetCardata":
                        GetCardata();
                        break;

                    case "GetUseCar"://车辆情况
                        GetUseCar();
                        break;
                    case "GetUseCarDetail"://车辆明细
                        GetUseCarDetail();
                        break;

                    case "DelayedCar"://延时还车
                        DelayedCar();
                        break;

                    case "RegainCar"://重新选择车牌
                        RegainCar();
                        break;
                }
            }
        }


        /// <summary>
        /// 提交用车申请
        /// </summary>
        private void Apply()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesPL rm = ObjectSerializeHelper.JsonToObject<RequesPL>(data);
            string applyname = rm.applyname;
            string department = rm.department;
            string purpose = rm.purpose;
            string servicetime = rm.servicetime;
            string returntime = rm.returntime;
            string usercode = rm.usercode;
            string accent = rm.accent;
            string endsite = rm.endsite;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.Apply(applyname, accent, department, purpose, endsite, servicetime, returntime, usercode, ref errmsg);
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
        /// 筛选车牌
        /// </summary>
        private void Application()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesCarNum rm = ObjectSerializeHelper.JsonToObject<RequesCarNum>(data);
            string applycode = rm.applycode;
            string platenumber = rm.platenumber;
            string remark = rm.remark;
            string susercode = rm.susercode;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.Application(applycode, platenumber, remark, susercode, ref errmsg);
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
        /// 拒绝原因
        /// </summary>
        private void ApplyFalse()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];

            //string applycode = Request["applycode"];
            //string reason = Request["reason"];
            RequesCarFalse rm = ObjectSerializeHelper.JsonToObject<RequesCarFalse>(data);
            string applycode = rm.applycode;
            string reason = rm.reason;
            string susercode = rm.susercode;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.ApplyFalse(applycode, reason, susercode, ref errmsg);
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
        /// 立即用车
        /// </summary>
        private void Appli()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesCarFalse rm = ObjectSerializeHelper.JsonToObject<RequesCarFalse>(data);
            string applycode = rm.applycode;
            string begin = rm.begin;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.Appli(applycode, begin, ref errmsg);
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
        /// 立即还车
        /// </summary>
        private void AppliReturn()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            // string applycode = Request["applycode"]; string endplay = Request["endplay"]; string returnremark = Request["returnremark"];
            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string applycode = rm.applycode;
            string endplay = rm.endplay;
            string returnremark = rm.returnremark;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.AppliReturn(applycode, endplay, returnremark, ref errmsg);
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
        /// 查询车库库存
        /// </summary>
        private void GetGarage()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetGarage(ref dt, ref errmsg);
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
        /// 查询自己清单
        /// </summary>
        private void GetApply()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            DataTable dt2 = new DataTable();
            DataTable dt3 = new DataTable();
            string data = Request["data"];
            int page = 0;
            int totalnum = 0;//记录总数
            int pagecount = 0;//页总数
            int pagesize = 15;
            //  string dome = Request["dome"];
            // string usercode = Request["usercode"];
            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string usercode = rm.usercode;
            page = rm.page;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetApply(usercode, pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            if (!result)
            {
                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data2\":" + ObjectSerializeHelper.DataTableToJson(dt2, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data3\":" + ObjectSerializeHelper.DataTableToJson(dt3, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                json += ",\"pagecount\":" + pagecount;
                json += ",\"totalnum\":" + totalnum;
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }

        /// <summary>
        /// 查询自己清单
        /// </summary>
        private void GetApplyPL()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            DataTable dt2 = new DataTable();
            DataTable dt3 = new DataTable();
            string data = Request["data"];
            int page = 0;
            int totalnum = 0;//记录总数
            int pagecount = 0;//页总数
            int pagesize = 15;
            //  string dome = Request["dome"];
            // string usercode = Request["usercode"];
            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string usercode = rm.usercode;
            page = rm.page;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetApplyPL(usercode, pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data2\":" + ObjectSerializeHelper.DataTableToJson(dt2, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data3\":" + ObjectSerializeHelper.DataTableToJson(dt3, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                json += ",\"pagecount\":" + pagecount;
                json += ",\"totalnum\":" + totalnum;
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }


        /// <summary>
        /// 依据单号查数据
        /// </summary>
        private void GetApplyCode()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];

            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string applycode = rm.applycode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetApplyCode(applycode, ref dt, ref errmsg);

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
        /// 时间筛序车牌
        /// </summary>
        private void GetCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];

            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string returntime = rm.returntime;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetCar(returntime, ref dt, ref errmsg);

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
        /// siji数据
        /// </summary>
        private void GetCardata()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];

            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string applycode = rm.applycode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetCardata(applycode, ref dt, ref errmsg);

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
        /// 
        /// </summary>
        private void GetCard()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];

            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string returntime = rm.returntime;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetCard(ref dt, ref errmsg);

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
        /// 查询全部
        /// </summary>
        private void GetAll()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            DataTable dt2 = new DataTable();
            DataTable dt3 = new DataTable();
            string data = Request["data"];
            int page = 0;
            int totalnum = 0;//记录总数
            int pagecount = 0;//页总数
            int pagesize = 15;
            BLLProposer mybll = new BLLProposer();
            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);

            page = rm.page;
            bool result = mybll.GetAll(pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data2\":" + ObjectSerializeHelper.DataTableToJson(dt2, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data3\":" + ObjectSerializeHelper.DataTableToJson(dt3, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                json += ",\"pagecount\":" + pagecount;
                json += ",\"totalnum\":" + totalnum;
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }



        /// <summary>
        /// 查询全部
        /// </summary>
        private void GetAllCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            DataTable dt2 = new DataTable();
            DataTable dt3 = new DataTable();
            string data = Request["data"];
            int page = 0;
            int totalnum = 0;//记录总数
            int pagecount = 0;//页总数
            int pagesize = 15;
            BLLProposer mybll = new BLLProposer();
            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);

            page = rm.page;
            bool result = mybll.GetAllCar(pagesize, page, ref totalnum, ref pagecount, ref dt, ref dt1, ref dt2, ref dt3, ref errmsg);

            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data1\":" + ObjectSerializeHelper.DataTableToJson(dt1, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data2\":" + ObjectSerializeHelper.DataTableToJson(dt2, ObjectSerializeHelper.ColumnNameLetterCase.ToLower) + ",\"data3\":" + ObjectSerializeHelper.DataTableToJson(dt3, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                json += ",\"pagecount\":" + pagecount;
                json += ",\"totalnum\":" + totalnum;
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }

        }



        /// <summary>
        /// 提交申请
        /// </summary>
        private void GetUsercode()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            // string usercode = Request["usercode"];
            RequesReturnCar rm = ObjectSerializeHelper.JsonToObject<RequesReturnCar>(data);
            string usercode = rm.usercode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetUsercode(usercode, ref dt, ref errmsg);

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
        /// 撤销申请单
        /// </summary>
        private void ApplyRepeal()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            //string usercode = Request["usercode"];
            RequesCar rm = ObjectSerializeHelper.JsonToObject<RequesCar>(data);
            string applycode = rm.applycode;
            string repeal = rm.repeal;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.ApplyRepeal(applycode, repeal, ref errmsg);

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
        /// 提交派车申请单
        /// </summary>
        private void SendCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            //string usercode = Request["usercode"];
            RequesSendCar rm = ObjectSerializeHelper.JsonToObject<RequesSendCar>(data);
            string applyname = rm.applyname;
            string accent = rm.accent;
            string department = rm.department;
            string proposernomber = rm.proposernomber;
            string endsite = rm.endsite;
            string purpose = rm.purpose;
            string servicetime = rm.servicetime;
            string usercode = rm.usercode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.SendCar(applyname, accent, department, proposernomber, endsite, purpose, servicetime, usercode, ref errmsg);


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
        /// 查询司机
        /// </summary>
        private void GetDriver()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetDriver(ref dt, ref errmsg);
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
        /// 驳回派车申请
        /// </summary>
        private void SendFalse()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesSendFalse rm = ObjectSerializeHelper.JsonToObject<RequesSendFalse>(data);
            string applycode = rm.applycode;
            string reason = rm.reason;
            string susercode = rm.susercode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.SendFalse(applycode, reason, susercode, ref errmsg);

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
        /// 审批通过筛选车牌
        /// </summary>
        private void Approve()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesCarNums rm = ObjectSerializeHelper.JsonToObject<RequesCarNums>(data);
            string applycode = rm.applycode;
            string platenumber = rm.platenumber;
            string remark = rm.remark;
            string susercode = rm.susercode;
            string driver = rm.driver;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.Approve(applycode, platenumber, driver, remark, susercode, ref errmsg);
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
        /// 立即用车
        /// </summary>
        private void PAppli()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesCarFalse rm = ObjectSerializeHelper.JsonToObject<RequesCarFalse>(data);
            string applycode = rm.applycode;
            string begin = rm.begin;
            string usercode = rm.usercode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.PAppli(applycode, begin, usercode, ref errmsg);
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
        /// 立即还车
        /// </summary>
        private void SendReturn()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesCarFalse rm = ObjectSerializeHelper.JsonToObject<RequesCarFalse>(data);
            string applycode = rm.applycode;
            string endplay = rm.endplay;
            string returnremark = rm.returnremark;
            string usercode = rm.usercode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.SendReturn(applycode, endplay, returnremark, usercode, ref errmsg);
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
        /// 查询派车
        /// </summary>
        private void GetApplyCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesCarFalse rm = ObjectSerializeHelper.JsonToObject<RequesCarFalse>(data);
            string applycode = rm.applycode;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetApplyCar(applycode, ref dt, ref errmsg);
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
        /// 查询单号数据
        /// </summary>
        private void GetEndApply()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesSendFalse rm = ObjectSerializeHelper.JsonToObject<RequesSendFalse>(data);
            string applycode = rm.applycode;
            string usercode = rm.usercode;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetEndApply(applycode, usercode, ref dt, ref errmsg);

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
        /// 车辆情况
        /// </summary>
        private void GetUseCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];


            RequesUseCar rm = ObjectSerializeHelper.JsonToObject<RequesUseCar>(data);
            string platenumber = rm.oneval;
            string plat = rm.onetype;
            string datetype = rm.datetype;
            // string usercode = rm.usercode;
            string startdate = rm.startdate;
            string enddate = rm.enddate;
            string sort = rm.sort;
            string sortfield = rm.sortfield;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetUseCar(platenumber, plat, startdate, datetype, enddate, sort, sortfield, ref dt, ref errmsg);
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
        /// 车辆明细
        /// </summary>
        private void GetUseCarDetail()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];

            int page = 0;
            int totalnum = 0;//记录总数
            int pagecount = 0;//页总数
            int pagesize = 20;
            RequesUseCar rm = ObjectSerializeHelper.JsonToObject<RequesUseCar>(data);
            string platenumber = rm.oneval;
            string plat = rm.onetype;
            string datetype = rm.datetype;
            // string usercode = rm.usercode;
            string startdate = rm.startdate;
            string enddate = rm.enddate;
            string username = rm.username;
            string applyname = rm.applyname;
            string sort = rm.sort;
            string sortfield = rm.sortfield;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.GetUseCarDetail(platenumber, plat, startdate, datetype, enddate, username, applyname, sort, sortfield, page, pagesize, ref totalnum, ref pagecount, ref dt, ref errmsg);
            if (!result)
            {

                Response.Write(outjson.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
            }
            else
            {
                string json = "\"data\":" + ObjectSerializeHelper.DataTableToJson(dt, ObjectSerializeHelper.ColumnNameLetterCase.ToLower);
                json += ",\"pagecount\":" + pagecount;
                json += ",\"totalnum\":" + totalnum;
                Response.Write(outjson.Replace("#code#", "0").Replace("#msg#", "").Replace("\"data\":null", json));
                Response.End();
            }
        }



        /// <summary>
        /// 延时还车
        /// </summary>
        private void DelayedCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesDCar rm = ObjectSerializeHelper.JsonToObject<RequesDCar>(data);
            string applycode = rm.applycode;
            string delayedtime = rm.delayedtime;
            BLLProposer mybll = new BLLProposer();
            bool result = mybll.DelayedCar(applycode, delayedtime, ref errmsg);

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
        /// 重新选择车牌
        /// </summary>
        private void RegainCar()
        {
            string errmsg = "";
            DataTable dt = new DataTable();
            string data = Request["data"];
            RequesDCar rm = ObjectSerializeHelper.JsonToObject<RequesDCar>(data);
            string applycode = rm.applycode;
            string platenumber = rm.platenumber;
            string Oldplatenumber = rm.Oldplatenumber;
            string reremark = rm.reremark;

            BLLProposer mybll = new BLLProposer();
            bool result = mybll.RegainCar(applycode, platenumber, Oldplatenumber, reremark, ref errmsg);

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

    }
}