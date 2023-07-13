import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SERVICE_URL } from '../app.constants';
import { StatisticsModel } from '../models/statisticsModel';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  public getCountListByQuerry(query: string): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${SERVICE_URL}/statistics/getCountListByQuery/${query}`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getObjectCount(): Observable<StatisticsModel> {
    let retval$ = new Subject<StatisticsModel>();
    this.http.get<StatisticsModel>(`${SERVICE_URL}/statistics/getObjectCount`).subscribe((helper: StatisticsModel) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getCountData(dashboardType: string): Observable<StatisticsModel[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('dashboardType', dashboardType);
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${SERVICE_URL}/statistics/getCountData`, { params: queryParams }).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getTop3UsersByFeedbacks(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${SERVICE_URL}/statistics/getCountListByQuery/select top(3) count(feedbackid) as Value,Username as Name from feedback group by Username order by count(feedbackid) desc`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getTop3ResolversByFeedbacks(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${SERVICE_URL}/statistics/getCountListByQuery/select top(3) count(feedbackid) as Value,UsernameResolve as Name from feedback group by UsernameResolve order by count(feedbackid) desc`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getTop3ObjectsByFeedbacks(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`${SERVICE_URL}/statistics/getCountListByQuery/select top(3) count(feedbackid) as Value,objectname as Name from feedback f inner join objectstorecheck osc on (f.ObjectStoreCheckId=osc.ObjectStoreCheckId) inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) group by objectname order by count(feedbackid) desc`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getFeedbackCount(query): Observable<any> {
    let retval$ = new Subject<any[]>();
    this.http.get<any>(`${SERVICE_URL}/statistics/getCountByQuery/${query}`).subscribe((helper: any) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  getReturnsCount(objectName: string, retailerName): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('objectName', objectName);
    queryParams = queryParams.append('retailerName', retailerName);
    let retval$ = new Subject<any>();
    this.http.get<any>(`${SERVICE_URL}/statistics/returnsCount`, { params: queryParams }).subscribe((helper: any) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
