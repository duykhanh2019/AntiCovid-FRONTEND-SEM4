import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationModel} from '../Model/location.model';
import {PatientLocationModel} from '../Model/patient-location.model';
import {PatientModel} from '../Model/patient.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://52.165.229.168:8080/api/locations';
const apiUrlDelete = 'http://52.165.229.168:8080/api/location/';
const apiUrlAdd = 'http://52.165.229.168:8080/api/location';
const apiGetPatient = 'http://52.165.229.168:8080/api/new-patient';
const apiAddPatientToLocation = 'http://52.165.229.168:8080/api/patient-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<LocationModel[]> {
    return this.httpClient.get<LocationModel[]>(apiUrl).pipe();
  }
  getPatientLocation(): Observable<PatientModel[]> {
    return this.httpClient.get<PatientModel[]>(apiGetPatient);
  }
  public addPatientToLocation(objPatient) {

    return this.httpClient.post<any>(apiAddPatientToLocation, objPatient);
  }
  Delete(id: number): Observable<any> {
    return this.httpClient.delete(apiUrlDelete + id).pipe();
  }
  public addLocation(objLocation) {
    return this.httpClient.post<any>('http://52.165.229.168:8080/api/location' , objLocation);
  }
  update(rq: any): Observable<any> {
    return this.httpClient.put('http://52.165.229.168:8080/api/location/' + rq.id, rq).pipe();
  }
  getLocation(id: number): Observable<any> {
    return this.httpClient.get('http://52.165.229.168:8080/api/location/' + id).pipe();
  }
}

