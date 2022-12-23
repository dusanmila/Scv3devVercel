import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { STORE_CHECK_URL } from '../app.constants';
import { StoreCheckReceiver } from '../models/storeCheckReceiver';

@Injectable({
  providedIn: 'root'
})
export class StoreCheckReceiverService {

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  constructor(private http: HttpClient) { }

  getStoreCheckReceivers() {
    let retval$ = new Subject<StoreCheckReceiver[]>();
    this.http.get<StoreCheckReceiver[]>(`${STORE_CHECK_URL}/storeCheckReceivers`, { headers: this.headers }).subscribe((helper) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
}
