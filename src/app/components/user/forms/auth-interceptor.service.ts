import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.accessToken.pipe(
      take(1),
      exhaustMap((accessToken) => {
        console.log(accessToken);

        if (!accessToken) {
          return next.handle(req);
        } else {
          const modifiedRequest = req.clone({
            headers: new HttpHeaders({
              authorization: `Bearer ${accessToken.token}`,
            }),
          });
          return next.handle(modifiedRequest);
        }
      })
    );
  }
}
