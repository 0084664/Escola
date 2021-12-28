using System.Collections.Generic;
using System.Linq; 
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : Controller
    {
        //definição de qual será o contexto de dados usado nesse controlador e relacionanos  junto ao controlador 
        private readonly EscolaContext _context;
        public AlunoController(EscolaContext context)
        {
            //construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Aluno>> GetAll()
        {
            return _context.Aluno.ToList();
        }

        //get feito através do Id 
        [HttpGet("{AlunoId}")]
        public ActionResult<List<Aluno>> Get(int AlunoId)
        {
            try
            {
                var result = _context.Aluno.Find(AlunoId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
        }

        [HttpGet("{CodCurso}")]
        public ActionResult<List<Aluno>> Get(int CodCurso)
        {
            try
            {
                IQueryable<Aluno> aluno = _context.Aluno.Where(aluno => aluno.CodCurso == CodCurso);
                if (aluno == null)
                {
                    return NotFound();
                }
                return Ok(aluno);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        //Add() do Entity Framework que com o BD indicado faz insert na tabela indicada
        [HttpPost]
        public async Task<ActionResult> post(Aluno model)
        {
            try
            {
                _context.Aluno.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/aluno/{model.RA}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
            //retorna BadRequest se não conseguiu incluir 
            return BadRequest();
        }

        [HttpPut("{AlunoId}")]
        public async Task<IActionResult> put(int AlunoId, Aluno dadosAlunoAlt)
        {
            try
            {
                //verifica se há aluno a alterar
                var result = await _context.Aluno.FindAsync(AlunoId);
                if (AlunoId != result.Id)
                {
                    return BadRequest();
                }
                result.RA = dadosAlunoAlt.RA;
                result.Nome = dadosAlunoAlt.Nome;
                result.CodCurso = dadosAlunoAlt.CodCurso;
                await _context.SaveChangesAsync();
                return Created($"/api/aluno/{dadosAlunoAlt.RA}", dadosAlunoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados.");
            }
        }

        [HttpDelete("{AlunoId}")]
            public async Task<ActionResult> delete(int AlunoId)
            {
                try
                {
                    //verifica se existe aluno para ser excluído
                    var aluno = await _context.Aluno.FindAsync(AlunoId);
                    if (aluno == null)
                    {
                        //método do EF
                        return NotFound();
                    }
                    _context.Remove(aluno);
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
                catch
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
                }
        }
    }
    
}