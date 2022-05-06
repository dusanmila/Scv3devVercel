
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  
  form: FormGroup;

  feedback:Feedback = {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};
 
  selectedFeedback:Feedback= {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};




  public get feedbacks(): Feedback[]{
    return this._feedbacks;
  }

  private _feedbacks: Feedback[]=[]


  constructor(public feedbackService: FeedbackService, private http:HttpClient,public fb: FormBuilder,) {
  
    this.form = this.fb.group({
      file: [null],
      FeedbackCategoryName: [''],
      text:[''],
      date:[''],
      username:['']
    });
   }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(data => {
      console.log(data);
      this._feedbacks = data;
    });


  }

  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')!.updateValueAndValidity();
  }
  submitForm() {
    var formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
  
    formData.append('FeedbackCategoryName', this.form.get('FeedbackCategoryName')!.value);
    formData.append('text', this.form.get('text')!.value);
    formData.append('username', this.form.get('username')!.value);
    formData.append('date', this.form.get('date')!.value);
    this.http
      .post('http://localhost:8088/api/feedbacks', formData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error)

      });
  }



  createFeedback(){
    console.log(this.feedback);
    this.feedbackService.createFeedback(this.feedback).subscribe(data => {
      this._feedbacks.push(data);

    });
    this.feedback = {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};

  }
  
  public selectFeedback(feedback:Feedback){
    this.feedbackService.getOneFeedback(feedback).subscribe(data => {
      this.selectedFeedback=data;
    }) ;
    this.feedback=feedback;
    
   }


  
  public editFeedback(feedback:Feedback)
  {
    this.feedbackService.editFeedback(feedback).subscribe(data=>{

      console.log(data);

    });
  }

  

}
