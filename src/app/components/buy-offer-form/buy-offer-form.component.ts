import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/api/offers.service';
import { Address } from 'src/model/address';
import { OfferPurchaseData } from 'src/model/offer-purchase-data';

@Component({
  selector: 'buy-offer-form',
  templateUrl: './buy-offer-form.component.html',
  styleUrls: ['./buy-offer-form.component.css']
})
export class BuyOfferForm implements OnInit {
  formData!: FormGroup;

  firstRequestPerformed: boolean = false;
  successfullyPushedOfferData!: boolean;
  payOfferUrl: string = "";
  
  constructor(private offersService: OffersService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      zip_code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      offer_code: new FormControl(null, [Validators.required]),
    });
  }

  operationResult(): string {
    if(this.successfullyPushedOfferData) {
      let message = "Il codice offerta inserito è corretto.";
      message += "Clicca <a href=\"" + this.payOfferUrl + "\">qui</a> per andare alla pagina del pagamento."
      return message;
    }
    return "L\'operazione non è andata a buon fine. Riprova.";
  }

  submitOfferData() {
    const offerPurchaseData = <OfferPurchaseData> {
      address: <Address> {
        city: this.formData.value.city,
        country: this.formData.value.country,
        number: this.formData.value.number,
        street: this.formData.value.street,
        zip_code: this.formData.value.zip_code
      },
      name: this.formData.value.name,
      surname: this.formData.value.surname,
      offer_code: this.formData.value.offer_code
    }

    this.offersService.buyOffer(offerPurchaseData).subscribe(
      (response) => {
        this.payOfferUrl = (response.body?.pay_offer_url !== null && response.body?.pay_offer_url !== undefined) ? response.body.pay_offer_url : "";
        this.successfullyPushedOfferData = true;
        console.log("[SUCCESS] The offer purchase data was successfully inserted into ACMESky. The user is given the Payment Provider URL.");
      },
      (error) => {
        this.successfullyPushedOfferData = false;
        console.log("[ERROR] The offer purchase data was not correct.");
      }
    );
    this.firstRequestPerformed = true;
  }

  missingRequired(control: AbstractControl): string {
    if(control.hasError('required')) {
      return "Questo campo deve essere compilato.";
    }

    return '';
  }

  offerCodeError(): string {
    const offer_code = this.formData.controls.offer_code;

    return this.missingRequired(offer_code);
  }

  nameError(): string {
    const name = this.formData.controls.name;

    return this.missingRequired(name);
  }

  surnameError(): string {
    const surname = this.formData.controls.surname;

    return this.missingRequired(surname);
  }

  streetError(): string {
    const street = this.formData.controls.street;

    return this.missingRequired(street);
  }

  numberError(): string {
    const number = this.formData.controls.number;

    return this.missingRequired(number);
  }

  cityError(): string {
    const city = this.formData.controls.city;

    return this.missingRequired(city);
  }

  zipCodeError(): string {
    const zip_code = this.formData.controls.zip_code;

    return this.missingRequired(zip_code);
  }

  countryError(): string {
    const country = this.formData.controls.country;

    return this.missingRequired(country);
  }
}
