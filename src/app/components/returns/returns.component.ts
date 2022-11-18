import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ReturnDialogComponent } from 'src/app/dialogs/returndialog/returndialog.component';
//import { ReturnDialogComponent } from 'src/app/dialogs/returns-dialog/returns-dialog.component';
import { Return } from 'src/app/models/returns';
import { ReturnService } from 'src/app/Services/returns.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnComponent implements OnInit {

  count: number = 0;
  page: number = 0;
  search: string = '';
  length: number = 0;
  isLoading: boolean = false;
  noData: boolean = false;
  showHeader: boolean = true;
  dataSource: MatTableDataSource<Return>;
  reg = /^-?\d*[.,]?\d{0,2}$/;
  priceFormControls: FormControl[] = [];
  actionPriceFormControls: FormControl[] = [];

  displayedColumns = ['productName', 'quantity', 'expiryDate', 'objectName','actions'];

  constructor(private returnService: ReturnService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url;
    if (url === '/admin/returns')
      this.showHeader = false;
    this.loadData(false);
  }

  loadData(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    this.returnService.getReturn(this.count, this.page, this.search).subscribe(data => {
      this.isLoading = true;
      if (data) {
        this.dataSource = new MatTableDataSource<Return>(data);
        this.length = data[0].totalCount;
        this.noData = false;
        data.forEach(i => {
          this.priceFormControls.push(new FormControl('', [Validators.required, Validators.pattern(this.reg)]));
          this.actionPriceFormControls.push(new FormControl('', [Validators.required, Validators.pattern(this.reg)]));
        });
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0
      }
      this.isLoading = false;
    });
  }

  loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(true);
  }

  openDialog(flag: number, returnId?: string, objectId?: Guid, productId?: Guid, quantity?: number, expiryDatee?: Date, comment?:string, discount?:number) {
    const dialogRef = this.dialog.open(ReturnDialogComponent, { data: { returnId, objectId, productId, quantity, expiryDatee, comment, discount } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData(false);
      }
    });
  }


  public exit() {
    this.router.navigate(['storeCheck']);
  }

}
