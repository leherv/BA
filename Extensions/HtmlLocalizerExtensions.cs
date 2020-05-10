using System.Linq;
using Microsoft.AspNetCore.Mvc.Localization;

namespace Setup.Extensions
{
    public static class HtmlLocalizerExtensions
    {
        public static string GetAllStringsFromLocalizerToJson(IHtmlLocalizer htmlLocalizer)
        {
            return htmlLocalizer.GetAllStrings()
                .ToDictionary(kv => kv.Name, kv => kv.Value)
                .ToCamelCasedJson();
        }
    }
}