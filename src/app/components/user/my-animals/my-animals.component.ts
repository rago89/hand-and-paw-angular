import { User } from './../interface/User';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AnimalService } from '../../animal/animal.service';
import { Animal } from '../../animal/interface/animal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.css'],
})
export class MyAnimalsComponent implements OnInit, OnDestroy {
  animalsList: Animal[] = [];
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
    private router:Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.isFetching = true;
    this.userServiceSubscription = this.userService.user
      .pipe(
        map(async (user) => {
          const animalsList: Animal[] = [];
          if (user && user.id && user.registeredAnimals.length !== 0) {
            for await (const id of user.registeredAnimals) {
              if (user.id && user.registeredAnimals.length !== 0) {
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
  onDeleteAnimal(animal: Animal) {
    this.removeAnimalSubscription = this.animalService
      .deleteAnimal(animal._id || '', this.userId)
      .subscribe({
        next: (response) => {
          this.animalsList = this.animalsList.filter(
            (a) => a._id !== animal._id
          );
        },
        error: (error) => {
          console.log(error);
        },
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
  }
}
