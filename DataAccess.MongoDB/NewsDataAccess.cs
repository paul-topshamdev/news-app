using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using NewsApp.Models;
using NewsApp.Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsApp.DataAccess.MongoDB
{
    public class NewsDataAccess : INewsDataAccess
    {
        private readonly IMongoDatabase db;
        private const string dbName = "news";
        private const string collectionName = "news";

        public NewsDataAccess(ILogger<NewsDataAccess> logger, IDatabaseConfig databaseConfig)
        {
            db = new MongoClient(databaseConfig.ConnectionString).GetDatabase(dbName);
        }

        public async Task<News> GetNewsByIdAsync(string id)
        {
            var collection = db.GetCollection<BsonDocument>(collectionName);
            var filter = "{ _id: ObjectId('" + id + "') }";

            try
            {
                var bsonDocument = await collection.Find(filter).SingleAsync();

                return ConvertBsonDocumentToNews(bsonDocument);
            }
            catch (InvalidOperationException invalidOperationException)
            {
                if (invalidOperationException.Message.Contains("Sequence contains no elements"))
                {
                    throw new NewsNotFoundException(innerException: invalidOperationException);
                }

                throw;
            }
        }

        public async Task<IList<News>> GetNewsListAsync()
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

        #region Private Methods

        private static News ConvertBsonDocumentToNews(BsonDocument bsonDocument)
        {
            return new News(
                bsonDocument.GetValue("_id").AsObjectId.ToString(),
                bsonDocument.GetValue("title").AsString,
                bsonDocument.GetValue("content").AsString);
        }

        #endregion Private Methods
    }
}
