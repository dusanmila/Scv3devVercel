import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { map, Observable, startWith } from 'rxjs';
import { AddToPredefinedDialogComponent } from 'src/app/dialogs/add-to-predefined-dialog/add-to-predefined-dialog.component';
import { PromoDialogComponent } from 'src/app/dialogs/promo-dialog/promo-dialog.component';
import { Product } from 'src/app/models/product';
import { Promo } from 'src/app/models/promo';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';
import { ProductCategoryService } from 'src/app/Services/product-category.service';
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
  selectedStartDate: string = '';
  selectedEndDate: string = '';
  retailerFormControl = new FormControl('');
  retailerNames: string[] = [];
  filteredRetailerNames: Observable<string[]>;
  search: string = '';
  selectedRetailerName: string = "";
  productCategoryFormControl = new FormControl('');
  productCategoryNames: string[] = [];
  filteredProductCategoryNames: Observable<string[]>;
  selectedProductCategoryName: string = "";

  constructor(public objectService: ObjectService,
    public productService: ProductService,
    public promoService: PromoService,
    public datePipe: DatePipe,
    public promoEvaluatorService: PromoEvaluatorService,
    public dialog: MatDialog,
    public productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.checkIfUserEvaluator();
    this.getPromos(false);
    this.editDisplayedColumns();
    this.getRetailerNames();
    this.getProductCategoryNames();
  }

  private _filterRetailerNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.retailerNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterProductCategoryNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productCategoryNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  getPromos(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    let username = localStorage.getItem("username") as string;
    this.selectedRetailerName = this.retailerFormControl.value;
    this.selectedProductCategoryName = this.productCategoryFormControl.value;
    this.promoService.getPromos(this.count, this.page, this.type, username, this.selectedRetailerName, this.selectedProductCategoryName, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
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

  getRetailerNames() {
    this.objectService.getRetailerNames().subscribe(data => {
      this.retailerNames = data;
      this.filteredRetailerNames = this.retailerFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterRetailerNames(value || '')),
      );
    });
  }

  getProductCategoryNames() {
    this.productCategoryService.getProductCategoryNames().subscribe(data => {
      this.productCategoryNames = data;
      this.filteredProductCategoryNames = this.productCategoryFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterProductCategoryNames(value || '')),
      );
    });
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

  openDialog(flag: number, promoId?: Guid, retailerName?: string, productName?: string, dateStart?: string, dateEnd?: string, rebate?: number, regularSale?: number, type?: string, ropi?: number, ropiCash?: number, estimatePromoSale?: number, expenses?: number, price?: number, resultSale?: number, predefined?: boolean) {
    const dialogRef = this.dialog.open(PromoDialogComponent, { data: { promoId, retailerName, productName, dateStart, dateEnd, rebate, regularSale, type, ropi, ropiCash, estimatePromoSale, expenses, price, resultSale, predefined } });
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

  editDisplayedColumns() {
    if (this.type === 'MY_CONFIRMATION') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'expenses', 'regularSale', 'estimatePromoSale', 'estimateRopi', 'estimateRopiCash','estimateUplift', 'actions'];
    }
    else if (this.type === 'FOR_CONFIRMATION') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'expenses', 'regularSale', 'estimatePromoSale', 'estimateRopi', 'estimateRopiCash','estimateUplift', 'actions'];
    }
    else if (this.type === 'FINISHED') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'expenses', 'regularSale', 'estimatePromoSale', 'resultSalePercent', 'estimateRopi', 'ropi', 'ropiDifference', 'estimateRopiCash', 'ropiCash', 'ropiCashDifference','uplift','estimateUplift', 'actions'];
    }
    else if (this.type === 'ACTUAL') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'expenses', 'regularSale', 'estimatePromoSale', 'estimateRopi', 'estimateRopiCash','estimateUplift',];
    }
    else if (this.type === 'PREDEFINED') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'expenses', 'regularSale', 'estimatePromoSale', 'estimateRopi', 'estimateRopiCash','estimateUplift', 'actions'];
    }
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    const date1 = new Date(dateRangeStart.value);
    const date2 = new Date(dateRangeEnd.value);
    this.selectedStartDate = date1.toDateString();
    this.selectedEndDate = date2.toDateString();
    this.getPromos(false);
  }

  setPredefined(promo: Promo, predefined: boolean) {
    const dialogRef = this.dialog.open(AddToPredefinedDialogComponent);
    dialogRef.componentInstance.flag = predefined ? 1 : 2;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        promo.predefined = predefined;
        this.promoService.updatePromoResultSale(promo).subscribe(data => {
          this.getPromos(false);
        });
      }
    });
  }

}