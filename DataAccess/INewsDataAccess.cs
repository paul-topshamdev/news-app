using NewsApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsApp.DataAccess
{
    public interface INewsDataAccess
    {
        Task<News> GetNewsByIdAsync(string id);
        Task<IList<News>> GetNewsListAsync();
    }
}