import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { CustomFormValidation } from 'src/app/form/custom-validators';
import { UserService } from '../../user/user.service';
import { AnimalService } from '../animal.service';
import { Animal } from '../interface/animal';
import { DomSanitizer } from '@angular/platform-browser';
import * as appStore from '../../../store/app.reducer';
import * as AnimalActions from '../store/animal.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css'],
})
export class AnimalFormComponent
  extends CustomFormValidation
  implements OnInit, OnDestroy
{
  userId: string = '';
  newAnimalId?: string;
  successRegistration: boolean = false;
  successUpdate: boolean = false;
  filePath: string = '';
  myForm: UntypedFormGroup | any;
  pictureHex: any;
  isFetching: boolean = false;
  errorMessage: string | null = null;
  private userSubscription?: Subscription;
  private animalSubscription?: Subscription;
  private storeSubscription?: Subscription;

  @Input() formProps: {
    title: string;
    description?: string;
    typeRequest: string;
    animal?: Animal | null;
  } = {
    title: 'no title',
    typeRequest: 'no type',
  };

  constructor(
    private animalService: AnimalService,
    private userService: UserService,
    private _sanitizer: DomSanitizer,
    private store: Store<appStore.AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('animal')
      .subscribe((animalStore) => {
        this.errorMessage = animalStore.error;
        this.isFetching = animalStore.isFetching;
        this.newAnimalId = animalStore.newAnimal?._id;
        this.filePath = '';
        console.log(animalStore);

        this.successRegistration = animalStore.successRegistration;
      });

    this.pictureHex =
      this.formProps.typeRequest === 'put'
        ? this._sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' +
              this.formProps.animal?.pictures[0]?.picture.data
          )
        : '';

    this.userSubscription = this.userService.user.subscribe((user) => {
      this.userId = user ? user.id : '';
    });

    this.myForm = new UntypedFormGroup({
      name: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.name
          : null,
        [Validators.required, Validators.minLength(3)]
      ),
      type: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.type
          : null,
        [Validators.required, Validators.minLength(3)]
      ),
      breed: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.breed
          : null,
        [Validators.required, Validators.minLength(3)]
      ),
      gender: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.gender
          : null,
        [Validators.required]
      ),
      character: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.character
          : null,
        [Validators.required]
      ),
      age: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.age
          : null,
        [Validators.required]
      ),
      location: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.location
          : null,
        [Validators.required]
      ),
      province: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.province
          : 'brussels',
        [Validators.required]
      ),
      phone: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.phone
          : null,
        [Validators.required, this.validPhone()]
      ),
      describeAnimal: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.describeAnimal
          : null,
        [Validators.required, Validators.minLength(100)]
      ),
      webSite: new UntypedFormControl(
        this.formProps.typeRequest === 'put'
          ? this.formProps.animal?.webSite
          : ''
      ),
      picture1:
        this.formProps.typeRequest === 'post'
          ? new UntypedFormControl(null, [Validators.required])
          : new UntypedFormControl(null),
    });
  }

  onFileSelect(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.myForm.get('picture1').setValue(file);
    }
  }

  imagePreview(event: Event) {
    const target: HTMLInputElement | any = event.target;
    const file = target.files[0];
    this.myForm.get('img')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    file && reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.myForm.valid) return;
    this.isFetching = true;
    const formData = new FormData();
    this.formProps.typeRequest === 'put' &&
      formData.append('id', this.formProps.animal?._id || '');
    formData.append('userId', this.userId);
    formData.append('name', this.myForm.get('name').value);
    formData.append('type', this.myForm.get('type').value);
    formData.append('breed', this.myForm.get('breed').value);
    formData.append('gender', this.myForm.get('gender').value);
    formData.append('character', this.myForm.get('character').value);
    formData.append('age', this.myForm.get('age').value);
    formData.append('location', this.myForm.get('location').value);
    formData.append('province', this.myForm.get('province').value);
    formData.append('phone', this.myForm.get('phone').value);
    formData.append('describeAnimal', this.myForm.get('describeAnimal').value);
    formData.append('webSite', this.myForm.get('webSite').value);
    formData.append('picture1', this.myForm.get('picture1').value);

    switch (this.formProps?.typeRequest) {
      case 'post':
        this.store.dispatch(
          AnimalActions.postAnimalStart({ newAnimalData: formData })
        );
        this.myForm.reset();
        break;

      case 'put':
        this.animalSubscription = this.animalService
          .updateAnimal(this.formProps.animal?._id || '', formData)
          .subscribe({
            next: (animal) => {
              this.formProps.animal = animal[0];
            },
            error: (error) => {
              this.errorMessage = 'An error has occurred try again later';
              this.isFetching = false;
            },
            complete: () => {
              this.myForm.reset();
              this.filePath = '';
              this.isFetching = false;
              this.successUpdate = true;
            },
          });
        break;
    }
  }
  onNavigate = () => {
    this.store.dispatch(AnimalActions.leaveModalSuccess());
  };

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.animalSubscription?.unsubscribe();
    this.storeSubscription?.unsubscribe();
  }
}
