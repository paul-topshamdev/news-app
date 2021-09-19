using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using NewsService.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly ILogger<NewsController> _logger;
        private readonly IMongoDatabase db;
        private const string mongoDbConnectionString = "mongodb://127.0.0.1:27017";
        private const string dbName = "news";
        private const string collectionName = "news";

        public NewsController(ILogger<NewsController> logger)
        {
            _logger = logger;

            db = new MongoClient(mongoDbConnectionString).GetDatabase(dbName);
        }

        [HttpGet]
        public async Task<IList<News>> Get()
        {
            var collection = db.GetCollection<BsonDocument>(collectionName);

            using IAsyncCursor<BsonDocument> cursor = await collection.FindAsync(new BsonDocument());

            var newsList = new List<News>();

            // Loop over batches.
            while (await cursor.MoveNextAsync())
            {
                IEnumerable<BsonDocument> batch = cursor.Current;

                // Loop over docs in batch.
                foreach (BsonDocument bsonDocument in batch)
                {
                    newsList.Add(ConvertBsonDocumentToNews(bsonDocument));
                }
            }

            return newsList;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<News> GetById([FromRoute] string id)
        {
            var collection = db.GetCollection<BsonDocument>(collectionName);
            var filter = "{ _id: ObjectId('" + id + "') }";

            var bsonDocument = await collection.Find(filter).SingleOrDefaultAsync();

            return ConvertBsonDocumentToNews(bsonDocument);
        }

        #region Private Methods

        private static News ConvertBsonDocumentToNews(BsonDocument bsonDocument)
        {
            var news = new News();
            news.Id = bsonDocument.GetValue("_id").AsObjectId.ToString();
            news.Title = bsonDocument.GetValue("title").AsString;
            news.Content = bsonDocument.GetValue("content").AsString;

            return news;
        }

        #endregion Private Methods
    }
}