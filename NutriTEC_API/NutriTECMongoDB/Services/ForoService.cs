using MongoDB.Driver;
using NutriTECMongoDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTECMongoDB.Services
{
    public class ForoService
    {
        private IMongoCollection<Foro> _foros;

        public ForoService(IMongoConnection mc)
        {
            var cliente = new MongoClient(mc.Server);
            var database = cliente.GetDatabase(mc.Database);
            _foros = database.GetCollection<Foro>(mc.Collection);
        }

        public List<Foro> Get()
        {
            return _foros.Find(d => true).ToList();
        }                         //select request 

        public Foro Create(Foro foro)
        {
            _foros.InsertOne(foro);
            return foro;
        }

        public void Update(string id, Foro foro)
        {
            _foros.ReplaceOne(foro => foro.Id == id, foro);
        }
        public void Delete(string id)
        {
            _foros.DeleteOne(d => d.Id == id);
        }
    }
}
