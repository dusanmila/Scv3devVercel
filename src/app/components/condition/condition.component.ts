import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { ConditionsService } from 'src/app/Services/conditions.service';
import { ConditionDialogComponent } from 'src/app/dialogs/condition-dialog/condition-dialog.component';
import { Condition } from 'src/app/models/condition';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {

  displayedColumns = ["retailer", "productCategory", "on", "off", "fix", "actions"];
  dataSource: MatTableDataSource<Condition>;
  isLoading = false;

  noData = false;
  search: string = "";
  page: number = 1;
  count: number = 5;
  length: number = 0;

  constructor(private conditionService: ConditionsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.isLoading = true;
    this.conditionService.getConditions(this.count, this.page, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<Condition>(data);
        this.length = data[0].totalCount;
        this.noData = false;
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0
      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData();
  }

  public openDialog(flag: number, conditionId?: Guid, retailerName?: string, productCategoryName?: string, on?: number, off?: number, fix?: number) {
    const dialogRef = this.dialog.open(ConditionDialogComponent, { data: { conditionId, retailerName, productCategoryName, on, off, fix } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData();
      }
    });
  }

}
