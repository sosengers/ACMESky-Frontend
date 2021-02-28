import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOfferForm } from './buy-offer-form.component';

describe('BuyOfferFormComponent', () => {
  let component: BuyOfferForm;
  let fixture: ComponentFixture<BuyOfferForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyOfferForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOfferForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
