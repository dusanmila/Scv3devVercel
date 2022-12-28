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

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  promos: Promo[];
  displayedColumns: string[] = ['retailer', 'product', 'startDate', 'endDate'];
  dataSource: MatTableDataSource<Promo>;
  noData: boolean = false;
  count: number = 5;
  page: number = 1;
  length: number = 0;
  type: string = 'FOR_CONFIRMATION';
  isEvaluator: boolean = false;

  constructor(public objectService: ObjectService,
    public productService: ProductService,
    public promoService: PromoService,
    public datePipe: DatePipe,
    public promoEvaluatorService: PromoEvaluatorService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.checkIfUserEvaluator();
    this.getPromos(false);
    if (this.type === "MY_CONFIRMATION") {
      this.displayedColumns.push('actions');
    }
  }

  getPromos(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    let username = localStorage.getItem("username") as string;
    this.promoService.getPromos(this.count, this.page, this.type, username).subscribe(data => {
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
    if (this.type === "MY_CONFIRMATION") {
      this.displayedColumns.push('actions');
    } else {
      let index = this.displayedColumns.indexOf('actions');
      if (index >= 0)
        this.displayedColumns.splice(index, 1);
    }
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

}