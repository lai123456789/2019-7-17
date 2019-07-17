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
        protected string outjosnweb = "{\"errcode\":#code#,\"errmsg\":\"#msg#\",\"data\":null}";
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
                    #region 异常消息提示 2019年5月4日09:46:02

                    case "getAbnormalMoudel"://获取用户异常模组异常以及个数消息提示
                        GsetAbnormalMoudel();
                        break;

                    #endregion
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        private void GsetAbnormalMoudel()
        {
            string errmsg = "未登录";
            if (Session["userinfo"] != null)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = (UserInfo)Session["userinfo"];
                string Abnormals = "";
                BLLUserManage mybll = new BLLUserManage();
                bool result = mybll.GsetAbnormalMoudel(userinfo.usercode, ref Abnormals, ref errmsg);
                Response.Write(Abnormals);
                Response.End();
            }
            else
            {
                Response.Write(outjosnweb.Replace("#code#", "-1").Replace("#msg#", errmsg));
                Response.End();
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
                                data = data.Replace("", "");
                                data = data.Replace(" ", "");
                                data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                                data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                                result = mybll.RequestIISData(pageurl, userinfo.usercode, data, ref json, ref errmsg);
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
                string usercode = userinfo.usercode;
                bool result = true;
                string json = "";

                #region 获取表格要导出的字段
                BLLRequestData mybll = new BLLRequestData();
                result = mybll.RequestIISData("/Console/TableSetting.aspx?action=gettableconfiglist", usercode, data, ref json, ref errmsg);
                ResultTableFieldListInfo[] 表格字段列表 = null;
                if (result)
                {
                    ResultTableList tblist = ObjectSeriallizeHelper.JsonToObject<ResultTableList>(json);
                    if (tblist != null && tblist.data != null && tblist.data.Length > 0)
                    {
                        ResultTableListInfo[] 表格列表 = tblist.data;
                        for (int i = 0; i < 表格列表.Length; i++)
                        {
                            if (表格列表[i].页面url.Trim() == pageurl.Trim())
                            {
                                GetTableFieldInfo finfo = new GetTableFieldInfo();
                                finfo.usercode = usercode;
                                finfo.tbcode = 表格列表[i].表格代码;
                                result = mybll.RequestIISData("/Console/TableSetting.aspx?action=getusertablefieldinfolist", usercode, ObjectSeriallizeHelper.ObjectToJson(finfo), ref json, ref errmsg);
                                if (result)
                                {
                                    ResultTableFieldList rfl = ObjectSeriallizeHelper.JsonToObject<ResultTableFieldList>(json);
                                    if (rfl != null && rfl.data != null && rfl.data.Length > 0)
                                    {
                                        表格字段列表 = rfl.data;
                                    }
                                }
                            }
                        }
                    }
                } 
                #endregion

                switch (pageurl)
                {
                    case "MaterialQSApi.aspx?action=closeoraclematerialqs"://关闭Oracle数据库的物料齐套
                        RequestMaterialQSCR rq = ObjectSeriallizeHelper.JsonToObject<RequestMaterialQSCR>(data);
                        rq.usercode = userinfo.usercode;
                        data = ObjectSeriallizeHelper.ObjectToJson(rq);
                        break;
                }

                
                switch (urltype)
                {
                    case "IIS":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIISData(pageurl, userinfo.usercode, data, ref json, ref errmsg);
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
                    case "IIS3738":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3738Data(pageurl, data, ref json, ref errmsg);
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

                        DataTable 导出表格 = new DataTable();
                        
                        if (表格字段列表 != null && 表格字段列表.Length > 0)
                        {
                            for (int i = 0; i < 表格字段列表.Length; i++)
                            {
                                if (表格字段列表[i].是否显示 == "1" && 表格字段列表[i].字段名 != "操作")
                                {
                                    for (int j = 0; j < dt.Columns.Count; j++)
                                    {
                                        if (dt.Columns[j].ToString().ToLower().Trim() == 表格字段列表[i].字段名.ToLower().Trim())
                                        {
                                            导出表格.Columns.Add(表格字段列表[i].别名, Type.GetType("System.String")); 
                                        }
                                    }
                                }
                            }

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                DataRow newRow;
                                newRow = 导出表格.NewRow();
                                for (int j = 0; j < 表格字段列表.Length; j++)
                                {
                                    if (表格字段列表[j].是否显示 == "1" && 表格字段列表[j].字段名 != "操作")
                                    {
                                        string 字段名 = 表格字段列表[j].字段名.ToLower();
                                        try
                                        {
                                            newRow[表格字段列表[j].别名] = dt.Rows[i][字段名].ToString();
                                        }
                                        catch
                                        {

                                        }
                                    }
                                }
                                导出表格.Rows.Add(newRow);
                            }
                            CreateExcel(导出表格, filename);
                        }
                        else
                        {
                            CreateExcel(dt, filename);
                        }
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
                    ls_item += "" + dt.Columns[a].ColumnName.Trim() + "\n";
                }
                else
                {
                    ls_item += "" + dt.Columns[a].ColumnName.Trim() + "\t";
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
                        ls_item += "" + row[i].ToString().Trim() + "\n";
                    }
                    else
                    {
                        ls_item += "" + row[i].ToString().Trim() + "\t";
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
                        result = mybll.RequestIISData(pageurl, userinfo.usercode, data, ref json, ref errmsg);
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
                    case "IIS3738":
                        data = data.Replace("\"usercode\":\"\"", "\"usercode\": \"" + userinfo.usercode + "\"");
                        data = data.Replace("\"operation_usercode\":\"\"", "\"operation_usercode\": \"" + userinfo.usercode + "\"");
                        result = mybll.RequestIIS3738Data(pageurl, data, ref json, ref errmsg);
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
                bool result = mybll.GetUserUnNotifyV2(userinfo.usercode, ref unnotify, ref errmsg);
                NotifyList info_notify = ObjectSeriallizeHelper.JsonToObject<NotifyList>(unnotify);
                outjson.notify = ObjectSeriallizeHelper.ObjectToJson(info_notify.data);

                string tasknotify = "";
                result = mybll.GetUserTaskNotifyV2(userinfo.usercode, ref tasknotify, ref errmsg);
                TaskNotifyList info_task = ObjectSeriallizeHelper.JsonToObject<TaskNotifyList>(tasknotify);
                outjson.tasknotify = ObjectSeriallizeHelper.ObjectToJson(info_task.data);

                string mytaskunfinished = "";
                result = mybll.GetMyTaskUnfinishedListV2(userinfo.usercode, ref mytaskunfinished, ref errmsg);
                MyTaskList info_mytask = ObjectSeriallizeHelper.JsonToObject<MyTaskList>(mytaskunfinished);
                outjson.mytaskunfinished = ObjectSeriallizeHelper.ObjectToJson(info_mytask.data);

                string myacceptnotify = "";
                result = mybll.GetMyAcceptTaskListV2(userinfo.usercode, ref myacceptnotify, ref errmsg);
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