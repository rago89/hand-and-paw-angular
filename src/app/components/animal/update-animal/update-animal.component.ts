import { tap } from 'rxjs';
import { AnimalService } from './../animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../interface/animal';
import { AnimalDescriptionService } from '../animal-description/animal-description.service';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.css'],
})
export class UpdateAnimalComponent implements OnInit {
  formArgs: {
    title: string;
    description?: string;
    typeRequest: string;
    animal?: Animal | null;
  } = {
    title: 'Update animal',
    typeRequest: 'put',
  };
  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router,
    private animalDescriptionService: AnimalDescriptionService
  ) {}
  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
    this.route.params
      .pipe(
        tap((params) => {
          this.animalService.getAnimal(params['id']).subscribe((animal) => {
            this.formArgs.animal = animal[0];
          });
        })
      )
      .subscribe((params) => {});
  }
}
