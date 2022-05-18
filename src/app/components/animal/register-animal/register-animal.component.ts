import { UserService } from 'src/app/components/user/user.service';
import { customFormValidation } from './../../../form/custom-validators';
import { AnimalService } from './../animal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css'],
})
export class RegisterAnimalComponent
  extends customFormValidation
  implements OnInit
{
  userId: string = '';

  filePath: string = '';
  myForm: FormGroup | any;
  isFetching: boolean = false;
  constructor(
    private animalService: AnimalService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.userLogged.subscribe((user) => {
      this.userId = user.userId;
    });
    this.myForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      type: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      breed: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      gender: new FormControl(null, [Validators.required]),
      character: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      province: new FormControl('brussels', [Validators.required]),
      phone: new FormControl(null, [Validators.required, this.validPhone()]),
      describeAnimal: new FormControl(null, [
        Validators.required,
        Validators.minLength(100),
      ]),
      webSite: new FormControl(null, this.validUrl()),
      picture1: new FormControl([null]),
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
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
    console.log(this.filePath);
  }

  onSubmit() {
    this.isFetching = true;
    const formData = new FormData();

    formData.append('userId', this.userId);
    formData.append('name', this.myForm.get('name').value);
    formData.append('type', this.myForm.get('type').value);
    formData.append('breed', this.myForm.get('breed').value);
    formData.append('gender', this.myForm.get('gender').value);
    formData.append('character', this.myForm.get('character').value);
    formData.append('age', this.myForm.get('age').value);
    formData.append('location', this.myForm.get('location').value);
    formData.append('phone', this.myForm.get('phone').value);
    formData.append('describeAnimal', this.myForm.get('describeAnimal').value);
    formData.append('webSite', this.myForm.get('webSite').value);
    formData.append('picture1', this.myForm.get('picture1').value);
    this.animalService.postAnimal(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.isFetching = false;
      },
      error: (error) => {
        this.isFetching = false;
        console.log(error);
      },
      complete: () => {
        this.myForm.reset();
      },
    });
  }
}
