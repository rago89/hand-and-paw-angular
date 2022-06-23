import { Subscription } from 'rxjs';
import { ModalService } from './../../../shared/modal/modal.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomFormValidation } from 'src/app/form/custom-validators';
import { UserService } from '../../user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent
  extends CustomFormValidation
  implements OnInit, OnDestroy
{
  myForm: UntypedFormGroup | any;
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
    this.modalSubscription = this.modalService.loadLoginModal.subscribe(
      (value) => {
        this.loadLoginForm = value;
      }
    );
    this.myForm = new UntypedFormGroup({
      currentPassword: new UntypedFormControl(null, [Validators.required]),
      newPassword: new UntypedFormControl(null, [
        Validators.required,
        this.passwordInputContentValidation(),
      ]),
      repeatPassword: new UntypedFormControl(null, [
        Validators.required,
        this.matchInputs('newPassword'),
        this.passwordInputContentValidation(),
        this.passwordInputContentValidation,
      ]),
    });
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    const formData = new FormData();
    formData.append('id', this.userId);
    formData.append('oldPassword', this.myForm.get('currentPassword').value);
    formData.append('newPassword', this.myForm.get('repeatPassword').value);

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
