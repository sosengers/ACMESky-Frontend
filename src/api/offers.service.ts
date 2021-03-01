import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { OfferPurchaseData } from '../model/offer-purchase-data';
import { Observable } from 'rxjs';
import { BuyOfferResponse } from 'src/model/buy-offer-response';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  
  acmeskyBackendURL: string = "http://0.0.0.0:9000"

  constructor(private http: HttpClient) {}

  buyOffer(offerPurchaseData: OfferPurchaseData): Observable<HttpResponse<BuyOfferResponse>> {
    return this.http.post<BuyOfferResponse>(`${this.acmeskyBackendURL}/offers/buy`, offerPurchaseData, {observe: 'response'});
  }
}