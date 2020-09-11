import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationModel} from '../Model/location.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://52.165.229.168:8080/api/locations';
const apiUrlDelete = 'http://52.165.229.168:8080/api/location/';
const apiUrlAdd = 'http://52.165.229.168:8080/api/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) {}
    getAll(): Observable<LocationModel[]> {
      return this.httpClient.get<LocationModel[]>(apiUrl).pipe();
  }
  Delete(id: number): Observable<any> {
    return this.httpClient.delete(apiUrlDelete + id).pipe();
  }
  public addLocation(objLocation) {
    return this.httpClient.post<any>('http://52.165.229.168:8080/api/location' , objLocation);
  }
}

