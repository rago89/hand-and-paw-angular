import { handleUserError } from './../../error-handling/user-handling';
import { User } from './interface/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/url/url.service';
import { BehaviorSubject, Subscription, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private urlService: UrlService) {}

  postUser = (user: { name: string; email: string; password: string }) => {
    return this.http
      .post<{
        message: string;
        user: { _id: string; name: string; email: string };
      }>(`${this.urlService.registerUser}`, user)
      .pipe(catchError(handleUserError));
  };

  updateUser = (updateValues: any, id: string) => {
    return this.http
      .put<User>(`${this.urlService.updateUser(id)}`, updateValues)
      .pipe(catchError(handleUserError));
  };

  getUser = (id: string) => {
    return this.http.get<User>(`${this.urlService.getUser(id)}`);
  };

  setFavoriteAnimal = (animalId: string, userId?: string) => {
    if (userId) {
      return this.http.patch(this.urlService.addFavoriteAnimal(userId), {
        animalId,
      });
    }
    return new Observable((subscriber) => {
      subscriber.next(null);
    });
  };

  removeFavoriteAnimal = (animalId: string, userId?: string) => {
    if (userId) {
      return this.http.patch(this.urlService.removeFavoriteAnimal(userId), {
        animalId,
      });
    }
    return new Observable((subscriber) => {
      subscriber.next(null);
    });
  };
}
