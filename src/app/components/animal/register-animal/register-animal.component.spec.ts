import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimalFormComponent } from './../animal-form/animal-form.component';
import { ModalMessageComponent } from './../../shared/modal-message/modal-message.component';
import { ModalComponent } from './../../shared/modal/modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnimalComponent } from './register-animal.component';

describe('RegisterAnimalComponent', () => {
  let component: RegisterAnimalComponent;
  let fixture: ComponentFixture<RegisterAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterAnimalComponent,
        ModalComponent,
        ModalMessageComponent,
        AnimalFormComponent,
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
