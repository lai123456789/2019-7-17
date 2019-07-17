using Common;
using DAL;
using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Xml;
using WXInterface;

namespace BLL.WXPushMessage
{
    public class BLLWXMessageHandle
    {
        #region 处理微信公众平台消息入口
        public string HandleMsg(string msg)
        {
            //处理请请求，处理完后要将相应的结果返回给微信公众平台，不需返回结果的，返回空字符串即可

            string result = "";
            Dictionary<string, string> xmlModel = new Dictionary<string, string>();
            xmlModel = GetXmlModel(msg);
            if (xmlModel.Count > 0)
            {
                result = MsgTypeRouting(ref xmlModel);
            }
            return result;
        }
        #endregion

        #region 消息数据转换
        /// <summary>
        /// 将微信公众平台post过来的xml转换成dictionary
        /// </summary>
        /// <param name="xmlStr"></param>
        /// <returns></returns>
        public Dictionary<string, string> GetXmlModel(string xmlStr)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlStr);
            Dictionary<string, string> mo = new Dictionary<string, string>();
            var data = doc.DocumentElement.ChildNodes;
            for (int i = 0; i < data.Count; i++)
            {
                mo.Add(data.Item(i).LocalName, data.Item(i).InnerText);
            }
            return mo;
        }
        #endregion

        #region 消息和事件路由
        /// <summary>
        /// 消息类型路由。消息类型有：event（事件）、text（文本）、image（图片）等
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string MsgTypeRouting(ref Dictionary<string, string> xmlModel)
        {
            string result = "";
            if (xmlModel["MsgType"].ToLower() == "event")
            {
                result = EventRouting(ref xmlModel);
            }
            else if (xmlModel["MsgType"].ToLower() == "text")
            {
                result = CustomTextMsgHandle(xmlModel);
            }
            else if (xmlModel["MsgType"].ToLower() == "image")
            {
                CustomImageMsgHandle(xmlModel);
            }
            return result;
        }

        /// <summary>
        /// 事件路由，事件有subscribe（关注）、unsubscribe（取消关注）
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string EventRouting(ref Dictionary<string, string> xmlModel)
        {
            string result = "";
            string eventtype = xmlModel["Event"].ToLower();
            if (eventtype == "subscribe")//关注事件
            {
                result = SubscribeHandle(ref xmlModel);
            }
            if (eventtype == "unsubscribe")//取消关注事件
            {
                result = UnSubscribeHandle(ref xmlModel);
            }
            if (eventtype == "scan")//扫描事件
            {
                //目前扫描二维码事件也是走关注流程
                result = ScanHandle(ref xmlModel);
            }
            return result;
        }
        #endregion

        #region 消息处理

        #region 处理文本消息（客服消息）
        /// <summary>
        /// 处理文本消息（客服消息）
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string CustomTextMsgHandle(Dictionary<string, string> xmlModel)
        {
            string result = "";


            if (xmlModel["MsgType"] == "text")
            {
                //string url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0965be2f96f0d31c&redirect_uri=http%3a%2f%2fwx.palmmsgbi.com%2fWXUser%2fPage%2fmy%2fScanDemo.aspx&response_type=code&scope=snsapi_userinfo&state=wxoauthz0z#wechat_redirect";
                //string href = "<a href=\"" + url + "\">条码扫描</a>";
                var content = "我还没学会怎么回答这个问题哦！";

                if (xmlModel["Content"].Contains("在"))
                {
                    content = "我一直都在";
                }
                else if (xmlModel["Content"].Contains("你好"))
                {
                    content = "你也好！";
                }
                else if (xmlModel["Content"].Contains("收到"))
                {
                    content = "好的！";
                }
                else if (xmlModel["Content"].Contains("谢谢"))
                {
                    content = "不用谢！";
                }
                else if (xmlModel["Content"].Contains("没钱"))
                {
                    content = "没钱赶紧去赚钱！";
                }
                else if (xmlModel["Content"].Contains("你是谁"))
                {
                    content = "我是微信小客服！";
                }
                else if (xmlModel["Content"].Contains("我是谁"))
                {
                    content = "你就是我呀！那我是谁？";
                }
                else if (xmlModel["Content"].Contains("工号"))
                {
                    content = "收到你的工号，已通知管理员进行绑定";
                }
                else if (xmlModel["Content"].Contains("/:strong"))
                {
                    content = "继续加油";
                }
                else if (xmlModel["Content"].Contains("发送消息"))
                {
                    BLLSendWXTemplateMsg mysend = new BLLSendWXTemplateMsg();
                    string errmsg = "";
                    bool success = mysend.SendSysStatusNotify(WXApiInfo.wxappid, "orqT80Wao9Te5LExBQCGoaLwtTRo", "183216", DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"), "已进入装配组装", ref errmsg);
                    content = "已发送";
                }
                else if (xmlModel["Content"].Contains("图纸已完成"))
                {
                    BLLSendWXTemplateMsg mysend = new BLLSendWXTemplateMsg();
                    string errmsg = "";
                    bool success = mysend.SendOrderNotify(WXApiInfo.wxappid, "orqT80filF1zd1ZOpS8rGIpuRlbE", "ND000001", "图纸AA", "100", DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"), "陈良忠", ref errmsg);
                    content = "已发送";
                }
                string str = xmlModel["Content"];

                result = "<xml><ToUserName><![CDATA[" + xmlModel["FromUserName"] + "]]></ToUserName><FromUserName><![CDATA[" + xmlModel["ToUserName"] + "]]></FromUserName><CreateTime>" + xmlModel["CreateTime"] + "</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[" + content + "]]></Content></xml>";
            }
            else
            {
                //因为未有相应的处理逻辑，所以将消息转发给微信公众平台的多客服平台处理
                result = "<xml><ToUserName><![CDATA[" + xmlModel["FromUserName"] + "]]></ToUserName><FromUserName><![CDATA[" + xmlModel["ToUserName"] + "]]></FromUserName><CreateTime>" + xmlModel["CreateTime"] + "</CreateTime><MsgType><![CDATA[transfer_customer_service]]></MsgType></xml>";
            }

            return result;
        }
        #endregion

        #region 处理图片消息（客服消息）
        /// <summary>
        /// 处理图片消息（客服消息）
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string CustomImageMsgHandle(Dictionary<string, string> xmlModel)
        {
            string result = "";

            //因为未有相应的处理逻辑，所以将消息转发给微信公众平台的多客服平台处理

            result = "<xml><ToUserName><![CDATA[" + xmlModel["FromUserName"] + "]]></ToUserName><FromUserName><![CDATA[" + xmlModel["ToUserName"] + "]]></FromUserName><CreateTime>" + xmlModel["CreateTime"] + "</CreateTime><MsgType><![CDATA[transfer_customer_service]]></MsgType></xml>";
            return result;
        }
        #endregion

        #region 处理关注事件
        /// <summary>
        /// 处理关注事件
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string SubscribeHandle(ref Dictionary<string, string> xmlModel)
        {
            string result = "";//返回欢迎语内容
            string wxappusername = xmlModel["ToUserName"];//事件发给哪个开发者微信号（注意这里不是公众号的AppID，而是公众号的微信号）
            string wxopenid = xmlModel["FromUserName"];//事件是哪个粉丝发起的（粉丝的openid）
            string strCreateTime = xmlModel["CreateTime"];
            if (string.IsNullOrEmpty(strCreateTime))
            {
                //无消息创建时间，无法排重，放弃处理
                return "";
            }
            double wxcreatetime;
            if (!double.TryParse(strCreateTime, out wxcreatetime))
            {
                //无法将createtime转换成功，无法排重，放弃处理
                return "";
            }
            string wxappid = "";

            DALWXMessageHandleBasic mydal = new DALWXMessageHandleBasic();
            //事件消息排重
            bool success = true;
            success = mydal.EventMsgPreventDuplicates(wxopenid, wxcreatetime);
            if (!success)
            {
                //事件消息排重失败，放弃处理
                return "";
            }


            wxappid = WXApiInfo.wxappid;

            CallWXInterface wxinterface = new CallWXInterface();
            //获取粉丝信息，这一步是必须的，因为在明文模式下，要防止虚构粉丝数据
            WXFansInfo wxuser = wxinterface.GetUserInfo(wxappid, wxopenid);
            if (wxuser == null || wxuser.errcode != 0)
            {
                return "";
            }


            //根据微信POST过来的事件数据，判断是普通关注还是带参数的二维码关注，如果是带参数二维码关注，需要读取相应的二维码应用信息
            string EventKey = "";
            if (xmlModel.ContainsKey("EventKey"))
            {
                EventKey = xmlModel["EventKey"];
            }

            //注意微信的坑：普通关注的事件是有EventKey的（而文档上面没有）。带参数二维码扫描关注的EventKey是qrscene_开头的。
            #region 根据二维码应用信息来处理
            //WXUser bllWXUser = new WXUser();
            if (string.IsNullOrEmpty(EventKey) || !TextValidation.CheckStringByRegexp(EventKey, "qrscene_.+"))
            {
                //普通关注
                string errmsg = "";
                BLLWXFansManage mybll = new BLLWXFansManage();
                mybll.SubscribeLog(wxopenid, 1, ref errmsg);//关注日志
                success = mybll.Subscribe(wxopenid, wxuser, ref errmsg);
                if (success)
                {
                    result = "欢迎关注每通系统！";
                }
                else
                {
                    result = errmsg;
                }
            }
            else
            {
                //二维码扫描
                //result = QRCodeApplication(wxopenid, EventKey.Replace("qrscene_", ""), wxuser);
                string errmsg = "";
                BLLWXFansManage mybll = new BLLWXFansManage();
                mybll.SubscribeLog(wxopenid, 1, ref errmsg);//关注日志
                success = mybll.QRCodeApplication(wxopenid, EventKey.Replace("qrscene_", ""), wxuser, ref errmsg);
                if (success)
                {
                    result = errmsg;
                }
                else
                {
                    result = errmsg;
                }
            }
            #endregion


            //因为对于关注粉丝，可以自动发送欢迎语或其他内容，所以这里可返回内容
            string rspxml = "";
            if (!string.IsNullOrEmpty(result))
            {
                rspxml = "<xml><ToUserName><![CDATA[" + xmlModel["FromUserName"] + "]]></ToUserName><FromUserName><![CDATA[" + xmlModel["ToUserName"] + "]]></FromUserName><CreateTime>" + xmlModel["CreateTime"] + "</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[" + result + "]]></Content><FuncFlag>0</FuncFlag></xml>";
            }
            return rspxml;
        }
        #endregion

        #region 处理取消关注事件
        /// <summary>
        /// 处理取消关注事件
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string UnSubscribeHandle(ref Dictionary<string, string> xmlModel)
        {
            string result = "";
            string wxappusername = xmlModel["ToUserName"];//事件发给哪个公众号ID，这里用于验证是否本公众号的消息，防止虚构数据
            string wxopenid = xmlModel["FromUserName"];//事件是哪个粉丝发起的（粉丝的openid）
            string strCreateTime = xmlModel["CreateTime"];
            if (string.IsNullOrEmpty(strCreateTime))
            {
                //无消息创建时间，无法排重，放弃处理
                return "";
            }
            double wxcreatetime;
            if (!double.TryParse(strCreateTime, out wxcreatetime))
            {
                //无法将createtime转换成功，无法排重，放弃处理
                return "";
            }

            DALWXMessageHandleBasic mydal = new DALWXMessageHandleBasic();

            #region 事件消息排重
            //事件消息排重
            bool success = true;
            success = mydal.EventMsgPreventDuplicates(wxopenid, wxcreatetime);
            if (!success)
            {
                //事件消息排重失败，放弃处理
                return "";
            }
            #endregion

            #region 换取并判断是否存在wxappid

            string wxappid = WXApiInfo.wxappid;
            #endregion

            //WXUser bllWXUser = new WXUser();
            //bllWXUser.UnSubscribe(wxopenid, wxappid);
            //处理取消关注的方法
            string errmsg = "";
            BLLWXFansManage mybll = new BLLWXFansManage();
            mybll.SubscribeLog(wxopenid, 0, ref errmsg);//关注日志
            success = mybll.UnSubscribe(wxopenid, ref errmsg);


            return result;
        }
        #endregion

        #region
        /// <summary>
        /// 处理二维码扫描事件
        /// </summary>
        /// <param name="xmlModel"></param>
        /// <returns></returns>
        public string ScanHandle(ref Dictionary<string, string> xmlModel)
        {
            string result = "";//返回欢迎语内容
            string wxappusername = xmlModel["ToUserName"];//事件发给哪个开发者微信号（注意这里不是公众号的AppID，而是公众号的微信号）
            string wxopenid = xmlModel["FromUserName"];//事件是哪个粉丝发起的（粉丝的openid）
            string strCreateTime = xmlModel["CreateTime"];
            if (string.IsNullOrEmpty(strCreateTime))
            {
                //无消息创建时间，无法排重，放弃处理
                return "";
            }
            double wxcreatetime;
            if (!double.TryParse(strCreateTime, out wxcreatetime))
            {
                //无法将createtime转换成功，无法排重，放弃处理
                return "";
            }
            string wxappid = "";

            DALWXMessageHandleBasic mydal = new DALWXMessageHandleBasic();
            //事件消息排重
            bool success = true;
            success = mydal.EventMsgPreventDuplicates(wxopenid, wxcreatetime);
            if (!success)
            {
                //事件消息排重失败，放弃处理
                return "";
            }


            wxappid = WXApiInfo.wxappid;

            CallWXInterface wxinterface = new CallWXInterface();
            //获取粉丝信息，这一步是必须的，也要在明文模式下，要防止虚构粉丝数据
            WXFansInfo wxuser = wxinterface.GetUserInfo(wxappid, wxopenid);
            if (wxuser == null || wxuser.errcode != 0)
            {
                return "";
            }


            //推送过来的二维码场景值
            string EventKey = "";
            if (xmlModel.ContainsKey("EventKey"))
            {
                EventKey = xmlModel["EventKey"];
            }

            //result = QRCodeApplication(wxopenid, EventKey.Replace("qrscene_", ""), wxuser);
            string errmsg = "";
            BLLWXFansManage mybll = new BLLWXFansManage();
            success = mybll.QRCodeApplication(wxopenid, EventKey.Replace("qrscene_", ""), wxuser, ref errmsg);
            if (success)
            {
                result = errmsg;
            }
            else
            {
                result = errmsg;
            }
            //返回文本消息
            string rspxml = "";
            if (!string.IsNullOrEmpty(result))
            {
                rspxml = "<xml><ToUserName><![CDATA[" + xmlModel["FromUserName"] + "]]></ToUserName><FromUserName><![CDATA[" + xmlModel["ToUserName"] + "]]></FromUserName><CreateTime>" + xmlModel["CreateTime"] + "</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[" + result + "]]></Content><FuncFlag>0</FuncFlag></xml>";
            }
            return rspxml;
        }
        #endregion

        #endregion
    }
}
