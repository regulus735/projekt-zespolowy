using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projekt_zespolowy.Models;
using System.Threading.Tasks;
using projekt_zespolowy.ViewModels;
using projekt_zespolowy.DTO;

namespace projekt_zespolowy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var projects = await _context.Projects.ToListAsync();

            return Ok(projects);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProject([FromBody] ProjectVM project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projectEntity = new Project
            {
                ProjectName = project.ProjectName
            };

            _context.Projects.Add(projectEntity);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Project created successfully" });
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditProject([FromBody] ProjectUpdateVM projectDTO)
        {
            var existingProject = await _context.Projects.FindAsync(projectDTO.Id);

            if (existingProject == null)
            {
                return NotFound("Project not found");
            }

            existingProject.ProjectName = projectDTO.ProjectName;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Project updated successfully" });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProject([FromBody] ProjectDeleteVM projectDTO)
        {
            var project = await _context.Projects.FindAsync(projectDTO.Id);

            if (project == null)
            {
                return NotFound("Project not found");
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Project deleted successfully" });
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignUsersToProject([FromBody] AssignUsersVM assignment)
        {
            var project = await _context.Projects.FindAsync(assignment.Id);

            if (project == null)
            {
                return NotFound("Project not found");
            }

            foreach (int userId in assignment.UserId)
            {
                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                if (project.Users == null)
                {
                    project.Users = new List<User>();
                }

                project.Users.Add(user);
            }

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Users assigned to the project successfully" });
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetTasksByProject(int projectId)
        {
            var tasks = await _context.Tasks
                                      .Where(t => t.ProjectId == projectId)
                                      .Include(t => t.Users)
                                      .Select(t => new TaskDto
                                      {
                                          Id = t.Id,
                                          TaskName = t.TaskName,
                                          TaskDescription = t.TaskDescription,
                                          Users = t.Users.Select(u => new UserDto
                                          {
                                              Id = u.Id,
                                              UserName = u.UserName
                                          }).ToList()
                                      })
                                      .ToListAsync();

            if (tasks == null || !tasks.Any())
            {
                return NotFound("No tasks found for the given project.");
            }

            return Ok(tasks);
        }
    }
}
