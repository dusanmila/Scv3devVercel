import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { Retailer } from '../models/retailer';
import { Obj, ObjectCreateDto } from '../models/object';
import { OBJECT_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  public getObjects(page: number, count: number, search: string, idCompany: string, retailer: string, city: string, format: string): Observable<Obj[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("search", search);
    queryParams = queryParams.append("idCompany", idCompany);
    queryParams = queryParams.append("retailer", retailer);
    queryParams = queryParams.append("city", city);
    queryParams = queryParams.append("format", format);
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${OBJECT_URL}/objects`, { params: queryParams }).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getRetailers(): Observable<Retailer[]> {
    let retval$ = new Subject<Retailer[]>();
    this.http.get<Retailer[]>(`${OBJECT_URL}/retailers`).subscribe((ret: Retailer[]) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

  public getObjectByObjectName(objectName: string): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.get<Obj>(`${OBJECT_URL}/objects/objectByObjectName/${objectName}`).subscribe((helper: Obj) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getObjectsByString(str: string): Observable<Obj[]> {
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${OBJECT_URL}/objects/objectByString/${str}`).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getObjectsByStringContains(str: string): Observable<Obj[]> {
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${OBJECT_URL}/objects/objectByStringContains/${str}`).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getOneObject(object: Obj): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.get<Obj>(`${OBJECT_URL}/objects/objectByObjectName/${object.objectName}`).subscribe((objects: Obj) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getOneRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.get<Retailer>(`${OBJECT_URL}/retailers/retailerByRetailerName/${retailer.retailerName}`).subscribe((retailer: Retailer) => {
      retval$.next(retailer);
    });
    return retval$.asObservable();
  }

  public getRetailerByName(name: string): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.get<Retailer>(`${OBJECT_URL}/retailers/retailerByRetailerName/${name}`).subscribe((retailer: Retailer) => {
      retval$.next(retailer);
    });
    return retval$.asObservable();
  }

  public createObject(object: ObjectCreateDto): Observable<ObjectCreateDto> {
    let retval$ = new Subject<ObjectCreateDto>();
    this.http.post<ObjectCreateDto>(`${OBJECT_URL}/objects`, object).subscribe((helper: ObjectCreateDto) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.post<Retailer>(`${OBJECT_URL}/retailers`, retailer).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public excelImport(formData: FormData) {
    this.http.post(`${OBJECT_URL}/objectExcels`, formData).subscribe((response) => {
      console.log(response);
    });
  }

  public updateObject(object: Obj): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.put<Obj>(`${OBJECT_URL}/objects`, { objectIdRetail: object.objectIdRetail, retailer: object.retailer.retailerName, objectIdCompany: object.objectIdCompany, objectFormat: object.objectFormat, objectName: object.objectName, city: object.city, address: object.address, kam: object.kam.username, director: object.director.username, supervisor: object.supervisor.username, commercialist: object.commercialist.username, merchandiser: object.merchandiser.username, requisitionDays: object.requisitionDays, merchandiserRevisionDays: object.merchandiserRevisionDays, objectInfo: object.objectInfo }).subscribe((helper: Obj) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public updateRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.put<Retailer>(`${OBJECT_URL}/retailers`, retailer).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }


  public getObjectByString(string: String): Observable<Obj[]> {
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${OBJECT_URL}/objects/objectByString/${string}`).subscribe((object: Obj[]) => {
      retval$.next(object)
    });
    return retval$.asObservable();
  }

  public deleteRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.delete<Retailer>(`${OBJECT_URL}/retailers/${retailer.retailerName}`).subscribe((helper: Retailer) => {
      retval$.next(helper)
    });
    return retval$.asObservable();
  }

  public getRetailerPlanogram(retailer: Retailer) {
    return this.http.get(`${OBJECT_URL}/retailers/retailerPlanogram/${retailer.planogramPdf}`, { responseType: 'blob' }).subscribe(pdf => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public downloadRetailerPlanogram() {
    return this.http.get(`${OBJECT_URL}/retailers/retailerPlanogram/Objekat1Planogram.pdf`, { responseType: 'blob' }).subscribe(pdf => {
      const fileName = 'Planogram.pdf';
      saveAs(pdf, fileName);
    });
  }

  public addPlanogram(form: FormData) {
    this.http.put(`${OBJECT_URL}/retailers/updateRetailerWithPlanogram`, form).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }

  public createRetailerWithPlanogram(form: FormData) {
    let retval$ = new Subject<Retailer>();
    this.http.post<Retailer>(`${OBJECT_URL}/retailers/createRetailerWithPlanogram`, form).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
