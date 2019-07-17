using DAL;
using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLUserManage
    {
        /// <summary>
        /// 更新微信
        /// </summary>
        /// <param name="wxfansinfo">微信粉丝信息</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool UpdateWXFansInfo(WXFansInfo wxfansinfo, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.UpdateWXFansInfo(wxfansinfo, ref errmsg);
            return result;
        }

        /// <summary>
        /// 获取微信粉丝绑定的用户列表
        /// </summary>
        /// <param name="wxopenid">微信粉丝ID</param>
        /// <param name="dt">返回列表</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool GetWXFansBindUserInfo(string wxopenid, ref DataTable dt, ref DataTable dt_page, ref string errmsg)
        {
            bool result = true;
            DALUserManage mydal = new DALUserManage();
            result = mydal.GetWXFansBindUserInfo(wxopenid, ref dt, ref dt_page, ref errmsg);
            return result;
        }
    }
}
