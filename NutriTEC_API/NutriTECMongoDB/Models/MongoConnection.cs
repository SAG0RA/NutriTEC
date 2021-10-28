using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTECMongoDB.Models
{
    public class MongoConnection : IMongoConnection
    {
        public string Server { get; set; }
        public string Database { get; set; }
        public string Collection { get; set; }
    }

    public interface IMongoConnection
    {
        string Server { get; set; }
        string Database { get; set; }
        string Collection { get; set; }
    }
}
