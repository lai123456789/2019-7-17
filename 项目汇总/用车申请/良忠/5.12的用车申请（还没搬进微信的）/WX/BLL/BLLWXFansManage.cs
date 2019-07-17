using DAL;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLWXFansManage
    {
        /// <summary>
        /// 关注微信公众号
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="wxuser">粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool Subscribe(string wxopenid, WXFansInfo wxuser, ref string errmsg)
        {
            bool result = true;
            DALWXFansManage mydal = new DALWXFansManage();
            result = mydal.Subscribe(wxopenid, wxuser, ref errmsg);
            return result;
        }

        /// <summary>
        /// 二维码扫描关注
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="scene_id">场景ID</param>
        /// <param name="wxuser">粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool QRCodeApplication(string wxopenid, string scene_id, WXFansInfo wxuser, ref string errmsg)
        {
            bool result = true;
            DALWXFansManage mydal = new DALWXFansManage();
            result = mydal.QRCodeApplication(wxopenid, scene_id, wxuser, ref errmsg);
            return result;
        }

        /// <summary>
        /// 关注取消日志记录
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="subscribed">是否关注，0取消关注，1关注</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool SubscribeLog(string wxopenid, int subscribed, ref string errmsg)
        {
            bool result = true;
            DALWXFansManage mydal = new DALWXFansManage();
            result = mydal.SubscribeLog(wxopenid, subscribed, ref errmsg);
            return result;
        }


        /// <summary>
        /// 取消关注
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool UnSubscribe(string wxopenid, ref string errmsg)
        {
            bool result = true;
            DALWXFansManage mydal = new DALWXFansManage();
            result = mydal.UnSubscribe(wxopenid, ref errmsg);
            return result;
        }
    }
}
