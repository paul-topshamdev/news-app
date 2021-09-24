import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { News } from '../../../models/news/news';
import { NewsService } from '../../../services/news/news.service';
import { NewsDetailsComponent } from './news-details.component';

describe('NewsDetailsComponent', () => {

  const newsMockData: News = {
    id: "507f1f77bcf86cd799439011",
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    content: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };

  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;
  let activatedRouteMock: any;

  class NewsServiceMock {
    public getNewsById(): Observable<News> { return of(newsMockData); }
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [NewsDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: new Subject() } },
        { provide: NewsService, useClass: NewsServiceMock }
      ]
    })
      .compileComponents();

    activatedRouteMock = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    activatedRouteMock.paramMap.next({ get: (id: string) => 'some id value' });

    expect(component).toBeTruthy();
  });
});
