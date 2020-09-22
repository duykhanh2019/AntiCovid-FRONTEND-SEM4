import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {PatientModel} from '../Model/patient.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://52.165.229.168:8080/api/patients';
const apiUrlDelete = 'http://52.165.229.168:8080/api/patient/';
const apiAddPatient = 'http://52.165.229.168:8080/api/patient';
const getApiPatientDetail = 'http://52.165.229.168:8080/api/patient/';
const getApiUpdatePatient = 'http://52.165.229.168:8080/api/patient/';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<any>(apiUrl).pipe();
  }

  public addPatient(objPatient) {

    return this.httpClient.post<any>(apiAddPatient, objPatient);
  }

  update(rq: any): Observable<any> {
    return this.httpClient.put(getApiUpdatePatient + rq.id, rq).pipe();
  }
  Delete(id: number): Observable<any> {
    return this.httpClient.delete(apiUrlDelete + id).pipe();
  }
  getPatient(id: number): Observable<any> {
    return this.httpClient.get(getApiPatientDetail + id).pipe();
  }
}
