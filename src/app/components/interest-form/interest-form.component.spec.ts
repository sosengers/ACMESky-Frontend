import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestForm } from './interest-form.component';

describe('InterestFormComponent', () => {
  let component: InterestForm;
  let fixture: ComponentFixture<InterestForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
