import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Obj } from './object.service';
import { StoreCheck } from './store-check.service';

export interface ObjectStoreCheck {
  storeCheck: StoreCheck;
  object: Obj;
  pdf: string;
  username: string;
 }
 
 export interface ObjectStoreCheckCreateDto {
   objectIdRetail: string;
   username: string;
   pdf: string;
 }

@Injectable({
  providedIn: 'root'
})
export class ObjectStoreCheckService {

  constructor(private http: HttpClient) { }

  private readonly address = "http://localhost:8085/api/objectStoreChecks";

  public createObjectStoreCheck(osc: ObjectStoreCheckCreateDto) {
    let retval$ = new Subject<ObjectStoreCheck>();
    this.http.post<ObjectStoreCheck>(this.address, osc).subscribe((helper: ObjectStoreCheck) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
}
