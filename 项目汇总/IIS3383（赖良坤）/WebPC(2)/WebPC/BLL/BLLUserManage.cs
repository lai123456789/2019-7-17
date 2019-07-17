using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLUserManage
    {
        /// <summary>
        /// 获取用户页面列表
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="json">返回结果</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUserPageList(string usercode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("data", "{\"usercode\":\"" + usercode + "\"}");//用户代码
                string url = "PageManage.aspx?action=getpcpagelist";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }

        /// <summary>
        /// 登录请求
        /// </summary>
        /// <param name="account">账号</param>
        /// <param name="password">密码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool LoginRequest(string account, string password, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("account", account);//用户代码
                postdata.Add("password", password);//用户密码
                string url = "UserManage.aspx?action=login";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }

        /// <summary>
        /// 获取用户未推送通知
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUserUnNotify(string usercode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("usercode", usercode);//用户代码
                string url = "UserManage.aspx?action=getuserunnotify";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }

        /// <summary>
        /// 获取用户未接任务通知
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUserTaskNotify(string usercode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("usercode", usercode);//用户代码
                string url = "UserManage.aspx?action=getusertasknotify";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }


        /// <summary>
        /// 获取我的任务未完成列表
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetMyTaskUnfinishedList(string usercode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("data", "{\"usercode\":\"" + usercode + "\"}");//用户代码
                string url = "TaskManage.aspx?action=getmytaskunfinishedlist";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }


        /// <summary>
        /// 获取我的任务未完成列表
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetMyAcceptTaskList(string usercode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("data", "{\"usercode\":\"" + usercode + "\"}");//用户代码
                string url = "TaskManage.aspx?action=getmyaccepttasklist";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }


        /// <summary>
        /// 设置用户通知消息为已读
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="notifycode">通知代码</param>
        /// <param name="json">返回的错误提示信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SetUserReadNotify(string usercode, string notifycode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("usercode", usercode);//用户代码
                postdata.Add("notifycode", notifycode);//用户代码
                string url = "UserManage.aspx?action=setuserreadnotify";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }

        /// <summary>
        /// 获取用户未读通知
        /// </summary>
        /// <param name="usercode">用户代码</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetUserUnReadNotify(string usercode, ref string json, ref string errmsg)
        {
            bool result = true;
            try
            {
                Dictionary<string, string> postdata = new Dictionary<string, string>();
                postdata.Add("usercode", usercode);//用户代码
                string url = "UserManage.aspx?action=getuserunreadnotify";
                json = PalmAPIHelper.PalmCoreAPI(url, postdata, "POST");
            }
            catch (Exception ex)
            {
                errmsg = "接口返回信息格式不正确";
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }


    }
}
