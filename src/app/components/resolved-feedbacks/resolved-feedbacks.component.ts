import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-resolved-feedbacks',
  templateUrl: './resolved-feedbacks.component.html',
  styleUrls: ['./resolved-feedbacks.component.css']
})
export class ResolvedFeedbacksComponent implements OnInit {

  public get feedbacks(): Feedback[]{
    return this._feedbacks;
  }

  private _feedbacks: Feedback[]=[]


  constructor(public feedbackService: FeedbackService, private http:HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.feedbackService.getResolvedFeedbacks().subscribe(data => {
      console.log(data);
      this._feedbacks = data;
    });
  }

}
