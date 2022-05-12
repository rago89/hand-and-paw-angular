import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css'],
})
export class RegisterAnimalComponent implements OnInit {
  constructor(private myForm: FormGroup, private filePath: string) {}

  ngOnInit(): void {}

  imagePreview(e: HTMLInputElement) {
    const file = e.files && e.files[0];

    this.myForm.patchValue({
      img: file,
    });

    this.myForm.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file && file);
  }
}
