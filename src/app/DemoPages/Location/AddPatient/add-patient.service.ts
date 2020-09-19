import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://52.165.229.168:8080/api/patients';
const apiUrlDelete = 'http://52.165.229.168:8080/api/patient/';
const apiUrlPatient = 'http://52.165.229.168:8080/api/patient/';
const apiPatientToLocation = 'http://52.165.229.168:8080/api/patient-location';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {
  constructor(private httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<any>(apiUrl).pipe();
  }

  public addPatientToLocation(objPatient) {

    return this.httpClient.post<any>(apiPatientToLocation, objPatient);
  }

  Delete(id: number): Observable<any> {
    return this.httpClient.delete(apiUrlDelete + id).pipe();
  }
  getPatient(id: number): Observable<any> {
    return this.httpClient.get(apiUrlPatient + id).pipe();
  }
}
