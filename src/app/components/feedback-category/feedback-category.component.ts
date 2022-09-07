import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackCategoryDialogComponent } from 'src/app/dialogs/feedback-category-dialog/feedback-category-dialog.component';
import { FeedbackCategory } from 'src/app/models/feedbackCategory';
import { FeedbackCategoryService } from 'src/app/Services/feedback-category.service';

@Component({
  selector: 'app-feedback-category',
  templateUrl: './feedback-category.component.html',
  styleUrls: ['./feedback-category.component.css']
})
export class FeedbackCategoryComponent implements OnInit {

  displayedColumns = ["feedbackCategoryName", "actions"];
  dataSource: MatTableDataSource<FeedbackCategory>;
  isLoading: boolean = false;
  noData: boolean = false;

  constructor(public feedbackCategoryService: FeedbackCategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.isLoading = true;
    this.feedbackCategoryService.getFeedbackCategories().subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<FeedbackCategory>(data);
        this.noData = false;
      } else {
        this.noData = true;
        this.dataSource = data;
      }
      this.isLoading = false;
    });
  }

  public openDialog(flag: number, feedbackCategoryName?: string) {
    const dialogRef = this.dialog.open(FeedbackCategoryDialogComponent, { data: { feedbackCategoryName } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData();
      }
    });
  }

}
