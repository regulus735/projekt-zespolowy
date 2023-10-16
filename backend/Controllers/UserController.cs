using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Models;
using projekt_zespolowy.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace projekt_zespolowy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        public ActionResult SignUp()
        {
            return View();
        }

        [HttpPost("register")]
        [ValidateAntiForgeryToken]
        public ActionResult SignUp(UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (_context.Users.Any(u => u.UserName == model.UserName))
                {
                    ModelState.AddModelError("UserName", "Username already exists.");
                    return View(model);
                }

                var user = new User
                {
                    UserName = model.UserName,
                    Password = model.Password
                };

                _context.Users.Add(user);
                _context.SaveChanges();

                return RedirectToAction("SignIn");
            }

            return View(model);
        }

        public ActionResult SignIn()
        {
            return View();
        }

        [HttpPost("login")]
        [ValidateAntiForgeryToken]
        public ActionResult SignIn(UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _context.Users.FirstOrDefault(u => u.UserName == model.UserName && u.Password == model.Password);

                if (user != null)
                {
                    // Implement user authentication here (e.g., set a cookie or use Identity framework)
                    return RedirectToAction("Welcome");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password");
                }
            }

            return View(model);
        }

        // GET: /User/Welcome
        public ActionResult Welcome()
        {
            return View();
        }
    }
}
