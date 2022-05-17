import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public resolveFeedbacks: boolean;
  public form: FormGroup;
  public feedback: Feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "ppetrovic" };

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
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
    formData.append('FeedbackCategoryName', this.feedback.feedbackCategoryName);
    formData.append('text', this.feedback.text);
    formData.append('username', this.feedback.username);

    this.http
      .post('http://localhost:8088/api/feedbacks', formData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error)
      });
  }


}
