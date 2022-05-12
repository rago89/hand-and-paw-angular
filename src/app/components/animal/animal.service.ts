import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from './animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  animals: any;
  constructor(private http: HttpClient) {}

  onGetAnimals() {
    return this.http.get<Animal[]>('http://localhost:4000/api/animals');
  }
}
