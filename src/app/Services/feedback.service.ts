import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { FeedbackCategory } from '../models/feedbackCategory';
import { FEEDBACK_URL } from '../app.constants';




@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});
  
  private readonly adress = "http://localhost:8083/feedback";
  private readonly feedbackAdress = "http://localhost:8088/api";



  public getFeedbacks(): Observable<Feedback[]> {

    let retval$ = new Subject<Feedback[]>();

    // this.http.get<Feedback[]>(`${this.feedbackAdress}/feedbacks`).subscribe((feedbacks: Feedback[]) => {
    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {


      retval$.next(feedbacks)

    });

    return retval$.asObservable();
  }

  public getResolvedFeedbacks(): Observable<Feedback[]> {

    let retval$ = new Subject<Feedback[]>();
   
    // this.http.get<Feedback[]>(`${this.feedbackAdress}/feedbacks/resolvedFeedbacks`).subscribe((feedbacks: Feedback[]) => {
    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/resolvedFeedbacks`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {


      retval$.next(feedbacks)

    });

    return retval$.asObservable();
  }

  public getUnresolvedFeedbacks(): Observable<Feedback[]> {

    
    let retval$ = new Subject<Feedback[]>();

    // this.http.get<Feedback[]>(`${this.feedbackAdress}/feedbacks/unresolvedFeedbacks`).subscribe((feedbacks: Feedback[]) => {
    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/unresolvedFeedbacks`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks);

    });

    return retval$.asObservable();
  }
  public getUnresolvedFeedbacksByObject(objectName: string) {
    let retval$ = new Subject<Feedback[]>();

    // this.http.get<Feedback[]>(`http://localhost:8088/api/feedbacks/unresolvedFeedbacks/${objectName}`).subscribe((feedbacks: Feedback[]) => {
    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/unresolvedFeedbacks/${objectName}`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks);
    });
    return retval$.asObservable();
  }

  public getResolvedFeedbacksByObject(objectName: string, count: number, page: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    let retval$ = new Subject<Feedback[]>();

    // this.http.get<Feedback[]>(`http://localhost:8088/api/feedbacks/resolvedFeedbacks/${objectName}`, {params: queryParams}).subscribe((feedbacks: Feedback[]) => {
    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/resolvedFeedbacks/${objectName}`, {headers:this.headers, params: queryParams }).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks);
    });
    return retval$.asObservable();
  }

  public createFeedback(feedback: Feedback): Observable<Feedback> {

    let retval$ = new Subject<Feedback>();


    this.http.post<Feedback>(`${FEEDBACK_URL}/feedbacks`, feedback,{headers:this.headers}).subscribe((helper: Feedback) => {
      // this.http.post<Feedback>(`${this.feedbackAdress}/feedbacks`, feedback).subscribe((helper: Feedback) => {


      retval$.next(helper)

    });

    return retval$.asObservable();
  }


  public editFeedback(feedback: Feedback): Observable<Feedback> {

    let retval$ = new Subject<Feedback>();


    // this.http.put<Feedback>(`${this.feedbackAdress}/feedbacks/${feedback.img}`, feedback).subscribe((helper: Feedback) => {
    this.http.put<Feedback>(`${FEEDBACK_URL}/feedbacks/${feedback.img}`, feedback).subscribe((helper: Feedback) => {


      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneFeedback(feedback: Feedback): Observable<Feedback> {

    let retval$ = new Subject<Feedback>();


    // this.http.get<Feedback>(`${this.feedbackAdress}/feedbacks/getOneFeedback/${feedback.img}`).subscribe((helper: Feedback) => {
    this.http.get<Feedback>(`${FEEDBACK_URL}/feedbacks/getOneFeedback/${feedback.img}`).subscribe((helper: Feedback) => {
      retval$.next(helper)


    });

    return retval$.asObservable();

  }

  public getFeedbackCategories(): Observable<FeedbackCategory[]> {
    let retval$ = new Subject<FeedbackCategory[]>();


    // this.http.get<FeedbackCategory[]>('http://localhost:8088/api/feedbackCategories').subscribe((helper: FeedbackCategory[]) => {
    this.http.get<FeedbackCategory[]>(`${FEEDBACK_URL}/feedbackCategories`,{headers:this.headers}).subscribe((helper: FeedbackCategory[]) => {

      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createFeedbackWithForm(formData: FormData): Observable<Feedback> {
    let retval$ = new Subject<Feedback>();

    // this.http.post<Feedback>('http://localhost:8088/api/feedbacks', formData).subscribe((helper: Feedback) => {

    this.http.post<Feedback>(`${FEEDBACK_URL}/feedbacks`, formData,{headers:this.headers}).subscribe((helper: Feedback) => {

      retval$.next(helper);
    });
    return retval$;
  }

  public resolveFeedback(formData: FormData): Observable<Feedback> {
    let retval$ = new Subject<Feedback>();
    //  this.http.put<Feedback>('http://localhost:8088/api/feedbacks', formData).subscribe((helper: Feedback) => {

    this.http.put<Feedback>(`${FEEDBACK_URL}/feedbacks`, formData,{headers:this.headers}).subscribe((helper: Feedback) => {
      retval$.next(helper);
    });
    return retval$;
  }

}
