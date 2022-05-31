import { Component } from '@angular/core';
@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css'],
})
export class RegisterAnimalComponent {
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
}
