import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindShelterComponent } from './find-shelter.component';

describe('FindShelterComponent', () => {
  let component: FindShelterComponent;
  let fixture: ComponentFixture<FindShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindShelterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
