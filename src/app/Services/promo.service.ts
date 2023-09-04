import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { PROMO_URL } from '../app.constants';
import { Promo } from '../models/promo';
import * as saveAs from 'file-saver';
import { StatisticsModel } from '../models/statisticsModel';
import { PromoStatisticsTableModel } from '../models/promoStatisticsTableModel';
import { GroupedBarChartDataModel } from '../models/groupedBarChartDataModel';
import { UserPerformance } from '../models/userPerformance';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  constructor(public http: HttpClient) { }

  getPromos(count: number, page: number, type: string, username: string, retailerName: string, productCategoryName: string, startRangeDate: string, endRangeDate: string): Observable<Promo[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('count', count);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('type', type);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('productCategoryName', productCategoryName);
    queryParams = queryParams.append('startRangeDate', startRangeDate);
    queryParams = queryParams.append('startRangeDate', endRangeDate);
    let retval$ = new Subject<Promo[]>();
    this.http.get<Promo[]>(`${PROMO_URL}/promos`, { params: queryParams, headers: this.headers }).subscribe((promos: Promo[]) => {
      retval$.next(promos);
    });
    return retval$.asObservable();
  }

  public updatePromo(promo: Promo): Observable<Promo> {
    let retval$ = new Subject<Promo>();
    this.http.put<Promo>(`${PROMO_URL}/promos`, promo, { headers: this.headers }).subscribe((helper: Promo) => {
      retval$.next(helper);

    });
    return retval$.asObservable();
  }

  public declinePromo(promo: Promo): Observable<Promo> {
    let retval$ = new Subject<Promo>();
    this.http.put<Promo>(`${PROMO_URL}/promos/decline`, promo, { headers: this.headers }).subscribe((helper: Promo) => {
      retval$.next(helper);

    });
    return retval$.asObservable();
  }

  updatePromoResultSale(promo: Promo): Observable<Promo> {
    let retval$ = new Subject<Promo>();
    this.http.put<Promo>(`${PROMO_URL}/promos/updateResultSale`, promo, { headers: this.headers }).subscribe((promo: Promo) => {
      retval$.next(promo);
    });
    return retval$.asObservable();
  }

  createPromo(promo: Promo): Observable<Promo> {
    let retval$ = new Subject<Promo>();
    this.http.post<Promo>(`${PROMO_URL}/promos`, promo, { headers: this.headers }).subscribe((promo: Promo) => {
      retval$.next(promo);
    });
    return retval$.asObservable();
  }

  confirmPromo(promo: Promo): Observable<any> {
    return this.http.put<any>(`${PROMO_URL}/promos/confirm`, promo, { headers: this.headers });
  }

  deletePromo(promoId: Guid): Observable<any> {
    return this.http.delete<any>(`${PROMO_URL}/promos/${promoId}`, { headers: this.headers });
  }

  deletePromos(): Observable<any> {
    return this.http.delete<any>(`${PROMO_URL}/promos/`, { headers: this.headers });
  }

  public export(type: string, username: string, startDate: string | null, endDate: string | null, retailer: string, productCategory: string) {
    return this.http.get(`${PROMO_URL}/promoExcels/exportExcel/` + type + '/' + username + '/' + startDate + '/' + endDate + '/' + retailer + '/' + productCategory, { headers: this.headers, responseType: 'blob' });

  }


  exportStatistics(startDate: Date, endDate: Date, retailerName: string, username: string, productCategoryName: string, retailer2: string): Observable<Blob> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('startDate', startDate.toISOString());
    queryParams = queryParams.append('endDate', endDate.toISOString());
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('productCategoryName', productCategoryName);
    queryParams = queryParams.append('retailerName2', retailer2);

    return this.http.get(`${PROMO_URL}/promoExcels/exportPromoCountAndRopiByProductCategoriesAndYears`, {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob'
    });
  }

  public excelImport(formData: FormData) {
    return this.http.post(`${PROMO_URL}/promoExcels`, formData, { headers: this.headers });
  }

  public downloadExcelTemplate() {
    this.http.get(`${PROMO_URL}/promoExcels`, { headers: this.headers, responseType: 'blob' }).subscribe(template => {
      const fileName = 'Promo_Template.xlsx';
      saveAs(template, fileName);
    });
  }

  public checkNoData(): Observable<boolean> {

    let retval$ = new Subject<boolean>();
    this.http.get<boolean>(`${PROMO_URL}/promos/checkNoData`, { headers: this.headers }).subscribe((ret: boolean) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

  getPromoCountAndRopiByProductCategoriesAndYears(startDate: Date, endDate: Date, retailerName: string, username: string, productCategoryName: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('startDate', startDate.toDateString());
    queryParams = queryParams.append('endDate', endDate.toDateString());
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('productCategoryName', productCategoryName);
    let retval$ = new Subject<PromoStatisticsTableModel[]>();
    this.http.get<PromoStatisticsTableModel[]>(`${PROMO_URL}/promos/promoCountAndRopiByProductCategoriesAndYears`, { params: queryParams, headers: this.headers }).subscribe((result: PromoStatisticsTableModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getPromoCountByProductCategories(retailerName: string, username: string, startDate: Date, endDate: Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('startDate', startDate.toDateString());
    queryParams = queryParams.append('endDate', endDate.toDateString());
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${PROMO_URL}/promos/promoCountByProductCategories`, { params: queryParams, headers: this.headers }).subscribe((result: StatisticsModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getRopiCashByProductCategories(retailerName: string, username: string, startDate: Date, endDate: Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('startDate', startDate.toDateString());
    queryParams = queryParams.append('endDate', endDate.toDateString());
    let retval$ = new Subject<GroupedBarChartDataModel[]>();
    this.http.get<GroupedBarChartDataModel[]>(`${PROMO_URL}/promos/ropiCashByProductCategories`, { params: queryParams, headers: this.headers }).subscribe((result: GroupedBarChartDataModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getAvgUpliftByPeriod(retailerName: string, username: string, productCategoryName: string, startDate: Date, endDate: Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('productCategoryName', productCategoryName);
    queryParams = queryParams.append('startDate', startDate.toDateString());
    queryParams = queryParams.append('endDate', endDate.toDateString());
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${PROMO_URL}/promos/avgUpliftByPeriod`, { params: queryParams, headers: this.headers }).subscribe((result: StatisticsModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getPromoCountByPeriod(retailerName: string, username: string, productCategoryName: string, startDate: Date, endDate: Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('productCategoryName', productCategoryName);
    queryParams = queryParams.append('startDate', startDate.toDateString());
    queryParams = queryParams.append('endDate', endDate.toDateString());
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${PROMO_URL}/promos/promoCountByPeriod`, { params: queryParams, headers: this.headers }).subscribe((result: StatisticsModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getRopiCashByPeriod(retailerName: string, username: string, productCategoryName: string, startDate: Date, endDate: Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('retailerName', retailerName);
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('productCategoryName', productCategoryName);
    queryParams = queryParams.append('startDate', startDate.toDateString());
    queryParams = queryParams.append('endDate', endDate.toDateString());
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${PROMO_URL}/promos/ropiCashByPeriod`, { params: queryParams, headers: this.headers }).subscribe((result: StatisticsModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getNumericData() {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${PROMO_URL}/promos/numericData`, { headers: this.headers }).subscribe((result: StatisticsModel[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }

  getUserPerformance(search: string, page: number, count: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('count', count);
    queryParams = queryParams.append('page', page);
    let retval$ = new Subject<UserPerformance[]>();
    this.http.get<UserPerformance[]>(`${PROMO_URL}/promos/userPerformance`, { params: queryParams, headers: this.headers }).subscribe((result: UserPerformance[]) => {
      retval$.next(result);
    });
    return retval$.asObservable();
  }
}
