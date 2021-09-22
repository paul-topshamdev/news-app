import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  public title: string = "I love pizza!";

  constructor() { }

  ngOnInit() {
  }

}
