import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaNutriComponent } from './alerta-nutri.component';

describe('AlertaNutriComponent', () => {
  let component: AlertaNutriComponent;
  let fixture: ComponentFixture<AlertaNutriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaNutriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaNutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
