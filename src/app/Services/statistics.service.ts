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
    this.http.get<StatisticsModel[]>(`http://localhost:8081/api/statistics/geCountListByQuerry/${query}`).subscribe((helper: StatisticsModel[]) => {
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
}
