using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace DataOperator
{
    public class SqlDBO
    {
        #region 私有变量.
        private SqlConnection MyConn;
        private SqlCommand MyComm;
        private SqlTransaction MyTrans;
        private string _ConnStr = System.Configuration.ConfigurationManager.AppSettings["ConnStr"];
        private bool _AutoClose = true;
        private bool _IsTransactionBegin = false;
        #endregion

        #region SqlDBO构造函数.
        /// <summary>
        /// SqlDBO构造函数.
        /// </summary>
        public SqlDBO()
        {
            Open();

        }

        /// <summary>
        /// SqlDBO构造函数.
        /// </summary>
        /// <param name="ConnStr">Sql连接字符串.</param>
        public SqlDBO(string ConnStr)
        {
            this._ConnStr = ConnStr;
            Open();
        }

        /// <summary>
        /// SqlDBO构造函数.
        /// </summary>
        /// <param name="ConnStr">Sql连接字符串.</param>
        /// <param name="AutoClose">在执行完一次操作后是否自动关闭连接,默认为true,若改为false,则在操作完后须调用Close函数关闭连接.</param>
        public SqlDBO(string ConnStr, bool AutoClose)
        {
            this._ConnStr = ConnStr;
            this._AutoClose = AutoClose;
            Open();
        }
        #endregion

        #region AutoClose:是否自动关闭数据连接.
        /// <summary>
        /// 是否自动关闭数据连接.
        /// </summary>
        public bool AutoClose
        {
            get { return _AutoClose; }
            set { _AutoClose = value; }
        }
        #endregion

        #region SqlCmdParam:SqlCommand的参数
        /// <summary>
        /// SqlCommand的参数
        /// </summary>
        public struct SqlCmdParam
        {
            public string Name;		    //参数名
            public SqlDbType Type;		//SQL数据类型
            public object Value;		//参数值

        }
        #endregion

        #region Open:打开数据库连接.
        /// <summary>
        /// 打开数据库连接.
        /// </summary>
        public void Open()
        {
            try
            {
                if (MyConn == null)
                {
                    MyConn = new SqlConnection(_ConnStr);
                }
                if (MyConn.State == ConnectionState.Closed)
                {
                    MyConn.ConnectionString = _ConnStr;
                    MyConn.Open();
                }
                if (MyComm == null)
                {
                    CreateNewCommand();
                }
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }
        #endregion

        #region Close:关闭数据库连接.
        /// <summary>
        /// 关闭数据库连接.
        /// </summary>
        public void Close()
        {
            try
            {
                //事务未结束防止自动关闭
                if (_AutoClose && _IsTransactionBegin)
                {
                    return;
                }
                if (MyConn.State != System.Data.ConnectionState.Closed)
                {
                    MyConn.Close();
                }
                if (MyComm != null)
                {
                    MyComm.Dispose();
                }
                MyConn.Dispose();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }
        #endregion

        #region 事务控制

        /// <summary>
        /// 开始事务
        /// </summary>
        public void BeginTransaction()
        {
            try
            {
                MyTrans = MyConn.BeginTransaction();
                MyComm.Transaction = MyTrans;
                _IsTransactionBegin = true;
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }

        /// <summary>
        /// 提交事务
        /// </summary>
        public void Commit()
        {
            try
            {
                MyTrans.Commit();
                _IsTransactionBegin = false;
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }

        /// <summary>
        /// 回滚事务
        /// </summary>
        public void Rollback()
        {
            try
            {
                MyTrans.Rollback();
                _IsTransactionBegin = false;
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }
        #endregion

        #region CreateNewCommand:创建一个新的SqlCommand.

        /// <summary>
        /// 创建一个新的SqlCommand.
        /// </summary>
        private void CreateNewCommand()
        {
            MyComm = new SqlCommand();
            MyComm.Connection = MyConn;
        }

        /// <summary>
        /// 创建一个新的SqlCommand.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        private void CreateNewCommand(string ExSql)
        {
            try
            {
                MyComm = new SqlCommand(ExSql, MyConn);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }

        /// <summary>
        /// 创建一个新的SqlCommand.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">要填充的SQL参数数组.</param>
        private void CreateNewCommand(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            try
            {
                MyComm = new SqlCommand(ExSql, MyConn);
                if (MyCmdParam != null)
                {
                    FillCmdParam(ref MyComm, MyCmdParam);
                }
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
        }
        #endregion

        #region FillCmdParam:将SQL参数数组填充到SqlCommand.
        /// <summary>
        /// 将SQL参数数组填充到SqlCommand.
        /// </summary>
        /// <param name="MyComm">要填充的SqlCommand.</param>
        /// <param name="cmdParm">SQL参数数组.</param>
        private void FillCmdParam(ref SqlCommand MyComm, SqlCmdParam[] cmdParm)
        {
            MyComm.Parameters.Clear();
            for (int ii = 0; ii < cmdParm.Length; ii++)
            {
                MyComm.Parameters.Add(cmdParm[ii].Name, cmdParm[ii].Type);
                MyComm.Parameters[cmdParm[ii].Name].Value = cmdParm[ii].Value;
            }
        }
        #endregion

        #region CreateNewParam:新建SQL参数.
        /// <summary>
        /// 新建SQL参数.
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="ParamType">SQL参数类型</param>
        /// <param name="Value">参数值</param>
        /// <returns>SQL参数</returns>
        public SqlCmdParam CreateNewParam(string ParamName, SqlDbType ParamType, object Value)
        {
            SqlCmdParam MyParam = new SqlCmdParam();
            MyParam.Name = ParamName;
            MyParam.Type = ParamType;
            MyParam.Value = Value;
            return MyParam;
        }
        #endregion

        #region ExecuteNonQuery:执行一个SQL语句,返回受影响的行数.
        /// <summary>
        /// 执行一个SQL语句,返回受影响的行数.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个整数.</returns>
        public int ExecuteNonQuery(string ExSql)
        {
            int result = 0;
            try
            {
                MyComm.CommandText = ExSql;
                result = MyComm.ExecuteNonQuery();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }

        /// <summary>
        /// 执行一个SQL语句,返回受影响的行数.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个整数.</returns>
        public int ExecuteNonQuery(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            int result = 0;
            try
            {
                MyComm.CommandText = ExSql;
                FillCmdParam(ref MyComm, MyCmdParam);
                result = MyComm.ExecuteNonQuery();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }
        #endregion

        #region ExecuteReader:执行一个SQL查询语句,返回一个DataReader.
        /// <summary>
        /// 执行一个SQL查询语句,返回一个DataReader.
        /// </summary>
        /// <param name="ExSql">要执行的SQL查询语句.</param>
        /// <returns>返回一个DataReader.</returns>
        public SqlDataReader ExecuteReader(string ExSql)
        {
            SqlDataReader MyDr = null;
            try
            {
                MyComm.CommandText = ExSql;
                MyDr = MyComm.ExecuteReader();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            return MyDr;
        }

        /// <summary>
        /// 执行一个SQL查询语句,返回一个DataReader.
        /// </summary>
        /// <param name="ExSql">要执行的SQL查询语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个DataReader.</returns>
        public SqlDataReader ExecuteReader(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            SqlDataReader MyDr = null;
            try
            {
                MyComm.CommandText = ExSql;
                FillCmdParam(ref MyComm, MyCmdParam);
                MyDr = MyComm.ExecuteReader();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            return MyDr;
        }
        #endregion

        #region ExecuteScalar:执行一个SQL语句,返回执行结果中首行首列的值.
        /// <summary>
        /// 执行一个SQL语句,返回执行结果中首行首列的值.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个object.</returns>
        public object ExecuteScalar(string ExSql)
        {
            object result = null;
            try
            {
                MyComm.CommandText = ExSql;
                result = MyComm.ExecuteScalar();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }

        /// <summary>
        /// 执行一个SQL语句,返回执行结果中首行首列的值.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个object.</returns>
        public object ExecuteScalar(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            object result = null;
            try
            {
                MyComm.CommandText = ExSql;
                FillCmdParam(ref MyComm, MyCmdParam);
                result = MyComm.ExecuteScalar();
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }
        #endregion

        #region GetDataAdapter:执行一个SQL语句,生成一个DataAdpter.
        /// <summary>
        /// 执行一个SQL语句,生成一个DataAdpter.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个DataAdpter.</returns>
        public SqlDataAdapter GetDataAdapter(string ExSql)
        {
            Open();
            SqlDataAdapter MyDA = new SqlDataAdapter();
            try
            {
                MyDA = new SqlDataAdapter(ExSql, MyConn);
                MyDA.SelectCommand.CommandTimeout = 180;
                return MyDA;
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            return MyDA;
        }

        /// <summary>
        /// 执行一个SQL语句,生成一个DataAdpter.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个DataAdpter.</returns>
        public SqlDataAdapter GetDataAdapter(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            Open();
            SqlDataAdapter MyDA = null;
            try
            {
                MyComm.CommandTimeout = 180;
                MyComm.CommandText = ExSql;
                FillCmdParam(ref MyComm, MyCmdParam);
                MyDA = new SqlDataAdapter(MyComm);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            return MyDA;
        }
        #endregion

        #region GetDataSet:根据传入的SQL语句查询数据并返回一个DataSet.
        /// <summary>
        /// 根据传入的SQL语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExSql)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExSql).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyDs;
        }

        /// <summary>
        /// 根据传入的SQL语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExSql, string TableName)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExSql).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            return MyDs;
        }

        /// <summary>
        /// 根据传入的SQL语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExSql, MyCmdParam).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyDs;
        }

        /// <summary>
        /// 根据传入的SQL语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExSql, SqlCmdParam[] MyCmdParam, string TableName)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExSql, MyCmdParam).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyDs;
        }
        #endregion

        #region FillDataSet:根据传入的SQL语句查询数据并填充到DataSet.
        /// <summary>
        /// 根据传入的SQL语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExSql, ref DataSet MyDs)
        {
            try
            {
                GetDataAdapter(ExSql).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }

        /// <summary>
        /// 根据传入的SQL语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExSql, ref DataSet MyDs, string TableName)
        {
            try
            {
                GetDataAdapter(ExSql).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }

        /// <summary>
        /// 根据传入的SQL语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExSql, SqlCmdParam[] MyCmdParam, ref DataSet MyDs)
        {
            try
            {
                GetDataAdapter(ExSql, MyCmdParam).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }

        /// <summary>
        /// 根据传入的SQL语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExSql, SqlCmdParam[] MyCmdParam, ref DataSet MyDs, string TableName)
        {
            try
            {
                GetDataAdapter(ExSql, MyCmdParam).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }
        #endregion

        #region GetDataTable:执行指定的SQL语句,生成一个DataTable.
        /// <summary>
        /// 执行指定的SQL语句,生成一个DataTable.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个DataTable.</returns>
        public DataTable GetDataTable(string ExSql)
        {
            DataTable MyTable = new DataTable();
            try
            {
                GetDataAdapter(ExSql).Fill(MyTable);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyTable;
        }

        /// <summary>
        /// 执行指定的SQL语句,生成一个DataTable.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个DataTable.</returns>
        public DataTable GetDataTable(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            DataTable MyTable = new DataTable();
            try
            {
                GetDataAdapter(ExSql, MyCmdParam).Fill(MyTable);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyTable;
        }
        #endregion

        #region GetDataRow:执行SQL语句,生成一个DataRow.
        /// <summary>
        /// 执行SQL语句,生成一个DataRow.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个DataRow.</returns>
        public DataRow GetDataRow(string ExSql)
        {
            try
            {
                return GetDataTable(ExSql).Rows[0];
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
                return null;
            }
        }

        /// <summary>
        /// 执行SQL语句,生成一个DataRow.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个DataRow.</returns>
        public DataRow GetDataRow(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            try
            {
                DataTable dt = GetDataTable(ExSql, MyCmdParam);
                if (dt.Rows.Count > 0)
                {
                    return dt.Rows[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
                return null;
            }
        }
        #endregion

        #region GetOneRecord:执行SQL语句,将执行的结果以object数组的形式返回.
        /// <summary>
        /// 执行SQL语句,将执行的结果以object数组的形式返回.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <returns>返回一个object数组.</returns>
        public object[] GetOneRecord(string ExSql)
        {
            try
            {
                return GetDataRow(ExSql).ItemArray;
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
                return null;
            }
        }

        /// <summary>
        /// 执行SQL语句,将执行的结果以object数组的形式返回.
        /// </summary>
        /// <param name="ExSql">要执行的SQL语句.</param>
        /// <param name="MyCmdParam">SQL参数数组.</param>
        /// <returns>返回一个object数组.</returns>
        public object[] GetOneRecord(string ExSql, SqlCmdParam[] MyCmdParam)
        {
            try
            {
                return GetDataRow(ExSql, MyCmdParam).ItemArray;
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
                return null;
            }
        }
        #endregion

        #region GetTableRecordCount:取得指定表中的记录总数.
        /// <summary>
        /// 取得指定表中的记录总数.
        /// </summary>
        /// <param name="TableName">要取得记录总数的表.</param>
        /// <returns>返回一个整数.</returns>
        public int GetTableRecordCount(string TableName)
        {
            string strSql = "SELECT COUNT(*) FROM " + TableName;
            try
            {
                return (int)ExecuteScalar(strSql);
            }
            catch (Exception Ex)
            {
                ErrorLog.WriteLog(Ex);
                return -1;
            }
        }
        #endregion
    }
}
