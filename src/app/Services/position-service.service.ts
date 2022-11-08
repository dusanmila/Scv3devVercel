
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Position } from '../models/position';
import { PositionClass } from '../models/positionClass';
import { PositionType } from '../models/positionType';
import { POSITION_URL } from '../app.constants';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class PositionService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });



  public getPositions(): Observable<Position[]> {


    let retval$ = new Subject<Position[]>();

    this.http.get<Position[]>(`${POSITION_URL}/secondaryPositions`, { headers: this.headers }).subscribe((clients: Position[]) => {

      retval$.next(clients)

    });

    return retval$.asObservable();
  }

  public getPositionsByObjectIdCompany(objectIdCompany: string): Observable<Position[]> {
    let retval$ = new Subject<Position[]>();
    this.http.get<Position[]>(`${POSITION_URL}/secondaryPositions/secondaryPositionByObjectIdCompany/${objectIdCompany}`, { headers: this.headers }).subscribe((positions: Position[]) => {
      retval$.next(positions)
    });
    return retval$.asObservable();
  }

  public createPosition(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();
    this.http.post<Position>(`${POSITION_URL}/secondaryPositions`, position, { headers: this.headers }).subscribe((helper: Position) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public excelImport(formData: FormData) {

    return this.http.post(`${POSITION_URL}/secondaryPositionExcels`, formData, { headers: this.headers });

  }

  public editPositionCheck(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();


  this.http.put<Position>(`${POSITION_URL}/secondaryPositions/check`,position, { headers: this.headers }).subscribe((helper: Position) => {

    retval$.next(helper)

  });
  return retval$.asObservable();

}


  public editPositionUncheck(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();


  this.http.put<Position>(`${POSITION_URL}/secondaryPositions/uncheck`,position, { headers: this.headers }).subscribe((helper: Position) => {

    retval$.next(helper)

  });


 return retval$.asObservable();

  }



  public getOnePosition(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();

    this.http.get<Position>(`${POSITION_URL}/secondaryPositions/${position.secondaryPositionId}`, { headers: this.headers }).subscribe((helper: Position) => {
      retval$.next(helper)
    });

    return retval$.asObservable();

  }

  public deletePosition(position: Position): Observable<Position> {


    let retval$ = new Subject<Position>();
    this.http.delete<Position>(`${POSITION_URL}/secondaryPositions/${position.secondaryPositionId}`, { headers: this.headers }).subscribe((helper: Position) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public updatePosition(position: Position): Observable<Position> {
    let retval$ = new Subject<Position>();
    this.http.put<Position>(`${POSITION_URL}/secondaryPositions`, position, { headers: this.headers }).subscribe((helper: Position) => {
      retval$.next(helper);

    });
    return retval$.asObservable();
  }

  public updatePositionAddPhoto(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();
    this.http.put<Position>(`${POSITION_URL}/secondaryPositions`, position, { headers: this.headers }).subscribe((helper: Position) => {
      retval$.next(helper);

    });
    return retval$.asObservable();
  }

  public getPositionClasses(): Observable<PositionClass[]> {
    let retval$ = new Subject<PositionClass[]>();
    this.http.get<PositionClass[]>(`${POSITION_URL}/positionClasses`, { headers: this.headers }).subscribe((helper: PositionClass[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getPositionTypes(): Observable<PositionType[]> {
    let retvla$ = new Subject<PositionType[]>();
    this.http.get<PositionType[]>(`${POSITION_URL}/positionTypes`, { headers: this.headers }).subscribe((helper: PositionType[]) => {
      retvla$.next(helper);
    });
    return retvla$.asObservable();
  }

  public downloadExcelTemplate() {
    this.http.get(`${POSITION_URL}/secondaryPositionExcels`, { headers: this.headers, responseType: 'blob' }).subscribe(template => {
      const fileName = 'StoreCheck_SecondaryPositions_Template.xlsx';
      saveAs(template, fileName);
    });
  }

  public export() {
    return this.http.get(`${POSITION_URL}/secondaryPositionExcels/exportExcel`, { headers: this.headers, responseType: 'blob' }).subscribe(excel => {
      const fileName = 'SecondaryPositions.xlsx';
      saveAs(excel, fileName);
    });
  }

  public deletePositions() {
    return this.http.delete(`${POSITION_URL}/secondaryPositionsExcels`, { headers: this.headers });
  }

  public checkNoData(): Observable<boolean> {

    let retval$ = new Subject<boolean>();
    this.http.get<boolean>(`${POSITION_URL}/secondaryPositionExcels/checkNoData`, { headers: this.headers }).subscribe((ret: boolean) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

}


