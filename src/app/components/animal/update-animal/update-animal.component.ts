import { tap } from 'rxjs';
import { AnimalService } from './../animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../interface/animal';
import { AnimalDescriptionService } from '../animal-description/animal-description.service';
import * as animalSelectors from '../store/animal.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

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
    animal?: Animal;
  } = {
    title: 'Update animal',
    typeRequest: 'put',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalDescriptionService: AnimalDescriptionService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
    this.route.params
      .pipe(
        tap((params) => {
          this.store
            .select(animalSelectors.selectAnimalFromMyAnimals(params['id']))
            .subscribe((animal) => {
              this.formArgs.animal = animal;
            });
        })
      )
      .subscribe((params) => {});
  }
}
