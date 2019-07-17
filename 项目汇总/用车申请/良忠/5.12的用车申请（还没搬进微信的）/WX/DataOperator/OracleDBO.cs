using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataOperator
{
    public class OracleDBO
    {
        #region 私有变量.
        private OracleConnection MyConn;
        private OracleCommand MyComm;
        private OracleTransaction MyTrans;
        private string _ConnStr = System.Configuration.ConfigurationManager.AppSettings["DBConnStr"];
        private bool _AutoClose = true;
        private bool _IsTransactionBegin = false;
        private bool _IsThrowException = false;
        /// <summary>
        /// SQL参数是否按参数名匹配
        /// </summary>
        private bool _IsByParamName = false;


        #endregion

        #region 属性
        /// <summary>
        /// 向外提供参数，以便获取存储过程output参数值
        /// </summary>
        public OracleParameterCollection Parameters
        {
            get
            {
                if (MyComm != null && MyComm.Parameters != null)
                {
                    return MyComm.Parameters;
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// 如果发生异常，是否抛出异常供上一层处理。
        /// </summary>
        public bool IsThrowException
        {
            set { _IsThrowException = value; }
            get { return _IsThrowException; }
        }

        public int ArrayBindCount
        {
            set { MyComm.ArrayBindCount = value; }
            get { return MyComm.ArrayBindCount; }
        }

        #region SQL参数是否按参数名匹配
        /// <summary>
        /// SQL参数是否按参数名匹配
        /// </summary>
        public bool IsByParamName
        {
            get { return _IsByParamName; }
            set
            {
                _IsByParamName = value;
                if (MyComm != null)
                {
                    MyComm.BindByName = _IsByParamName;
                }
            }
        }
        #endregion
        #endregion

        #region OracleDBO构造函数.
        /// <summary>
        /// OracleDBO构造函数.
        /// </summary>
        public OracleDBO()
        {
            Open();

        }

        /// <summary>
        /// OracleDBO构造函数.
        /// </summary>
        /// <param name="ConnStr">
        /// 要使用配置文件中数据库连接字符串的配置名称。
        /// NotifyDBConnStr（提醒库连接，默认），WXAutoDBConnStr（掌讯数据库连接）
        /// </param>
        public OracleDBO(string ConnStr)
        {
            this._ConnStr = System.Configuration.ConfigurationManager.AppSettings[ConnStr];
            Open();
        }

        /// <summary>
        /// OracleDBO构造函数.
        /// </summary>
        /// <param name="ConnStr">Oracle连接字符串.</param>
        /// <param name="AutoClose">在执行完一次操作后是否自动关闭连接,默认为true,若改为false,则在操作完后须调用Close函数关闭连接.</param>
        public OracleDBO(string ConnStr, bool AutoClose)
        {
            this._ConnStr = ConnStr;
            this._AutoClose = AutoClose;
            Open();
        }
        #endregion

        #region 异常处理
        private void HandelException(Exception ex)
        {
            ErrorLog.WriteLog(ex);
            if (_IsThrowException)
            {
                throw ex;
            }
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

        #region OracleCmdParam:OracleCommand的参数
        /// <summary>
        /// OracleCommand的参数
        /// </summary>
        public struct OracleCmdParam
        {
            public string Name;		    //参数名
            public OracleDbType Type;		//Oracle数据类型
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
                    MyConn = new OracleConnection(_ConnStr);
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
                HandelException(Ex);
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
                //if (_AutoClose && _IsTransactionBegin)
                //{
                //    return;
                //}
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
                HandelException(Ex);
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
                HandelException(Ex);
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
                HandelException(Ex);
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
                HandelException(Ex);
            }
        }
        #endregion

        #region CreateNewCommand:创建一个新的OracleCommand.

        /// <summary>
        /// 创建一个新的OracleCommand.
        /// </summary>
        private void CreateNewCommand()
        {
            MyComm = new OracleCommand();
            MyComm.BindByName = _IsByParamName;
            MyComm.Connection = MyConn;
        }

        /// <summary>
        /// 创建一个新的OracleCommand.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        private void CreateNewCommand(string ExOracle)
        {
            try
            {
                MyComm = new OracleCommand(ExOracle, MyConn);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
        }

        /// <summary>
        /// 创建一个新的OracleCommand.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">要填充的Oracle参数数组.</param>
        private void CreateNewCommand(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            try
            {
                MyComm = new OracleCommand(ExOracle, MyConn);
                if (MyCmdParam != null)
                {
                    FillCmdParam(ref MyComm, MyCmdParam);
                }
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
        }
        #endregion

        #region FillCmdParam:将Oracle参数数组填充到OracleCommand.
        /// <summary>
        /// 将Oracle参数数组填充到OracleCommand.
        /// </summary>
        /// <param name="MyComm">要填充的OracleCommand.</param>
        /// <param name="cmdParm">Oracle参数数组.</param>
        private void FillCmdParam(ref OracleCommand MyComm, OracleCmdParam[] cmdParm)
        {
            MyComm.Parameters.Clear();
            for (int ii = 0; ii < cmdParm.Length; ii++)
            {
                MyComm.Parameters.Add(cmdParm[ii].Name, cmdParm[ii].Type);
                MyComm.Parameters[cmdParm[ii].Name].Value = cmdParm[ii].Value;
            }
        }
        #endregion

        #region CreateNewParam:新建Oracle参数.
        /// <summary>
        /// 新建Oracle参数.
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="ParamType">Oracle参数类型</param>
        /// <param name="Value">参数值</param>
        /// <returns>Oracle参数</returns>
        public OracleCmdParam CreateNewParam(string ParamName, OracleDbType ParamType, object Value)
        {
            OracleCmdParam MyParam = new OracleCmdParam();
            MyParam.Name = ParamName;
            MyParam.Type = ParamType;
            MyParam.Value = Value;
            return MyParam;
        }
        #endregion

        #region ExecuteNonQuery:执行一个Oracle语句,返回受影响的行数.
        /// <summary>
        /// 执行一个Oracle语句,返回受影响的行数.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个整数.</returns>
        public int ExecuteNonQuery(string ExOracle)
        {
            int result = 0;
            try
            {
                MyComm.CommandText = ExOracle;
                result = MyComm.ExecuteNonQuery();
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }

        /// <summary>
        /// 执行一个Oracle语句,返回受影响的行数.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个整数.</returns>
        public int ExecuteNonQuery(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            int result = 0;
            try
            {
                MyComm.CommandText = ExOracle;
                FillCmdParam(ref MyComm, MyCmdParam);
                result = MyComm.ExecuteNonQuery();
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }
        #endregion

        #region ExecuteReader:执行一个Oracle查询语句,返回一个DataReader.
        /// <summary>
        /// 执行一个Oracle查询语句,返回一个DataReader.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle查询语句.</param>
        /// <returns>返回一个DataReader.</returns>
        public OracleDataReader ExecuteReader(string ExOracle)
        {
            OracleDataReader MyDr = null;
            try
            {
                MyComm.CommandText = ExOracle;
                MyDr = MyComm.ExecuteReader();
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            return MyDr;
        }

        /// <summary>
        /// 执行一个Oracle查询语句,返回一个DataReader.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle查询语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个DataReader.</returns>
        public OracleDataReader ExecuteReader(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            OracleDataReader MyDr = null;
            try
            {
                MyComm.CommandText = ExOracle;
                FillCmdParam(ref MyComm, MyCmdParam);
                MyDr = MyComm.ExecuteReader();
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            return MyDr;
        }
        #endregion

        #region ExecuteScalar:执行一个Oracle语句,返回执行结果中首行首列的值.
        /// <summary>
        /// 执行一个Oracle语句,返回执行结果中首行首列的值.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个object.</returns>
        public object ExecuteScalar(string ExOracle)
        {
            object result = null;
            try
            {
                MyComm.CommandText = ExOracle;
                result = MyComm.ExecuteScalar();
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }

        /// <summary>
        /// 执行一个Oracle语句,返回执行结果中首行首列的值.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个object.</returns>
        public object ExecuteScalar(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            object result = null;
            try
            {
                MyComm.CommandText = ExOracle;
                FillCmdParam(ref MyComm, MyCmdParam);
                result = MyComm.ExecuteScalar();
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return result;
        }
        #endregion

        #region GetDataAdapter:执行一个Oracle语句,生成一个DataAdpter.
        /// <summary>
        /// 执行一个Oracle语句,生成一个DataAdpter.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个DataAdpter.</returns>
        public OracleDataAdapter GetDataAdapter(string ExOracle)
        {
            Open();
            OracleDataAdapter MyDA = new OracleDataAdapter();
            try
            {
                MyDA = new OracleDataAdapter(ExOracle, MyConn);
                return MyDA;
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            return MyDA;
        }

        /// <summary>
        /// 执行一个Oracle语句,生成一个DataAdpter.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个DataAdpter.</returns>
        public OracleDataAdapter GetDataAdapter(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            Open();
            OracleDataAdapter MyDA = null;
            try
            {
                MyComm.CommandText = ExOracle;
                FillCmdParam(ref MyComm, MyCmdParam);
                MyDA = new OracleDataAdapter(MyComm);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            return MyDA;
        }
        #endregion

        #region GetDataSet:根据传入的Oracle语句查询数据并返回一个DataSet.
        /// <summary>
        /// 根据传入的Oracle语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExOracle)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExOracle).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyDs;
        }

        /// <summary>
        /// 根据传入的Oracle语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExOracle, string TableName)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExOracle).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            return MyDs;
        }

        /// <summary>
        /// 根据传入的Oracle语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExOracle, MyCmdParam).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyDs;
        }

        /// <summary>
        /// 根据传入的Oracle语句查询数据并返回一个DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <returns>返回一个DataSet.</returns>
        public DataSet GetDataSet(string ExOracle, OracleCmdParam[] MyCmdParam, string TableName)
        {
            DataSet MyDs = new DataSet();
            try
            {
                GetDataAdapter(ExOracle, MyCmdParam).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyDs;
        }
        #endregion

        #region FillDataSet:根据传入的Oracle语句查询数据并填充到DataSet.
        /// <summary>
        /// 根据传入的Oracle语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExOracle, ref DataSet MyDs)
        {
            try
            {
                GetDataAdapter(ExOracle).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }

        /// <summary>
        /// 根据传入的Oracle语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExOracle, ref DataSet MyDs, string TableName)
        {
            try
            {
                GetDataAdapter(ExOracle).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }

        /// <summary>
        /// 根据传入的Oracle语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExOracle, OracleCmdParam[] MyCmdParam, ref DataSet MyDs)
        {
            try
            {
                GetDataAdapter(ExOracle, MyCmdParam).Fill(MyDs);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }

        /// <summary>
        /// 根据传入的Oracle语句查询数据并填充到DataSet.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <param name="TableName">要填充的表名.</param>
        /// <param name="MyDs">要填充的DataSet.</param>
        public void FillDataSet(string ExOracle, OracleCmdParam[] MyCmdParam, ref DataSet MyDs, string TableName)
        {
            try
            {
                GetDataAdapter(ExOracle, MyCmdParam).Fill(MyDs, TableName);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
        }
        #endregion

        #region GetDataTable:执行指定的Oracle语句,生成一个DataTable.
        /// <summary>
        /// 执行指定的Oracle语句,生成一个DataTable.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个DataTable.</returns>
        public DataTable GetDataTable(string ExOracle)
        {
            DataTable MyTable = new DataTable();
            try
            {
                GetDataAdapter(ExOracle).Fill(MyTable);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyTable;
        }

        /// <summary>
        /// 执行指定的Oracle语句,生成一个DataTable.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个DataTable.</returns>
        public DataTable GetDataTable(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            DataTable MyTable = new DataTable();
            try
            {
                GetDataAdapter(ExOracle, MyCmdParam).Fill(MyTable);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
            }
            if (_AutoClose)
            {
                Close();
            }
            return MyTable;
        }
        #endregion

        #region GetDataRow:执行Oracle语句,生成一个DataRow.
        /// <summary>
        /// 执行Oracle语句,生成一个DataRow.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个DataRow.</returns>
        public DataRow GetDataRow(string ExOracle)
        {
            try
            {
                return GetDataTable(ExOracle).Rows[0];
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
                return null;
            }
        }

        /// <summary>
        /// 执行Oracle语句,生成一个DataRow.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个DataRow.</returns>
        public DataRow GetDataRow(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            try
            {
                DataTable dt = GetDataTable(ExOracle, MyCmdParam);
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
                HandelException(Ex);
                return null;
            }
        }
        #endregion

        #region GetOneRecord:执行Oracle语句,将执行的结果以object数组的形式返回.
        /// <summary>
        /// 执行Oracle语句,将执行的结果以object数组的形式返回.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <returns>返回一个object数组.</returns>
        public object[] GetOneRecord(string ExOracle)
        {
            try
            {
                return GetDataRow(ExOracle).ItemArray;
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
                return null;
            }
        }

        /// <summary>
        /// 执行Oracle语句,将执行的结果以object数组的形式返回.
        /// </summary>
        /// <param name="ExOracle">要执行的Oracle语句.</param>
        /// <param name="MyCmdParam">Oracle参数数组.</param>
        /// <returns>返回一个object数组.</returns>
        public object[] GetOneRecord(string ExOracle, OracleCmdParam[] MyCmdParam)
        {
            try
            {
                return GetDataRow(ExOracle, MyCmdParam).ItemArray;
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
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
            string strOracle = "SELECT COUNT(*) FROM " + TableName;
            try
            {
                return (int)ExecuteScalar(strOracle);
            }
            catch (Exception Ex)
            {
                HandelException(Ex);
                return -1;
            }
        }
        #endregion

        public void Dispose()
        {
            Close();
        }
    }
}
