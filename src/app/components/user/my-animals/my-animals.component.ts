import { AppState } from './../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimalService } from '../../animal/animal.service';
import { Animal } from '../../animal/interface/animal';
import { UserService } from '../user.service';
import { AnimalDescriptionService } from '../../animal/animal-description/animal-description.service';
import { Store } from '@ngrx/store';
import * as animalActions from '../../animal/store/animal.actions';
import * as animalSelectors from '../../animal/store/animal.selectors';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.css'],
})
export class MyAnimalsComponent implements OnInit, OnDestroy {
  animalsList: Animal[] = [];
  animalsId: string[] = [];
  isFetching: boolean = false;
  error: boolean = false;
  userId: string = '';
  private userServiceSubscription: Subscription | any;
  private removeAnimalSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private animalService: AnimalService,
    private userService: UserService,
    private route: ActivatedRoute,
    private animalDescriptionService: AnimalDescriptionService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.store.select('animal').subscribe((animalStoreData) => {
      this.isFetching = animalStoreData.isFetching;
      this.error = !!animalStoreData.error;
    });
    this.userServiceSubscription = this.userService.user.subscribe((user) => {
      this.animalsId = user ? user.registeredAnimals : [];
    });

    this.store
      .select(animalSelectors.selectMyAnimals())
      .subscribe((myAnimals) => {
        if (!myAnimals.length && this.animalsId.length !== 0) {
          for (const id of this.animalsId) {
            this.store.dispatch(
              animalActions.getMyAnimalsStart({
                animalId: id,
              })
            );
          }
        }
        this.store
          .select(animalSelectors.selectMyAnimals())
          .subscribe((animals) => {
            this.animalsList = animals;
          });
      });
  }

  onDeleteAnimal(animal: Animal) {
    this.removeAnimalSubscription = this.animalService
      .deleteAnimal(animal._id || '', this.userId)
      .subscribe({
        next: (response) => {
          this.animalsList = this.animalsList.filter(
            (a) => a._id !== animal._id
          );
        },
        error: (error) => {},
        complete: () => {
          this.userService.getUser(this.userId).subscribe((user) => {
            this.userService.user.next(user);
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
    this.removeAnimalSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
