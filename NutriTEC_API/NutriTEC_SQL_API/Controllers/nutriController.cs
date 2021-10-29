using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class nutriController : ApiController
    {
        public IEnumerable<nutricionista> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.nutricionista.ToList();
        }
        public nutricionista Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.nutricionista.FirstOrDefault(e => e.n_cedula == id);
        }

        public IHttpActionResult Post(nutricionista nu)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.nutricionista.Add(new nutricionista()
                {
                    n_cedula = nu.n_cedula,
                    nombre = nu.nombre,
                    p_apellido = nu.p_apellido,
                    s_apellido = nu.s_apellido,
                    codigo = nu.codigo,
                    edad = nu.edad,
                    fecha_nac = nu.fecha_nac,
                    peso = nu.peso,
                    IMC = nu.IMC,
                    direccion = nu.direccion,
                    foto = nu.foto,
                    tarjetacredito = nu.tarjetacredito,
                    tipo_cobro = nu.tipo_cobro,
                    correo = nu.correo,
                    passw = nu.passw
                });
                entities.SaveChanges();
            }
            return Ok();
        }
        public IHttpActionResult Put(nutricionista nu)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existingNutri = entities.nutricionista.Where(e => e.n_cedula == nu.n_cedula)
                                                        .FirstOrDefault<nutricionista>();

                if (existingNutri != null)
                {
                    existingNutri.n_cedula = nu.n_cedula;
                    existingNutri.nombre = nu.nombre;
                    existingNutri.p_apellido = nu.p_apellido;
                    existingNutri.s_apellido = nu.s_apellido;
                    existingNutri.codigo = nu.codigo;
                    existingNutri.edad = nu.edad;
                    existingNutri.fecha_nac = nu.fecha_nac;
                    existingNutri.peso = nu.peso;
                    existingNutri.IMC = nu.IMC;
                    existingNutri.direccion = nu.direccion;
                    existingNutri.foto = nu.foto;
                    existingNutri.tarjetacredito = nu.tarjetacredito;
                    existingNutri.tipo_cobro = nu.tipo_cobro;
                    existingNutri.correo = nu.correo;
                    existingNutri.passw = nu.passw;

                    entities.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }
        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid nutri id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var nutri = entities.nutricionista.Where(e => e.n_cedula == id)
                                                        .FirstOrDefault();
                if (nutri == null)
                    return BadRequest("Not a valid nutri id");

                entities.Entry(nutri).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}