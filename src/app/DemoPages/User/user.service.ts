import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {User} from '../Model/user.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://52.165.229.168:8080/api/users';
const apiDelete = 'http://52.165.229.168:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl).pipe();
  }
  Delete(id: number): Observable<any> {
    return this.httpClient.delete(apiDelete + id).pipe();
  }
}
