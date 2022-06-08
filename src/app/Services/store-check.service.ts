import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EmailsForSending } from '../models/emailsForSending';
import { StoreCheck } from '../models/storeCheck';
import { STORE_CHECK_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class StoreCheckService {

  constructor(private http: HttpClient) { }

  public getUnfinishedStoreCheckByUsername(username: string) {
    let retval$ = new Subject<StoreCheck>();
    this.http.get<StoreCheck>(`${STORE_CHECK_URL}/storeChecks/unfinishedStoreCheckByUsername/${username}`).subscribe((storeCheck: StoreCheck) => {
      retval$.next(storeCheck);
    });
    return retval$.asObservable();
  }

  public createStoreCheck(storeCheck: StoreCheck) {
    let retval$ = new Subject<StoreCheck>();
    this.http.post<StoreCheck>(`${STORE_CHECK_URL}/storeChecks`, storeCheck).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public finishStoreCheck(username: string, emailsForSending: EmailsForSending) {
    let retval$ = new Subject<StoreCheck>();
    this.http.put<StoreCheck>(`${STORE_CHECK_URL}/storeChecks/finishStoreCheck/${username}`, emailsForSending).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
