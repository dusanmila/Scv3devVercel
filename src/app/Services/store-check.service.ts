import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmailsForSending } from '../models/emailsForSending';
import { StoreCheck } from '../models/storeCheck';
import { STORE_CHECK_URL } from '../app.constants';
import { StoreCheckReceiver } from '../models/storeCheckReceiver';

@Injectable({
  providedIn: 'root'
})
export class StoreCheckService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getUnfinishedStoreCheckByUsername(username: string): Observable<StoreCheck> {
    let retval$ = new Subject<StoreCheck>();
    this.http.get<StoreCheck>(`${STORE_CHECK_URL}/storeChecks/unfinishedStoreCheckByUsername/${username}`, { headers: this.headers }).subscribe((storeCheck: StoreCheck) => {
      retval$.next(storeCheck);
    });
    return retval$.asObservable();
  }

  public createStoreCheck(storeCheck: StoreCheck) {
    let retval$ = new Subject<StoreCheck>();
    this.http.post<StoreCheck>(`${STORE_CHECK_URL}/storeChecks`, storeCheck, { headers: this.headers }).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public finishStoreCheck(username: string, emailsForSending: EmailsForSending) {
    let retval$ = new Subject<StoreCheck>();
    this.http.put<StoreCheck>(`${STORE_CHECK_URL}/storeChecks/finishStoreCheck/${username}`, emailsForSending, { headers: this.headers }).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getStoreCheckReceivers() {
    let retval$ = new Subject<StoreCheckReceiver[]>();
    this.http.get<StoreCheckReceiver[]>(`${STORE_CHECK_URL}/storeCheckReceivers`, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createStoreCheckReceivers(storeCheckReceiver: StoreCheckReceiver) {
    let retval$ = new Subject<StoreCheckReceiver>();
    this.http.post<StoreCheckReceiver>(`${STORE_CHECK_URL}/storeCheckReceivers`, storeCheckReceiver, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public updateStoreCheckReceivers(storeCheckReceiver: StoreCheckReceiver) {
    let retval$ = new Subject<StoreCheckReceiver>();
    this.http.put<StoreCheckReceiver>(`${STORE_CHECK_URL}/storeCheckReceivers`, storeCheckReceiver, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
