import { ModalService } from './../../../shared/modal/modal.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';
import { CustomFormValidation } from 'src/app/form/custom-validators';
import { User } from '../../interface/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent
  extends CustomFormValidation
  implements OnInit, OnDestroy
{
  myForm: FormGroup | any;
  error: boolean = false;
  showDayAccessFields: boolean = false;
  loadAccessDays: boolean = false;
  avatarPath: string = '';
  user: User | null = null;
  isFetching: boolean = false;
  userId: string = '';
  loadUpdatePasswordForm: boolean = false;
  loadUpdateEmailForm: boolean = false;
  private userSubscription?: Subscription;
  private updateSubscription?: Subscription;
  private modalPasswordSubscription?: Subscription;
  private modalUpdateSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.modalPasswordSubscription =
      this.modalService.loadUpdatePassword.subscribe((value) => {
        this.loadUpdatePasswordForm = value;
      });
    this.modalUpdateSubscription = this.modalService.loadUpdateEmail.subscribe(
      (value) => {
        this.loadUpdateEmailForm = value;
      }
    );

    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.showDayAccessFields = !!user?.publicAccess;
      }
    });
    this.myForm = new FormGroup({
      name: new FormControl(!this.user?.name ? '' : this.user.name, [
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      phone: new FormControl(!this.user?.phone ? '' : this.user.phone, [
        this.validPhone(),
      ]),
      location: new FormControl(
        !this.user?.location ? '' : this.user.location,
        [Validators.minLength(3), Validators.maxLength(25)]
      ),
      website: new FormControl(
        !this.user?.website ? '' : this.user.website,
        []
      ),
      avatar: new FormControl(!this.user?.avatar ? null : this.user.avatar),
      mondayCheck: new FormControl(
        !this.user?.publicAccess?.monday?.access ? false : true,
        []
      ),
      mondayHours: new FormControl(
        !this.user?.publicAccess?.monday?.access
          ? null
          : this.user.publicAccess.monday.hours,
        []
      ),
      tuesdayCheck: new FormControl(
        !this.user?.publicAccess?.tuesday?.access ? false : true,
        []
      ),
      tuesdayHours: new FormControl(
        !this.user?.publicAccess?.tuesday?.access
          ? null
          : this.user.publicAccess.tuesday.hours,
        []
      ),
      wednesdayCheck: new FormControl(
        !this.user?.publicAccess?.wednesday?.access ? false : true,
        []
      ),
      wednesdayHours: new FormControl(
        !this.user?.publicAccess?.wednesday?.access
          ? null
          : this.user.publicAccess.wednesday.hours,
        []
      ),
      thursdayCheck: new FormControl(
        !this.user?.publicAccess?.thursday?.access ? false : true,
        []
      ),
      thursdayHours: new FormControl(
        !this.user?.publicAccess?.thursday?.access
          ? null
          : this.user.publicAccess.thursday.hours,
        []
      ),
      fridayCheck: new FormControl(
        !this.user?.publicAccess?.friday?.access ? false : true,
        []
      ),
      fridayHours: new FormControl(
        !this.user?.publicAccess?.friday?.access
          ? null
          : this.user.publicAccess.friday.hours,
        []
      ),
      saturdayCheck: new FormControl(
        !this.user?.publicAccess?.saturday?.access ? false : true,
        []
      ),
      saturdayHours: new FormControl(
        !this.user?.publicAccess?.saturday?.access
          ? null
          : this.user.publicAccess.saturday.hours,
        []
      ),
      sundayCheck: new FormControl(
        !this.user?.publicAccess?.sunday?.access ? false : true,
        []
      ),
      sundayHours: new FormControl(
        !this.user?.publicAccess?.sunday?.access
          ? null
          : this.user.publicAccess.sunday.hours,
        []
      ),
    });
  }
  onSubmit() {
    this.isFetching = true;
    const formData: FormData = new FormData();
    formData.append('id', this.userId);
    formData.append('name', this.myForm.get('name').value);
    formData.append('phone', this.myForm.get('phone').value);
    formData.append('website', this.myForm.get('website').value);
    formData.append('avatar', this.myForm.get('avatar').value);
    formData.append('location', this.myForm.get('location').value);
    formData.append('monday-access', this.myForm.get('mondayCheck').value);
    formData.append('monday-hours', this.myForm.get('mondayHours').value);
    formData.append('tuesday-access', this.myForm.get('tuesdayCheck').value);
    formData.append('tuesday-hours', this.myForm.get('tuesdayHours').value);
    formData.append(
      'wednesday-access',
      this.myForm.get('wednesdayCheck').value
    );
    formData.append('wednesday-hours', this.myForm.get('wednesdayHours').value);
    formData.append('thursday-access', this.myForm.get('thursdayCheck').value);
    formData.append('thursday-hours', this.myForm.get('thursdayHours').value);
    formData.append('friday-access', this.myForm.get('fridayCheck').value);
    formData.append('friday-hours', this.myForm.get('fridayHours').value);
    formData.append('saturday-access', this.myForm.get('saturdayCheck').value);
    formData.append('saturday-hours', this.myForm.get('saturdayHours').value);
    formData.append('sunday-access', this.myForm.get('sundayCheck').value);
    formData.append('sunday-hours', this.myForm.get('sundayHours').value);

    if (this.userId) {
      this.updateSubscription = this.userService
        .updateUser(formData, this.userId)
        .subscribe({
          next: (user) => {
            this.userService.user.next(user);
          },
          error: (error) => {
            this.isFetching = false;
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 2000);
          },
          complete: () => {
            this.isFetching = false;
          },
        });
    }
  }
  onLoadUpdatePasswordForm(event: Event) {
    event.preventDefault();
    this.modalService.loadUpdatePassword.next(true);
  }
  onLoadUpdateEmailForm(event: Event) {
    event.preventDefault();
    this.modalService.loadUpdateEmail.next(true);
  }
  onFileSelect(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.myForm.get('avatar').setValue(file);
    }
  }
  imagePreview(event: Event) {
    const target: HTMLInputElement | any = event.target;
    const file = target.files[0];
    this.myForm.get('img')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPath = reader.result as string;
    };
    file && reader.readAsDataURL(file);
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.modalPasswordSubscription?.unsubscribe();
    this.modalUpdateSubscription?.unsubscribe();
  }
}
