import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InterestService } from 'src/api/interests.service';
import { Interest } from '../../../model/interest';

@Component({
  selector: 'interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.css']
})
export class InterestForm implements OnInit {
  formData!: FormGroup;

  constructor(private interestService: InterestService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      departure_airport_code: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{3,3}")]),
      arrival_airport_code: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{3,3}")]),
      min_departure_date: new FormControl('', [Validators.required]),
      max_comeback_date: new FormControl('', [Validators.required]),
      max_price: new FormControl('', [Validators.required, Validators.pattern("[0-9]+((.|,)[0-9]+)?")]),
      prontogram_username: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  submitInterest() {
    let interest = <Interest> {
      departure_airport_code: this.formData.value.departure_airport_code,
      arrival_airport_code: this.formData.value.arrival_airport_code,
      min_departure_date: this.formData.value.min_departure_date,
      max_comeback_date: this.formData.value.max_comeback_date,
      max_price: this.formData.value.max_price,
      prontogram_username: this.formData.value.prontogram_username
    }

    this.interestService.postPayment(interest).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  missingRequired(control: AbstractControl): string {
    if(control.hasError('required')) {
      return "Questo campo deve essere compilato.";
    }
    return '';
  }

  departureAirportCodeError(): string {
    let departure_airport_code = this.formData.controls.departure_airport_code;

    let req = this.missingRequired(departure_airport_code);
    if(req !== '') {
      return req;
    }

    return departure_airport_code.hasError('departure_airport_code') ? 'Il codice dell\'aeroporto inserito non è corretto.' : '';
  }

  arrivalAirportCodeError(): string {
    let arrival_airport_code = this.formData.controls.arrival_airport_code;

    let req = this.missingRequired(arrival_airport_code);
    if(req !== '') {
      return req;
    }

    return arrival_airport_code.hasError('arrival_airport_code') ? 'Il codice dell\'aeroporto inserito non è corretto.' : '';
  }

  minDepartureDateError(): string {
    let min_departure_date = this.formData.controls.min_departure_date;

    let req = this.missingRequired(min_departure_date);
    if(req !== '') {
      return req;
    }

    return min_departure_date.hasError('min_departure_date') ? 'La minima data di partenza inserita non è corretta.' : '';
  }

  maxComebackDateError(): string {
    let max_comeback_date = this.formData.controls.max_comeback_date;

    let req = this.missingRequired(max_comeback_date);
    if(req !== '') {
      return req;
    }

    return max_comeback_date.hasError('max_comeback_date') ? 'La massima data di ritorno inserita non è corretta.' : '';
  }

  maxPriceError(): string {
    let max_price = this.formData.controls.max_price;

    let req = this.missingRequired(max_price);
    if(req !== '') {
      return req;
    }

    return max_price.hasError('max_price') ? 'Il prezzo inserito non è corretto.' : '';
  }

  prontogramUsernameError(): string {
    let prontogram_username = this.formData.controls.prontogram_username;

    let req = this.missingRequired(prontogram_username);
    if(req !== '') {
      return req;
    }

    return prontogram_username.hasError('prontogram_username') ? 'Il nome utente inserito non è nel formato corretto.' : '';
  }
}
