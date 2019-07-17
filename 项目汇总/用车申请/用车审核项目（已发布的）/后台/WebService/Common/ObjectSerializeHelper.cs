using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;

namespace Common
{
    public class ObjectSerializeHelper
    {
        public static byte[] Serialize(object obj)
        {
            BinaryFormatter binaryF = new BinaryFormatter();
            MemoryStream ms = new MemoryStream();
            binaryF.Serialize(ms, obj);
            ms.Seek(0, SeekOrigin.Begin);
            var buffer = new byte[(int)ms.Length];
            ms.Read(buffer, 0, buffer.Length);
            ms.Close();
            return buffer;
        }

        public static object Deserialize(byte[] buffer)
        {
            var binaryF = new BinaryFormatter();
            var ms = new MemoryStream(buffer, 0, buffer.Length, false);
            object obj = binaryF.Deserialize(ms);
            ms.Close();
            return obj;
        }

        public enum ColumnNameLetterCase
        {
            /// <summary>
            /// 原字段名大小写
            /// </summary>
            Original = 0,
            /// <summary>
            /// 大写
            /// </summary>
            ToUpper = 1,
            /// <summary>
            /// 小写
            /// </summary>
            ToLower = 2
        }

        /// <summary>
        /// DataTable转换成json（支持字段名大小写选项）
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="LetterCase">字段名大小选项，默认原状态</param>
        /// <returns></returns>
        public static string DataTableToJson(DataTable dt, ColumnNameLetterCase LetterCase = ColumnNameLetterCase.Original)
        {
            JavaScriptSerializer json = new JavaScriptSerializer();
            json.MaxJsonLength = Int32.MaxValue; //取得最大数值
            ArrayList arrayList = new ArrayList();

            foreach (DataRow dataRow in dt.Rows)
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();  //实例化一个参数集合
                foreach (DataColumn dataColumn in dt.Columns)
                {
                    string ColumnName = "";
                    switch (LetterCase)
                    {
                        case ColumnNameLetterCase.Original:
                            ColumnName = dataColumn.ColumnName;
                            break;
                        case ColumnNameLetterCase.ToLower:
                            ColumnName = dataColumn.ColumnName.ToLower();
                            break;
                        case ColumnNameLetterCase.ToUpper:
                            ColumnName = dataColumn.ColumnName.ToUpper();
                            break;
                    }
                    dictionary.Add(ColumnName, dataRow[dataColumn.ColumnName].ToString());
                }
                arrayList.Add(dictionary); //ArrayList集合中添加键值
            }


            return json.Serialize(arrayList);  //返回一个json字符串
        }

        public static T JsonToObject<T>(string strjson)
        {
            T obj;
            JavaScriptSerializer json = new JavaScriptSerializer();
            json.MaxJsonLength = Int32.MaxValue;
            try
            {
                obj = json.Deserialize<T>(strjson);
            }
            catch (Exception)
            {
                obj = default(T);
            }
            return obj;
        }


        public static string ObjectToJson(object Obj)
        {
            JavaScriptSerializer json = new JavaScriptSerializer();
            json.MaxJsonLength = Int32.MaxValue;
            return json.Serialize(Obj);
        }


        /// <summary>
        /// 将json转换为DataTable
        /// </summary>
        /// <param name="strJson">得到的json</param>
        /// <returns></returns>
        public static DataTable JsonToDataTable(string strJson)
        {
            //转换json格式
            strJson = strJson.Replace(",\"", "*\"").Replace("\":", "\"#").ToString();
            //取出表名   
            var rg = new Regex(@"(?<={)[^:]+(?=:\[)", RegexOptions.IgnoreCase);
            string strName = rg.Match(strJson).Value;
            DataTable tb = null;
            //去除表名   
            strJson = strJson.Substring(strJson.IndexOf("[") + 1);
            strJson = strJson.Substring(0, strJson.IndexOf("]"));

            //获取数据   
            rg = new Regex(@"(?<={)[^}]+(?=})");
            MatchCollection mc = rg.Matches(strJson);
            for (int i = 0; i < mc.Count; i++)
            {
                string strRow = mc[i].Value;
                string[] strRows = strRow.Split('*');

                //创建表   
                if (tb == null)
                {
                    tb = new DataTable();
                    tb.TableName = strName;
                    foreach (string str in strRows)
                    {
                        var dc = new DataColumn();
                        string[] strCell = str.Split('#');

                        if (strCell[0].Substring(0, 1) == "\"")
                        {
                            int a = strCell[0].Length;
                            dc.ColumnName = strCell[0].Substring(1, a - 2);
                        }
                        else
                        {
                            dc.ColumnName = strCell[0];
                        }
                        tb.Columns.Add(dc);
                    }
                    tb.AcceptChanges();
                }

                //增加内容   
                DataRow dr = tb.NewRow();
                for (int r = 0; r < strRows.Length; r++)
                {
                    dr[r] = strRows[r].Split('#')[1].Trim().Replace("，", ",").Replace("：", ":").Replace("\"", "");
                }
                tb.Rows.Add(dr);
                tb.AcceptChanges();
            }

            return tb;
        }


        /// <summary>    
        /// DataSet转换为Json   
        /// </summary>    
        /// <param name="dataSet">DataSet对象</param>   
        /// <returns>Json字符串</returns>    
        public static string DataSetToJson(DataSet dataSet, ColumnNameLetterCase LetterCase = ColumnNameLetterCase.Original)
        {
            string jsonString = "{";
            foreach (DataTable table in dataSet.Tables)
            {
                jsonString += "\"" + table.TableName + "\":" + DataTableToJson(table, LetterCase) + ",";
            }
            jsonString = jsonString.TrimEnd(',');
            return jsonString + "}";
        }

    }
}
