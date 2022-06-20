import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AnimalService } from './../animal.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Animal } from '../interface/animal';
import { Router } from '@angular/router';
import { AnimalDescriptionService } from '../animal-description/animal-description.service';

@Component({
  selector: 'app-find-animal',
  templateUrl: './find-animal.component.html',
  styleUrls: ['./find-animal.component.css'],
})
export class FindAnimalComponent implements OnInit, OnDestroy {
  animalsList: Animal[] = [];
  filteredAnimalsList: Animal[] = [];
  isFetching: boolean = false;
  error: boolean = false;
  defaultAge: string = 'all';
  defaultCharacter: string = 'all';
  defaultGender: string = 'all';
  defaultProvince: string = 'all';
  showFilteredAnimals: boolean = false;
  private animalSubscription?: Subscription;
  @ViewChild('f', { static: false }) myForm: NgForm | any;

  constructor(
    private animalService: AnimalService,
    private animalDescriptionService: AnimalDescriptionService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
    this.isFetching = true;
    this.animalService.fetchAnimals().subscribe({
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
  onSubmit() {
    this.isFetching = true;

    const filterOptions: any = {};
    for (const [key, value] of Object.entries<string>(this.myForm.value)) {
      if (key === 'breed' && value === '') {
        continue;
      }
      if (key === 'type' && value === '') {
        continue;
      }
      if (value === 'all') {
        continue;
      }
      if (key === 'type') {
        filterOptions[key] = value.toLowerCase().trim();
        continue;
      }
      if (key === 'breed') {
        filterOptions[key] = value.toLowerCase().trim();
        continue;
      }
      filterOptions[key] = value;
    }

    this.animalSubscription = this.animalService
      .filterAnimals(filterOptions)
      .subscribe({
        next: (response) => {
          this.filteredAnimalsList = response;
          this.isFetching = false;
          this.showFilteredAnimals = true;
        },
        error: (response) => {},
        complete: () => {},
      });
  }
  onShowAllAnimals() {
    this.showFilteredAnimals = false;
  }
  resetForm() {
    this.myForm.form.patchValue({
      type: '',
      breed: '',
      age: this.defaultAge,
      gender: this.defaultGender,
      character: this.defaultCharacter,
      province: this.defaultProvince,
    });
  }
  ngOnDestroy(): void {
    this.animalSubscription?.unsubscribe();
  }
}
