import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackCategory } from 'src/app/models/feedbackCategory';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { FeedbackDialogComponent } from '../feedbackdialog/feedbackdialog.component';

@Component({
  selector: 'app-feedback-create-dialog',
  templateUrl: './feedback-create-dialog.component.html',
  styleUrls: ['./feedback-create-dialog.component.css']
})
export class FeedbackCreateDialogComponent implements OnInit {

  public flag: number;
  public form: FormGroup;
  public feedback: Feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "", imgResolve: "" };
  public feedbackCategories: FeedbackCategory[] = [];
  public imageUploaded: boolean = false;
  public changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FeedbackCreateDialogComponent>,
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
    this.loadFeedbackCategories();
  }

  public loadFeedbackCategories() {
    this.feedbackService.getFeedbackCategories().subscribe(data => {
      this.feedbackCategories = data;
    });
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')!.updateValueAndValidity();
    this.imageUploaded = true;
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
    formData.append('FeedbackCategoryName', this.feedback.feedbackCategoryName);
    formData.append('Username', "ppetrovic");
    formData.append('Text', this.feedback.text);
    console.log(formData);
    console.log(this.feedback);
    this.feedbackService.createFeedbackWithForm(formData).subscribe(data => {
      this.changed = true;
      console.log('dodato')
      console.log(data);
      this.close();
    });
  }

  public close(): void {
    this.dialogRef.close(this.changed);
  }
}
