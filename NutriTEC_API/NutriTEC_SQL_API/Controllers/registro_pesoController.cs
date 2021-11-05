﻿using System;
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
        public IEnumerable<registro_peso> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.registro_peso.ToList();
        }
        public registro_peso Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.registro_peso.FirstOrDefault(e => e.Id == id);
        }

        public IHttpActionResult Post(registro_peso rg)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.registro_peso.Add(new registro_peso()
                {

                    fecha_del_registro = DateTime.Now,
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
        /*public IHttpActionResult Put(Empleado el)
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
        }*/

       /* public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid employee id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var emp = entities.Empleado.Where(e => e.cedula == id)
                                                        .FirstOrDefault();
                if (emp == null)
                    return BadRequest("Not a valid rgient id");

                entities.Entry(emp).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }*/
    }
}