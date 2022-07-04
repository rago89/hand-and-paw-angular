import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/url/url.service';
import { Animal } from './interface/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  // headers = new HttpHeaders().set('content-type', 'multipart/form-data;');
  animals?: Animal[];
  animal = new BehaviorSubject<Animal | null>(null);

  constructor(private http: HttpClient, private urlService: UrlService) {}

  getAnimals() {
    return this.http.get<Animal[]>(`${this.urlService.getAnimals}`);
  }

  getAnimal(id: string) {
    return this.http.get<Animal[]>(`${this.urlService.getAnimal(id)}`);
  }

  postAnimal(animal: any) {
    return this.http.post<{ newPublication: Animal }>(
      `${this.urlService.registerAnimal}`,
      animal
    );
  }

  filterAnimals(filterOptions: any) {
    return this.http.post<Animal[]>(
      `${this.urlService.filterAnimals}`,
      filterOptions
    );
  }

  deleteAnimal(animalId: string, userId: string) {
    return this.http.delete(
      `${this.urlService.deleteAnimal(animalId, userId)}`
    );
  }

  updateAnimal(id: string, newData: any) {
    return this.http.put<Animal[]>(
      `${this.urlService.updateAnimal(id)}`,
      newData
    );
  }
}
