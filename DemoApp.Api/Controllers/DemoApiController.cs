using DemoApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DemoApp.Api.Controllers
{
    [RoutePrefix("api/DemoApi")]
    public class DemoApiController : ApiController
    {
        private DemoDbEntities db = new DemoDbEntities();

        [Route("GetStudents")]
        public IEnumerable<Student> GetStudents()
        {
            return db.Student.AsEnumerable();
        }

        [Route("GetStudentsAsc")]
        public IEnumerable<Student> GetStudentsAsc()
        {
            return db.Student.AsEnumerable().OrderBy(x => x.StudentId);
        }

        [Route("GetStudentsDesc")]
        public IEnumerable<Student> GetStudentsDesc()
        {
            return db.Student.AsEnumerable().OrderByDescending(x => x.StudentId);
        }
    }
}
