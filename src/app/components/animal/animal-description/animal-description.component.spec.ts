import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnimalDescriptionComponent } from './animal-description.component';

describe('AnimalDescriptionComponent', () => {
  let component: AnimalDescriptionComponent;
  let fixture: ComponentFixture<AnimalDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AnimalDescriptionComponent, ContactFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
