import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PROMO_URL } from '../app.constants';
import { Promo } from '../models/promo';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  constructor(public http: HttpClient) { }

  getPromos(): Observable<Promo[]> {
    let retval$ = new Subject<Promo[]>();
    this.http.get<Promo[]>(`${PROMO_URL}/promos`, { headers: this.headers }).subscribe((promos: Promo[]) => {
      retval$.next(promos);
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
}
