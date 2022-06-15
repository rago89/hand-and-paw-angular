import { UserService } from 'src/app/components/user/user.service';
import { RefreshToken } from './refresh-token.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  ReplaySubject,
  Subject,
  tap,
  throwError,
  take,
  exhaustMap,
  Subscription,
  Observable,
} from 'rxjs';
import { UrlService } from 'src/app/url/url.service';
import { AuthResponseData } from '../interface/Auth-response-data';
import { User as userInterface } from '../interface/User';
import { AccessToken } from './access-token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = new ReplaySubject<string>();
  loadLoginForm = new Subject<boolean>();
  logToken = new Subject<string>();
  isLogged = new BehaviorSubject<boolean>(false);
  accessToken = new BehaviorSubject<AccessToken | null>(null);
  refreshTokenData = new BehaviorSubject<RefreshToken | null>(null);
  refreshTokenInterval: any;
  logOutSetTimeout: any;
  private refreshTokenRequestObservable: Subscription | any;

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
    private userService: UserService,
    private router: Router
  ) {}

  postUser(user: userInterface) {
    return this.http
      .post(`${this.urlService.registerUser}`, user)
      .pipe(catchError(this.handleError));
  }

  loginRequest(user: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(`${this.urlService.loginUser}`, user)
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const expiresInCasted = Number(resData.expiresIn);

          const accessToken = new AccessToken(
            resData.token,
            expiresInCasted,
            resData.user.id
          );
          const refreshToken = this.newRefreshToken(resData);

          const tokenUserRemainingTime: number =
            accessToken.tokenExpiringDate - new Date().getTime();

          localStorage.setItem('at', JSON.stringify(accessToken));
          this.refreshTokenData.next(refreshToken);
          this.accessToken.next(accessToken);
          this.userService.user.next(resData.user);
          this.autoRefreshToken(tokenUserRemainingTime);

          if (refreshToken && refreshToken.token) {
            const tokenRefreshRemainingTime: number =
              refreshToken.tokenExpiringDate - new Date().getTime();
            setTimeout(() => {
              this.logOut().subscribe({
                next: (res) => {},
                error: (error) => {},
              });
            }, tokenRefreshRemainingTime);
          }
        })
      );
  }

  autoLogin() {
    const localStorageAccessToken = localStorage.getItem('at');

    const accessTokenData: {
      _token: string;
      tokenExpiringDate: number;
      userId: string;
    } | null =
      localStorageAccessToken !== null &&
      typeof localStorageAccessToken === 'string'
        ? JSON.parse(localStorageAccessToken)
        : null;
    const refreshToken = this.getRefreshTokenLocalStorage();

    const loadedAccessToken =
      accessTokenData &&
      new AccessToken(
        accessTokenData._token,
        Number(accessTokenData.tokenExpiringDate),
        accessTokenData.userId
      );

    if (refreshToken && refreshToken.token) {
      this.refreshTokenData.next(refreshToken);
    }

    if (loadedAccessToken && !loadedAccessToken.token) {
      clearInterval(this.refreshTokenInterval);
      this.refreshTokenRequestObservable = this.refreshTokenRequest().subscribe(
        (resData: AuthResponseData) => {
          const accessToken =
            resData &&
            new AccessToken(
              resData.token,
              Number(resData.expiresIn),
              resData.user.id
            );
          this.accessToken.next(accessToken);
          if (accessToken && accessToken.token) {
            this.userService.user.next(resData.user);
            const remainingTime: number =
              accessToken.tokenExpiringDate - new Date().getTime();
            this.isLogged.next(true);

            this.autoRefreshToken(remainingTime);
          }
        }
      );
    }

    if (loadedAccessToken && loadedAccessToken.token) {
      // clearInterval(this.refreshTokenInterval);
      const remainingTime: number =
        loadedAccessToken.tokenExpiringDate - new Date().getTime();
      this.accessToken.next(loadedAccessToken);
      this.userService.getUser(loadedAccessToken.userId).subscribe((user) => {
        this.userService.user.next(user);
      });
      this.isLogged.next(true);
      this.autoRefreshToken(remainingTime);
    }
  }

  autoRefreshToken(expirationDuration: number) {
    setInterval(() => {
      this.refreshTokenRequestObservable = this.refreshTokenRequest().subscribe(
        {
          next: (resData: AuthResponseData) => {
            if (resData) {
              const accessToken = new AccessToken(
                resData?.token,
                Number(resData?.expiresIn),
                resData.user.id
              );
              if (accessToken.token) {
                this.accessToken.next(accessToken);
                // this.userService.user.next(resData.user);
                localStorage.setItem('at', JSON.stringify(accessToken));
              }
            }
          },
          error: (error: any) => {},
        }
      );
    }, expirationDuration);
  }

  refreshTokenRequest = (): any => {
    return this.refreshTokenData.pipe(
      take(1),
      exhaustMap((tokenData) => {
        if (tokenData) {
          const refreshToken = {
            refreshToken: tokenData.token,
            id: tokenData.userId,
          };
          return this.http.post<AuthResponseData>(
            this.urlService.refreshToken,
            {
              refreshToken,
            }
          );
        } else {
          return new Observable((subscriber) => {
            subscriber.next(null);
          });
        }
      })
    );
  };

  autoLogout() {
    const refreshToken = this.getRefreshTokenLocalStorage();
    if (refreshToken && refreshToken.token) {
      const remainingTime: number =
        refreshToken.tokenExpiringDate - new Date().getTime();
      this.logOutSetTimeout = setTimeout(() => {
        this.logOut().subscribe({
          next: (res) => {},
          error: (error) => {},
        });
      }, remainingTime);
    } else {
      this.clearData();
    }
  }

  logOut() {
    return this.accessToken.pipe(
      take(1),
      exhaustMap((token) => {
        if (token?.userId) {
          return this.http
            .get(`${this.urlService.logoutUser(token.userId)}`)
            .pipe(
              tap((response) => {
                this.clearData();
                clearTimeout(this.logOutSetTimeout);
              })
            );
        } else {
          return new Observable((subscriber) => {
            subscriber.next(null);
            subscriber.error('there is no token');
          });
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error has occurred';
    if (!error.error || !error.error.message) {
      return throwError(() => errorMessage);
    }
    if (error.error.message.includes('VE006')) {
      errorMessage = 'Cannot create user, email already exist!';
      return throwError(() => errorMessage);
    }
    switch (error.error.message) {
      case 'password is required':
        errorMessage = 'password is required';
        break;
      case 'email is required':
        errorMessage = 'email is required';
        break;
      case 'You need to register to login':
        errorMessage = 'You need to register to login';
        break;
      case 'Incorrect password':
        errorMessage = 'Incorrect password';
        break;
    }
    return throwError(() => errorMessage);
  }
  clearData = () => {
    clearInterval(this.refreshTokenInterval);
    this.isLogged.next(false);
    this.accessToken.next(null);
    this.userService.user.next(null);
    this.refreshTokenData.next(null);
    localStorage.removeItem('at');
    localStorage.removeItem('rt');
    this.router.navigate(['/']);
  };

  newRefreshToken = (resData?: AuthResponseData): RefreshToken | null => {
    if (resData) {
      const refreshToken = new RefreshToken(
        resData.refreshToken,
        new Date(resData.refreshTokenExpiresIn).getTime(),
        resData.user.id
      );
      localStorage.setItem('rt', JSON.stringify(refreshToken));

      return refreshToken;
    } else {
      return null;
    }
  };

  getRefreshTokenLocalStorage = () => {
    const localStorageRefreshTokenData = localStorage.getItem('rt');

    const refreshTokenData: {
      _token: string;
      tokenExpiringDate: number;
      userId: string;
    } | null =
      localStorageRefreshTokenData !== null &&
      typeof localStorageRefreshTokenData === 'string'
        ? JSON.parse(localStorageRefreshTokenData)
        : null;

    const refreshToken =
      refreshTokenData &&
      new RefreshToken(
        refreshTokenData._token,
        Number(refreshTokenData.tokenExpiringDate),
        refreshTokenData.userId
      );
    if (refreshToken && refreshToken.token) {
      return refreshToken;
    } else {
      return null;
    }
  };
}
