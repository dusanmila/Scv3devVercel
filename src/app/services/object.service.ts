import { Injectable } from '@angular/core';
import { ObjectInfo } from './object-info.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Obj{
  objectIdRetail: string;
  objectIdCompany: string;
  objectFormat: string;
  objectName: string;
  city: string;
  address: string;
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
    console.log('bbb');
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(this.address).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }
}
