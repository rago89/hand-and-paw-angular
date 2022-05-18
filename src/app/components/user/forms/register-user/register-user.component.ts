import { ModalService } from './../../../shared/modal/modal.service';
import { UserService } from './../../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { customFormValidation } from 'src/app/form/custom-validators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent
  extends customFormValidation
  implements OnInit
{
  myForm: FormGroup | any;
  successRegistration: boolean = false;
  registrationError: string = '';
  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        this.passwordInputContentValidation(),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        this.matchPasswords('password'),
        this.passwordInputContentValidation(),
        this.passwordInputContentValidation,
      ]),
    });
  }

  onSubmit() {
    console.log(this.myForm);

    this.userService.postUser(this.myForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        this.registrationError = error.error.message;
      },
      complete: () => {
        this.successRegistration = true;
        setTimeout(() => {
          this.successRegistration = false;
          this.modalService.loadModal.next(false);
        }, 2000);
      },
    });
  }
}
