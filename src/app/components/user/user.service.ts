import { UrlService } from 'src/app/url/url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

interface UserLogged {
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loadLoginForm = new Subject<boolean>();
  logToken = new Subject<string>();
  isLogged = new Subject<boolean>();
  userLogged = new Subject<UserLogged>();

  constructor(private http: HttpClient, private urlService: UrlService) {}
  postUser(user: User) {
    return this.http.post(`${this.urlService.registerUser}`, user);
  }

  loginRequest(user: { email: string; password: string }) {
    return this.http.post<{
      message: string;
      user: UserLogged;
    }>(`${this.urlService.loginUser}`, user);
  }

  logOutRequest() {
    return this.http.get(`${this.urlService.logoutUser}`);
  }
}
