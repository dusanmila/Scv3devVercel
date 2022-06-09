import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});
  
  public getUnfinishedStoreCheckByUsername(username: string) {
    let retval$ = new Subject<StoreCheck>();
    this.http.get<StoreCheck>(`${STORE_CHECK_URL}/storeChecks/unfinishedStoreCheckByUsername/${username}`,{headers:this.headers}).subscribe((storeCheck: StoreCheck) => {
      retval$.next(storeCheck);
    });
    return retval$.asObservable();
  }

  public createStoreCheck(storeCheck: StoreCheck) {
    let retval$ = new Subject<StoreCheck>();
    this.http.post<StoreCheck>(`${STORE_CHECK_URL}/storeChecks`, storeCheck,{headers:this.headers}).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public finishStoreCheck(username: string, emailsForSending: EmailsForSending) {
    let retval$ = new Subject<StoreCheck>();
    this.http.put<StoreCheck>(`${STORE_CHECK_URL}/storeChecks/finishStoreCheck/${username}`, emailsForSending,{headers:this.headers}).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
