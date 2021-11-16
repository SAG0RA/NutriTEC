using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class empleadoController : ApiController
    {
        /// <summary>
        /// Obtiene todos los datos de 
        /// todo los empleados 
        /// </summary>
        public IEnumerable<Empleado> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())              
                return entities.Empleado.ToList();
        }

        /// <summary>
        /// Obtiene todos los datos de 
        /// un empledo según su id
        /// </summary>
        public Empleado Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.Empleado.FirstOrDefault(e => e.cedula == id);
        }

        /// <summary>
        /// Postea un nuevo empleado
        /// </summary>
        public IHttpActionResult Post(Empleado el)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.Empleado.Add(new Empleado()
                {
                    cedula = el.cedula,
                    nombre = el.nombre,
                    correo = el.correo,
                    passw = el.passw,
                    rol = el.rol
                });
                entities.SaveChanges();
            }
            return Ok();
        }

        /// <summary>
        /// Actualiza una entrada de empleado
        /// </summary>
        public IHttpActionResult Put(Empleado el)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existingEmp = entities.Empleado.Where(e => e.cedula == el.cedula)
                                                        .FirstOrDefault<Empleado>();

                if (existingEmp != null)
                {
                    existingEmp.cedula = el.cedula;
                    existingEmp.nombre = el.nombre;
                    existingEmp.correo = el.correo;
                    existingEmp.passw = el.passw;
                    existingEmp.rol = el.rol;

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
        /// Borra una entrada de empleado
        /// </summary>
        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid employee id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var emp = entities.Empleado.Where(e => e.cedula == id)
                                                        .FirstOrDefault();
                if (emp == null)
                    return BadRequest("Not a valid client id");

                entities.Entry(emp).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}