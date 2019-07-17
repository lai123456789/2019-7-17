using Common;
using DataOperator;
using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;

namespace WXInterface
{
    public class WXIntfBasic
    {
        public string WXInterfaceHttpRequest(string interfaceurl, string sendcontent, string requestmethod)
        {
            string result = "";
            HttpWebRequest hwr = (HttpWebRequest)WebRequest.Create(interfaceurl);
            if (requestmethod.ToLower() == "post")
            {
                hwr.ContentType = "application/x-www-form-urlencoded";
                hwr.Method = requestmethod;
                byte[] btBodys = Encoding.UTF8.GetBytes(sendcontent);
                hwr.ContentLength = btBodys.Length;
                hwr.GetRequestStream().Write(btBodys, 0, btBodys.Length);
            }

            HttpWebResponse httpWebResponse = (HttpWebResponse)hwr.GetResponse();
            System.IO.StreamReader streamReader = new System.IO.StreamReader(httpWebResponse.GetResponseStream());
            string responseContent = streamReader.ReadToEnd();
            result = responseContent;

            httpWebResponse.Close();
            streamReader.Close();
            hwr.Abort();
            httpWebResponse.Close();
            return result;
        }

        public string GetAccessToken(string wxappid, bool refresh = false)
        {
            string result = "";

            int maxtrytimes = 3;
            int currtry = 0;
            string appsecret = WXApiInfo.appsecret;
            DateTime stateupdatetime;
            int maxfreshingtime = 10;//最大刷新时间（秒），超过则不等待
            OracleDBO mydbo = new OracleDBO();
            mydbo.AutoClose = false;
            try
            {

                string token;
                DateTime gettime;
                int expires_in;
                string status;

                DataRow dr;
                while (currtry < maxtrytimes)
                {
                    dr = mydbo.GetDataRow("select * from sys_p_wxappaccesstoken t where t.wxappid='" + wxappid + "'");
                    if (dr != null)
                    {
                        token = dr["access_token"].ToString();
                        gettime = Convert.ToDateTime(dr["gettime"]);
                        expires_in = Convert.ToInt32(dr["expires_in"]);
                        status = dr["state"].ToString();
                        stateupdatetime = Convert.ToDateTime(dr["stateupdatetime"]);
                        if (status == "Normal")
                        {
                            //是否已超时
                            if ((DateTime.Now - gettime).TotalSeconds < (expires_in - 5) && !refresh)
                            {
                                //未超时并且不要求更新
                                result = token;
                                break;
                            }
                            else
                            {

                                #region 更新access_token流程
                                mydbo.BeginTransaction();
                                int effnum = mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken set state='Refreshing',stateupdatetime=sysdate where WXAppID='" + wxappid + "' and state='Normal' and gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss')");
                                mydbo.Commit();
                                //如果影响数大于零，说明更新状态成功，则即是取得了更新权。
                                if (effnum > 0)
                                {
                                    UserAccessToken tokeninfo = GetNewAccessToken(wxappid, appsecret);
                                    if (tokeninfo.errcode == 0)
                                    {
                                        result = tokeninfo.access_token;
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken set access_token='" + tokeninfo.access_token + "',expires_in=" + tokeninfo.expires_in.ToString() + ",gettime=to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'),state='Normal',stateupdatetime=sysdate where WXAppID='" + wxappid + "'");
                                        mydbo.Commit();
                                        break;
                                    }
                                    else
                                    {
                                        //如果未成功，先将状态改回来
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken t set t.state='Normal',t.stateupdatetime=sysdate where t.access_token='" + token + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                        mydbo.Commit();
                                    }
                                }
                                else
                                {
                                    //如果不是Normal状态，可能是其他请求正在刷新中，等半秒再取
                                    if ((DateTime.Now - stateupdatetime).TotalSeconds > maxfreshingtime)
                                    {
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken t set t.state='Normal',t.stateupdatetime=sysdate where t.access_token='" + token + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                        mydbo.Commit();
                                    }
                                    System.Threading.Thread.Sleep(500);
                                }
                                #endregion
                            }
                        }
                        else
                        {
                            //如果不是Normal状态，可能是其他请求正在刷新中，等半秒再取
                            if ((DateTime.Now - stateupdatetime).TotalSeconds > maxfreshingtime)
                            {
                                mydbo.BeginTransaction();
                                mydbo.ExecuteNonQuery("update sys_p_wxappaccesstoken t set t.state='Normal',t.stateupdatetime=sysdate where t.access_token='" + token + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                mydbo.Commit();
                            }
                            System.Threading.Thread.Sleep(500);
                        }
                    }
                    else
                    {

                        UserAccessToken tokeninfo = GetNewAccessToken(wxappid, appsecret);
                        if (tokeninfo.errcode == 0)
                        {
                            result = tokeninfo.access_token;
                            mydbo.BeginTransaction();
                            mydbo.ExecuteNonQuery("insert into sys_p_wxappaccesstoken(WXAppID,access_token,expires_in,state,gettime,stateupdatetime) values('" + wxappid + "','" + tokeninfo.access_token + "'," + tokeninfo.expires_in.ToString() + ",'Normal',to_date('" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'),to_date('" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'))");
                            mydbo.Commit();
                            break;
                        }
                    }
                    currtry++;
                }
            }
            catch (Exception ex)
            {
                LogWriter.WriteLog(ex);
            }
            mydbo.Close();
            return result;
        }

        public UserAccessToken GetNewAccessToken(string wxappid, string appsecret)
        {
            UserAccessToken tokeninfo = null;
            try
            {
                string url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + wxappid + "&secret=" + appsecret;
                string strresult = WXInterfaceHttpRequest(url, "", "get");
                tokeninfo = ObjectSeriallizeHelper.JsonToObject<UserAccessToken>(strresult);
            }
            catch (Exception ex)
            {
                LogWriter.WriteLog(ex);
            }
            return tokeninfo;
        }

        public string GetJsApiTicket(string wxappid, bool refresh)
        {
            string result = "";

            int maxtrytimes = 3;
            int currtry = 0;
            string access_token = "";
            DateTime stateupdatetime;
            int maxfreshingtime = 10;//最大刷新时间（秒），超过则不等待
            OracleDBO mydbo = new OracleDBO();
            mydbo.AutoClose = false;
            try
            {

                string ticket;
                DateTime gettime;
                int expires_in;
                string status;

                DataRow dr;
                while (currtry < maxtrytimes)
                {
                    dr = mydbo.GetDataRow("select * from sys_p_wxjsapiticketinfo t where t.wxappid='" + wxappid + "'");
                    if (dr != null)
                    {
                        ticket = dr["jsapi_ticket"].ToString();
                        gettime = Convert.ToDateTime(dr["gettime"]);
                        expires_in = Convert.ToInt32(dr["expires_in"]);
                        status = dr["state"].ToString();
                        stateupdatetime = Convert.ToDateTime(dr["stateupdatetime"]);
                        if (status == "Normal")
                        {
                            //是否已超时
                            if ((DateTime.Now - gettime).TotalSeconds < (expires_in - 5) && !refresh)
                            {
                                //未超时并且不要求更新
                                result = ticket;
                                break;
                            }
                            else
                            {
                                access_token = GetAccessToken(wxappid);
                                if (string.IsNullOrEmpty(access_token))
                                {
                                    return "";
                                }

                                #region 更新jsapi_ticket流程
                                mydbo.BeginTransaction();
                                int effnum = mydbo.ExecuteNonQuery("update sys_p_wxjsapiticketinfo set state='Refreshing',stateupdatetime=sysdate where WXAppID='" + wxappid + "' and state='Normal' and gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss')");
                                mydbo.Commit();
                                //如果影响数大于零，说明更新状态成功，则即是取得了更新权。
                                if (effnum > 0)
                                {
                                    Ent_JsApiTicket ticketinfo = new Ent_JsApiTicket();
                                    GetNewJsApiTicket(wxappid, ref ticketinfo);
                                    if (ticketinfo.errcode == 0)
                                    {
                                        result = ticketinfo.ticket;
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxjsapiticketinfo set jsapi_ticket='" + ticketinfo.ticket + "',expires_in=" + ticketinfo.expires_in.ToString() + ",gettime=to_date('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'),state='Normal',stateupdatetime=sysdate where WXAppID='" + wxappid + "'");
                                        mydbo.Commit();
                                        break;
                                    }
                                    else
                                    {
                                        //如果未成功，先将状态改回来
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxjsapiticketinfo t set t.state='Normal',t.stateupdatetime=sysdate where t.jsapi_ticket='" + ticket + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                        mydbo.Commit();
                                    }
                                }
                                else
                                {
                                    //如果不是Normal状态，可能是其他请求正在刷新中，等半秒再取
                                    if ((DateTime.Now - stateupdatetime).TotalSeconds > maxfreshingtime)
                                    {
                                        mydbo.BeginTransaction();
                                        mydbo.ExecuteNonQuery("update sys_p_wxjsapiticketinfo t set t.state='Normal',t.stateupdatetime=sysdate where t.jsapi_ticket='" + ticket + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                        mydbo.Commit();
                                    }
                                    System.Threading.Thread.Sleep(500);
                                }
                                #endregion
                            }
                        }
                        else
                        {
                            //如果不是Normal状态，可能是其他请求正在刷新中，等半秒再取
                            if ((DateTime.Now - stateupdatetime).TotalSeconds > maxfreshingtime)
                            {
                                mydbo.BeginTransaction();
                                mydbo.ExecuteNonQuery("update sys_p_wxjsapiticketinfo t set t.state='Normal',t.stateupdatetime=sysdate where t.jsapi_ticket='" + ticket + "' and t.gettime=to_date('" + gettime.ToString("yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss') and t.wxappid='" + wxappid + "'");
                                mydbo.Commit();
                            }
                            System.Threading.Thread.Sleep(500);
                        }
                    }
                    else
                    {
                        if (access_token == "")
                        {

                            access_token = GetAccessToken(wxappid);
                        }
                        Ent_JsApiTicket ticketinfo = new Ent_JsApiTicket();
                        GetNewJsApiTicket(wxappid, ref ticketinfo);
                        if (ticketinfo.errcode == 0)
                        {
                            result = ticketinfo.ticket;
                            mydbo.BeginTransaction();
                            mydbo.ExecuteNonQuery("insert into sys_p_wxjsapiticketinfo(WXAppID,jsapi_ticket,expires_in,state,gettime,stateupdatetime) values('" + wxappid + "','" + ticketinfo.ticket + "'," + ticketinfo.expires_in.ToString() + ",'Normal',to_date('" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'),to_date('" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "','yyyy-mm-dd hh24:mi:ss'))");
                            mydbo.Commit();
                            break;
                        }
                    }
                    currtry++;
                }
            }
            catch (Exception ex)
            {
                LogWriter.WriteLog(ex);
            }
            mydbo.Close();
            return result;
        }

        /// <summary>
        /// 获取jsapi_ticket
        /// </summary>
        /// <param name="access_token"></param>
        /// <param name="ticket"></param>
        /// <returns></returns>
        public bool GetNewJsApiTicket(string wxappid, ref Ent_JsApiTicket ticket)
        {
            bool result = true;
            Ent_JsApiTicket wxresult = new Ent_JsApiTicket();
            int retrycount = 0;
            int maxretrycount = 3;
            string access_token = GetAccessToken(wxappid);
            string url = string.Format("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={0}&type=jsapi", access_token);
            while (retrycount < maxretrycount)
            {
                wxresult = ObjectSeriallizeHelper.JsonToObject<Ent_JsApiTicket>(WXInterfaceHttpRequest(url, "", "get"));
                if (wxresult.errcode == 0)
                {
                    result = true;
                    ticket = wxresult;
                    break;
                }
                else
                {
                    result = false;
                    retrycount++;
                }
            }
            return result;
        }
    }
}
