import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FeedbackDialogComponent } from 'src/app/dialogs/feedbackdialog/feedbackdialog.component';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-resolved-feedback',
  templateUrl: './resolved-feedback.component.html',
  styleUrls: ['./resolved-feedback.component.css']
})
export class ResolvedFeedbackComponent implements OnInit {

  public objectIdCompany: string;
  public count: number = 5;
  public page: number = 1;
  public length: number = 100;
  public pageEvent: PageEvent;
  noData = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns = ["feedbackCategoryName", "date", "username", "actions"];
  dataSource: MatTableDataSource<Feedback>;

  isLoading = true;

  constructor(public activatedRoute: ActivatedRoute,
    public feedbackService: FeedbackService,
    public dialog: MatDialog,
    public date: DatePipe,
    public location: Location) { }

  ngOnInit(): void {
    this.objectIdCompany = this.activatedRoute.snapshot.paramMap.get("objectIdCompany") as string;
    this.loadData();
  }

  public loadData() {
    this.feedbackService.getResolvedFeedbacksByObject(this.objectIdCompany, this.count, this.page).subscribe(data => {

      if (data) {

        this.dataSource = new MatTableDataSource(data);

      } else {
        this.noData = true;
        this.dataSource = data;
      }

      this.isLoading = false;

    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.feedbackService.getResolvedFeedbacksByObject(this.objectIdCompany, this.count, this.page).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  public openDialog(flag: number, feedback: Feedback) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: feedback });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadData();
        }
      }
      )
  }

  public exit() {
    this.location.back();
  }

}
