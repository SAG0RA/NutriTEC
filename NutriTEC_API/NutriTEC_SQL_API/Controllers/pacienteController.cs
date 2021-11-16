using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class pacienteController : ApiController
    {

        /// <summary>
        /// Obtiene todos los datos de 
        /// todos los pacientes
        /// </summary>
        public IEnumerable<paciente> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.paciente.ToList();
        }

        /// <summary>
        /// Obtiene todos los datos de 
        /// un paciente según su id
        /// </summary>
        public paciente Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.paciente.FirstOrDefault(e => e.id == id);
        }

        /// <summary>
        /// Postea un nuevo paciente 
        /// recibe el post en JSON
        /// </summary>
        public IHttpActionResult Post(paciente pc)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            using (NutriTECEntities entities = new NutriTECEntities())
            {

                entities.paciente.Add(new paciente()
                {
                    id = pc.id,
                    n_cedula = pc.n_cedula,
                    paciente_cedula = pc.paciente_cedula,
                    paciente_plan = pc.paciente_plan
                }); 

                entities.SaveChanges();             
            }
            return Ok();
        }

        /// <summary>
        /// Actualiza una entrada de 
        /// paciente
        /// </summary>
        public IHttpActionResult Put(paciente pc)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existingPaciente = entities.paciente.Where(e => e.id == pc.id)
                                                        .FirstOrDefault<paciente>();

                if (existingPaciente != null)
                {
                    existingPaciente.id = pc.id;
                    existingPaciente.n_cedula = pc.n_cedula;
                    existingPaciente.paciente_cedula = pc.paciente_cedula;
                    existingPaciente.paciente_plan = pc.paciente_plan;

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
        /// Borra una entrada de paciente según su cédula
        /// </summary>
        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid patient id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var paciente = entities.paciente.Where(e => e.paciente_cedula == id)
                                                        .FirstOrDefault();
                if (paciente == null)
                    return BadRequest("Not a valid patient id");

                entities.Entry(paciente).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}