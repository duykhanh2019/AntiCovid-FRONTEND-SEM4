import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../_model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginBoxedService {
  public token: string;
  public headers;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private httpClient: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      accesstoken: ''
    });
  }
  login(email: string, password: string) {
    let params = new HttpParams();
    params = params.set('email', email);
    params = params.set('password', password);
    localStorage.getItem('currentUser');
    return this.httpClient.post<any>(`http://52.165.229.168:8080/api/loginweb`, params, { headers: this.headers})
          .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
