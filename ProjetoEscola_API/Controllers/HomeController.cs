using System.Collections.Generic;
using System.Threading.Tasks;
using ProjetoEscola_API.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Linq;
using ProjetoEscola_API.Services;
using ProjetoEscola_API.Data;
using Microsoft.AspNetCore.Mvc;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    public class HomeController: Controller
    {
        private readonly EscolaContext _context;
        public HomeController(EscolaContext context)
        {
            //construtor
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] User usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.Usuario
                .Where(u => u.email == usuario.email && u.senha == usuario.senha)
                .FirstOrDefault();

            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            var token = TokenService.GenerateToken(user);
            user.senha = "";
            return new
            {
                user = user,
                token = token
            };
        }

        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

        [HttpGet]
        [Route("aluno")]
        [Authorize(Roles = "aluno,professor")]
        public string Aluno() => "Aluno";

        [HttpGet]
        [Route("professor")]
        [Authorize(Roles = "professor")]
        public string Professor() => "Lista dos nomes das fotos dos alunos";
    }
}