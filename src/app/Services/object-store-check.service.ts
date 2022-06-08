import { HttpClient } from '@angular/common/http';
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

  public createObjectStoreCheck(osc: ObjectStoreCheckCreateDto) {
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.post<ObjectStoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks`, osc).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public finishObjectStoreCheck(username: string) {
    let retval$ = new Subject<StoreCheck>();
    this.http.put<StoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks/ObjectStoreCheckPdfByUsername/${username}`, {}).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public deleteUnfinishedObjectStoreCheck(username: string) {
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.delete<ObjectStoreCheck>(`${STORE_CHECK_URL}/objectStoreChecks/deleteUnfinishedObjectStoreCheck/${username}`).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
}
