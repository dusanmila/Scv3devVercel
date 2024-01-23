
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Position } from '../models/position';
import { PositionClass } from '../models/positionClass';
import { PositionType } from '../models/positionType';
import { POSITION_URL } from '../app.constants';
import * as saveAs from 'file-saver';
import { PositionProductCategory } from '../models/positionProductCategory';

@Injectable({
  providedIn: 'root'
})

export class PositionProductCategoryService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getPositionProductCategories(): Observable<PositionProductCategory[]> {
    let retval$ = new Subject<PositionProductCategory[]>();
    this.http.get<PositionProductCategory[]>(`${POSITION_URL}/posProdCategories`, { headers: this.headers }).subscribe((positionProductCategories: PositionProductCategory[]) => {
      retval$.next(positionProductCategories);
    });
    return retval$.asObservable();
  }

  public createPositionProductCategory(positionProductCategory: PositionProductCategory): Observable<PositionProductCategory> {
    let retval$ = new Subject<PositionProductCategory>();
    this.http.post<PositionProductCategory>(`${POSITION_URL}/posProdCategories`, positionProductCategory, { headers: this.headers }).subscribe((helper: PositionProductCategory) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createPositionProductCategoryWithDelete(positionProductCategory: PositionProductCategory): Observable<PositionProductCategory> {
    let retval$ = new Subject<PositionProductCategory>();
    this.http.post<PositionProductCategory>(`${POSITION_URL}/posProdCategoriesWithDelete`, positionProductCategory, { headers: this.headers }).subscribe((helper: PositionProductCategory) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }


}
