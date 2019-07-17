using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public class UserList
    {
        public int errcode { get; set; }
        public string errmsg { get; set; }
        public int total;
        public int count;
        public UserListData data;
        public string next_openid;
    }

    public class UserListData
    {
        public string[] openid;
    }
}
