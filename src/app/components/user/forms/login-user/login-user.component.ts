import { ModalService } from './../../../shared/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  loadRegisterForm: boolean = false;
  myForm: FormGroup | any;
  isFetching: boolean = false;
  successLogin: boolean = false;
  userName: string = '';
  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    this.isFetching = true;
    console.log(this.myForm.value);

    this.userService.loginRequest(this.myForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.userService.userLogged.next(response.user);
        this.userName = response.user.userName;
      },
      error: (error) => {
        console.log('error--> ', error);
      },
      complete: () => {
        this.isFetching = false;
        this.successLogin = true;

        setTimeout(() => {
          this.userService.isLogged.next(true);
          this.modalService.loadModal.next(false);
          this.successLogin = false;
          this.myForm.reset();
        }, 2000);
      },
    });
  }
  onLoadRegisterForm() {
    this.loadRegisterForm = true;
  }
}
