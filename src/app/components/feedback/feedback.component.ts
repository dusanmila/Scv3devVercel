
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

  @Input() objectIdCompany: string;
  @Input() resolveFeedbacks: boolean;
  @Output() showFinishButton = new EventEmitter<boolean>();
  // resolveFeedbacks: boolean = false;
  public showResolved: boolean = false;

  form: FormGroup;

  isLoading = true;

  feedback: Feedback = { feedbackCategoryName: "", productCategoryName: "",  text: "",textResolve:"", date: "", resolved: false, img: "", username: "", imgResolve: "", isImgHorizontal:false, totalCount: 0, usernameResolve:""};

  selectedFeedback: Feedback = { feedbackCategoryName: "",  productCategoryName: "", text: "",textResolve:"", date: "", resolved: false, img: "", username: "", imgResolve: "",isImgHorizontal:false, totalCount: 0, usernameResolve:"" };

  noData = false;

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
    if (this.objectIdCompany != null) {
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
    if (!pageChanged)
      this.page = 1;
    this.noData = false;
    this.feedbackService.getUnresolvedFeedbacksByObject(this.objectIdCompany, this.resolveFeedbacks, this.page, this.count).subscribe(data => {
      if (data) {
        this.length = data[0].totalCount;
        if (!this.resolveFeedbacks)
          this.showFinishButton.emit(true);

        this.dataSource = new MatTableDataSource(data);
      } else {
        this.noData = true;
        this.dataSource = new MatTableDataSource(data);

      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadUnresolvedFeedbacksByObject(true);
  }

  public resolveFeedback(feedback: Feedback) {
    feedback.resolved = true;
    this.feedbackService.editFeedback(feedback).subscribe(data => {

      this.feedbackService.getUnresolvedFeedbacks().subscribe(res => {
        this._feedbacks = res;
      })
    });
  }

  public openDialog(feedbackCategoryName?: string, productCategoryName?: string, text?: string, date?: string, resolved?: string, img?: string, username?: string) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: { feedbackCategoryName, productCategoryName, text, date, resolved, img, username } });
    dialogRef.componentInstance.resolveFeedbacks = this.resolveFeedbacks;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadUnresolvedFeedbacksByObject(false);
        }
      }
      )
  }

  public openCreateDialog() {
    const dialogRef = this.dialog.open(FeedbackCreateDialogComponent);

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
