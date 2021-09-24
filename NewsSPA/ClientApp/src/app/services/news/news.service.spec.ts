import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { News } from '../../models/news/news';

describe('NewsService', () => {

  const newsServiceBaseUrl: string = "http://localhost:1822/news";
  let newsService: NewsService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({ 

      imports: [
        HttpClientTestingModule
      ],

      providers: [
        NewsService,
        {
          provide: "NEWS_API_BASE_URL",
          useValue: newsServiceBaseUrl
        }
      ]
    });

    newsService = TestBed.get(NewsService);
    httpClientMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const newsService: NewsService = TestBed.get(NewsService);
    expect(newsService).toBeTruthy();
  });

  it(`should fetch news list as Observable<News[]>`, () => {

    const newsListMockData: News[] = [
      {
        id: "507f1f77bcf86cd799439011",
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        content: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        id: "799439011507f1f77bcf86cd",
        title: "qui est esse",
        content: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        id: "77bcf86cd799439011507f1f",
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        content: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      }
    ];

    newsService.getNewsList()
      .subscribe((newsList: News[]) => {
        expect(newsList.length).toBe(3);
      });

    let testRequest: TestRequest = httpClientMock.expectOne(newsServiceBaseUrl);
    expect(testRequest.request.method).toBe("GET");

    testRequest.flush(newsListMockData);
    httpClientMock.verify();

  });

  //it(`should fetch news as Observable<News>`, () => {

  //  const newsId: string = "507f1f77bcf86cd799439011";
  //  const newsTitle: string = "Sausages";

  //  const newsMockData: News = {
  //      id: newsId,
  //      title: newsTitle,
  //      content: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //  };

  //  newsService.getNewsById(newsId)
  //    .subscribe((news: News) => {
  //      expect(news.title).toBe(newsTitle);
  //      expect(news.title).not.toBe("Burgers"); // Check that not anything can pass.  
  //    });

  //  let testRequest: TestRequest = httpClientMock.expectOne(newsServiceBaseUrl + "/" + newsId);
  //  expect(testRequest.request.method).toBe("GET");

  //  testRequest.flush(newsMockData);
  //  httpClientMock.verify();

  //});
});
