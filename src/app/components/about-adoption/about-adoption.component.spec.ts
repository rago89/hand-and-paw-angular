import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAdoptionComponent } from './about-adoption.component';

describe('AboutAdoptionComponent', () => {
  let component: AboutAdoptionComponent;
  let fixture: ComponentFixture<AboutAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAdoptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
