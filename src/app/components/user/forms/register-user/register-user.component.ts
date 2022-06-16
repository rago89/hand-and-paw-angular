import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomFormValidation } from 'src/app/form/custom-validators';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent
  extends CustomFormValidation
  implements OnInit
{
  myForm: FormGroup | any;
  successRegistration: boolean = false;
  @Output() loadRegisterForm = new EventEmitter<boolean>();
  registrationError: string = '';
  constructor(private userService: UserService) {
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
        this.matchInputs('password'),
        this.passwordInputContentValidation(),
        this.passwordInputContentValidation,
      ]),
    });
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    this.userService.postUser(this.myForm.value).subscribe({
      next: (response) => {},
      error: (errorMessage) => {
        this.registrationError = errorMessage;
      },
      complete: () => {
        this.successRegistration = true;
        setTimeout(() => {
          this.successRegistration = false;
          this.loadRegisterForm.emit(false);
        }, 2000);
      },
    });
  }

  onLoadLoginForm() {
    this.loadRegisterForm.emit(false);
  }
}
