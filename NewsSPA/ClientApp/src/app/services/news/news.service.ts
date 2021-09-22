import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News } from '../../models/news/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient, @Inject('NEWS_API_BASE_URL') private newsServiceBaseUrl: string) { }

  public getNewsList(): Observable<News[]> {

    console.log("NewService.getNewsList called");

    return this.httpClient.get<News[]>(this.newsServiceBaseUrl);
  }
}
