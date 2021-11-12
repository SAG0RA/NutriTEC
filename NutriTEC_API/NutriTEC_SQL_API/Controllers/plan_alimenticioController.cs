using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class plan_alimenticioController : ApiController
    {
        public IEnumerable<plan_alimenticio> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.plan_alimenticio.ToList();
        }

        public plan_alimenticio Get(string id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.plan_alimenticio.FirstOrDefault(e => e.Id == id);
        }

        [HttpGet] //obtener los productos del plan
        [Route("api/plan_alimenticio/{id_plan}")]
        public IEnumerable<USP_GetProductosDelPlan_Result> GetProductosDelPlan(string id_plan)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var tt = entities.USP_GetProductosDelPlan(id_plan);
                return tt.ToList();
            }
        }

        [HttpPost] //calcular calorias del plan
        [Route("api/CalculoCaloriasPlan/{id_plan}")]
        public IHttpActionResult CalcularCaloriasPlan(string id_plan)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.USP_CalcularCaloriasDelPlan(id_plan);
                return Ok ("Calorias del plan: " + $"{id_plan}" + "actualizadas");
            }
        }

        public IHttpActionResult Post(plan_alimenticio pl)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.USP_CrearPlanAlimenticio(pl.nutri_al_plan, pl.nombre_plan);
                entities.SaveChanges();
            }
            return Ok();
        }


        public IHttpActionResult Put(plan_alimenticio pl)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existing = entities.plan_alimenticio.Where(e => e.Id == pl.Id)
                                                        .FirstOrDefault<plan_alimenticio>();

                if (existing != null)
                {
                    existing.nombre_plan = pl.nombre_plan;
                    existing.total_calorias = pl.total_calorias;
                    existing.nutri_al_plan = pl.nutri_al_plan;
                    entities.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        public IHttpActionResult Delete(string id)
        {;
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var reg = entities.plan_alimenticio.Where(e => e.Id == id)
                                                        .FirstOrDefault();

                var productosDentroDelPlan = entities.productosXplan.Where(e => e.plan_pertenece == id).ToList();


                if (reg == null)
                    return BadRequest("Not a plan id");

                entities.Entry(productosDentroDelPlan).State = System.Data.Entity.EntityState.Deleted;
                entities.Entry(reg).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok("se ha borrado el plan exitosamente");
        }
    }
}