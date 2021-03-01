import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interest } from '../model/interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  
  acmeskyBackendURL: string = "http://0.0.0.0:9000"

  constructor(private http: HttpClient) {}

  registerInterest(interest: Interest) {
    return this.http.post(`${this.acmeskyBackendURL}/interests`, interest, {observe: 'response'})
  }
}