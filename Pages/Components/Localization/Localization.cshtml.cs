using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.Localization;
 
 namespace Setup.Pages
 {
     public class Localization : ViewComponent
     {
         public IViewComponentResult Invoke(IHtmlLocalizer localizer)
         {
             return View(nameof(Localization), Extensions.HtmlLocalizerExtensions.GetAllStringsFromLocalizerToJson(localizer));
         }
     }
 }