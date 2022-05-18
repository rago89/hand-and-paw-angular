import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  domain: string = 'http://localhost:4000/api';

  registerUser: string = `${this.domain}/users/register`;
  updateUser: string = `${this.domain}/animals/update/:id`;
  getUser: string = `${this.domain}/users/update/:id`;
  loginUser: string = `${this.domain}/login`;
  logoutUser: string = `${this.domain}/logout`;

  registerAnimal: string = `${this.domain}/animals/register`;
  updateAnimal: string = `${this.domain}/animals/update/:id`;
  deleteAnimal: string = `${this.domain}/animals/delete/:id`;
  getAnimals: string = `${this.domain}/animals`;
  getAnimal: string = `${this.domain}/animals/:id`;
  constructor() {}
}
