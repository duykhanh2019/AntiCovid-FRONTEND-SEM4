import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {User} from '../../../Model/user.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://localhost:8080/users';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl).pipe();
  }
}
