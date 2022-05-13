import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  displayedColumns = ["feedbackCategoryName", "text", "date", "resolved", "img", "username", "date"];
  dataSource: MatTableDataSource<Feedback>;

  constructor(public activatedRoute: ActivatedRoute,
              public feedbackService: FeedbackService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.objectName = this.activatedRoute.snapshot.paramMap.get("objectName") as string;
    this.loadData();
  }

  public loadData() {
    this.feedbackService.getResolvedFeedbacksByObject(this.objectName).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  
  public openDialog(flag: number, feedbackCategoryName?: string, text?: string, date?: string, resolved?: string, img?: string, username?: string) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: { feedbackCategoryName, text, date, resolved, img, username } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
          this.loadData();
        }
      }
      )
  }

}
