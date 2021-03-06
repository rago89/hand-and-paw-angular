import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AnimalDescriptionService } from '../../animal/animal-description/animal-description.service';
import { AnimalService } from '../../animal/animal.service';
import { Animal } from '../../animal/interface/animal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorite-animal',
  templateUrl: './favorite-animal.component.html',
  styleUrls: ['./favorite-animal.component.css'],
})
export class FavoriteAnimalComponent implements OnInit, OnDestroy {
  animalsList: Animal[] = [];
  isFetching: boolean = false;
  error: boolean = false;
  private userServiceSubscription: Subscription | any;
  constructor(
    private animalService: AnimalService,
    private userService: UserService,
    private animalDescriptionService: AnimalDescriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
    this.isFetching = true;
    this.userServiceSubscription = this.userService.user
      .pipe(
        map(async (user) => {
          const animalsList: Animal[] = [];
          if (user && user.id && user.favorites.length !== 0) {
            for await (const id of user.favorites) {
              if (user.id && user.favorites.length !== 0) {
                this.animalService.getAnimal(id).subscribe({
                  next: (animal) => {
                    animalsList.push(animal[0]);
                  },
                  error: (error) => {
                    this.isFetching = false;
                    this.error = true;
                  },
                });
              }
            }
          }

          return animalsList;
        })
      )
      .subscribe((animalList) => {
        animalList.then((animals) => {
          this.animalsList = animals;
          this.isFetching = false;
        });
      });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
