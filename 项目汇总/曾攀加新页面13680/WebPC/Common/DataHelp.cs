using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

namespace Common
{
    public class DataHelp
    {
        /// <summary>
        /// dataset 转转换byte[] 字节
        /// </summary>
        /// <param name="str"></param>
        public static byte[] DataToByte(DataSet ds)
        {
            byte[] bArrayResult = null;
            ds.RemotingFormat = SerializationFormat.Binary;
            MemoryStream ms = new MemoryStream();
            IFormatter bf = new BinaryFormatter();
            bf.Serialize(ms, ds);
            bArrayResult = ms.ToArray();
            ms.Close();
            ms.Dispose();
            return bArrayResult;
        }
        /// <summary>
        /// byte[] 字节转datasheet
        /// </summary>
        /// <param name="bArrayResult"></param>
        /// <returns></returns>
        public static DataSet ByteToDataset(byte[] bArrayResult)
        {
            DataSet dsResult = new DataSet();
            try
            {
                MemoryStream ms = new MemoryStream(bArrayResult);
                IFormatter bf = new BinaryFormatter();
                object obj = bf.Deserialize(ms);
                dsResult = (DataSet)obj;
                ms.Close();
                ms.Dispose();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dsResult;

        }



        /// <summary>
        /// EXcel读取，返回dataset
        /// </summary>
        /// <param name="Path">路径</param>
        /// <returns>dataset</returns>
        public static DataSet ExcelToDS(string Path)
        {
            string strConn = "Provider=Microsoft.ACE.OLEDB.12.0;;Data Source=" + Path + ";Extended Properties='Excel 8.0;HDR=No;IMEX=1'";
            string tableName = "";
            using (OleDbConnection conn = new OleDbConnection(strConn))
            {
                conn.Open();
                DataTable dt = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                tableName = dt.Rows[0][2].ToString().Trim();
            }
            DataSet ds = new DataSet();
            OleDbDataAdapter oada = new OleDbDataAdapter("select * from [" + tableName + "]", strConn);
            oada.Fill(ds);
            return ds;
        }

        /// <summary>
        /// Excel文件流转成DataTable
        /// </summary>
        /// <param name="path">根路径</param>
        /// <param name="stream">文件流</param>
        /// <param name="dt">返回列表：
        /// 
        /// </param>
        /// <param name="errmsg">出错时返回的错误提示信息</param>
        /// <returns>是否成功执行</returns>
        public static bool ExcelFileStreamToDataTable(string path, Stream stream, ref DataTable dt, ref string errmsg)
        {
            bool result = true;
            string excelname = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            try
            {
                DataSet ds = new DataSet();
                byte[] b = new byte[stream.Length];
                stream.Read(b, 0, (int)stream.Length);
                FileStream fs = new FileStream(path + @"/" + excelname + ".xls", FileMode.Create, FileAccess.Write);
                fs.Write(b, 0, b.Length);
                fs.Flush();
                fs.Close();
                ds = DataHelp.ExcelToDS(path + excelname + ".xls");
                if (ds != null && ds.Tables.Count > 0)
                {
                    DataTable dt1 = ds.Tables[0];
                    dt = dt1;
                    if (dt1 != null && dt1.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt1.Rows.Count; i++)
                        {
                            bool 该行为空 = true;
                            for (int j = 0; j < dt1.Columns.Count; j++)
                            {   
                                if (!string.IsNullOrWhiteSpace(dt1.Rows[i][j].ToString()))
                                {
                                    该行为空 = false;
                                }
                                if (i == 0)
                                {
                                    if (string.IsNullOrWhiteSpace(dt1.Rows[i][j].ToString()))
                                    {
                                        if (dt1.Columns.Count > j)
                                        {
                                            dt1.Columns.RemoveAt(j);
                                            j--;
                                        }
                                    }
                                    else
                                    {
                                        dt.Columns[j].ColumnName = dt1.Rows[i][j].ToString();
                                    }
                                    
                                }
                            }
                            if (该行为空)
                            {
                                for (int kk = (dt.Rows.Count - 1); kk >= i; kk--)
                                {
                                    dt.Rows.RemoveAt(kk);
                                }
                                break;
                            }
                        }
                        dt.Rows.RemoveAt(0);
                    }
                    else 
                    {
                        result = false;
                        errmsg = "无表数据";
                    }
                }
                else
                {
                    result = false;
                    errmsg = "无数据内容";
                }
            }
            catch (Exception ex)
            {
                errmsg = ex.Message.ToString();
                result = false;
                LogWriter.WriteLog(ex);
            }
            finally
            {
                File.Delete(path + @"/" + excelname + ".xls");
            }
            return result;
        }

    }
}
