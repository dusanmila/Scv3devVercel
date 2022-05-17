import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EmailsForSending } from '../models/emailsForSending';

export interface StoreCheck {
  username: string;
  date: Date;
  finished: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoreCheckService {

  constructor(private http: HttpClient) { }

  private readonly address = "http://localhost:8085/api/storeChecks";

  public getUnfinishedStoreCheckByUsername(username: string) {
    let retval$ = new Subject<StoreCheck>();
    this.http.get<StoreCheck>(`${this.address}/unfinishedStoreCheckByUsername/${username}`).subscribe((storeCheck: StoreCheck) => {
      retval$.next(storeCheck);
    });
    return retval$.asObservable();
  }

  public createStoreCheck(storeCheck: StoreCheck) {
    let retval$ = new Subject<StoreCheck>();
    this.http.post<StoreCheck>(this.address, storeCheck).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    }); 
    return retval$.asObservable();
  }

  public finishStoreCheck(username: string, emailsForSending: EmailsForSending) {
    let retval$ = new Subject<StoreCheck>();
    this.http.put<StoreCheck>(`${this.address}/finishStoreCheck/${username}`, emailsForSending).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
