using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class registro_pesoController : ApiController
    {
        /// <summary>
        /// Obtiene todos los registos de peso 
        /// de todos los clientes 
        /// </summary>
        public IEnumerable<registro_peso> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.registro_peso.ToList();
        }

        /// <summary>
        /// Obtiene todos los registros de peso de 
        /// un cliente dado su cédula
        /// </summary>
        public registro_peso Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.registro_peso.FirstOrDefault(e => e.Id == id);
        }

        /// <summary>
        /// Postea un nuevo registro de peso
        /// </summary>
        public IHttpActionResult Post(registro_peso rg)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.registro_peso.Add(new registro_peso()
                {
                    cliente_cedula = rg.cliente_cedula,
                    fecha_del_registro = rg.fecha_del_registro,
                    peso = rg.peso,
                    IMC = rg.IMC,
                    cintura = rg.cintura,
                    cuello = rg.cuello,
                    caderas = rg.caderas,
                    porc_musculo = rg.porc_musculo,
                    porc_grasa = rg.porc_grasa
                });
                entities.SaveChanges();
            }
            return Ok();
        }

        /// <summary>
        /// Borra un registro de peso dado su id
        /// </summary>

        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid registry id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var rp = entities.registro_peso.Where(e => e.Id == id)
                                                        .FirstOrDefault();
                if (rp == null)
                    return BadRequest("Not a valid registry id");

                entities.Entry(rp).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}