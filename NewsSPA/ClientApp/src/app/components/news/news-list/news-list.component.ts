import { Component, OnInit, Inject } from '@angular/core';

import { NewsService } from '../../../services/news/news.service';
import { News } from '../../../models/news/news';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public newsList: News[];

  constructor(@Inject(NewsService) private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsList().subscribe((data: News[]) => {
      this.newsList = data;
    }, error => console.error(error));
  }
}
