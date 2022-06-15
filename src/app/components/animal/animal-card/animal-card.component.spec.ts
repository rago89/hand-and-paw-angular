import { PascalCasePipe } from './../../../pipes/pascal-case.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnimalCardComponent } from './animal-card.component';

describe('AnimalCardComponent', () => {
  let component: AnimalCardComponent;
  let fixture: ComponentFixture<AnimalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AnimalCardComponent, PascalCasePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
