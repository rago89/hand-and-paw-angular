import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAnimalComponent } from './favorite-animal.component';

describe('FavoriteAnimalComponent', () => {
  let component: FavoriteAnimalComponent;
  let fixture: ComponentFixture<FavoriteAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
