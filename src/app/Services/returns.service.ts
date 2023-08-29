import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { RETURN_URL } from '../app.constants';
import { Return } from '../models/returns';
import { ReturnTypes } from '../models/returnType';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  getReturns(count: number, page: number, search: string): Observable<Return[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("search", search);
    let retval$ = new Subject<Return[]>();
    this.http.get<Return[]>(`${RETURN_URL}/returns`, { headers: this.headers, params: queryParams }).subscribe((returns: Return[]) => {
      retval$.next(returns);
    });
    return retval$.asObservable();
  }

  getReturnTypes(): Observable<ReturnTypes[]> {
   
    let retval$ = new Subject<ReturnTypes[]>();
    this.http.get<ReturnTypes[]>(`${RETURN_URL}/returnTypes`, { headers: this.headers }).subscribe((returnTypes: ReturnTypes[]) => {
      retval$.next(returnTypes);
    });
    return retval$.asObservable();
  }

  getReturnsByObject(count: number, page: number, search: string,objectIdCompany:string): Observable<Return[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("search", search);
    let retval$ = new Subject<Return[]>();
    this.http.get<Return[]>(`${RETURN_URL}/returns/getByObject/${objectIdCompany}`, { headers: this.headers, params: queryParams }).subscribe((returns: Return[]) => {
      retval$.next(returns);
    });
    return retval$.asObservable();
  }
  getReturnByReturnId(returnId: Guid): Observable<Return> {
    let retval$ = new Subject<Return>();
    this.http.get<Return>(`${RETURN_URL}/returns/${returnId}`, { headers: this.headers }).subscribe((returns: Return) => {
      retval$.next(returns);
    });
    return retval$.asObservable();
  }

  public downloadExcelTemplate() {
    this.http.get(`${RETURN_URL}/returns/downloadExcelTemplate`, { headers: this.headers, responseType: 'blob' }).subscribe(template => {
      const fileName = 'StoreMetrics_Returns_Template.xlsx';
      saveAs(template, fileName);
    });
  }

  createReturn(returns: Return): Observable<Return> {
    let retval$ = new Subject<Return>();
    this.http.post<Return>(`${RETURN_URL}/returns`, returns, { headers: this.headers }).subscribe((returns: Return) => {
      retval$.next(returns);
    });
    return retval$.asObservable();
  }

  updateReturn(returns: Return): Observable<boolean> {
    let retval$ = new Subject<boolean>();
    this.http.put<boolean>(`${RETURN_URL}/returns`, returns, { headers: this.headers }).subscribe((data) => {
     retval$.next(data);
    });
    return retval$.asObservable();
  }

  public deleteReturn(returnId: Guid): Observable<any> {
    return this.http.delete<any>(`${RETURN_URL}/returns/${returnId}`, { headers: this.headers });
  }


  public sold(returnId: Guid): Observable<any> {

    return this.http.put<any>(`${RETURN_URL}/returns/soldReturn/${returnId}`, {}, { headers: this.headers });
  }

  public export(product:string,object:string,retailer:string, date:string|null) {
    return this.http.get(`${RETURN_URL}/returns/exportExcel/`+product+'/'+object+'/'+retailer + '/'+date, { headers: this.headers, responseType: 'blob' });


  }


}
