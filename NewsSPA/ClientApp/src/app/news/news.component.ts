import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent {
  public newsList: News[];

  constructor(http: HttpClient, @Inject('API_BASE_URL') baseUrl: string) {
    http.get<News[]>(baseUrl + 'news').subscribe(result => {
      this.newsList = result;
    }, error => console.error(error));
  }
}

interface News {
  id: string;
  title: string;
  content: string;
}
