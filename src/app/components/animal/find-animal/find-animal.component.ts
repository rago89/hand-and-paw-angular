import { Animal } from './../animal.model';
import { AnimalService } from './../animal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-animal',
  templateUrl: './find-animal.component.html',
  styleUrls: ['./find-animal.component.css'],
})
export class FindAnimalComponent implements OnInit {
  animalsList: Animal[] = [];
  isFetching: boolean = false;
  error: boolean = false;
  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.animalService.onGetAnimals().subscribe({
      next: (animals) => {
        this.isFetching = false;
        this.animalsList = animals;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = true;
      },
    });
  }
}
