import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { News } from '../../../models/news/news';
import { NewsListComponent } from './news-list.component';
import { NewsListItemComponent } from './news-list-item/news-list-item.component';
import { Observable, of, Subject } from 'rxjs';
import { NewsService } from '../../../services/news/news.service';

describe('NewsListComponent', () => {

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

  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  class NewsServiceMock {
    public getNewsList(): Observable<News[]> { return of(newsListMockData); }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListComponent, NewsListItemComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: NewsService, useClass: NewsServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;

    // Pass the NewsListComponent a news array.
    component.newsList = newsListMockData;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
