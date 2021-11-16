using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class registro_comidaController : ApiController
    {
        /// <summary>
        /// Obtiene todos los registros de comida de 
        /// todos los clientes
        /// </summary>
        public IEnumerable<registro_comida> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.registro_comida.ToList();
        }

        /// <summary>
        /// Obtiene todos los registros de comida de un cliente
        /// </summary>
        public registro_comida Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.registro_comida.FirstOrDefault(e => e.codigo_barras == id);
        }

        /// <summary>
        /// Postea un nuevo registro de comida
        /// </summary>
        public IHttpActionResult Post(registro_comida rg)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {

                entities.registro_comida.Add(new registro_comida()
                {
                    cliente_cedula = rg.cliente_cedula,
                    fecha_del_registro = DateTime.Today,
                    codigo_barras = rg.codigo_barras
                }); 

                entities.SaveChanges();
            
            }
            return Ok();
        }

        /// <summary>
        /// Borra un registro de comida
        /// </summary>
        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid registro id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var reg = entities.registro_comida.Where(e => e.codigo_barras == id)
                                                        .FirstOrDefault();
                if (reg == null)
                    return BadRequest("Not a valid client id");

                entities.Entry(reg).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}