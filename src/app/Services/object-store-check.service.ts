import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ObjectStoreCheck, ObjectStoreCheckCreateDto } from '../models/objectStoreCheck';
import { StoreCheck } from '../models/storeCheck';
import { STORE_CHECK_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ObjectStoreCheckService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});

  public getUnfinishedObjectStoreCheckByUsername(username: string): Observable<ObjectStoreCheck> {
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.get<ObjectStoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks/unfinishedObjectStoreCheckByUsername/${username}`, {headers:this.headers}).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
  
  public createObjectStoreCheck(osc: ObjectStoreCheckCreateDto) {
    console.log(this.headers)
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.post<ObjectStoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks`, osc,{headers:this.headers}).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public finishObjectStoreCheck(username: string) {
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.put<ObjectStoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks/ObjectStoreCheckPdfByUsername/${username}`, {},{headers:this.headers}).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public deleteUnfinishedObjectStoreCheck(username: string) {
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.delete<ObjectStoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks/deleteUnfinishedObjectStoreCheck/${username}`,{headers:this.headers}).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
}
