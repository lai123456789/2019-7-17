using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public static class ParseInteger
    {
        /// <summary>
        /// 字符串转int
        /// </summary>
        /// <param name="intStr">要进行转换的字符串</param>
        /// <param name="defaultValue">默认值，默认：0</param>
        /// <returns></returns>
        public static int ParseInt(string intStr, int defaultValue = 0)
        {
            int parseInt;
            if (int.TryParse(intStr, out parseInt))
                return parseInt;
            return defaultValue;
        }
    }

}
