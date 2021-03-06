import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccessToken } from '../components/user/forms/access-token.model';
import { RefreshToken } from '../components/user/forms/refresh-token.model';
import { ModalService } from '../components/shared/modal/modal.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isLogged: boolean = false;
  accessToken: AccessToken | null = null;
  refreshToken: RefreshToken | null = null;
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.authService.accessToken.subscribe((token) => {
      this.accessToken = token;
    });
    this.authService.refreshTokenData.subscribe((token) => {
      this.refreshToken = token;
    });
    this.authService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });
    if (this.isLogged && this.accessToken?.token && this.refreshToken?.token) {
      return true;
    } else {
      this.modalService.loadLoginModal.next(true);
      return false;
    }
  }
}
