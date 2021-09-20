using NewsApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsApp.DataAccess
{
    public interface INewsDataAccess
    {
        Task<News> GetNewsById(string id);
        Task<IList<News>> GetNewsList();
    }
}
