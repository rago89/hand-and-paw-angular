import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  loadLoginModal = new Subject<boolean>();
  loadContactUsModal = new Subject<boolean>();
  loadContactOwner = new Subject<boolean>();
  loadUpdatePassword = new Subject<boolean>();
  loadUpdateEmail = new Subject<boolean>();

  constructor() {}
}
