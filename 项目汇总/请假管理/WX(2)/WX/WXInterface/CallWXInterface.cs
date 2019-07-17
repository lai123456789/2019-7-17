using Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WXInterface
{
    public class CallWXInterface : WXIntfBasic
    {
        public UserAccessToken GetOAuthAccessToken(string wxappid, string appsecret, string code)
        {
            UserAccessToken token = new UserAccessToken();
            string url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wxappid + "&secret=" + appsecret + "&code=" + code + "&grant_type=authorization_code";
            token = ObjectSeriallizeHelper.JsonToObject<UserAccessToken>(WXInterfaceHttpRequest(url, "", "GET"));
            return token;
        }

        public UserList GetUserList(string wxappid, string next_openid)
        {
            int retrycount = 0;
            string access_token = GetAccessToken(wxappid);
            UserList userlist = new UserList();
            string url;
            while (retrycount < 3)
            {
                url = string.Format("https://api.weixin.qq.com/cgi-bin/user/get?access_token={0}&next_openid={1}", access_token, next_openid);
                userlist = ObjectSeriallizeHelper.JsonToObject<UserList>(WXInterfaceHttpRequest(url, "", "GET"));
                if (userlist.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (userlist.errcode == 40001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return userlist;
        }

        public WXFansInfo GetUserInfo_OAuth(string wxappid, string access_token, string openid)
        {
            int retrycount = 0;
            WXFansInfo userinfo = new WXFansInfo();
            string url;
            while (retrycount < 3)
            {
                url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN";
                userinfo = ObjectSeriallizeHelper.JsonToObject<WXFansInfo>(WXInterfaceHttpRequest(url, "", "GET"));
                if (userinfo.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (userinfo.errcode == 40001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return userinfo;
        }

        public WXFansInfo GetUserInfo(string wxappid, string wxopenid)
        {
            int retrycount = 0;
            string access_token = GetAccessToken(wxappid);
            WXFansInfo userinfo = new WXFansInfo();
            string url;
            while (retrycount < 3)
            {
                url = string.Format("https://api.weixin.qq.com/cgi-bin/user/info?access_token={0}&openid={1}&lang=zh_CN", access_token, wxopenid);
                userinfo = ObjectSeriallizeHelper.JsonToObject<WXFansInfo>(WXInterfaceHttpRequest(url, "", "GET"));
                if (userinfo.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (userinfo.errcode == 40001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return userinfo;
        }

        /// <summary>
        /// 创建ID型永久二维码
        /// </summary>
        /// <param name="wxappid"></param>
        /// <param name="scene_id">二维码参数</param>
        /// <returns></returns>
        public CreateQRCodeResult CreateLimitIDQRCode(string wxappid, int scene_id)
        {
            CreateQRCodeResult wxresult = null;
            int retrycount = 0;
            int maxretrycount = 3;
            string access_token = "";
            access_token = GetAccessToken(wxappid);
            string url = string.Format("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={0}", access_token);
            string sendcontent = "{\"action_name\": \"QR_LIMIT_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": " + scene_id.ToString() + "}}}";
            while (retrycount < maxretrycount)
            {
                wxresult = ObjectSeriallizeHelper.JsonToObject<CreateQRCodeResult>(WXInterfaceHttpRequest(url, sendcontent, "post"));
                if (wxresult.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (wxresult.errcode == 40014 || wxresult.errcode == 42001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return wxresult;
        }

        /// <summary>
        /// 创建字符串型永久二维码
        /// </summary>
        /// <param name="wxappid"></param>
        /// <param name="scene_str">二维码参数</param>
        /// <returns></returns>
        public CreateQRCodeResult CreateLimitStrQRCode(string wxappid, string scene_str)
        {
            CreateQRCodeResult wxresult = null;
            int retrycount = 0;
            int maxretrycount = 3;
            string access_token = "";
            access_token = GetAccessToken(wxappid);
            string url = string.Format("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={0}", access_token);
            string sendcontent = "{\"action_name\": \"QR_LIMIT_STR_SCENE\", \"action_info\": {\"scene\": {\"scene_str\": \"" + scene_str + "\"}}}";
            while (retrycount < maxretrycount)
            {
                wxresult = ObjectSeriallizeHelper.JsonToObject<CreateQRCodeResult>(WXInterfaceHttpRequest(url, sendcontent, "post"));
                if (wxresult.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (wxresult.errcode == 40014 || wxresult.errcode == 42001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return wxresult;
        }

        /// <summary>
        /// 创建临时二维码
        /// </summary>
        /// <param name="wxappid"></param>
        /// <param name="expire_seconds">有效时间</param>
        /// <param name="scene_id">二维码参数</param>
        /// <returns></returns>
        public CreateQRCodeResult CreateTmpQRCode(string wxappid, int expire_seconds, int scene_id)
        {
            CreateQRCodeResult wxresult = null;
            int retrycount = 0;
            int maxretrycount = 3;
            string access_token = "";
            access_token = GetAccessToken(wxappid);
            string url = string.Format("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={0}", access_token);
            string sendcontent = "{\"expire_seconds\": " + expire_seconds.ToString() + ", \"action_name\": \"QR_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": " + scene_id.ToString() + "}}}";
            while (retrycount < maxretrycount)
            {
                wxresult = ObjectSeriallizeHelper.JsonToObject<CreateQRCodeResult>(WXInterfaceHttpRequest(url, sendcontent, "post"));
                if (wxresult.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (wxresult.errcode == 40014 || wxresult.errcode == 42001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return wxresult;
        }

        /// <summary>
        /// 发送文本型的客服消息（目前只是临时用作新客户注册通知内部使用，未正式）
        /// </summary>
        /// <param name="wxappid"></param>
        /// <param name="wxopenid"></param>
        /// <param name="msg"></param>
        /// <param name="?"></param>
        public void SendCSMsg_Text(string wxappid, string wxopenid, string msg)
        {
            string access_token = GetAccessToken(wxappid);
            WXFansInfo userinfo = new WXFansInfo();
            string url = string.Format("https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={0}", access_token);
            string sendcontent = @"{
                                        ""touser"":""" + wxopenid + @""",
                                        ""msgtype"":""text"",
                                        ""text"":
                                        {
                                             ""content"":""" + msg.Replace("\r\n", "\\n") + @"""
                                        }
                                    }";
            string result = WXInterfaceHttpRequest(url, sendcontent, "POST");
        }

        /// <summary>
        /// 发送模板消息
        /// </summary>
        /// <param name="wxappid"></param>
        /// <param name="sendcontent"></param>
        /// <returns>返回接口调用结果（非发送结果）</returns>
        public Ent_TemplateMsgSendResult SendTemplateMessage(string wxappid, string sendcontent)
        {
            Ent_TemplateMsgSendResult wxresult = null;
            int retrycount = 0;
            int maxretrycount = 3;
            string access_token = GetAccessToken(wxappid);
            string url = @"https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + access_token;
            while (retrycount < maxretrycount)
            {
                wxresult = ObjectSeriallizeHelper.JsonToObject<Ent_TemplateMsgSendResult>(WXInterfaceHttpRequest(url, sendcontent, "post"));
                if (wxresult.errcode == 0)
                {
                    break;
                }
                else
                {
                    if (wxresult.errcode == 40014 || wxresult.errcode == 42001)
                    {
                        access_token = GetAccessToken(wxappid, true);
                    }
                    retrycount++;
                }
            }
            return wxresult;
        }
    }
}
