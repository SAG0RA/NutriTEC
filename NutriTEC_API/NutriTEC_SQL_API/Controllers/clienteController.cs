using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class clienteController : ApiController
    {
        /// <summary>
        /// Obtiene todos los datos de 
        /// todos los clientes
        /// </summary>
        public IEnumerable<cliente> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.cliente.ToList();
        }

        /// <summary>
        /// Obtiene todos los datos de 
        /// un cliente según el id especificada
        /// </summary>
        public cliente Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.cliente.FirstOrDefault(e => e.cedula == id);
        }

        /// <summary>
        /// Obtiene el reporte del peso del cliente 
        /// de la cédula
        /// </summary>
        [HttpGet]
        [Route("api/cliente/registro_peso/{cedula}")]
        public IEnumerable<USP_Registro_Peso_Result> ObtenerRegistroPeso(int cedula)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var tt = entities.USP_Registro_Peso(cedula);
                return tt.ToList();
            }
        }

        /// <summary>
        /// Postea un nuevo cliente
        /// Se entrega la información del nuevo cliente en JSON
        /// </summary>
        public IHttpActionResult Post(cliente cl)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                
                entities.cliente.Add(new cliente()
                {
                    cedula = cl.cedula,
                    nombre = cl.nombre,
                    p_apellido = cl.p_apellido,
                    s_apellido = cl.s_apellido,
                    edad = cl.edad,
                    fecha_nac = cl.fecha_nac,
                    peso = cl.peso,
                    IMC = cl.IMC,
                    pais = cl.pais,
                    cintura = cl.cintura,
                    cuello = cl.cuello,
                    caderas = cl.caderas,
                    porc_musculo = cl.porc_musculo,
                    porc_grasa = cl.porc_grasa,
                    cdm_calorias = cl.cdm_calorias,
                    correo = cl.correo,
                    passw = cl.passw
                });

                entities.SaveChanges();
            }
            return Ok();
        }

        /// <summary>
        /// Actualiza la información de un cliente
        /// </summary>
        public IHttpActionResult Put(cliente cl)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existingClient = entities.cliente.Where(e => e.cedula == cl.cedula)
                                                        .FirstOrDefault<cliente>();

                if (existingClient != null)
                {
                    existingClient.nombre = cl.nombre;
                    existingClient.p_apellido = cl.p_apellido;
                    existingClient.s_apellido = cl.s_apellido;
                    existingClient.edad = cl.edad;
                    existingClient.fecha_nac = cl.fecha_nac;
                    existingClient.peso = cl.peso;
                    existingClient.IMC = cl.IMC;
                    existingClient.pais = cl.pais;
                    existingClient.cintura = cl.cintura;
                    existingClient.cuello = cl.cuello;
                    existingClient.caderas = cl.caderas;
                    existingClient.porc_musculo = cl.porc_musculo;
                    existingClient.porc_grasa = cl.porc_grasa;
                    existingClient.cdm_calorias = cl.cdm_calorias;
                    existingClient.correo = cl.correo;
                    existingClient.passw = cl.passw;

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
        /// Borra la entrada de un cliente
        /// de la cédula especificada 
        /// </summary>
        public IHttpActionResult Delete(int id)
        {
            if (id < 0)
                return BadRequest("Not a valid client id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var client = entities.cliente.Where(e => e.cedula == id)
                                                        .FirstOrDefault();
                if(client == null)
                    return BadRequest("Not a valid client id");

                entities.Entry(client).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }     
}