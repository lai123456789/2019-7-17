using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web.Script.Serialization;

namespace Common
{
    public class ObjectSeriallizeHelper
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
            catch (Exception ex)
            {
                obj = default(T);
            }
            return obj;
        }


        /// <summary>
        /// Json 字符串 转换为 DataTable数据集合
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static DataTable JsonToDataTable(string json)
        {
            DataTable dataTable = new DataTable();  //实例化
            DataTable result;
            try
            {
                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                javaScriptSerializer.MaxJsonLength = Int32.MaxValue; //取得最大数值
                ArrayList arrayList = javaScriptSerializer.Deserialize<ArrayList>(json);
                if (arrayList.Count > 0)
                {
                    foreach (Dictionary<string, object> dictionary in arrayList)
                    {
                        if (dictionary.Keys.Count<string>() == 0)
                        {
                            result = dataTable;
                            return result;
                        }
                        //Columns
                        if (dataTable.Columns.Count == 0)
                        {
                            foreach (string current in dictionary.Keys)
                            {
                                dataTable.Columns.Add(current, dictionary[current].GetType());
                            }
                        }
                        //Rows
                        DataRow dataRow = dataTable.NewRow();
                        foreach (string current in dictionary.Keys)
                        {
                            dataRow[current] = dictionary[current];
                        }
                        dataTable.Rows.Add(dataRow); //循环添加行到DataTable中
                    }
                }
            }
            catch
            {
            }
            result = dataTable;
            return result;
        }

        public static string ObjectToJson(object Obj)
        {
            JavaScriptSerializer json = new JavaScriptSerializer();
            json.MaxJsonLength = Int32.MaxValue;
            return json.Serialize(Obj);
        }

        /// <summary>
        /// 获取string,object结构的dictionary键值
        /// </summary>
        /// <typeparam name="T">返回值的类型</typeparam>
        /// <param name="dic">一个需要取出数值的dictionary对象</param>
        /// <param name="key">需要取值的key</param>
        /// <returns></returns>
        public static T GetDictionaryValue<T>(Dictionary<string, object> dic, string key)
        {
            T obj = default(T);
            try
            {
                if (dic.ContainsKey(key))
                {
                    obj = (T)dic[key];
                }
            }
            catch (Exception e)
            {

            }
            return obj;
        }
    }
}
