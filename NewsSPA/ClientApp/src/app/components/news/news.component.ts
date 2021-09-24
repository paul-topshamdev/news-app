import { Component, Inject } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { News } from '../../models/news/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent {
  public newsList: News[];

  constructor(@Inject(NewsService) private newsService: NewsService) {

    this.newsService.getNewsList().subscribe(result => {
      this.newsList = result;
    }, error => console.error(error));
  }
}
