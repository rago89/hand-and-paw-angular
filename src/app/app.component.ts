import { Subscription } from 'rxjs';
import { ModalService } from './components/shared/modal/modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './components/user/forms/auth.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadLoginForm: boolean = false;
  isLoading: boolean = false;
  timerInterval: any;
  private modalSubscription?: Subscription;
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.autoLogin();
    this.authService.autoLogout();
    this.modalSubscription = this.modalService.loadLoginModal.subscribe(
      (value) => {
        this.loadLoginForm = value;
      }
    );

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.isLoading = false;
  }
  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
