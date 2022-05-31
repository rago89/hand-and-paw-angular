import { AuthService } from './../../../user/forms/auth.service';
import { Router } from '@angular/router';
import { ModalService } from './../../../shared/modal/modal.service';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css'],
})
export class HamburgerComponent implements OnInit, OnDestroy {
  @Input() isLogged: boolean = false;
  barIcons = faBars;
  @Output() userLogout = new EventEmitter();
  openMenu: boolean = false;
  heartIcon: string = '/assets/icons/dropdown menu/akar-icons_heart.svg';
  dogIcon: string = '/assets/icons/dropdown menu/ph_dog.svg';
  accountIcon: string =
    '/assets/icons/dropdown menu/dropdownmenu_codicon_account.svg';
  userId: string = '';
  @Input() userAvatar?: SafeResourceUrl;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  openMenuToggle() {
    this.openMenu = !this.openMenu;
  }
  onLoadLoginForm() {
    this.modalService.loadLoginModal.next(true);
  }
  logOutAccount() {
    this.userLogout.emit();
  }
  ngOnDestroy(): void {}
}
