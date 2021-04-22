import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Interest} from '../model/interest';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InterestService {

    acmeskyBackendURL: string = environment.acmeskyBackend;

    constructor(private http: HttpClient) {
    }

    registerInterest(interest: Interest) {
        return this.http.post(`${this.acmeskyBackendURL}/interests`, interest, {observe: 'response'});
    }
}
