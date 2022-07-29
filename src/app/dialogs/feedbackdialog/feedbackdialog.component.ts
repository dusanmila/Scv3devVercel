import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { AnalyticsdialogComponent } from '../analyticsdialog/analyticsdialog.component';
import { Renderer2 } from '@angular/core';


declare var EXIF: any;
const fbphoto = document.querySelector('fbphoto');


@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedbackdialog.component.html',
  styleUrls: ['./feedbackdialog.component.css']
})
export class FeedbackDialogComponent implements OnInit,AfterViewInit {

  public flag: number;
  public resolveFeedbacks: boolean;
  public form: FormGroup;
  public imageUploaded: boolean = false;
  public feedback: Feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "", imgResolve: "", totalCount: 0 };
  public changed: boolean = false;
  isLoading=false;
  rotate=false;


output:string;
@ViewChild('fbimg') fbimg: ElementRef;

  constructor(private renderer:Renderer2,public snackBar: MatSnackBar,
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

  }


  ngAfterViewInit(): void {
  this.getExif();

}



  public add(): void {
    this.isLoading=true;
    this.feedbackService.createFeedback(this.data).subscribe({
      next: () => {
        this.snackBar.open('Feedback added', 'Ok', { duration: 2500 });
        this.isLoading=false;
      },
      error: (err: Error) => {
        console.log(err.name + ' -> ' + err.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500 });
        this.isLoading=false;
      }
    });
  }

  public close(): void {
    this.dialogRef.close(this.changed);
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
    const formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
    formData.append('FeedbackCategoryName', this.data.feedbackCategoryName);
    formData.append('text', this.data.text);
    formData.append('username', this.data.username);
    formData.append('img', this.data.img);
    this.feedbackService.resolveFeedback(formData).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Feedback added', 'Ok', { duration: 2500 });
      this.close();

      console.log(data);
    }),
    (error:Error) => {
      console.log(error.name + ' -> ' + error.message)
      this.snackBar.open('An error occurred', 'Close', { duration: 2500 });
    };



  }

  public openInfo() {
    const dialogRef = this.dialog.open(AnalyticsdialogComponent);
    dialogRef.componentInstance.flag = 2;


  }


 private getExif() {
    let allMetaData: any;

    //var img=<HTMLImageElement>this.fbimg.nativeElement;
    var img = document.getElementById("fbphoto");

    console.log(img)

    setTimeout(function(){
      EXIF.getData(img, function () {

        console.log(this)
        allMetaData = EXIF.getAllTags(this);
        if(allMetaData.Orientation == 6){

    this.rotate=true;

    this.classList.add('rotate');

        }

      });
    }, 150);




    this.output = allMetaData;
  }


}
