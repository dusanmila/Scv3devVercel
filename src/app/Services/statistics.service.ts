import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StatisticsModel } from '../models/statisticsModel';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  public GetCountListByQuerry(query: string): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`http://localhost:8081/api/statistics/getCountListByQuerry/${query}`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public GetObjectCount(): Observable<StatisticsModel> {
    let retval$ = new Subject<StatisticsModel>();
    this.http.get<StatisticsModel>(`http://localhost:8081/api/statistics/getObjectCount`).subscribe((helper: StatisticsModel) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public GetCountData(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`http://localhost:8081/api/statistics/getCountData`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public GetTop3UsersByFeedbacks(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`http://localhost:8081/api/statistics/getCountListByQuerry/select top(3) count(feedbackid) as Value,Username as Name from feedback group by Username order by count(feedbackid) desc`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public GetTop3ResolversByFeedbacks(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`http://localhost:8081/api/statistics/getCountListByQuerry/select top(3) count(feedbackid) as Value,UsernameResolve as Name from feedback group by UsernameResolve order by count(feedbackid) desc`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public GetTop3ObjectsByFeedbacks(): Observable<StatisticsModel[]> {
    let retval$ = new Subject<StatisticsModel[]>();
    this.http.get<StatisticsModel[]>(`http://localhost:8081/api/statistics/getCountListByQuerry/select top(3) count(feedbackid) as Value,objectname as Name from feedback f inner join objectstorecheck osc on (f.ObjectStoreCheckId=osc.ObjectStoreCheckId) inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) group by objectname order by count(feedbackid) desc`).subscribe((helper: StatisticsModel[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}
