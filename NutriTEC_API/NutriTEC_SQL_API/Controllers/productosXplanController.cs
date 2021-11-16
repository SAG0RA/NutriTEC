using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class productosXplanController : ApiController
    {

        /// <summary>
        /// Obtiene todos los productos que están 
        /// dentro de todos los planes
        /// </summary>
        public IEnumerable<productosXplan> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.productosXplan.ToList();
        }

        /// <summary>
        /// Obtiene un producto dentro de un plan 
        /// dado su código de barras 
        /// </summary>
        public productosXplan Get(long id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.productosXplan.FirstOrDefault(e => e.codigo_barras == id);
        }

        /// <summary>
        /// Postea un producto dentro de un plan alimenticio
        /// </summary>
        [HttpPost]
        [Route("api/producto/insertarProductoPlan")]
        public IHttpActionResult PostSP(productosXplan pxp)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.USP_insertarProductoPlan(pxp.codigo_barras, pxp.tiempo_comida, pxp.plan_pertenece, pxp.cantidad);
            }
            return Ok("si");
        }

        /// <summary>
        /// Obtiene todos los productos del 
        /// plan especificado 
        /// </summary>
        [HttpGet]
        [Route("api/producto/GetProductosDelPlan/{id_plan}")]
        public IHttpActionResult GetSP(string id_plan)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.USP_GetProductosDelPlan(id_plan);
            }
            return Ok("si");
        }

        /// <summary>
        /// Postea un producto dentro de un plan
        /// Aviso: este método no se usa en el frontend, en su lugar es para testeo
        /// de las tablas
        /// </summary>
        public IHttpActionResult Post(productosXplan pxp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.productosXplan.Add(new productosXplan()
                {
                    codigo_barras = pxp.codigo_barras,
                    descripcion = pxp.descripcion,
                    energia = pxp.energia,
                    tiempo_comida = pxp.tiempo_comida,
                    plan_pertenece = pxp.plan_pertenece
                });
                entities.SaveChanges();
            }
            return Ok();
        }

        /// <summary>
        /// Actualiza la info de un producto dentro de un plan
        /// </summary>
        public IHttpActionResult Put(productosXplan pxp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existing = entities.productosXplan.Where(e => e.codigo_barras == pxp.codigo_barras)
                                                        .FirstOrDefault<productosXplan>();

                if (existing != null)
                {

                    existing.codigo_barras = pxp.codigo_barras;
                    existing.descripcion = pxp.descripcion;
                    existing.energia = pxp.energia;
                    existing.tiempo_comida = pxp.tiempo_comida;
                    existing.plan_pertenece = pxp.plan_pertenece;
                    entities.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        /// <summary>
        /// Borra un producto de un plan 
        /// </summary>
        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid productosXplan id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var reg = entities.productosXplan.Where(e => e.codigo_barras == id)
                                                        .FirstOrDefault();
                if (reg == null)
                    return BadRequest("Not a valid productosXplan id");

                entities.Entry(reg).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}