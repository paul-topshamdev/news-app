import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsService } from '../../../services/news/news.service';
import { News } from '../../../models/news/news';

@Component({
  selector: 'news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  private news: News;

  constructor(@Inject(NewsService) private newsService: NewsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      let id: string = paramMap.get('id');

      console.log(id);

      this.newsService.getNewsById(id).subscribe((data: News) => {
        this.news = data;
      }, error => console.error(error));
    });
  }
}
