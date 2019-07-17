using Common;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace WebApp
{
    namespace WebApp
    {
        public class AppBase64ToImg
        {
            /// <summary>
            /// 将Base64的字符串转成图片存储
            /// </summary>
            /// <param name="base64String">base64字符流</param>
            /// <param name="ImgPath">图片路径</param>
            /// <param name="ImgName">图片名称</param>
            /// <returns>是否成功执行</returns>
            public bool Base64ToImg(string base64String, string ImgPath, string ImgName, ref string errmsg)
            {
                bool result = true;
                base64String = base64String.Replace("data:image/png;base64,", "");
                base64String = base64String.Replace("data:image/jpeg;base64,", "");
                base64String = base64String.Replace("data:image/gif;base64,", "");
                System.Web.HttpContext.Current.Response.ContentType = "text/plain";
                System.Drawing.Image bmp = null;
                MemoryStream ms = null;
                try
                {
                    byte[] b = Convert.FromBase64String(base64String);
                    ms = new MemoryStream(b);
                    bmp = new Bitmap(ms);
                    string physicalpath = System.Web.HttpContext.Current.Server.MapPath(ImgPath);
                    if (!Directory.Exists(physicalpath))
                    {
                        Directory.CreateDirectory(physicalpath);
                    }
                    bmp.Save(physicalpath + "/" + ImgName, ImageFormat.Png);
                }
                catch (Exception ex)
                {
                    result = false;
                    errmsg = "Error:" + ex.Message.ToString();
                    LogWriter.WriteLog(ex);
                }
                finally
                {
                    bmp.Dispose();
                    ms.Close();
                }
                return result;
            }

            /// <summary>
            /// 将Base64的字符串转成图片存储
            /// </summary>
            /// <param name="base64String">base64字符流</param>
            /// <param name="ImgPath">图片路径</param>
            /// <param name="ImgName">图片名称</param>
            /// <returns>是否成功执行</returns>
            public bool Base64ToImg(string base64String, string ImgPath, string ImgName, double height, ref string errmsg)
            {
                bool result = true;
                base64String = base64String.Replace("data:image/png;base64,", "");
                base64String = base64String.Replace("data:image/jpeg;base64,", "");
                base64String = base64String.Replace("data:image/gif;base64,", "");
                System.Web.HttpContext.Current.Response.ContentType = "text/plain";
                System.Drawing.Image bmp = null;
                MemoryStream ms = null;
                try
                {
                    byte[] b = Convert.FromBase64String(base64String);
                    ms = new MemoryStream(b);
                    bmp = ImageResize(new Bitmap(ms), height);
                    string physicalpath = System.Web.HttpContext.Current.Server.MapPath(ImgPath);
                    if (!Directory.Exists(physicalpath))
                    {
                        Directory.CreateDirectory(physicalpath);
                    }
                    if (!File.Exists(physicalpath))
                    {
                        File.Delete(physicalpath + "/" + ImgName);
                    }
                    bmp.Save(physicalpath + "/" + ImgName, ImageFormat.Png);
                }
                catch (Exception ex)
                {
                    result = false;
                    errmsg = "Error:" + ex.Message.ToString();
                    LogWriter.WriteLog(ex);
                }
                finally
                {
                    bmp.Dispose();
                    ms.Close();
                }
                return result;
            }


            /// <summary>
            /// 修改图片尺寸
            /// </summary>
            /// <param name="imgSrc"></param>
            /// <param name="height">图片高度</param>
            /// <param name="width">图片宽度</param>
            /// <returns></returns>
            private System.Drawing.Image ImageResize(System.Drawing.Image imgSrc, double height)
            {
                double m = Convert.ToDouble(imgSrc.Width) / Convert.ToDouble(imgSrc.Height);
                double width = height * m;
                System.Drawing.Image newImage = imgSrc.GetThumbnailImage((Int32)width, (Int32)height, null, new IntPtr());
                Graphics g = Graphics.FromImage(newImage);
                g.DrawImage(newImage, 0, 0, newImage.Width, newImage.Height);
                g.Dispose();
                return newImage;
            }

            /// <summary>
            /// 删除文件
            /// </summary>
            /// <param name="fileUrl">路径</param>
            public void DeleteImgFile(string fileUrl)
            {
                string file = System.Web.HttpContext.Current.Server.MapPath(fileUrl);
                if (System.IO.File.Exists(file))
                {
                    System.IO.File.Delete(file);
                }
            }

        }
    }
}