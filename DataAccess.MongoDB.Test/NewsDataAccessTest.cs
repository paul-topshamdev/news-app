using Microsoft.Extensions.Logging;
using Moq;
using NewsApp.Shared;
using System.Threading.Tasks;
using Xunit;

namespace NewsApp.DataAccess.MongoDB.Test
{
    public class NewsDataAccessTest
    {
        private readonly INewsDataAccess newsDataAccess; 

        public NewsDataAccessTest()
        {
            var databaseConfig = new DatabaseConfig();
            databaseConfig.ConnectionString = "mongodb://127.0.0.1:27017";

            newsDataAccess = new NewsDataAccess(Mock.Of<ILogger<NewsDataAccess>>(), databaseConfig);
        }

        [Fact]
        public async Task GetNewsListAsync()
        {
            var newsList = await newsDataAccess.GetNewsListAsync();

            Assert.Equal(5, newsList.Count);
        }

        [Fact]
        public async Task GetNewsByIdAsync()
        {
            var newsList = await newsDataAccess.GetNewsListAsync();

            var news = await newsDataAccess.GetNewsByIdAsync(newsList[0].Id);

            Assert.Equal(newsList[0].Title, news.Title);
        }

        [Fact]
        public async Task GetNewsByIdAsync_NotFound()
        {
            await Assert.ThrowsAsync<NewsNotFoundException>(() => newsDataAccess.GetNewsByIdAsync("000000000000000000000000"));
        }
    }
}
