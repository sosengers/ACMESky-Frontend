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
      max_price: parseFloat(this.formData.value.max_price.replace(",", ".")),
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

  isValidDate(date: string): boolean {
    return !isNaN((new Date(date)).getTime());
  }

  missingRequired(control: AbstractControl): string {
    if(control.hasError('required')) {
      return "Questo campo deve essere compilato.";
    }
    return '';
  }

  departureAirportCodeError(): string {
    const departure_airport_code = this.formData.controls.departure_airport_code;

    const req = this.missingRequired(departure_airport_code);
    if(req !== '') {
      return req;
    }

    return departure_airport_code.hasError('pattern') ? 'Il codice dell\'aeroporto inserito non è corretto.' : '';
  }

  arrivalAirportCodeError(): string {
    const arrival_airport_code = this.formData.controls.arrival_airport_code;

    const req = this.missingRequired(arrival_airport_code);
    if(req !== '') {
      return req;
    }

    if(arrival_airport_code.value == this.formData.controls.departure_airport_code.value) {
      return 'Il codice dell\'aeroporto di arrivo deve essere diverso da quello di partenza.';
    }

    return arrival_airport_code.hasError('pattern') ? 'Il codice dell\'aeroporto inserito non è corretto.' : '';
  }

  minDepartureDateError(): string {
    const min_departure_date = this.formData.controls.min_departure_date;

    const req = this.missingRequired(min_departure_date);

    if(!this.isValidDate(min_departure_date.value)) {
      return 'La data inserita non è valida. Se il tuo browser non supporta l\'inserimento mediante widget, usa il formato mm/gg/aaaa';
    }
    
    return req;
  }

  maxComebackDateError(): string {
    const max_comeback_date = this.formData.controls.max_comeback_date;

    const req = this.missingRequired(max_comeback_date);

    if(!this.isValidDate(max_comeback_date.value)) {
      return 'La data inserita non è valida. Se il tuo browser non supporta l\'inserimento mediante widget, usa il formato mm/gg/aaaa';
    }

    const minDepDate = new Date(this.formData.controls.min_departure_date.value);
    const maxCbDate = new Date(max_comeback_date.value);

    if(minDepDate > maxCbDate) {
      return 'La data di ritorno deve essere successiva a quella di partenza.';
    }
    
    return req;
  }

  maxPriceError(): string {
    const max_price = this.formData.controls.max_price;

    const req = this.missingRequired(max_price);
    if(req !== '') {
      return req;
    }

    return max_price.hasError('pattern') ? 'Il prezzo inserito non è corretto.' : '';
  }

  prontogramUsernameError(): string {
    const prontogram_username = this.formData.controls.prontogram_username;

    const req = this.missingRequired(prontogram_username);
    if(req !== '') {
      return req;
    }

    return prontogram_username.hasError('minLength') ? 'Il nome utente inserito non è nel formato corretto.' : '';
  }
}
