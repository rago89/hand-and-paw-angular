import { AuthService } from './../auth.service';
import { ModalService } from './../../../shared/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit, OnDestroy {
  loadRegisterForm: boolean = false;
  myForm: FormGroup | any;
  isFetching: boolean = false;
  successLogin: boolean = false;
  userName: string = '';
  loginErrorMessage: string = '';
  private loginSubscription?: Subscription;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    if (!this.myForm.valid) return;
    this.isFetching = true;
    this.loginSubscription = this.authService
      .loginRequest(this.myForm.value)
      .subscribe({
        next: (response) => {
          this.userName = response.user.name;
        },
        error: (errorMessage) => {
          this.loginErrorMessage = errorMessage;
          setTimeout(() => {
            this.loginErrorMessage = '';
          }, 2000);
        },
        complete: () => {
          this.isFetching = false;
          this.successLogin = true;

          setTimeout(() => {
            this.authService.isLogged.next(true);
            this.modalService.loadLoginModal.next(false);
            this.successLogin = false;
            this.myForm.reset();
          }, 2000);
        },
      });
  }
  onLoadRegisterForm() {
    this.loadRegisterForm = true;
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
