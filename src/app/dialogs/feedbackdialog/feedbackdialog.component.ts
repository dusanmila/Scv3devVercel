import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { UserService } from 'src/app/Services/user.service';
import { AnalyticsdialogComponent } from '../analyticsdialog/analyticsdialog.component';



@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedbackdialog.component.html',
  styleUrls: ['./feedbackdialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  public flag: number;
  public resolveFeedbacks: boolean;
  public form: FormGroup;
  public feedback: Feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "ppetrovic", imgResolve: "" };

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Feedback,
    public feedbackService: FeedbackService,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.form = this.fb.group({
      file: [null],
      img: ['']
    });
  }

  ngOnInit(): void {
    console.log(this.resolveFeedbacks);
    console.log(this.data);
  }

  public add(): void {
    this.feedbackService.createFeedback(this.data)
      .subscribe(data => {
        this.snackBar.open('Feedback successfully added', 'Ok', { duration: 2500 });
      }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
      }
  }

  public close(): void {
    this.dialogRef.close();
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')!.updateValueAndValidity();
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
    formData.append('FeedbackCategoryName', this.data.feedbackCategoryName);
    formData.append('text', this.data.text);
    formData.append('username', this.data.username);
    formData.append('img', this.data.img);
    console.log(formData);
    console.log(this.feedback);
    this.feedbackService.resolveFeedback(formData).subscribe(data => {
      console.log(data);
    });
  }

  public openInfo() {
    const dialogRef = this.dialog.open(AnalyticsdialogComponent);
    dialogRef.componentInstance.flag = 2;
    
      
  }

}
