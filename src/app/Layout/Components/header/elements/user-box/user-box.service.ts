import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../../_model/user';
import { Observable, of } from 'rxjs';

const baseUrl = 'http://52.165.229.168:8080/api/user/';
const Url = 'http://52.165.229.168:8080/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserBoxService {
  constructor(private httpClient: HttpClient) {
  }
  updateUser(id: number, objUser): Observable<any> {
    return this.httpClient.put(baseUrl + id, objUser );
  }
}
