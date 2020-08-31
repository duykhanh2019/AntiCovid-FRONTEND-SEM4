import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {PatientModel} from '../Model/patient.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://localhost:8080/api/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<any>(apiUrl).pipe();
  }
}