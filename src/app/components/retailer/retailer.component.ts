import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ObjectService } from 'src/app/Services/object.service';
import { RetailerDialogComponent } from 'src/app/dialogs/retailerdialog/retailerdialogcomponent';
import { FormGroup } from '@angular/forms';
import { Retailer } from 'src/app/models/retailer';
import { PageEvent } from '@angular/material/paginator';
import { PlanogramDialogComponent } from 'src/app/dialogs/planogram-dialog/planogram-dialog.component';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  @Input() isDashboard: boolean = false;
  @Output() selectedRetailer = new EventEmitter<string>();

  displayedColumns = ["retailerName", "planogramPdf", "actions"];
  dataSource: MatTableDataSource<Retailer>;

  tableForm: FormGroup;
  search: string = "";

  searchClicked: boolean = false;

  isLoading = false;
  noData = false;

  selectedRetailer2: Retailer;

  public page: number = 1;
  public count: number = 5;
  public length: number = 0;

  constructor(public objectService: ObjectService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.isDashboard)
      this.count = 2;
    this.loadData(false);
    if (this.isDashboard) {
      this.displayedColumns.splice(1, 2);
    }
  }



  public loadData(pageChanged: boolean) {
    this.isLoading = true;
    if (!pageChanged)
      this.page = 1;
    this.objectService.getRetailers(this.count, this.page, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<Retailer>(data);
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
    this.loadData(true);
  }

  public selectRetailer(retailer: Retailer) {
    this.selectedRetailer.emit(retailer.retailerName);

    // this.objectService.getOneRetailer(retailer).subscribe(data => {
    //   this.selectedRetailer = data;
    // });
  }





  public deleteRetailer() {
    this.objectService.deleteRetailer(this.selectedRetailer2).subscribe();
  }

  public openDialog(flag: number, retailerName?: string, planogramPdf?: string) {
    const dialogRef = this.dialog.open(RetailerDialogComponent, { data: { retailerName, planogramPdf } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadData(false);
        }
      }
      )
  }



  public searchByName() {
    this.noData = false;
    this.isLoading = true;
    this.objectService.getRetailersByNameContains(this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<Retailer>(data);
      } else {
        this.noData = true;
        this.dataSource = data;
      }

      this.isLoading = false;
    });
  }

  public openPlanogramDialog(retailerName: string) {
    const dialogRef = this.dialog.open(PlanogramDialogComponent, { data: retailerName });
    dialogRef.componentInstance.isAdmin = true;
  }

}
