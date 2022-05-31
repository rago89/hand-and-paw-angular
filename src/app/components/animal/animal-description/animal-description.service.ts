import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalDescriptionService {
  previousPageButtonText = new BehaviorSubject<string>('');
}
