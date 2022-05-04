
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Output() getPicture = new EventEmitter<WebcamImage>();

  showWebcam = true;

  isCameraExist = true;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  feedback:Feedback = {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};
 
  selectedFeedback:Feedback= {feedbackCategoryName: "", text: "", date: "", resolved: false, img:"", username:""};


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

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
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

  
  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);
    console.log(webcamImage);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}
