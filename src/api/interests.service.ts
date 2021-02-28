import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interest } from '../model/interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  
  acmeskyBackendURL: string = "http://0.0.0.0:9000"

  constructor(private http: HttpClient) {}

  postPayment(interest: Interest) {
    return this.http.post(`${this.acmeskyBackendURL}/interests`, interest, {observe: 'response'})
  }
}