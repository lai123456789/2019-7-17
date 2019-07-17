using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Common
{
    public class TextValidation
    {
        public static bool CheckTextForNumeric(string source, int minLength, int maxLength)
        {
            bool result = true;
            Regex reg = new Regex("^\\d{" + minLength.ToString() + "," + maxLength.ToString() + "}$");
            result = reg.IsMatch(source);
            return result;
        }

        public static bool CheckTextByteLength(string source, int minLength, int maxLength)
        {
            bool result = true;
            try
            {
                //int bLength = System.Text.Encoding.Default.GetBytes(source).Length;
                int bLength = System.Text.Encoding.UTF8.GetByteCount(source);
                if (bLength < minLength || bLength > maxLength)
                {
                    result = false;
                }
            }
            catch (Exception ex)
            {
                result = false;
            }
            return result;
        }
        /// <summary>
        /// 获取字节大小
        /// </summary>
        /// <param name="source">字符串数据</param>
        /// <returns>字节大小</returns>
        public static int GetTextLength(string source)
        {
            return System.Text.Encoding.UTF8.GetBytes(source).Length;
        }

        public static bool CheckStringByRegexp(string strcontent, string regexp)
        {
            bool result = true;
            Regex reg = new Regex(regexp);
            result = reg.IsMatch(strcontent);
            return result;
        }
        public static bool Isphone(string strcontent)
        {
            #region 手机号码判断
            string regularStr = "^[0-9]{11}$";
            return CheckStringByRegexp(strcontent, regularStr);
            #endregion
        }
        public static bool IsLandline(string strcontent)
        {
            #region 座机判断
            string regularStr = "^[0-9]{3,4}-+[0-9]{7,8}$";
            return CheckStringByRegexp(strcontent, regularStr);
            #endregion
        }
        public static bool ISnumber(string strcontent)
        {
            #region 纯数字
            string regularStr = "^[0-9-]{1,13}$";
            return CheckStringByRegexp(strcontent, regularStr);
            #endregion

        }
        public static bool ISPrefix(string strcontent)
        {
            #region 前缀判断，只能是数字，字母，下划线组成
            if (strcontent.Trim() == "") { return true; }
            string regularStr = "^[0-9A-Za-z_]{1,13}$";
            return CheckStringByRegexp(strcontent, regularStr);
            #endregion
        }
        /// <summary>
        /// 只能为字母或者数字
        /// </summary>
        /// <param name="strcontent"></param>
        /// <returns></returns>
        public static bool ISNumberzimu(string strcontent)
        {
            #region 只能是数字，字母
            if (strcontent.Trim() == "") { return true; }
            string regularStr = "^[0-9A-Za-z]$";
            return CheckStringByRegexp(strcontent, regularStr);
            #endregion
        }
    }
}
