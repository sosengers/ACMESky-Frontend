import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppRoot} from './app.component';
import {InterestForm} from './components/interest-form/interest-form.component';
import {BuyOfferRoute} from './routes/buy-offer/buy-offer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Navbar} from './navbar/navbar.component';
import {RegisterInterestRoute} from './routes/register-interest/register-interest.component';
import {BuyOfferForm} from './components/buy-offer-form/buy-offer-form.component';
import {HomeRoute} from './routes/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {StepperProgressBarModule} from 'stepper-progress-bar';
import { environment } from '../environments/environment';
import { CountryPickerModule } from 'ngx-country-picker';
import { NgSelectModule } from '@ng-select/ng-select';

const socketIoConfig: SocketIoConfig = {
  url: environment.acmeskyMiddleware,
  options: {}
};


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
        ReactiveFormsModule,
        SocketIoModule.forRoot(socketIoConfig),
        StepperProgressBarModule,
        BrowserAnimationsModule,
        CountryPickerModule.forRoot(),
        NgSelectModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppRoot],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
