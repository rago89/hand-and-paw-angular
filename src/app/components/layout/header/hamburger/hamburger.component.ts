import { ModalService } from './../../../shared/modal/modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/components/user/user.service';
@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css'],
})
export class HamburgerComponent implements OnInit {
  isLogged: boolean = false;
  barIcons = faBars;
  openLoginForm: boolean = false;
  openMenu: boolean = false;
  heartIcon: string = '/assets/icons/dropdown menu/akar-icons_heart.svg';
  dogIcon: string = '/assets/icons/dropdown menu/ph_dog.svg';
  accountIcon: string =
    '/assets/icons/dropdown menu/dropdownmenu_codicon_account.svg';
  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.modalService.loadModal.subscribe((value) => {
      this.openLoginForm = value;
    });
    this.userService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });
  }
  openMenuToggle() {
    this.openMenu = !this.openMenu;
  }
  onLoadLoginForm() {
    this.modalService.loadModal.next(true);
  }
}
