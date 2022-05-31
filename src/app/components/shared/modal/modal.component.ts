import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  crossImage: string = '../../../../assets/icons/cross.svg';
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalService.loadContactUsModal.next(false);
    this.modalService.loadLoginModal.next(false);
    this.modalService.loadContactOwner.next(false);
    this.modalService.loadUpdatePassword.next(false);
    this.modalService.loadUpdateEmail.next(false);
  }
}
