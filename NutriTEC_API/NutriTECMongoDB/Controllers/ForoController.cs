using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NutriTECMongoDB.Services;
using NutriTECMongoDB.Models;

namespace NutriTECMongoDB.Controllers
{
    [Route("mongo/[controller]")]
    [ApiController]
    public class ForoController : Controller
    {
        public ForoService _foroService;

        public ForoController(ForoService foroService)
        {
            _foroService = foroService;
        }
        [HttpGet]
        public ActionResult<List<Foro>> Get()
        {
            return _foroService.Get();
        }
        [HttpPost]
        public ActionResult<Foro> Create(Foro foro)
        {
            _foroService.Create(foro);
            return Ok(foro);
        }

        [HttpPut]
        public ActionResult Update(Foro foro)
        {
            _foroService.Update(foro.Id, foro);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _foroService.Delete(id);
            return Ok();
        }
    }
}
