using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;

namespace Common
{
    public class LogWriter
    {
        private static object _FileLock = new object();

        public static void WriteLog(Exception Ex)
        {
            lock (_FileLock)
            {
                try
                {
                    string ErrTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    string ErrSource = Ex.Source;
                    string ErrTargetSite = Ex.TargetSite.ToString();
                    string ErrMsg = Ex.Message;
                    string ErrStackTrace = Ex.StackTrace;
                    //string FilePath = System.IO.Path.GetFullPath("ErrLog\\");
                    string FilePath = System.IO.Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName) + "\\ErrLog\\";
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
                    MySw.WriteLine("\r\n***************************************************************\r\n");
                    MySw.Close();
                    MySw.Dispose();
                }
                catch (Exception ex)
                {

                }
            }
        }

        public static void WriteDebug(string str)
        {
            try
            {
                string ErrTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                string FilePath = System.IO.Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName) + "\\debug\\";
                if (!Directory.Exists(FilePath))
                {
                    Directory.CreateDirectory(FilePath);
                }
                string FileName = FilePath + DateTime.Now.ToString("yyyy-MM-dd") + ".info";
                if (GetFileSize(FileName) > 1024 * 3)
                {
                    CopyToBak(FileName);
                }
                StreamWriter MySw = new StreamWriter(FileName, true, Encoding.UTF8);
                MySw.WriteLine("时间 : " + ErrTime);
                MySw.WriteLine("调试内容：" + str);
                MySw.WriteLine("\r\n***************************************************************\r\n");
                MySw.Close();
                MySw.Dispose();
            }
            catch (Exception ex)
            {

            }
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
