using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AutoRecruitment.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Applicants()
        {
            return View();
        }

        public ActionResult Programs()
        {
            return View();
        }

        public ActionResult Campaigns()
        {
            return View();
        }

        public ActionResult Users()
        {
            return View();
        }

        public ActionResult Configuration()
        {
            return View();
        }
    }
}