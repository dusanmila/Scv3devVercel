
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { Feedback } from '../../models/feedback.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackDialogComponent } from 'src/app/dialogs/feedbackdialog/feedbackdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackCreateDialogComponent } from 'src/app/dialogs/feedback-create-dialog/feedback-create-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  displayedColumns = ["feedbackCategoryName", "date", "username"];
  dataSource: MatTableDataSource<Feedback>;
  subscription: Subscription;

  @Input() objectName: string;
  @Input() resolveFeedbacks: boolean;
  @Output() showFinishButton = new EventEmitter<boolean>();
  // resolveFeedbacks: boolean = false;
  public showResolved: boolean = false;

  form: FormGroup;

  isLoading = true;

  feedback: Feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "", imgResolve: "", totalCount: 0 };

  selectedFeedback: Feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "", imgResolve: "", totalCount: 0 };

  noData=false;

  public page: number = 1;
  public count: number = 5;
  public length: number = 0;

  public get feedbacks(): Feedback[] {
    return this._feedbacks;
  }

  private _feedbacks: Feedback[] = []


  constructor(public feedbackService: FeedbackService, private http: HttpClient, public fb: FormBuilder, public dialog: MatDialog) {

    this.form = this.fb.group({
      file: [null],
      FeedbackCategoryName: [''],
      text: [''],
      date: [''],
      username: ['']
    });
  }

  ngOnInit(): void {
    if (!this.resolveFeedbacks) {
      this.displayedColumns = ["date", "feedbackCategoryName", "username", "actions"];
    }
    if (this.objectName != null) {
      this.loadUnresolvedFeedbacksByObject(false);
    } else {
      this.loadData();
    }

  }


  public loadData() {
    this.feedbackService.getUnresolvedFeedbacks().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;

    });
  }

  public loadUnresolvedFeedbacksByObject(pageChanged: boolean) {
    this.noData=false;
    this.feedbackService.getUnresolvedFeedbacksByObject(this.objectName, this.resolveFeedbacks, this.page, this.count).subscribe(data => {
      if (data) {
        if (!this.resolveFeedbacks)
          this.showFinishButton.emit(true);
          
          this.dataSource=new MatTableDataSource(data);
        }else{
        this.noData=true;
        this.dataSource=new MatTableDataSource(data);

      }
      this.length = data[0].totalCount;
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadUnresolvedFeedbacksByObject(true);
  }

  // public loadResolvedFeedbacksByObject() {
  //   this.feedbackService.getResolvedFeedbacksByObject(this.objectName).subscribe(data => {
  //     this.dataSource = new MatTableDataSource(data);
  //   });
  // }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')!.updateValueAndValidity();
  }
  submitForm() {
    const formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);

    formData.append('FeedbackCategoryName', this.form.get('FeedbackCategoryName')!.value);
    formData.append('text', this.form.get('text')!.value);
    formData.append('username', this.form.get('username')!.value);
    formData.append('date', this.form.get('date')!.value);
    this.http
      .post('https://microservicefeedback.azurewebsites.net/api/feedbacks', formData)
      // .post('http://localhost:8088/api/feedbacks', formData)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log('prikazi')
          this.showFinishButton.emit(true);
        },
        error: (error) => console.log(error)

      });
  }



  createFeedback() {
    this.feedbackService.createFeedback(this.feedback).subscribe(data => {
      this._feedbacks.push(data);

    });
    this.feedback = { feedbackCategoryName: "", text: "", date: "", resolved: false, img: "", username: "", imgResolve: "", totalCount: 0 };

  }

  selectFeedback(feedback: Feedback) {
    this.feedbackService.getOneFeedback(feedback).subscribe(data => {
      this.selectedFeedback = data;
    });
    this.feedback = feedback;

  }



  editFeedback(feedback: Feedback) {
    this.feedbackService.editFeedback(feedback).subscribe(data => {

      console.log(data);

    });
  }

  public resolveFeedback(feedback: Feedback) {
    feedback.resolved = true;
    this.feedbackService.editFeedback(feedback).subscribe(data => {
      console.log(data);
      this.feedbackService.getUnresolvedFeedbacks().subscribe(res => {
        this._feedbacks = res;
      })
    });
  }

  public openDialog(feedbackCategoryName?: string, text?: string, date?: string, resolved?: string, img?: string, username?: string) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: { feedbackCategoryName, text, date, resolved, img, username } });
    dialogRef.componentInstance.resolveFeedbacks = this.resolveFeedbacks;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadUnresolvedFeedbacksByObject(false);
        }
      }
      )
  }

  public openCreateDialog(flag: number) {
    const dialogRef = this.dialog.open(FeedbackCreateDialogComponent);
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadUnresolvedFeedbacksByObject(false);
          this.showFinishButton.emit(true);
        }
      }
      )
  }

}
