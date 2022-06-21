import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/components/shared/modal/modal.service';
import { CustomFormValidation } from 'src/app/form/custom-validators';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css'],
})
export class UpdateEmailComponent
  extends CustomFormValidation
  implements OnInit, OnDestroy
{
  myForm: FormGroup | any;
  @Input() userId: string = '';
  successRegistration: boolean = false;
  loadLoginForm: boolean = false;
  registrationError: string = '';
  private modalSubscription?: Subscription;
  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      currentEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      newEmail: new FormControl(null, [Validators.required, Validators.email]),
      repeatEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
        this.matchInputs('newEmail'),
      ]),
    });
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    const formData = new FormData();
    formData.append('id', this.userId);
    formData.append('email', this.myForm.get('currentEmail').value);
    formData.append('repeatEmail', this.myForm.get('repeatEmail').value);

    this.userService.updateUser(formData, this.userId).subscribe({
      next: (response) => {},
      error: (errorMessage) => {
        this.registrationError = errorMessage;
        setTimeout(() => {
          this.registrationError = '';
        }, 2000);
      },
      complete: () => {
        this.authService
          .logOut()
          .subscribe({ next: (res) => {}, error: (error) => {} });
        this.successRegistration = true;
        setTimeout(() => {
          this.successRegistration = false;
          this.modalService.loadLoginModal.next(true);
        }, 2000);
      },
    });
  }
  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
