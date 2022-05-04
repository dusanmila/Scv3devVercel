
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';

export interface Position {
  secondaryPositionId?:Guid,
  objectName: string
  posClassName: string
  posTypeName: string

}

@Injectable({
  providedIn: 'root'
})


export class PositionService{

  constructor(private http: HttpClient) { }


  private readonly adress ="http://localhost:8087/api/secondaryPositions";


  public getPositions():Observable<Position[]>{

    let retval$ = new Subject<Position[]>();

    this.http.get<Position[]>(`${this.adress}`,{headers:new HttpHeaders({'token':'*'})}).subscribe((clients: Position[]) => {

      retval$.next(clients)

    });

    return retval$.asObservable();
  }

  public createPosition(position:Position):Observable<Position>{

    let retval$ = new Subject<Position>();
    this.http.post<Position>(this.adress, position).subscribe((helper: Position) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public editPosition(position:Position):Observable<Position>{

    let retval$ = new Subject<Position>();

    this.http.put<Position>(`${this.adress}`, position).subscribe((helper: Position) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOnePosition(position:Position):Observable<Position>{

    let retval$ = new Subject<Position>();
    this.http.get<{url: string}>(this.adress).subscribe(address =>{
      this.http.get<Position>(`${this.adress}/${position.secondaryPositionId}`).subscribe((helper: Position) => {
        retval$.next(helper)
      })
    });

    return retval$.asObservable();

  }

  public deletePosition(position:Position):Observable<Position>{


    let retval$ = new Subject<Position>();
      this.http.delete<Position>(`${this.adress}/${position.secondaryPositionId}`).subscribe((helper: Position) => {
        retval$.next(helper)
      })


    return retval$.asObservable();
  }
}


