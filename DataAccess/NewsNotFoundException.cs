using System;

namespace NewsApp.DataAccess
{
    public class NewsNotFoundException : ApplicationException
    {
        public NewsNotFoundException(string message = "News article not found", Exception? innerException = null) : base(message, innerException) { }
    }
}