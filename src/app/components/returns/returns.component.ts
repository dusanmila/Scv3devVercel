import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ReturnDialogComponent } from 'src/app/dialogs/returndialog/returndialog.component';
import { Obj } from 'src/app/models/object';
//import { ReturnDialogComponent } from 'src/app/dialogs/returns-dialog/returns-dialog.component';
import { Return } from 'src/app/models/returns';
import { ObjectService } from 'src/app/Services/object.service';
import { ReturnService } from 'src/app/Services/returns.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnComponent implements OnInit {
  public objectIdCompany: string = "";
  public object: Obj;
  count: number = 5;
  page: number = 0;
  search: string = '';
  length: number = 0;
  isLoading: boolean = false;
  noData: boolean = false;
  showHeader: boolean = true;

  datenow = new Date();

  dataSource: MatTableDataSource<Return>;
  reg = /^-?\d*[.,]?\d{0,2}$/;

  displayedColumns = ['productName', 'quantity', 'expiryDate', 'returnTypeName', 'actions'];

  constructor(private returnService: ReturnService,
    private objectService: ObjectService,
    private dialog: MatDialog,
    private router: Router,
    public activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {

    this.objectIdCompany = this.activatedRoute.snapshot.paramMap.get("objectIdCompany") as string;
    let url = this.router.url;
    if (url === '/admin/returns')
      this.showHeader = false;

    this.objectService.getObjectByObjectIdCompany(this.objectIdCompany).subscribe(data => {
      if (data) {
        this.object = data;
      }

    })

    this.loadData(false);
  }

  loadData(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    this.returnService.getReturnsByObject(this.count, this.page, this.search, this.objectIdCompany).subscribe(data => {
      this.isLoading = true;
      if (data) {
        this.dataSource = new MatTableDataSource<Return>(data);
        this.length = data[0].totalCount;
        this.noData = false;

        data.forEach(data1 => {
          
          data1.expiryDate=new Date(data1.expiryDate);
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

  openDialog(flag: number, returnId?: Guid, retailerName?: string, objectName?: string, objectAddress?: string, objectCity?: string, objectIdCompany?: string, objectIdRetail?: string, productName?: string, productIdCompany?: string, quantity?: number, expiryDate?: Date, comment?: string, discount?: number,returnTypeName?: string) {
    const dialogRef = this.dialog.open(ReturnDialogComponent, { data: { returnId, retailerName, objectName, objectAddress, objectCity, objectIdCompany: this.objectIdCompany, objectIdRetail, productName, productIdCompany, quantity, expiryDate, comment, discount, returnTypeName } });
    dialogRef.componentInstance.flag = flag;
    
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData(false);
      }
    });
  }

  public exit() {
    this.router.navigate(['/chooseObject/returns']);
  }

}
