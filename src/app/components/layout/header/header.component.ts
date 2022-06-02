import { ModalService } from './../../shared/modal/modal.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../user/forms/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  openMenu: boolean = false;
  headerFullBrowserWidth: boolean = true;
  openLoginForm: boolean = false;
  heartIcon: string = '/assets/icons/dropdown menu/akar-icons_heart.svg';
  dogIcon: string = '/assets/icons/dropdown menu/ph_dog.svg';
  defaultAvatarImg: string =
    '/assets/icons/dropdown menu/dropdownmenu_codicon_account.svg';
  userAvatar?: SafeResourceUrl;
  userId: string = '1';
  private modalSubscription: Subscription | any;
  private isLoggedSubscription: Subscription | any;
  private userSubscription: Subscription | any;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private authService: AuthService,
    private _sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.onWindowResize();
    this.modalSubscription = this.modalService.loadLoginModal.subscribe(
      (value) => {
        this.openLoginForm = value;
      }
    );
    this.isLoggedSubscription = this.authService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });
    this.userSubscription = this.userService.user.subscribe((user) => {
      this.userId = user ? user.id : '';

      if (user?.avatar?.data) {
        this.userAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + user?.avatar.data
        );
      } else {
        this.userAvatar = undefined;
      }
    });
  }

  logOut() {
    this.authService.logOut().subscribe((response) => {});
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.headerFullBrowserWidth = window.innerWidth > 990;
  }

  openToggle() {
    this.openMenu = !this.openMenu;
  }
  onLoadLoginForm() {
    this.modalService.loadLoginModal.next(true);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.modalSubscription.unsubscribe();
    this.isLoggedSubscription.unsubscribe();
  }
}
