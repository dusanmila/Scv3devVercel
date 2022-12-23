import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { STORE_CHECK_URL } from '../app.constants';
import { StoreCheckReceiver } from '../models/storeCheckReceiver';

@Injectable({
  providedIn: 'root'
})
export class StoreCheckReceiverService {

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  constructor(private http: HttpClient) { }

  getStoreCheckReceivers(): Observable<StoreCheckReceiver[]> {
    let retval$ = new Subject<StoreCheckReceiver[]>();
    this.http.get<StoreCheckReceiver[]>(`${STORE_CHECK_URL}/storeCheckReceivers`, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  createStoreCheckReceiver(storeCheckReceiver: StoreCheckReceiver): Observable<StoreCheckReceiver> {
    let retval$ = new Subject<StoreCheckReceiver>();
    this.http.post<StoreCheckReceiver>(`${STORE_CHECK_URL}/storeCheckReceivers`, storeCheckReceiver, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  updateStoreCheckReceiver(storeCheckReceiver: StoreCheckReceiver): Observable<StoreCheckReceiver> {
    let retval$ = new Subject<StoreCheckReceiver>();
    this.http.put<StoreCheckReceiver>(`${STORE_CHECK_URL}/storeCheckReceivers`, storeCheckReceiver, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  deleteStoreCheckReceiver(name: string): Observable<any> {
    return this.http.delete<any>(`${STORE_CHECK_URL}/storeCheckReceivers/deleteByName/${name}`, { headers: this.headers });
  }
}
