import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { FeedbackCategory } from '../models/feedbackCategory';
import { FEEDBACK_URL } from '../app.constants';
import { ProductCategory } from '../models/productCategory';




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


    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {


      retval$.next(feedbacks)

    });

    return retval$.asObservable();
  }

  public getResolvedFeedbacks(): Observable<Feedback[]> {

    let retval$ = new Subject<Feedback[]>();


    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/resolvedFeedbacks`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {


      retval$.next(feedbacks)

    });

    return retval$.asObservable();
  }

  public getUnresolvedFeedbacks(): Observable<Feedback[]> {


    let retval$ = new Subject<Feedback[]>();


    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/unresolvedFeedbacks`,{headers:this.headers}).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks);

    });

    return retval$.asObservable();
  }
  public getUnresolvedFeedbacksByObject(objectIdCompany: string, resolveFeedbacks: boolean, page: number, count: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("resolveFeedbacks", resolveFeedbacks);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("count", count);
    let retval$ = new Subject<Feedback[]>();


    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/unresolvedFeedbacks/${objectIdCompany}`,{headers:this.headers, params: queryParams}).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks);
    });
    return retval$.asObservable();
  }

  public getResolvedFeedbacksByObject(objectIdCompany: string, count: number, page: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    let retval$ = new Subject<Feedback[]>();


    this.http.get<Feedback[]>(`${FEEDBACK_URL}/feedbacks/resolvedFeedbacks/${objectIdCompany}`, {headers:this.headers, params: queryParams }).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks);
    });
    return retval$.asObservable();
  }

  public createFeedback(feedback: Feedback): Observable<Feedback> {

    let retval$ = new Subject<Feedback>();


    this.http.post<Feedback>(`${FEEDBACK_URL}/feedbacks`, feedback,{headers:this.headers}).subscribe((helper: Feedback) => {



      retval$.next(helper)

    });

    return retval$.asObservable();
  }


  public editFeedback(feedback: Feedback): Observable<Feedback> {

    let retval$ = new Subject<Feedback>();



    this.http.put<Feedback>(`${FEEDBACK_URL}/feedbacks/${feedback.img}`, feedback).subscribe((helper: Feedback) => {


      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneFeedback(feedback: Feedback): Observable<Feedback> {

    let retval$ = new Subject<Feedback>();



    this.http.get<Feedback>(`${FEEDBACK_URL}/feedbacks/getOneFeedback/${feedback.img}`).subscribe((helper: Feedback) => {
      retval$.next(helper)


    });

    return retval$.asObservable();

  }

  public getFeedbackCategories(): Observable<FeedbackCategory[]> {
    let retval$ = new Subject<FeedbackCategory[]>();


    this.http.get<FeedbackCategory[]>(`${FEEDBACK_URL}/feedbackCategories`,{headers:this.headers}).subscribe((helper: FeedbackCategory[]) => {

      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createFeedbackWithForm(formData: FormData): Observable<Feedback> {
    let retval$ = new Subject<Feedback>();



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
