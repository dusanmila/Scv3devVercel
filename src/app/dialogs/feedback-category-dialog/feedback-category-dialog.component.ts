import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackCategory } from 'src/app/models/feedbackCategory';
import { FeedbackCategoryService } from 'src/app/Services/feedback-category.service';

@Component({
  selector: 'app-feedback-category-dialog',
  templateUrl: './feedback-category-dialog.component.html',
  styleUrls: ['./feedback-category-dialog.component.css']
})
export class FeedbackCategoryDialogComponent{

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FeedbackCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackCategory,
    public feedbackCategoryService: FeedbackCategoryService) { }



  add() {
    this.isLoading=true;
    this.feedbackCategoryService.createFeedbackCategory(this.data).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Feedback category successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update() {
    this.isLoading=true;
    this.feedbackCategoryService.updateFeedbackCategory(this.data).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Feedback category successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  delete() {
    this.isLoading=true;
    this.feedbackCategoryService.deleteFeedbackCategory(this.data.feedbackCategoryName).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Feedback category successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  close() {
    this.dialogRef.close(this.changed);
  }

}
