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
  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});
  // private readonly address = "http://localhost:8083/object/objects";
   private readonly address = "http://localhost:8089/api/objects";
  // private readonly excelAddress = "http://localhost:8089/api/objectExcels";
  // private readonly retailerAddress = "http://localhost:8089/api/retailers";

 // private readonly address = "https://microserviceobject.azurewebsites.net/api/objects";
  private readonly excelAddress = "https://microserviceobject.azurewebsites.net/api/objectExcels";
  private readonly retailerAddress = "https://microserviceobject.azurewebsites.net/api/retailers";



  public getObjects(page: number, count: number, address: string, objectName: string, idCompany: string, retailer: string, city: string, format: string): Observable<Obj[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("address", address);
    queryParams = queryParams.append("objectName", objectName);
    queryParams = queryParams.append("idCompany", idCompany);
    queryParams = queryParams.append("retailer", retailer);
    queryParams = queryParams.append("city", city);
    queryParams = queryParams.append("format", format);
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${OBJECT_URL}/objects`, {  headers:this.headers,params: queryParams }).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getRetailers(): Observable<Retailer[]> {
    let retval$ = new Subject<Retailer[]>();
    this.http.get<Retailer[]>(`${OBJECT_URL}/retailers`, {headers:this.headers}).subscribe((ret: Retailer[]) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

  public getObjectByObjectName(objectName: string): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.get<Obj>(`${OBJECT_URL}/objects/objectByObjectName/${objectName}`,{headers:this.headers}).subscribe((helper: Obj) => {
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
    this.http.get<Obj[]>(`${OBJECT_URL}/objects/objectByStringContains/${str}`,{headers:this.headers}).subscribe((objects: Obj[]) => {
      retval$.next(objects);
    });
    return retval$.asObservable();
  }

  public getRetailersByNameContains(str: string): Observable<Retailer[]> {
    let retval$ = new Subject<Retailer[]>();
    this.http.get<Retailer[]>(`${OBJECT_URL}/retailers/retailersByNameContains/${str}`,{headers:this.headers}).subscribe((retailers: Retailer[]) => {
      retval$.next(retailers);
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
    this.http.get<Retailer>(`${OBJECT_URL}/retailers/retailerByRetailerName/${retailer.retailerName}`).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getRetailerByName(name: string): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.get<Retailer>(`${OBJECT_URL}/retailers/retailerByRetailerName/${name}`,{headers:this.headers}).subscribe((retailer: Retailer) => {
      retval$.next(retailer);
    });
    return retval$.asObservable();
  }

  public createObject(object: ObjectCreateDto): Observable<ObjectCreateDto> {
    let retval$ = new Subject<ObjectCreateDto>();
    this.http.post<ObjectCreateDto>(`${OBJECT_URL}/objects`, object,{headers:this.headers}).subscribe((helper: ObjectCreateDto) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.post<Retailer>(`${OBJECT_URL}/retailers`, retailer,{headers:this.headers}).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public excelImport(formData: FormData) {
    this.http.post(`${OBJECT_URL}/objectExcels`, formData,{headers:this.headers}).subscribe((response) => {
      console.log(response);
    });
  }

  public updateObject(object: ObjectCreateDto): Observable<ObjectCreateDto> {
    let retval$ = new Subject<ObjectCreateDto>();
    this.http.put<ObjectCreateDto>(`${OBJECT_URL}/objects`, object,{headers:this.headers}).subscribe((helper: ObjectCreateDto) => {
      retval$.next(helper);
      //dal radi samo objects dve linije iznad?
    });
    return retval$.asObservable();
  }

  public updateRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.put<Retailer>(`${OBJECT_URL}/retailers`, retailer,{headers:this.headers}).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }


  public getObjectByString(string: string): Observable<Obj[]> {
    let retval$ = new Subject<Obj[]>();
    this.http.get<Obj[]>(`${OBJECT_URL}/objects/objectByString/${string}`).subscribe((object: Obj[]) => {
      retval$.next(object)
    });
    return retval$.asObservable();
  }

  public deleteRetailer(retailer: Retailer): Observable<Retailer> {
    let retval$ = new Subject<Retailer>();
    this.http.delete<Retailer>(`${OBJECT_URL}/retailers/${retailer.retailerName}`,{headers:this.headers}).subscribe((helper: Retailer) => {
      retval$.next(helper)
    });
    return retval$.asObservable();
  }

  public deleteObject(object: Obj): Observable<Obj> {
    let retval$ = new Subject<Obj>();
    this.http.delete<Obj>(`${OBJECT_URL}/objects/deleteObjectByObjectName/${object.objectName}`,{headers:this.headers}).subscribe((helper: Obj) => {
      retval$.next(helper)
    });
    return retval$.asObservable();
  }

  public getRetailerPlanogram(retailer: Retailer) {
    return this.http.get(`${OBJECT_URL}/retailers/retailerPlanogram/${retailer.planogramPdf}`, { headers:this.headers,responseType: 'blob' }).subscribe(pdf => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public downloadRetailerPlanogram() {
    return this.http.get(`${OBJECT_URL}/retailers/retailerPlanogram/Objekat1Planogram.pdf`, {headers:this.headers, responseType: 'blob' }).subscribe(pdf => {
      const fileName = 'Planogram.pdf';
      saveAs(pdf, fileName);
    });
  }

  public addPlanogram(form: FormData) {
    this.http.put(`${OBJECT_URL}/retailers/updateRetailerWithPlanogram`, form,{headers:this.headers}).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }

  public createRetailerWithPlanogram(form: FormData) {
    let retval$ = new Subject<Retailer>();
    this.http.post<Retailer>(`${OBJECT_URL}/retailers/createRetailerWithPlanogram`, form,{headers:this.headers}).subscribe((helper: Retailer) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
