import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { AnimalDescriptionService } from '../../animal/animal-description/animal-description.service';
import { Animal } from '../../animal/interface/animal';
import { UserService } from '../user.service';
import * as animalSelectors from '../../animal/store/animal.selectors';
import * as animalActions from '../../animal/store/animal.actions';

@Component({
  selector: 'app-favorite-animal',
  templateUrl: './favorite-animal.component.html',
  styleUrls: ['./favorite-animal.component.css'],
})
export class FavoriteAnimalComponent implements OnInit, OnDestroy {
  animalsList: Animal[] = [];
  animalsId: string[] = [];
  isFetching: boolean = false;
  error: boolean = false;
  private userServiceSubscription: Subscription | any;
  constructor(
    private userService: UserService,
    private animalDescriptionService: AnimalDescriptionService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
    this.store.select('animal').subscribe((animalStoreData) => {
      this.isFetching = animalStoreData.isFetching;
      this.error = !!animalStoreData.error;
    });
    this.userServiceSubscription = this.userService.user.subscribe((user) => {
      this.animalsId = user ? user.favorites : [];
    });

    this.store
      .select(animalSelectors.selectMyFavorites())
      .subscribe((myFavorites) => {
        console.log(myFavorites);

        if (!myFavorites.length && this.animalsId.length !== 0) {
          for (const id of this.animalsId) {
            this.store.dispatch(
              animalActions.getMyFavoritesAnimalsStart({
                animalId: id,
              })
            );
          }
        }
        this.store
          .select(animalSelectors.selectMyFavorites())
          .subscribe((animals) => {
            this.animalsList = animals;
          });
      });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
