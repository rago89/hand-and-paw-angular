import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalDescriptionService } from '../animal-description/animal-description.service';
@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css'],
})
export class RegisterAnimalComponent implements OnInit {
  formArgs: {
    title: string;
    description?: string;
    typeRequest: string;
    animalId?: string;
  } = {
    title: 'Register an animal',
    description: `If you have an animal for adoption, you can add it here. Please add a picture and write the story of your animal and describe it's character.`,
    typeRequest: 'post',
  };

  constructor(
    private animalDescriptionService: AnimalDescriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalDescriptionService.previousPageButtonText.next(this.router.url);
  }
}
