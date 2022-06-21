import { Component } from '@angular/core';

@Component({
  selector: 'app-about-adoption',
  templateUrl: './about-adoption.component.html',
  styleUrls: ['./about-adoption.component.css'],
})
export class AboutAdoptionComponent {
  showAnswer: boolean = false;
  constructor() {}

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
