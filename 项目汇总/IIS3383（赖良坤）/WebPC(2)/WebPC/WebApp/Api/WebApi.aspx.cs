using BLL;
using Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApp.Api
{
    public partial class WebApi : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            if (!string.IsNullOrWhiteSpace(action))
            {
                switch (action)
                {
                    case "login"://登录用户
                        LoginRequest();
                        break;
                    case "checkuser"://检查用户,并保持会话
                        CheckUser();
                        break;
                    case "requestdata"://请求数据
                        RequestData();
                        break;
                    case "getuserinfo"://获取用户信息
                        GetUserInfo();
                        break;
                    case "logout"://注销登录
                        Logout();
                        break;
                    case "setuserreadnotify"://设置用户通知消息为已读
                        SetUserReadNotify();
                        break;
                    case "getuserpagelist"://获取用户页面列表
                        GetUserPageList();
                        break;
                    case "tableexport"://表格导出
                        TableExport();
                        break;
                    case "tableimport"://表格导入
                        TableImport();
                        break;
                }
            }
        }




        /// <summary>
        /// 此方法实现从二进制流还原Dataset数据
        /// </summary>
        /// <returns></returns>
        public DataSet BinaryToDataset(byte[] bUserData)
        {
            if (bUserData == null)
            {
                //MessageBox.Show("二进制数据流为空");
                //err = "";
                return null;
            }
            // 反序列化的过程
            MemoryStream ms = new MemoryStream(bUserData);
            IFormatter bf = new BinaryFormatter();
            object obj = bf.Deserialize(ms);
            DataSet dsResult = (DataSet)obj;
            ms.Close();
            return dsResult;
        }

        /// <summary>
        /// 表格导入
        /// </summary>
        private void TableImport()
        {
            Response.ContentType = "text/html";
            string errmsg = "";
            string urltype = Request["urltype"];//请求类型,IIS,Tomcat
            string pageurl = Request["pageurl"];//代码
            string data = "";//数据
            ResultInfo outjson = new ResultInfo();
            DataTable dt = new DataTable();
            string path = HttpRuntime.AppDomainAppPath.ToString();
            if (System.Web.HttpContext.Current.Request.Files.Count == 0)
            {
                errmsg = "未选择文件";
                outjson.errcode = -1;
                outjson.errmsg = errmsg;
                Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                Response.End();
            }
            else
            {
                System.IO.Stream stream = System.Web.HttpContext.Current.Request.Files[0].InputStream;
                bool result = DataHelp.ExcelFileStreamToDataTable(path, stream, ref dt, ref errmsg);
                if (result)
                {
                    data = ObjectSeriallizeHelper.DataTableToJson(dt, ObjectSeriallizeHelper.ColumnNameLetterCase.Original);
                    if (Session["userinfo"] != null)
                    {
                        UserInfo userinfo = new UserInfo();
                        userinfo = (UserInfo)Session["userinfo"];
                        BLLRequestData mybll = new BLLRequestData();
                        string json = "";
                        switch (urltype)
                        {
                            case "IIS":
                                data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                                data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                                result = mybll.RequestIISData(pageurl, data, ref json, ref errmsg);
                                if (!result)
                                {
                                    outjson.errcode = -1;
                                    outjson.errmsg = errmsg;
                                }
                                break;
                            case "IIS3676":
                                data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                                data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                                
                                result = mybll.RequestIIS3676Data(pageurl, data, ref json, ref errmsg);
                                if (!result)
                                {
                                    outjson.errcode = -1;
                                    outjson.errmsg = errmsg;
                                }
                                break;
                            case "IIS3380":
                                data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                                data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                                result = mybll.RequestIIS3380Data(pageurl, data, userinfo.usercode, ref json, ref errmsg);
                                if (!result)
                                {
                                    outjson.errcode = -1;
                                    outjson.errmsg = errmsg;
                                }
                                break;
                            case "Tomcat":

                                break;
                            default:
                                result = false;
                                outjson.errcode = -1;
                                outjson.errmsg = "请求出错，未找到对应服务器";
                                break;
                        }
                        if (result)
                        {
                            Response.Write(json);
                            Response.End();
                        }
                        else
                        {
                            Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                            Response.End();
                        }
                    }
                    else
                    {
                        outjson.errcode = -1;
                        outjson.errmsg = "登录信息已过期，请重新登录";
                        Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                        Response.End();
                    }
                }
                else
                {
                    outjson.errcode = -1;
                    outjson.errmsg = errmsg;
                    Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                    Response.End();
                }
            }
        }




        /// <summary>
        /// 表格导出
        /// </summary>
        private void TableExport()
        {
            string errmsg = "";
            string urltype = Request["urltype"];//请求类型,IIS,Tomcat
            string pageurl = Request["pageurl"];//代码
            string data = Request["data"];//数据
            string filename = Request["filename"];//文件名
            ResultInfo outjson = new ResultInfo();
            if (Session["userinfo"] != null)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = (UserInfo)Session["userinfo"];
                switch (pageurl)
                {
                    case "MaterialQSApi.aspx?action=closeoraclematerialqs"://关闭Oracle数据库的物料齐套
                        RequestMaterialQSCR rq = ObjectSeriallizeHelper.JsonToObject<RequestMaterialQSCR>(data);
                        rq.usercode = userinfo.usercode;
                        data = ObjectSeriallizeHelper.ObjectToJson(rq);
                        break;
                }

                BLLRequestData mybll = new BLLRequestData();
                bool result = true;
                string json = "";
                switch (urltype)
                {
                    case "IIS":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIISData(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "IIS3676":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3676Data(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "IIS3380":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3380Data(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "Tomcat":

                        break;
                    default:
                        result = false;
                        outjson.errcode = -1;
                        outjson.errmsg = "请求出错，未找到对应服务器";
                        break;
                }
                if (result)
                {
                    try
                    {
                        ExcelTable obj = ObjectSeriallizeHelper.JsonToObject<ExcelTable>(json);
                        string str_data = ObjectSeriallizeHelper.ObjectToJson(obj.data);
                        DataTable dt = ObjectSeriallizeHelper.JsonToDataTable(str_data);
                        CreateExcel(dt, filename);
                    }
                    catch (Exception ex)
                    {
                        errmsg = ex.Message.ToString();
                        result = false;
                        outjson.errcode = -1;
                        outjson.errmsg = errmsg;
                    }
                    if (!result)
                    {
                        Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                        Response.End();
                    }
                }
                else
                {
                    Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                    Response.End();
                }
            }
            else
            {
                outjson.errcode = -1;
                outjson.errmsg = "登录信息已过期，请重新登录";
                Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                Response.End();
            }
            
        }

        /// <summary>
        /// DataTable中的数据导出到Excel并下载
        /// </summary>
        /// <param name="dt">要导出的DataTable</param>
        /// <param name="FileName">Excel的文件名</param>
        public void CreateExcel(DataTable dt, string FileName)
        {
            Response.Clear();
            Response.Charset = "UTF-8";
            Response.Buffer = true;
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
            Response.AppendHeader("Content-Disposition", "attachment;filename=\"" + System.Web.HttpUtility.UrlEncode(FileName, System.Text.Encoding.UTF8) + ".xls\"");
            //Response.ContentType = "application/ms-excel";
            Response.ContentType = "application/vnd.ms-excel;charset=utf-8";
            string colHeaders = string.Empty;
            string ls_item = string.Empty;
            int al = dt.Columns.Count;
            for (int a = 0; a < dt.Columns.Count; a++)
            {
                if (a == (al - 1))
                {
                    ls_item += dt.Columns[a].ColumnName + "\n";
                }
                else
                {
                    ls_item += dt.Columns[a].ColumnName + "\t";
                }
            }
            DataRow[] myRow = dt.Select();
            int i = 0;
            int cl = dt.Columns.Count;
            foreach (DataRow row in myRow)
            {
                for (i = 0; i < cl; i++)
                {
                    if (i == (cl - 1))
                    {
                        ls_item += "" + row[i].ToString() + "\n";
                    }
                    else
                    {
                        ls_item += "" + row[i].ToString() + "\t";
                    }
                }
                Response.Output.Write(ls_item);
                ls_item = string.Empty;
            }
            Response.Output.Flush();
            Response.End();
        }

        /// <summary>
        /// 获取用户页面列表
        /// </summary>
        private void GetUserPageList()
        {
            string errmsg = "";
            ResultInfo outjson = new ResultInfo();
            if (Session["userinfo"] != null)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = (UserInfo)Session["userinfo"];
                string usercode = userinfo.usercode;
                string json = "";
                BLLUserManage mybll = new BLLUserManage();
                bool result = mybll.GetUserPageList(usercode, ref json, ref errmsg);
                if (result)
                {
                    Response.Write(json);
                    Response.End();
                }
                else
                {
                    outjson.errcode = -1;
                    outjson.errmsg = errmsg;
                    Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                    Response.End();
                }
            }
            else
            {
                outjson.errcode = -1;
                outjson.errmsg = "登录信息已过期，请重新登录";
                Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                Response.End();
            }
        }

        /// <summary>
        /// 设置用户通知消息为已读
        /// </summary>
        private void SetUserReadNotify()
        {
            string errmsg = "";
            string notifycode = Request["notifycode"];
            UserInfo userinfo = new UserInfo();
            userinfo = (UserInfo)Session["userinfo"];
            string usercode = userinfo.usercode;
            string json = "";
            BLLUserManage mybll = new BLLUserManage();
            ResultInfo outjson = new ResultInfo();
            bool result = mybll.SetUserReadNotify(usercode, notifycode, ref json, ref errmsg);
            if (result)
            {
                outjson.errcode = 0;
            }
            else
            {
                outjson.errcode = -1;
                outjson.errmsg = errmsg;
            }
            Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
            Response.End();
        }

        /// <summary>
        /// 注销登录
        /// </summary>
        private void Logout()
        {
            Session["userinfo"] = null;
            ResultInfo outjson = new ResultInfo();
            outjson.errcode = 0;
            outjson.errmsg = "";
            Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
            Response.End();
        }


        /// <summary>
        /// 获取用户信息
        /// </summary>
        private void GetUserInfo()
        {
            UserInfo userinfo = new UserInfo();
            if (Session["userinfo"] == null)
            {
                Response.End();
            }
            else
            {
                userinfo = (UserInfo)Session["userinfo"];
                userinfo.password = "***";
                Response.Write(ObjectSeriallizeHelper.ObjectToJson(userinfo));
                Response.End();
            }
        }

        /// <summary>
        /// 请求数据
        /// </summary>
        private void RequestData()
        {
            string errmsg = "";
            string urltype = Request["urltype"];//请求类型,IIS,Tomcat
            string pageurl = Request["pageurl"];//代码
            string data = Request["data"];//数据
            ResultInfo outjson = new ResultInfo();
            if (Session["userinfo"] != null)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = (UserInfo)Session["userinfo"];
                switch (pageurl)
                {
                    case "MaterialQSApi.aspx?action=closeoraclematerialqs"://关闭Oracle数据库的物料齐套
                        RequestMaterialQSCR rq = ObjectSeriallizeHelper.JsonToObject<RequestMaterialQSCR>(data);
                        rq.usercode = userinfo.usercode;
                        data = ObjectSeriallizeHelper.ObjectToJson(rq);
                        break;
                }

                BLLRequestData mybll = new BLLRequestData();
                bool result = true;
                string json = "";
                switch (urltype)
                {
                    case "IIS":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIISData(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "IIS3676":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3676Data(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "IIS3380":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3380Data(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "IIS3382":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3382Data(pageurl, data, ref json, ref errmsg);
                        if (!result)
                        {
                            outjson.errcode = -1;
                            outjson.errmsg = errmsg;
                        }
                        break;
                    case "Tomcat":

                        break;
                    default:
                        result = false;
                        outjson.errcode = -1;
                        outjson.errmsg = "请求出错，未找到对应服务器";
                        break;
                }
                if (result)
                {
                    Response.Write(json);
                    Response.End();
                }
                else
                {
                    Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                    Response.End();
                }
            }
            else
            {
                outjson.errcode = -1;
                outjson.errmsg = "登录信息已过期，请重新登录";
                Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
                Response.End();
            }
            
        }

        /// <summary>
        /// 检查用户并保持会话
        /// </summary>
        private void CheckUser()
        {
            string errmsg = "";
            ResultInfo outjson = new ResultInfo();
            if (Session["userinfo"] != null)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = (UserInfo)Session["userinfo"];
                outjson.errcode = 0;
                string unnotify = "";
                BLLUserManage mybll = new BLLUserManage();
                bool result = mybll.GetUserUnNotify(userinfo.usercode, ref unnotify, ref errmsg);
                NotifyList info_notify = ObjectSeriallizeHelper.JsonToObject<NotifyList>(unnotify);
                outjson.notify = ObjectSeriallizeHelper.ObjectToJson(info_notify.data);

                string tasknotify = "";
                result = mybll.GetUserTaskNotify(userinfo.usercode, ref tasknotify, ref errmsg);
                TaskNotifyList info_task = ObjectSeriallizeHelper.JsonToObject<TaskNotifyList>(tasknotify);
                outjson.tasknotify = ObjectSeriallizeHelper.ObjectToJson(info_task.data);

                string mytaskunfinished = "";
                result = mybll.GetMyTaskUnfinishedList(userinfo.usercode, ref mytaskunfinished, ref errmsg);
                MyTaskList info_mytask = ObjectSeriallizeHelper.JsonToObject<MyTaskList>(mytaskunfinished);
                outjson.mytaskunfinished = ObjectSeriallizeHelper.ObjectToJson(info_mytask.data);

                string myacceptnotify = "";
                result = mybll.GetMyTaskUnfinishedList(userinfo.usercode, ref myacceptnotify, ref errmsg);
                MyAcceptTaskList info_myaccepttask = ObjectSeriallizeHelper.JsonToObject<MyAcceptTaskList>(myacceptnotify);
                outjson.myaccepttask = ObjectSeriallizeHelper.ObjectToJson(info_myaccepttask.data);
            }
            else
            {
                outjson.errcode = -1;
                outjson.errmsg = "未登录";
            }
            Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
            Response.End();
        }

        /// <summary>
        /// 登录用户请求
        /// </summary>
        private void LoginRequest()
        {
            string errmsg = "";
            string json = "";
            string account = Request["account"];
            string password = Request["password"];
            ResultInfo outjson = new ResultInfo();
            BLLUserManage mybll = new BLLUserManage();
            bool result = mybll.LoginRequest(account, password, ref json, ref errmsg);
            if (result)
            {
                LoginResuleInfo loginresult = ObjectSeriallizeHelper.JsonToObject<LoginResuleInfo>(json);
                if (loginresult.errcode == 0)
                {
                    Session["userinfo"] = loginresult.data[0];
                    outjson.errcode = 0;
                }
                else
                {
                    outjson.errcode = -1;
                    outjson.errmsg = loginresult.errmsg;    
                }
            }
            else
            {
                outjson.errcode = -1;
                outjson.errmsg = errmsg;
            }
            Response.Write(ObjectSeriallizeHelper.ObjectToJson(outjson));
            Response.End();
        }
    }
}