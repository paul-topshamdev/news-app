import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../../../models/news/news';

@Component({
  selector: 'news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.css'],
  inputs: [ 'news' ]
})
export class NewsListItemComponent implements OnInit {

  @Input() news: News;

  constructor() { }

  ngOnInit() {

  }

}
