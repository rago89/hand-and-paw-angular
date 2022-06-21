import { ModalService } from './../../../shared/modal/modal.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css'],
})
export class HamburgerComponent {
  @Input() isLogged: boolean = false;
  barIcons = faBars;
  @Output() userLogout = new EventEmitter();
  openMenu: boolean = false;
  heartIcon: string = '/assets/icons/dropdown menu/akar-icons_heart.svg';
  dogIcon: string = '/assets/icons/dropdown menu/ph_dog.svg';
  accountIcon: string =
    '/assets/icons/dropdown menu/dropdownmenu_codicon_account.svg';
  @Input() userId: string = '';
  @Input() userAvatar?: SafeResourceUrl;

  constructor(private modalService: ModalService) {}

  openMenuToggle() {
    this.openMenu = !this.openMenu;
  }
  onLoadLoginForm(checkboxToggle: HTMLInputElement) {
    checkboxToggle.checked = false;
    this.modalService.loadLoginModal.next(true);
  }
  logOutAccount(checkboxToggle: HTMLInputElement) {
    checkboxToggle.checked = false;
    this.userLogout.emit();
  }

  closeToggle(element: HTMLInputElement) {
    element.checked = false;
  }
}
