import { Subscription } from 'rxjs';
import { ModalService } from './components/shared/modal/modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './components/user/forms/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadLoginForm: boolean = false;
  windowLoads: boolean = false;

  timerInterval: any;
  private modalSubscription?: Subscription;
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.windowLoads = true;
    this.authService.autoLogin();
    this.authService.autoLogout();
    this.modalSubscription = this.modalService.loadLoginModal.subscribe(
      (value) => {
        this.loadLoginForm = value;
      }
    );
    window.addEventListener('load', (event) => {
      this.windowLoads = false;
    });
  }
  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
