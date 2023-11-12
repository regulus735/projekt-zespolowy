using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projekt_zespolowy.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public List<User> Users { get; set; }
    }
}
