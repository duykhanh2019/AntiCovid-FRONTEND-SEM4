import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const getApiChart = 'http://52.165.229.168:8080/api/user-chart/';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<any>(getApiChart).pipe();
  }
}
