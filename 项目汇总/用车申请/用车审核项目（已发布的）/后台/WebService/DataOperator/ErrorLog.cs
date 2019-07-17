using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DataOperator
{
    public class ErrorLog
    {
        /// <summary>
        /// 将错误以文本的形式记录下来.
        /// </summary>
        /// <param name="Ex">捕获的异常.</param>
        public static void WriteLog(Exception Ex)
        {
            string ErrTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string ErrSource = Ex.Source;
            string ErrTargetSite = Ex.TargetSite.ToString();
            string ErrMsg = Ex.Message;
            string ErrStackTrace = Ex.StackTrace;
            string FilePath = System.Web.HttpContext.Current.Server.MapPath("\\DBErrReport\\");
            if (!Directory.Exists(FilePath))
            {
                Directory.CreateDirectory(FilePath);
            }
            string FileName = FilePath + DateTime.Now.ToString("yyyy-MM-dd") + ".log";
            if (GetFileSize(FileName) > 1024 * 3)
            {
                CopyToBak(FileName);
            }
            StreamWriter MySw = new StreamWriter(FileName, true, Encoding.UTF8);
            MySw.WriteLine("错误时间 : " + ErrTime);
            MySw.WriteLine("错误对象 : " + ErrSource);
            MySw.WriteLine("异常方法 : " + ErrTargetSite);
            MySw.WriteLine("错误信息 : " + ErrMsg);
            MySw.WriteLine("堆栈内容 : ");
            MySw.WriteLine(ErrStackTrace);
            MySw.WriteLine("\r\n**********************************************************************\r\n");
            MySw.Close();
            MySw.Dispose();

        }

        private static long GetFileSize(string FileName)
        {
            long strRe = 0;
            if (File.Exists(FileName))
            {
                FileStream MyFs = new FileStream(FileName, FileMode.Open);
                strRe = MyFs.Length / 1024;
                MyFs.Close();
                MyFs.Dispose();
            }
            return strRe;
        }

        private static void CopyToBak(string sFileName)
        {
            int FileCount = 0;
            string sBakName = "";
            do
            {
                FileCount++;
                sBakName = sFileName + "." + FileCount.ToString() + ".BAK";
            }
            while (File.Exists(sBakName));
            File.Copy(sFileName, sBakName);
            File.Delete(sFileName);
        }
    }
}
