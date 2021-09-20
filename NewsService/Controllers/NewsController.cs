using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewsApp.DataAccess;
using NewsApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewsApp.NewsService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly ILogger<NewsController> _logger;
        private readonly INewsDataAccess newsDataAccess;
        
        public NewsController(ILogger<NewsController> logger, INewsDataAccess newsDataAccess)
        {
            _logger = logger;
            this.newsDataAccess = newsDataAccess;
        }

        [HttpGet]
        public async Task<IList<News>> Get()
        {
            return await newsDataAccess.GetNewsList();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<News> GetById([FromRoute] string id)
        {
            return await newsDataAccess.GetNewsById(id);
        }
    }
}