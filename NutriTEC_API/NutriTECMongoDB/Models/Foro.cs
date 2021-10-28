using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTECMongoDB.Models
{
    public class Foro
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)] //llave primaria
        public string Id { get; set; }

        [BsonElement("mensaje")]
        public string Mensaje { get; set; }

        [BsonElement("contenido")]
        public string Contenido { get; set; }
    }
}
