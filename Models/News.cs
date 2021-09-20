namespace NewsApp.Models
{
    public class News
    {
        public News(string id, string title, string content)
        {
            Id = id;
            Title = title;
            Content = content;
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}