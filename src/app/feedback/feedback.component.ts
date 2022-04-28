import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FeedbackService, Feedback } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

 
  feedback:Feedback = {FeedbackCategory: "", Text: "", Date: "", Resolved: false, Img:"", Username:""};
 
  public get feedbacks(): Feedback[]{
    return this._feedbacks;
  }

  private _feedbacks: Feedback[]=[]


  constructor(public feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(data => {
      
      this._feedbacks = data;
    });
  }

  createFeedback(){
    this.feedbackService.createFeedback(this.feedback).subscribe(data => {
      this._feedbacks.push(data);

    });
    this.feedback = {FeedbackCategory: "", Text: "", Date: "", Resolved: false, Img:"", Username:""};

  }

}
