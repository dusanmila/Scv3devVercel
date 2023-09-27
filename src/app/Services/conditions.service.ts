import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { Observable, Subject } from 'rxjs';
import { CONDITIONS_URL } from '../app.constants';
import { Condition } from '../models/condition';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getConditions(count: number, page: number, search: string): Observable<Condition[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("search", search);

    return this.http.get<Condition[]>(`${CONDITIONS_URL}/conditions`, { headers: this.headers, params: queryParams });
  }

  public getConditionById(conditionId: string): Observable<Condition> {
    return this.http.get<Condition>(`${CONDITIONS_URL}/conditions/${conditionId}`, { headers: this.headers });
  }

  public createCondition(condition: Condition): Observable<Condition> {
    return this.http.post<Condition>(`${CONDITIONS_URL}/conditions`, condition, { headers: this.headers });
  }

  public updateCondition(condition: Condition): Observable<Condition> {
    return this.http.put<Condition>(`${CONDITIONS_URL}/conditions`, condition, { headers: this.headers });
  }

  public deleteCondition(conditionId: Guid): Observable<any> {
    return this.http.delete<any>(`${CONDITIONS_URL}/conditions/${conditionId}`, { headers: this.headers });
  }

  public export(retailer: string, productCategory: string) {
    return this.http.get(`${CONDITIONS_URL}/conditionsExcels/exportExcel/` + retailer + '/' + productCategory, { headers: this.headers, responseType: 'blob' });

  }

  public excelImport(formData: FormData) {
    return this.http.post(`${CONDITIONS_URL}/conditionsExcels`, formData, { headers: this.headers });
  }

  deleteConditions(): Observable<any> {
    return this.http.delete<any>(`${CONDITIONS_URL}/conditions`, { headers: this.headers });
  }

  public downloadExcelTemplate() {
    this.http.get(`${CONDITIONS_URL}/conditionsExcels`, { headers: this.headers, responseType: 'blob' }).subscribe(template => {
      const fileName = 'Conditions_Template.xlsx';
      saveAs(template, fileName);
    });
  }

  public checkNoData(): Observable<boolean> {

    let retval$ = new Subject<boolean>();
    this.http.get<boolean>(`${CONDITIONS_URL}/conditions/checkNoData`, { headers: this.headers }).subscribe((ret: boolean) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

}
