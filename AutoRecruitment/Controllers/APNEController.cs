using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AutoRecruitment.Controllers
{
    public class APNEController : Controller
    {
        // GET: APNE
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RegistrationForm()
        {
            return View();
        }
    }
}