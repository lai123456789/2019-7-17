using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    [Serializable]
    public class CreateQRCodeResult
    {
        public int errcode;
        public string errmsg;
        public string ticket;
        public int expire_seconds;
        public string url;
    }
}
