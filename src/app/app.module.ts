import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppRoot } from './app.component';
import { InterestForm } from './components/interest-form/interest-form.component';
import { BuyOfferRoute } from './routes/buy-offer/buy-offer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Navbar } from './navbar/navbar.component';
import { RegisterInterestRoute } from './routes/register-interest/register-interest.component';
import { BuyOfferForm } from './components/buy-offer-form/buy-offer-form.component';
import { HomeRoute } from './routes/home/home.component';

@NgModule({
  declarations: [
    AppRoot,
    HomeRoute,
    RegisterInterestRoute,
    BuyOfferRoute,
    Navbar,
    InterestForm,
    BuyOfferForm,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }
