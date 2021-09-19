using MongoDB.Bson;
using System;

namespace NewsService.Models
{
    public class News
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}