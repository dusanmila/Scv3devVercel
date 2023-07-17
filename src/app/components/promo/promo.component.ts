import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { PromoDialogComponent } from 'src/app/dialogs/promo-dialog/promo-dialog.component';
import { Product } from 'src/app/models/product';
import { Promo } from 'src/app/models/promo';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';
import { ProductService } from 'src/app/Services/product.service';
import { PromoEvaluatorService } from 'src/app/Services/promo-evaluator.service';
import { PromoService } from 'src/app/Services/promo.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css'],
})
export class PromoComponent implements OnInit {

  promos: Promo[];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Promo>;
  noData: boolean = false;
  count: number = 5;
  page: number = 1;
  length: number = 0;
  type: string = 'FOR_CONFIRMATION';
  isEvaluator: boolean = false;
  selectedDate: Date = new Date();

  constructor(public objectService: ObjectService,
    public productService: ProductService,
    public promoService: PromoService,
    public datePipe: DatePipe,
    public promoEvaluatorService: PromoEvaluatorService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.checkIfUserEvaluator();
    this.getPromos(false);
    this.editDisplayedColumns();
  }

  getPromos(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    let username = localStorage.getItem("username") as string;
    this.promoService.getPromos(this.count, this.page, this.type, username, this.selectedDate).subscribe(data => {
      this.promos = data;
      this.dataSource = new MatTableDataSource<Promo>(data);
      if (!data) {
        this.noData = true;
        this.length = 0;
      } else {
        this.length = data[0].totalCount;
        this.noData = false;
      }
    });
  }

  loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getPromos(true);
  }

  checkIfUserEvaluator() {
    let username = localStorage.getItem("username") as string;
    this.promoEvaluatorService.checkIfUserEvaluator(username).subscribe(data => {
      this.isEvaluator = data;
    });
  }

  changeType(event) {
    this.type = event.value;
    this.editDisplayedColumns();
    this.getPromos(false);
  }

  confirmPromo(promo: Promo) {
    this.promoService.confirmPromo(promo).subscribe(data => {
      this.getPromos(false);
    });
  }

  openDialog(flag: number, promoId?: Guid, retailerName?: string, productName?: string, dateStart?: string, dateEnd?: string, rebate?: number, regularSale?: number, type?: string, adsCost?: number, promoSale?: number, promoCost?: number, price?: number, resultSale?: number) {
    const dialogRef = this.dialog.open(PromoDialogComponent, { data: { promoId, retailerName, productName, dateStart, dateEnd, rebate, regularSale, type, adsCost, promoSale, promoCost, price, resultSale } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getPromos(false);
      }
    });
  }

  calculateDiff(endDate) {
    let currentDate = new Date();
    endDate = new Date(endDate);
    let result = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())) / (1000 * 60 * 60 * 24));
    return result;
  }

  openDatePicker(dp) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?: any) {
    this.selectedDate = eventData;
    this.getPromos(false);
    dp.close();
  }

  editDisplayedColumns() {
    if (this.type === 'MY_CONFIRMATION') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'actions'];
    }
    else if (this.type === 'FOR_CONFIRMATION') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'resultSalePercent', 'actions'];
    }
    else if (this.type === 'FINISHED') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'resultSalePercent', 'actions'];
    }
    else if (this.type === 'ACTUAL') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate'];
    }
  }

}