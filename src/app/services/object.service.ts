import { Injectable } from '@angular/core';
import { ObjectInfo } from './object-info.service';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface Obj {
  objectIdRetail: string;
  objectIdCompany: string;
  retailer: string;
  objectFormat: string;
  objectName: string;
  city: string;
  address: string;
  kam: User;
  director: User;
  supervisor: User;
  commercialist: User;
  merchandiser: User;
  requisitionDays: string;
  merchandiserRevisionDays: string;
  objectInfo: ObjectInfo;
}

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  // private readonly address = "http://localhost:8083/object/objects";
  private readonly address = "http://localhost:8089/api/objects";

  public getObjects(): Observable<Obj[]> {
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(this.address).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getObjectByObjectName(objectName: string): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.get<Obj>(`${this.address}/objectByObjectName/${objectName}`).subscribe((helper: Obj) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getObjectsByString(str: string): Observable<Obj[]> {
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${this.address}/objectByString/${str}`).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public createObject(object: Obj): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.post<Obj>(this.address, object).subscribe((helper: Obj) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public updateObject(object: Obj): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.put<Obj>(this.address, object).subscribe((helper: Obj) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }
}
