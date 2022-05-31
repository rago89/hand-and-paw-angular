import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UrlService {
  domain: string = environment.apiUrl;

  contactUs: string = `${this.domain}/api/emails/contact-us`;
  contactGiver: string = `${this.domain}/api/emails/contact-giver`;

  registerUser: string = `${this.domain}/api/users/register`;
  updateUser = (id: string) => `${this.domain}/api/users/update/${id}`;
  getUser = (id: string) => `${this.domain}/api/users/${id}`;
  loginUser: string = `${this.domain}/api/login`;
  logoutUser = (id: string) => `${this.domain}/api/logout/${id}`;
  refreshToken: string = `${this.domain}/api/refresh-token`;
  addFavoriteAnimal = (id: string) =>
    `${this.domain}/api/users/add-favorite/${id}`;
  removeFavoriteAnimal = (id: string) =>
    `${this.domain}/api/users/remove-favorite/${id}`;

  registerAnimal: string = `${this.domain}/api/animals/register`;
  updateAnimal = (id: string) => `${this.domain}/api/animals/update/${id}`;
  deleteAnimal = (id: string, userId: string) =>
    `${this.domain}/api/animals/delete/${id}?userId=${userId}`;
  getAnimals: string = `${this.domain}/api/animals`;
  getAnimal = (id: string) => `${this.domain}/api/animals/${id}`;
  filterAnimals: string = `${this.domain}/api/animals/filter`;
}
