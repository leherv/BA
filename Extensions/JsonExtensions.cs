using System.Text.Json;

namespace Setup.Extensions
{
    public static class JsonExtensions
    {
        public static string ToCamelCasedJson(this object obj)
        {
            return JsonSerializer.Serialize(obj, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }
    }
}