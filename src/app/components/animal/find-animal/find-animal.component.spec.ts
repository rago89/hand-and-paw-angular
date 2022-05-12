import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnimalComponent } from './find-animal.component';

describe('FindAnimalComponent', () => {
  let component: FindAnimalComponent;
  let fixture: ComponentFixture<FindAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
