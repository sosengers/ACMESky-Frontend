import {Component, Injectable, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Socket} from 'ngx-socket-io';
import {OffersService} from 'src/api/offers.service';
import {Address} from 'src/model/address';
import {OfferPurchaseData} from 'src/model/offer-purchase-data';
import {Step, StepperProgressBarController} from 'stepper-progress-bar';

export enum TransactionStatus {
    NothingDone,
    WaitingOfferCodeValidity,
    WaitingPayment,
    TicketsArrived,
    SomethingWentWrong
}

@Component({
    selector: 'buy-offer-form',
    templateUrl: './buy-offer-form.component.html',
    styleUrls: ['./buy-offer-form.component.css'],
})
@Injectable()
export class BuyOfferForm implements OnInit {
    formData!: FormGroup;

    firstRequestPerformed = false;
    successfullyPushedOfferData!: boolean;
    joinedQueue!: boolean;
    communicationCode = '';
    webSocketMessage = '';
    webSocketError = false;

    steps: Step[] = new Array<Step>(new Step('Validazione codice offerta'), new Step('Pagamento effettuato'), new Step('Ricezione bliglietti'));
    progressStepper: StepperProgressBarController = new StepperProgressBarController();

    paymentUrl = '';

    TransactionStatus = TransactionStatus;
    status: TransactionStatus = TransactionStatus.NothingDone;

    // tslint:disable-next-line:ban-types
    tickets: any = null;

    constructor(
        private offersService: OffersService,
        private formBuilder: FormBuilder,
        private socket: Socket
    ) {
    }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            city: new FormControl(null, [Validators.required]),
            country: new FormControl(null, [Validators.required]),
            number: new FormControl(null, [Validators.required]),
            street: new FormControl(null, [Validators.required]),
            zip_code: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
            offer_code: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        });
    }

    operationResult(): string {
        if (this.successfullyPushedOfferData) {
            if (!this.joinedQueue) {
                this.socket.emit('join', this.communicationCode);
                this.socket.on('json', (purchase_process_information: string) => {
                    const ppi = JSON.parse(purchase_process_information);
                    console.log(ppi);
                    this.webSocketError = ppi.is_error;
                    if (ppi.flights !== undefined) {
                        // ppi contains the tickets
                        this.status = TransactionStatus.TicketsArrived;
                        this.progressStepper.nextStep();
                        this.tickets = ppi;
                        this.webSocketMessage = 'I bliglietti sono stati acquistati correttamente. Ecco un riepilogo del viaggio.';
                        this.progressStepper.nextStep();
                    } else {
                        if (!ppi.message.startsWith('http://')) {
                            // ppi contains a message
                            this.progressStepper.nextStep();
                            this.webSocketMessage = ppi.message;
                        } else {
                            // ppi contains a URL
                            this.progressStepper.nextStep();
                            this.webSocketMessage = 'Codice offerta valido, cliccare il pulsante per procedere con il pagamento.';
                            this.status = TransactionStatus.WaitingPayment;
                            console.log(`Payment URL: ${ppi.message}`);
                            this.paymentUrl = ppi.message;
                            // window.open(ppi.message);
                        }
                    }
                });

                this.joinedQueue = true;
            }
            // vvv First published message vvv
            return 'Il codice offerta è stato inserimento correttamente.';
        }
        this.status = TransactionStatus.SomethingWentWrong;
        return 'L\'operazione non è andata a buon fine. Riprova.';
    }

    submitOfferData() {
        const offerPurchaseData = {
            address: {
                city: this.formData.value.city,
                country: this.formData.value.country,
                number: this.formData.value.number,
                street: this.formData.value.street,
                zip_code: this.formData.value.zip_code
            } as Address,
            name: this.formData.value.name,
            surname: this.formData.value.surname,
            offer_code: this.formData.value.offer_code
        } as OfferPurchaseData;

        this.status = TransactionStatus.WaitingOfferCodeValidity;

        this.offersService.buyOffer(offerPurchaseData).subscribe(
            (response) => {
                this.communicationCode = (response.body?.communication_code !== null && response.body?.communication_code !== undefined) ? response.body.communication_code : '';
                console.log('BODY:' + response.body);
                this.successfullyPushedOfferData = true;
                this.joinedQueue = false;
                console.log('[SUCCESS] The offer purchase data was successfully inserted into ACMESky. The user is given the Payment Provider URL: ' + this.communicationCode + '.');
            },
            (error) => {
                this.successfullyPushedOfferData = false;
                console.log('[ERROR] The offer purchase data was not correct.');
            }
        );
        this.firstRequestPerformed = true;
    }

    dateToLocale(date: string): string {
        return (new Date(date)).toLocaleString();
    }

    missingRequired(control: AbstractControl): string {
        if (control.hasError('required')) {
            return 'Questo campo deve essere compilato.';
        }

        return '';
    }

    offerCodeError(): string {
        const offer_code = this.formData.controls.offer_code;

        const req = this.missingRequired(offer_code);
        if(req !== '') {
          return req;
        }
    
        return (offer_code.hasError('minLength') || offer_code.hasError('maxLength')) ? 'Il codice dell\'offerta è composto di 11 caratteri alfanumerici.' : '';
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

        const req = this.missingRequired(zip_code);
        if(req !== '') {
          return req;
        }
    
        return zip_code.hasError('pattern') ? 'Il CAP deve essere formato di soli caratteri numerici.' : '';
    }

    countryError(): string {
        const country = this.formData.controls.country;

        return this.missingRequired(country);
    }
}
