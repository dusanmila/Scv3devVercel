import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FeedbackService, Feedback } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

 
  feedback:Feedback = {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};
 
  public get feedbacks(): Feedback[]{
    return this._feedbacks;
  }

  private _feedbacks: Feedback[]=[]


  constructor(public feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(data => {
      console.log(data);
      this._feedbacks = data;
    });
  }

  createFeedback(){
    this.feedbackService.createFeedback(this.feedback).subscribe(data => {
      this._feedbacks.push(data);

    });
    this.feedback = {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};

  }

}
