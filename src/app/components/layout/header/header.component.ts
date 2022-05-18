import { ModalService } from './../../shared/modal/modal.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  openMenu: boolean = false;
  headerFullBrowserWidth: boolean = true;
  openLoginForm: boolean = false;
  heartIcon: string = '/assets/icons/dropdown menu/akar-icons_heart.svg';
  dogIcon: string = '/assets/icons/dropdown menu/ph_dog.svg';
  avatarHex?: string;
  defaultAvatarImg: string =
    '/assets/icons/dropdown menu/dropdownmenu_codicon_account.svg';
  userAvatar: string = '';

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.onWindowResize();
    this.modalService.loadModal.subscribe((value) => {
      this.openLoginForm = value;
    });
    this.userService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });
    this.userService.userLogged.subscribe((user) => {
      this.userAvatar = user.userAvatar;
    });
  }

  logOut() {
    this.userService.logOutRequest().subscribe({
      next: (response) => {
        console.log(response);
        this.userService.isLogged.next(false);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.headerFullBrowserWidth = window.innerWidth > 990;
  }

  openToggle() {
    this.openMenu = !this.openMenu;
  }
  onLoadLoginForm() {
    this.modalService.loadModal.next(true);
  }
}
