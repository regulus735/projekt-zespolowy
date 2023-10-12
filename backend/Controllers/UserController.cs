using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace projekt_zespolowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
public async Task<ActionResult<IEnumerable<string>>> GetAllUsernames()
{
    try
    {
        var usernames = await _context.Users
            .Select(user => user.UserName)
            .ToListAsync();

        if (usernames == null || usernames.Count == 0)
        {
            return NoContent();
        }

        return Ok(usernames);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message); 

        return StatusCode(500, "Internal Server Error");
    }
}
    }
}
