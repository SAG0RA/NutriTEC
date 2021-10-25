﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NutriTEC_Access;

namespace NutriTEC_API.Controllers
{
    public class productoController : ApiController
    {
        public IEnumerable<producto> Get()
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.producto.ToList();
        }
        public producto Get(int id)
        {
            using (NutriTECEntities entities = new NutriTECEntities())
                return entities.producto.FirstOrDefault(e => e.codigo_barras == id);
        }

        public IHttpActionResult Post(producto pr)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                entities.producto.Add(new producto()
                {
                    codigo_barras = pr.codigo_barras,
                    descripcion = pr.descripcion,
                    porcion = pr.porcion,
                    energia = pr.energia,
                    grasa = pr.grasa,
                    sodio = pr.sodio,
                    carbohidratos = pr.carbohidratos,
                    proteina = pr.proteina,
                    vitaminas = pr.vitaminas,
                    calcio = pr.calcio,
                    hierro = pr.hierro,
                    lista_espera = pr.lista_espera

                });
                entities.SaveChanges();
            }
            return Ok();
        }
        public IHttpActionResult Put(producto pr)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var existingProducto = entities.producto.Where(e => e.codigo_barras == pr.codigo_barras)
                                                        .FirstOrDefault<producto>();

                if (existingProducto != null)
                {
                    existingProducto.codigo_barras = pr.codigo_barras;
                    existingProducto.descripcion = pr.descripcion;
                    existingProducto.porcion = pr.porcion;
                    existingProducto.energia = pr.energia;
                    existingProducto.grasa = pr.grasa;
                    existingProducto.sodio = pr.sodio;
                    existingProducto.carbohidratos = pr.carbohidratos;
                    existingProducto.proteina = pr.proteina;
                    existingProducto.vitaminas = pr.vitaminas;
                    existingProducto.calcio = pr.calcio;
                    existingProducto.hierro = pr.hierro;
                    existingProducto.lista_espera = pr.lista_espera;

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
            if (id <= 0)
                return BadRequest("Not a valid product id");

            using (NutriTECEntities entities = new NutriTECEntities())
            {
                var producto = entities.producto.Where(e => e.codigo_barras == id)
                                                        .FirstOrDefault();
                if (producto == null)
                    return BadRequest("Not a valid product id");

                entities.Entry(producto).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }

            return Ok();
        }
    }
}