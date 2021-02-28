import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOfferRoute } from './buy-offer.component';

describe('BuyOfferRoute', () => {
  let component: BuyOfferRoute;
  let fixture: ComponentFixture<BuyOfferRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyOfferRoute ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOfferRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
