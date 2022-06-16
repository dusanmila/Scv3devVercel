import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AUTH_URL } from '../app.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    let retval$ = new Subject<any>();
    this.http.post<any>(`${AUTH_URL}/auths/login`, {username: username, password: password}).subscribe({
      next: data => {
        retval$.next(data);
      },
      error: e => {
        retval$.error(e);
      }
    });
    return retval$.asObservable();
  }
}
