using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WXInterface;

namespace BLL
{
    public class BLLSendWXTemplateMsg
    {
        /// <summary>
        /// 发送系统状态通知
        /// </summary>
        /// <returns></returns>
        public bool SendSysStatusNotify(string wxappid, string wxopenid, string keyword1, string keyword2, string keyword3, ref string errmsg)
        {
            bool result = true;
            string wxtemplateid = "z3-WMAJWRf_jCZzZCdm8Nyh7gI1rqR59G0BY6-g_3PM";
            //string url = "http://2308028y7r.51mypc.cn/Default.aspx";
            string first = "您好，项目进度已发生变化，请及时查阅";
            string remark = "点击查看详情";
            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""data"":{{
                                                ""first"":{{
                                                ""value"":""{3}"",
                                                ""color"":""#ff0000""
                                                }},
                                                ""keyword1"":{{
                                                ""value"":""{4}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword2"":{{
                                                ""value"":""{5}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, "", first, keyword1, keyword2, keyword3, remark });
            #endregion

            try
            {
                CallWXInterface call = new CallWXInterface();
                Ent_TemplateMsgSendResult sendresult = call.SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {

                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }



        /// <summary>
        /// 预订单下达通知
        /// </summary>
        /// <returns></returns>
        public bool SendOrderNotify(string wxappid, string wxopenid, string 订单号, string 产品名称, string 数量, string 图纸下达日期, string 收件人, ref string errmsg)
        {
            bool result = true;
            string wxtemplateid = "NiYXhNLAdfzm-e7VyByRH0EdF61Xr_dqU4bMhfpz6bI";
            //string url = "http://2308028y7r.51mypc.cn/AdvanceOrder/AddAdvanceOrder.aspx";
            string first = "您好,新图纸已完成设计";
            string remark = "点击查看详情";
            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""topcolor"":""#FF0000"",
                                    ""data"":{{
                                                ""first"":{{
                                                ""value"":""{3}"",
                                                ""color"":""#ff0000""
                                                }},
                                                ""keyword1"":{{
                                                ""value"":""{4}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword2"":{{
                                                ""value"":""{5}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword4"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword5"":{{
                                                ""value"":""{8}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{9}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";


            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, "", first, 订单号, 产品名称, 数量, 图纸下达日期, 收件人, remark });
            #endregion

            try
            {
                CallWXInterface call = new CallWXInterface();
                Ent_TemplateMsgSendResult sendresult = call.SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {

                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        /// <summary>
        /// 推送绑定消息
        /// </summary>
        /// <returns></returns>
        public bool SendSys(string wxappid, string wxopenid, string keyword1, string keyword2, string keyword3, ref string errmsg)
        {
            bool result = true;
            string wxtemplateid = "s709f8hBQOmnfAGvSHCuhFMjn63g0nL_iC3PSXVRnOs";
            string url = "http://240344pb55.qicp.vip/WebForm1.aspx";
            string first = "您好，新的绑定请求，请及时查阅";
            string remark = "点击查看详情";
            #region 模板消息发送格式
            string WXNoticeTemplate = @"{{
                                    ""touser"":""{0}"",
                                    ""template_id"":""{1}"",
                                    ""url"":""{2}"",
                                    ""data"":{{
                                                ""first"":{{
                                                ""value"":""{3}"",
                                                ""color"":""#ff0000""
                                                }},
                                                ""keyword1"":{{
                                                ""value"":""{4}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword2"":{{
                                                ""value"":""{5}"",
                                                ""color"":""#000000""
                                                }},
                                                ""keyword3"":{{
                                                ""value"":""{6}"",
                                                ""color"":""#000000""
                                                }},
                                                ""remark"":{{
                                                ""value"":""{7}"",
                                                ""color"":""#000000""
                                                }}
                                              }}
                                    }}";
            string sendWXTemplate = string.Format(WXNoticeTemplate, new object[] { wxopenid, wxtemplateid, url, first, keyword1, keyword2, keyword3, remark });
            #endregion

            try
            {
                CallWXInterface call = new CallWXInterface();
                Ent_TemplateMsgSendResult sendresult = call.SendTemplateMessage(wxappid, sendWXTemplate);
                if (sendresult.errcode == 0)
                {

                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }

    }
}
