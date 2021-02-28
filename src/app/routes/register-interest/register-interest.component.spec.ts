import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInterestRoute } from './register-interest.component';

describe('RegisterInterestComponent', () => {
  let component: RegisterInterestRoute;
  let fixture: ComponentFixture<RegisterInterestRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInterestRoute ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInterestRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
