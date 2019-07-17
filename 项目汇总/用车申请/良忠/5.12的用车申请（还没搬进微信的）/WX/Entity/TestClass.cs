using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity
{
    public class TestClass
    {
        public List<TestList> list { get; set; }
    }

    public class TestList
    {
        public string name { get; set; }

        public int num { get; set; }

        public string typeval { get; set; }
    }
}
