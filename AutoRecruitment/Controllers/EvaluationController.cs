using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AutoRecruitment.Controllers
{
    public class EvaluationController : Controller
    {
        // GET: Evaluation
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InterviewForm()
        {
            return View();
        }

        public ActionResult EngAssessmentForm()
        {
            return View();
        }

        public ActionResult ResponsePage()
        {
            return View();
        }
    }
}