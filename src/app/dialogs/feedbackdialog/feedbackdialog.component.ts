import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedbackdialog.component.html',
  styleUrls: ['./feedbackdialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<FeedbackDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: Feedback, public feedbackService: FeedbackService) { }

  ngOnInit(): void {
  }

public add(): void{
  this.feedbackService.createFeedback(this.data)
  .subscribe( data =>{
    this.snackBar.open('Feedback successfully added', 'Ok', { duration: 2500 });
  } ),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
  }
}

public close(): void{
this.dialogRef.close();
}



}
