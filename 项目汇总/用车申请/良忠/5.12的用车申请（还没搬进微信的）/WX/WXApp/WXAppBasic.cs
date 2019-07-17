using BLL;
using Common;
using Entity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace WXApp
{
    public abstract class WXAppBasic : System.Web.UI.Page
    {
        public string pageid = "";
        protected string wxappid = WXApiInfo.wxappid;
        protected string secret = WXApiInfo.appsecret;
        protected string outjson = "{\"errcode\":#code#,\"errmsg\":\"#msg#\",\"data\":null}";
        private string wxoauth = "wxoauth";
        public string state = "";
        public static string code = "";
        public string access_token = "";
        public string openid = "";
        public WXFansInfo wxinfo = new WXFansInfo();
        public WXFansUserInfo wxuserinfo = new WXFansUserInfo();
        ArrayList arraylist = new ArrayList();
        /// <summary>
        /// 是否刷新用户数据
        /// </summary>
        protected bool IsRefreshUserData = false;
        public WXAppBasic()
        {
            StateCheckConfig();
        }


        /// <summary>
        /// 用于子类中(强制)设置是否要检查登录或微信网页授权
        /// </summary>
        protected abstract void StateCheckConfig();



        /// <summary>
        /// 初始化（初始化state），用于检查是否已经登录和微信网页授权，并把state信息存入session
        /// 情况一：用户是否从微信跳转进入，如果是就进行微信Web授权。
        /// 情况一：另外，用户可能在会话期重新在微信中跳转进来，所以要检查session中的state判断是用户是否在会话期内，如果是则无需重新获取微信资料
        /// 情况二：一个微信关注多商户的情况，继情况一，如果用户在会话期内重新进来，有可能会进入另一个商户，此时还要判断session中的state记录的AppID是否与querystring的state一致，如果不一致就要重新获取微信资料（openid )
        /// 情况三：用户正常浏览（即request的code和state为空），此要检查是否已经登录（检查state是否为空）
        /// </summary>
        /// <param name="e"></param>
        protected override void OnInit(EventArgs e)
        {

            if (Request.QueryString["code"] != null && code != Request.QueryString["code"])
            {
                code = Request.QueryString["code"];
                string[] arr_code = code.Split(',');
                code = arr_code[arr_code.Length - 1];
                state = Request.QueryString["state"];
                string errmsg = "";
                bool result = true;


                if (Session["openid"] == null || Session["access_token"] == null)
                {
                    #region 获取access_token及openid
                    if (Session["access_token"] == null)
                    {
                        string scope = "";
                        result = GetWXAccreditOpenID(code, ref access_token, ref openid, ref scope, ref errmsg);
                        if (result && !string.IsNullOrWhiteSpace(access_token))
                        {
                            Session["access_token"] = access_token;
                            Session["openid"] = openid;
                        }
                    }
                    #endregion
                }
                else
                {
                    openid = Session["openid"].ToString();
                    if (string.IsNullOrWhiteSpace(openid))
                    {
                        Session["openid"] = null;
                        Session["access_token"] = null;
                        Session["wxfansinfo"] = null;
                        #region 让用户授权并获取用户授权code
                        Response.Redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxappid + "&redirect_uri=http%3a%2f%2fwx.mtworld.cn%2fWXAccredit.aspx&response_type=code&scope=snsapi_userinfo&state=wxoauthz0z#wechat_redirect");
                        #endregion
                    }
                    else
                    {
                        access_token = Session["access_token"].ToString();
                        result = CheckUserAccessToken(wxappid, access_token, ref errmsg);
                        if (result == false)
                        {
                            #region 让用户授权并获取用户授权code
                            //Response.Redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxappid + "&redirect_uri="+WXApiInfo.uri_befor+"WXAccredit.aspx&response_type=code&scope=snsapi_userinfo&state=wxoauthz0z#wechat_redirect");
                            #endregion

                            #region 获取access_token及openid
                            if (Session["access_token"] == null)
                            {
                                string scope = "";
                                result = GetWXAccreditOpenID(code, ref access_token, ref openid, ref scope, ref errmsg);
                                if (result)
                                {
                                    Session["access_token"] = access_token;
                                    Session["openid"] = openid;
                                }
                            }
                            #endregion
                        }
                    }
                }
                if (Session["wxfansinfo"] == null)
                {
                    result = GetWXFansInfo(openid, access_token, ref wxinfo, ref errmsg);
                    if (result)
                    {
                        Session["wxfansinfo"] = wxinfo;
                        BLLUserManage mybll = new BLLUserManage();
                        result = mybll.UpdateWXFansInfo(wxinfo, ref errmsg);
                    }
                }
                else
                {
                    wxinfo = (WXFansInfo)Session["wxfansinfo"];
                    if (wxinfo.openid == null)
                    {
                        Session["wxfansinfo"] = null;
                        wxinfo = null;
                    }
                }
            }
            else
            {
                wxinfo = (WXFansInfo)Session["wxfansinfo"];
                if (wxinfo == null || wxinfo.openid == null || wxinfo.openid.Length == 0)
                {
                    #region 请求授权后回调到请求页面
                    wxinfo = null;
                    string user_url = HttpContext.Current.Request.RawUrl;
                    string url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxappid + "&redirect_uri=" + WXApiInfo.uri_befor + user_url + "&response_type=code&scope=snsapi_userinfo&state=wxoauthz0z#wechat_redirect";

                    Response.Redirect(url);
                    #endregion
                }
            }

            if (wxinfo != null)
            {
                string errmsg = "";
                DataTable dt = new DataTable();
                DataTable dt_page = new DataTable();
                string wxopenid = wxinfo.openid;
                BLLUserManage myuser = new BLLUserManage();
                if (string.IsNullOrWhiteSpace(wxopenid))
                {
                    #region 请求授权后回调到请求页面
                    wxinfo = null;
                    string user_url = HttpContext.Current.Request.RawUrl;
                    string url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxappid + "&redirect_uri=" + WXApiInfo.uri_befor + user_url + "&response_type=code&scope=snsapi_userinfo&state=wxoauthz0z#wechat_redirect";

                    Response.Redirect(url); 
                    #endregion
                }
                else
                {
                    bool result = myuser.GetWXFansBindUserInfo(wxopenid, ref dt, ref dt_page,ref errmsg);
                    if (result)
                    {
                        if (dt == null || dt.Rows.Count == 0)
                        {
                            string url = "http://www.mtworld.cn/";
                            Response.Redirect(url);
                        }
                        else
                        {
                            /*
                             usercode,
                             password,
                             usertype,
                             createdate,
                             wxopenid,
                             account,
                             username,
                             position,
                             sex,
                             birthday,
                             address,
                             phonenumber,
                             hiredate,
                             nickname,
                             headimgurl,
                             departmentcode,
                             departmentname department
                             idnumber,
                             idkey
                             */
                            wxuserinfo.usercode = dt.Rows[0]["usercode"].ToString();
                            wxuserinfo.username = dt.Rows[0]["username"].ToString();
                            wxuserinfo.position = dt.Rows[0]["position"].ToString();
                            wxuserinfo.phonenumber = dt.Rows[0]["phonenumber"].ToString();
                            wxuserinfo.departmentname = dt.Rows[0]["department"].ToString();
                            wxuserinfo.departmentcode = dt.Rows[0]["departmentcode"].ToString();
                            wxuserinfo.account = dt.Rows[0]["account"].ToString();
                            for (int i = 0; i < dt_page.Rows.Count; i++)
                            {
                                PageInfo pageinfo = new PageInfo();

                                string PageCode = dt_page.Rows[i]["PageCode"].ToString();
                                //string PageName = dt_page.Rows[i]["PageName"].ToString();
                                //string ico = dt_page.Rows[i]["ico"].ToString();
                                //string url = dt_page.Rows[i]["url"].ToString();
                                //string superior = dt_page.Rows[i]["superior"].ToString();

                                pageinfo.PageCode = PageCode;
                                //pageinfo.PageName = PageName;
                                //pageinfo.ico = ico;
                                //pageinfo.url = url;
                                //pageinfo.superior = superior;
                                arraylist.Add(PageCode);
                                // wxuserinfo.pagelist.Add(pageinfo);

                            }
                        }
                    }
                    else
                    {
                        string url = "http://www.mtworld.cn/";
                        Response.Redirect(url);
                    }
                }
            }
        }

        /// <summary>
        /// 获取微信授权用户OpenID
        /// </summary>
        /// <param name="access_token">用户级token</param>
        /// <param name="openid">微信Openid</param>
        /// <param name="scope">用户授权的作用域，使用逗号（,）分隔</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        private bool GetWXAccreditOpenID(string code, ref string access_token, ref string openid, ref string scope, ref string errmsg)
        {
            bool result = true;
            string url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wxappid + "&secret=" + secret + "&code=" + code + "&grant_type=authorization_code";
            UserAccessToken usertoken = new UserAccessToken();
            try
            {
                string json = HttpRequests.WXInterfaceHttpRequest(url, "", "GET");
                usertoken = ObjectSeriallizeHelper.JsonToObject<UserAccessToken>(json);
            }
            catch (Exception ex)
            {
                result = false;
                errmsg = ex.Message.ToString();
            }
            if (usertoken != null)
            {
                access_token = usertoken.access_token;
                string expires_in = usertoken.expires_in;
                string refresh_token = usertoken.refresh_token;
                openid = usertoken.openid;
                scope = usertoken.scope;
            }
            else
            {
                result = false;
                errmsg = "返回结果为空";
            }
            return result;
        }

        /// <summary>
        /// 获取微信粉丝信息
        /// </summary>
        /// <param name="wxopenid">微信OpenID</param>
        /// <param name="access_token">用户级access_token</param>
        /// <param name="wxfansinfo">粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        private bool GetWXFansInfo(string wxopenid, string access_token, ref WXFansInfo wxfansinfo, ref string errmsg)
        {
            bool result = true;
            string url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + wxopenid + "&lang=zh_CN";
            //string url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=" + access_token + "&openid=" + wxopenid + "&lang=zh_CN";
            try
            {
                string json = HttpRequests.WXInterfaceHttpRequest(url, "", "GET");
                wxfansinfo = ObjectSeriallizeHelper.JsonToObject<WXFansInfo>(json);
            }
            catch (Exception ex)
            {
                errmsg = ex.Message.ToString();
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }

        /// <summary>
        /// 检测用户级access_token是否有效
        /// </summary>
        /// <param name="wxopenid">微信Openid</param>
        /// <param name="access_token">用户级access_token</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        private bool CheckUserAccessToken(string wxopenid, string access_token, ref string errmsg)
        {
            bool result = true;
            string url = "https://api.weixin.qq.com/sns/auth?access_token=" + access_token + "&openid=" + wxopenid;
            try
            {
                string json = HttpRequests.WXInterfaceHttpRequest(url, "", "GET");
                ApiBasic apibasic = ObjectSeriallizeHelper.JsonToObject<ApiBasic>(json);
                if (apibasic.errcode != 0)
                {
                    result = false;
                    errmsg = "access_token已失效";
                }
            }
            catch (Exception ex)
            {
                errmsg = ex.Message.ToString();
                result = false;
                LogWriter.WriteLog(ex);
            }
            return result;
        }


        //检验是否有权限
        protected bool checkout(string pageid)
        {
            bool check = false;
            for (int i = 0; i <arraylist.Count; i++)
            {
                if ((string)arraylist[i] == pageid)
                {

                    check = true;
                }
              
            }
            return check;
        }

    }
}