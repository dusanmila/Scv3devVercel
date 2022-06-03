import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ObjectStoreCheck, ObjectStoreCheckCreateDto } from '../models/objectStoreCheck';
import { StoreCheck } from '../models/storeCheck';

@Injectable({
  providedIn: 'root'
})
export class ObjectStoreCheckService {

  constructor(private http: HttpClient) { }

  private readonly address = "http://localhost:8085/api/objectStoreChecks";

  public createObjectStoreCheck(osc: ObjectStoreCheckCreateDto) {
    let retval$ = new Subject<ObjectStoreCheck>();
    // this.http.post<ObjectStoreCheck>('http://localhost:8085/api/objectStoreChecks', osc).subscribe((helper: ObjectStoreCheck) => {
    this.http.post<ObjectStoreCheck>('https://microservicestorecheck.azurewebsites.net/api/objectStoreChecks', osc).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public finishObjectStoreCheck(username: string) {
    let retval$ = new Subject<StoreCheck>();
     this.http.put<StoreCheck>(`http://localhost:8085/api/objectStoreChecks/ObjectStoreCheckPdfByUsername/${username}`, {}).subscribe((helper: StoreCheck) => {
  //  this.http.put<StoreCheck>(`https://microservicestorecheck.azurewebsites.net/api/objectStoreChecks/ObjectStoreCheckPdfByUsername/${username}`, {}).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public deleteUnfinishedObjectStoreCheck(username: string) {
    let retval$ = new Subject<ObjectStoreCheck>();
     this.http.delete<ObjectStoreCheck>(`http://localhost:8085/api/objectStoreChecks/deleteUnfinishedObjectStoreCheck/${username}`).subscribe((helper: ObjectStoreCheck) => {
   // this.http.delete<ObjectStoreCheck>(`https://microservicestorecheck.azurewebsites.net/api/objectStoreChecks/deleteUnfinishedObjectStoreCheck/${username}`).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
}
