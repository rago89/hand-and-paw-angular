import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-adoption',
  templateUrl: './about-adoption.component.html',
  styleUrls: ['./about-adoption.component.css'],
})
export class AboutAdoptionComponent implements OnInit {
  showAnswer: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
