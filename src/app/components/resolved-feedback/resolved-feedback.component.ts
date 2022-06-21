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

  public objectName: string;
  public count: number = 5;
  public page: number = 1;
  public length: number = 100;
  public pageEvent: PageEvent;

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
    this.objectName = this.activatedRoute.snapshot.paramMap.get("objectName") as string;
    this.loadData();
  }

  public loadData() {
    this.feedbackService.getResolvedFeedbacksByObject(this.objectName, this.count, this.page).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    console.log(this.page);
    this.feedbackService.getResolvedFeedbacksByObject(this.objectName, this.count, this.page).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
  }


  // public openDialog(flag: number, feedbackCategoryName?: string, text?: string, date?: string, resolved?: string, img?: string, username?: string, imgResolve?: string) {
  //   const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: { feedbackCategoryName, text, date, resolved, img, username, imgResolve } });

  //   dialogRef.componentInstance.flag = flag;
  //   dialogRef.afterClosed()
  //     .subscribe(res => {
  //       if (res === 1) {
  //         this.loadData();
  //       }
  //     }
  //     )
  // }

  public openDialog(flag: number, feedback: Feedback) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: feedback  });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
          this.loadData();
        }
      }
      )
  }

  public exit() {
    this.location.back();
  }

}
