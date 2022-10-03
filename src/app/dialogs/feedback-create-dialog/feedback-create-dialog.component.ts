import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackCategory } from 'src/app/models/feedbackCategory';
import { ProductCategory } from 'src/app/models/productCategory';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { ProductCategoryService } from 'src/app/Services/product-category.service';

@Component({
  selector: 'app-feedback-create-dialog',
  templateUrl: './feedback-create-dialog.component.html',
  styleUrls: ['./feedback-create-dialog.component.css']
})
export class FeedbackCreateDialogComponent implements OnInit {


  public form: FormGroup;
  public feedback: Feedback = { feedbackCategoryName: "",  productCategoryName: "", text: "", textResolve:"", date: "", resolved: false, img: "", username: "", imgResolve: "",isImgHorizontal:false,isImgResolveHorizontal:false, totalCount: 0,usernameResolve:"" };
  public feedbackCategories: FeedbackCategory[] = [];
  public productCategories: ProductCategory[] = [];
  public imageUploaded: boolean = false;
  public changed: boolean = false;
  submitClicked:boolean=false;
  isLoading=false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FeedbackCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback,
    public feedbackService: FeedbackService,
    public productCategoryServices: ProductCategoryService,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.form = this.fb.group({
      file: [null],
      img: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.dialogRef.updateSize('100%','200%');
  }

  public loadCategories() {
    this.feedbackService.getFeedbackCategories().subscribe(data => {
      this.feedbackCategories = data;
    });
    this.productCategoryServices.getProductCategories().subscribe(data => {
      this.productCategories = data;
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
    this.submitClicked=true;
    if(this.imageUploaded){
      this.isLoading=true;
      let username = localStorage.getItem("username") as string;
      const formData: any = new FormData();
      formData.append('file', this.form.get('file')!.value);
      formData.append('feedbackCategoryName', this.feedback.feedbackCategoryName);
      formData.append('productCategoryName', this.feedback.productCategoryName);
      formData.append('username', username);
      formData.append('text', this.feedback.text);
      this.feedbackService.createFeedbackWithForm(formData).subscribe(data => {
        this.changed = true;
        this.isLoading = false;
        console.log(data);
        this.snackBar.open('Feedback added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });

        this.close();
      }),
      (error:Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      };
    }

  }



  public close(): void {
    this.dialogRef.close(this.changed);
  }
}
