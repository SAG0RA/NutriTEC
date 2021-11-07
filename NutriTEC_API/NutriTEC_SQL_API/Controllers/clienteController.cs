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
        public IEnumerable<cliente> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.cliente.ToList();
             //var resultado = entities.Database.SqlQuery<string>("USP_GetCliente @cedula", cl.cedula).ToString();
        }

        public cliente Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.cliente.FirstOrDefault(e => e.cedula == id);
        }

        //uso de stored procedure
        [HttpGet]
        [Route("api/cliente/spget/{id}")]
        public IEnumerable<USP_GetCliente_Result> GetSP(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var tt = entities.USP_GetCliente(id);
                return tt.ToList();
            }
        }

        public IHttpActionResult Post(cliente cl)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            USP_GetCliente_Result temp;
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

                entities.registro_peso.Add(new registro_peso()
                {

                    cliente_cedula = cl.cedula,
                    fecha_del_registro = DateTime.Now,
                    peso = cl.peso,
                    IMC = cl.IMC,
                    cintura = (int?)cl.cintura,
                    cuello = (int?)cl.cuello,
                    caderas = (int?)cl.caderas,
                    porc_musculo = (int?)cl.porc_musculo,
                    porc_grasa = (int?)cl.porc_grasa

                });

                entities.SaveChanges();
                //string DistributionChannelGUID = db.Database.SqlQuery<string>("GetDistributionChannelGUID @DeviceID, @CCCShopID", Parameters).ToString();
            }
            //var resultado = entities.Database.SqlQuery<string>("USP_GetCliente @cedula", cl.cedula).ToString();
            return Ok();
        }

       /* public IEnumerable<USP_GetCliente_Result> Get(int id)
        {
            System.Data.Entity.Core.Objects.ObjectResult tt;
            using (NutriTECEntities entities = new NutriTECEntities())
            {
                tt = entities.USP_GetCliente(id);
            }

            return (IEnumerable<USP_GetCliente_Result>)tt;
        }*/

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