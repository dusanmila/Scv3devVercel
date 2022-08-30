import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FEEDBACK_URL } from '../app.constants';
import { FeedbackCategory } from '../models/feedbackCategory';

@Injectable({
  providedIn: 'root'
})
export class FeedbackCategoryService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getFeedbackCategories(): Observable<FeedbackCategory[]> {
    let retval$ = new Subject<FeedbackCategory[]>();
    this.http.get<FeedbackCategory[]>(`${FEEDBACK_URL}/feedbackCategories`, { headers: this.headers }).subscribe((feedbackCategories: FeedbackCategory[]) => {
      retval$.next(feedbackCategories);
    });
    return retval$.asObservable();
  }

  public createFeedbackCategory(feedbackCategory: FeedbackCategory): Observable<FeedbackCategory> {
    let retval$ = new Subject<FeedbackCategory>();
    this.http.post<FeedbackCategory>(`${FEEDBACK_URL}/feedbackCategories`, feedbackCategory, { headers: this.headers }).subscribe((feebackCategory: FeedbackCategory) => {
      retval$.next(feebackCategory);
    });
    return retval$.asObservable();
  }

  public updateFeedbackCategory(feedbackCategory: FeedbackCategory): Observable<FeedbackCategory> {
    let retval$ = new Subject<FeedbackCategory>();
    this.http.put<FeedbackCategory>(`${FEEDBACK_URL}/feedbackCategories`, feedbackCategory, { headers: this.headers }).subscribe((feebackCategory: FeedbackCategory) => {
      retval$.next(feebackCategory);
    });
    return retval$.asObservable();
  }

  public deleteFeedbackCategory(feedbackCategoryName): Observable<any> {
    return this.http.delete<any>(`${FEEDBACK_URL}/feedbackCategories/deleteByFeedbackCategoryName/${feedbackCategoryName}`, { headers: this.headers });
  }

}
