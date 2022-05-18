import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/url/url.service';
import { Animal } from './animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  animals: any;
  constructor(private http: HttpClient, private urlService: UrlService) {}

  fetchAnimals() {
    return this.http.get<Animal[]>(`${this.urlService.getAnimals}`);
  }

  postAnimal(animal: any) {
    return this.http.post<Animal>(`${this.urlService.registerAnimal}`, animal);
  }
}
