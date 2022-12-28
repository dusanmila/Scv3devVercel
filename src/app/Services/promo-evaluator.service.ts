import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PROMO_URL } from '../app.constants';
import { PromoEvaluator } from '../models/promoEvaluator';

@Injectable({
  providedIn: 'root'
})
export class PromoEvaluatorService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getPromoEvaluators(): Observable<PromoEvaluator[]> {
    let retval$ = new Subject<PromoEvaluator[]>();
    this.http.get<PromoEvaluator[]>(`${PROMO_URL}/promoEvaluators`, { headers: this.headers }).subscribe((promoEvaluators: PromoEvaluator[]) => {
      retval$.next(promoEvaluators);
    });
    return retval$.asObservable();
  }

  public checkIfUserEvaluator(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${PROMO_URL}/promoEvaluators/checkIfUserEvaluator/${username}`, { headers: this.headers });
  }

  public createPromoEvaluator(promoEvaluator: PromoEvaluator): Observable<PromoEvaluator> {
    let retval$ = new Subject<PromoEvaluator>();
    this.http.post<PromoEvaluator>(`${PROMO_URL}/promoEvaluators`, promoEvaluator, { headers: this.headers }).subscribe((promoEvaluator: PromoEvaluator) => {
      retval$.next(promoEvaluator);
    });
    return retval$.asObservable();
  }

  public updatePromoEvaluator(promoEvaluator: PromoEvaluator): Observable<PromoEvaluator> {
    let retval$ = new Subject<PromoEvaluator>();
    this.http.put<PromoEvaluator>(`${PROMO_URL}/promoEvaluators`, promoEvaluator, { headers: this.headers }).subscribe((promoEvaluator: PromoEvaluator) => {
      retval$.next(promoEvaluator);
    });
    return retval$.asObservable();
  }

  public deletePromoEvaluator(promoEvaluatorName): Observable<any> {
    return this.http.delete<any>(`${PROMO_URL}/promoEvaluators/deleteByPromoEvaluatorName/${promoEvaluatorName}`, { headers: this.headers });
  }

}
