import { AnimalPicture } from './../picture.model';
import { Animal } from './../animal.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: any;
  age: string = '';

  pictureHex?: string;
  anonymousImage: string =
    '../../../../assets/images/ui/animal-card/raw-images/default-no-image-1.png';
  constructor() {}

  ngOnInit(): void {
    this.age =
      JSON.parse(this.animal.age) === 0 ? 'less than 1 year' : this.animal?.age;
    this.pictureHex =
      this.animal?.pictures && this.animal.pictures[0].picture.data;
  }
}
