import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  public objectIdCompany: string = "";
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

  displayedColumns = ['productName', 'quantity', 'expiryDate','actions'];

  constructor(private returnService: ReturnService,
    private dialog: MatDialog,
    private router: Router,
    public activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.objectIdCompany = this.activatedRoute.snapshot.paramMap.get("objectIdCompany") as string;
    let url = this.router.url;
    if (url === '/admin/returns')
      this.showHeader = false;
    this.loadData(false);
  }

  loadData(pageChanged: boolean) {
    console.log(this.objectIdCompany);
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

  openDialog(flag: number, returnId?:Guid, retailerName?: string, objectName?: string, objectAddress?: string, objectCity?:string, objectIdCompany?:string,objectIdRetail?:string,productName?:string,productIdCompany?:string, quantity?: number, expiryDate?: Date, comment?:string, discount?:number) {
    const dialogRef = this.dialog.open(ReturnDialogComponent, { data: { returnId, retailerName,objectName, objectAddress, objectCity, objectIdCompany,objectIdRetail, productName,productIdCompany, quantity, expiryDate, comment, discount } });
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
