using NewsApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsApp.DataAccess
{
    public interface INewsDataAccess
    {
        /// <summary>
        /// Gets a news article.
        /// </summary>
        /// <exception cref="NewsNotFoundException">The news doesn't exist.</exception>
        Task<News> GetNewsByIdAsync(string id);

        Task<IList<News>> GetNewsListAsync();

        Task<string> AddNews(News news);
        
        Task<long> UpdateNews(News news);
        
        Task<long> DeleteNews(string id);
    }
}