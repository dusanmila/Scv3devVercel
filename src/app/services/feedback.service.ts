import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';

export interface Feedback {
  FeedbackCategory: string
  Text: string  
  Date: string
  Resolved: boolean
  Img: string
  Username:string
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  private readonly adress ="http://localhost:8083/feedback";

  public getFeedbacks(): Observable<Feedback[]>{ 

    let retval$ = new Subject<Feedback[]>();
  
    this.http.get<Feedback[]>(`${this.adress}/feedbacks`).subscribe((clients: Feedback[]) => {

      retval$.next(clients)

    });
   
    return retval$.asObservable();
  }
  

  public getUnresolvedFeedbacks(): Observable<Feedback[]>{ 

    let retval$ = new Subject<Feedback[]>();
  
    this.http.get<Feedback[]>(`${this.adress}/feedbacks/unresolvedFeedbacks`).subscribe((clients: Feedback[]) => {

      retval$.next(clients)

    });
   
    return retval$.asObservable();
  }
  
  public createFeedback(feedback:Feedback):Observable<Feedback>{
   
    let retval$ = new Subject<Feedback>();

    this.http.post<Feedback>(`${this.adress}/feedbacks`, feedback).subscribe((helper: Feedback) => {

      retval$.next(helper)
    
    });

    return retval$.asObservable();
  }

  
  public editFeedback(feedback:Feedback):Observable<Feedback>{
    
    let retval$ = new Subject<Feedback>();
    
    this.http.put<Feedback>(`${this.adress}/feedbacks`, feedback).subscribe((helper: Feedback) => {

      retval$.next(helper)
    
    });

    return retval$.asObservable();
    

  }




}
