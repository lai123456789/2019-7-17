using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class BLLQRManage
    {
        /// <summary>
        /// 创建临时二维码
        /// </summary>
        /// <param name="ticket">获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码。</param>
        /// <param name="expire_seconds">该二维码有效时间，以秒为单位。 最大不超过2592000（即30天）。</param>
        /// <param name="url">二维码图片解析后的地址，开发者可根据该地址自行生成需要的二维码图片</param>
        /// <param name="qrtype">二维码类型，0为临时二维码，1为永久二维码</param>
        /// <param name="scene_id">二维码的场景ID</param>
        /// <param name="intentions">意图，【关注公众号】【绑定用户】</param>
        /// <param name="failuredate">失效时间</param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public bool CreateTmpQRCode(string ticket, int expire_seconds, string url, int qrtype, int scene_id, string intentions, DateTime failuredate, ref string errmsg)
        {
            bool result = true;
            DALQRManage mydal = new DALQRManage();
            result = mydal.CreateTmpQRCode(ticket, expire_seconds, url, qrtype, scene_id, intentions, failuredate, ref errmsg);
            return result;
        }
    }
}
