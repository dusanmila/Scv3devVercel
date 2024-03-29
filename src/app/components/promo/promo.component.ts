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
import { ProductService } from 'src/app/Services/product.service';
import { PromoEvaluatorService } from 'src/app/Services/promo-evaluator.service';
import { PromoService } from 'src/app/Services/promo.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UserService } from 'src/app/Services/user.service';


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
  displayedColumnsFinished: string[] = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'type', 'expenses', 'regularSale', 'resultSale', 'uplift', 'ropi', 'ropiCash', 'promoGp2', 'promoGp2Cash', 'actions'];
  displayedColumnsUnfinished: string[] = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'type', 'expenses', 'regularSale', 'estimatePromoSale', 'estimateUplift', 'estimateRopi', 'estimateRopiCash', 'estimateGP', 'estimateGPCash', 'actions'];
  dataSource: MatTableDataSource<Promo>;
  dataSourceUnfinished: MatTableDataSource<Promo>;
  dataSourceDeclined: MatTableDataSource<Promo>;
  noData: boolean = false;
  isMyConfirmation: boolean = false;
  count: number = 5;
  page: number = 1;
  length: number = 0;
  type: string = 'PROMO_LIST';
  isEvaluator: boolean = false;
  selectedStartDate: string = '';
  selectedEndDate: string = '';
  retailerFormControl = new FormControl('');
  retailerNames: string[] = [];
  filteredRetailerNames: Observable<string[]>;
  search: string = '';
  selectedRetailerName: string = "";
  productFormControl = new FormControl('');
  productNames: string[] = [];
  filteredProductNames: Observable<string[]>;
  selectedProductName: string = "";
  userFormControl = new FormControl('');
  userNames: string[] = [];
  filteredUserNames: Observable<string[]>;
  selectedUserName: string = "";
  currentDate: Date = new Date();
  panelOpenState = false;
  loggedUser = localStorage.getItem('username');
  state: string = ''
  states = [
    { name: 'Actual', value: 'ACTUAL' },
    { name: 'Declined', value: 'DECLINED' },
    { name: 'Finished', value: 'FINISHED' },
    { name: 'For confirmation', value: 'FOR_CONFIRMATION' },
  ]

  declinedPromos: Promo[];

  constructor(public objectService: ObjectService,
    public productService: ProductService,
    public promoService: PromoService,
    public datePipe: DatePipe,
    public promoEvaluatorService: PromoEvaluatorService,
    public dialog: MatDialog,
    public userService: UserService) { }

  ngOnInit(): void {
    registerLocaleData(es);
    this.checkIfUserEvaluator();
    this.getPromos(false);
    this.editDisplayedColumns();
    this.getRetailerNames();
    this.getProductNames();
    this.getUserNames();


  }

  private _filterRetailerNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.retailerNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterProductNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterUserNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.userNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  getPromos(pageChanged: boolean) {
    console.log(this.type)
    if (!pageChanged)
      this.page = 1;
    let username = localStorage.getItem("username") as string;
    this.selectedRetailerName = this.retailerFormControl.value;
    this.selectedProductName = this.productFormControl.value;
    this.selectedUserName = this.userFormControl.value;
    this.promoService.getPromos(this.count, this.page, this.type, this.state, username, this.selectedRetailerName, this.selectedProductName, this.selectedStartDate, this.selectedEndDate, this.selectedUserName).subscribe(data => {

      this.promos = data;
    

      this.dataSource = new MatTableDataSource<Promo>(data);
      this.dataSourceDeclined = new MatTableDataSource<Promo>(this.declinedPromos);

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

  getProductNames() {
    this.productService.getProductNames().subscribe(data => {
      this.productNames = data;
      this.filteredProductNames = this.productFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterProductNames(value || '')),
      );
    });
  }

  getUserNames() {
    this.userService.getUsers(0, 0, '').subscribe(data => {
      this.userNames = data.map(element => element.username);
      this.filteredUserNames = this.userFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUserNames(value || '')),
      );
    });
  }

  checkIfUserEvaluator() {
    let username = localStorage.getItem("username") as string;
    this.promoEvaluatorService.checkIfUserEvaluator(username).subscribe(data => {
      this.isEvaluator = data;
    });
  }

  changeState(event) {
  
    if(event.value=="MY_CONFIRMATION"){
      this.type=event.value;
     this.state='';
    }else{
      this.type = event.value;
      this.state = event.value;
    }
    this.editDisplayedColumns();
    this.getPromos(false);
  }

  confirmPromo(promo: Promo) {
    this.promoService.confirmPromo(promo).subscribe(data => {
      this.getPromos(false);
    });
  }

  openDialog(flag: number, declinedAddComment: boolean, promoId?: Guid, creatorUsername?: string, retailerName?: string, productName?: string, declined?: boolean, comment?: string, dateStart?: string, dateEnd?: string, rebate?: number, isRebateCascade?: boolean, regularSale?: number, type?: string, estimateRopi?: number, ropi?: number, estimateRopiCash?: number, ropiCash?: number, estimatePromoSale?: number, expenses?: number, price?: number, resultSale?: number, estimateGP?: number, gp?: number, estimateGPCash?: number, gpCash?: number) {

    const dialogRef = this.dialog.open(PromoDialogComponent, { data: { promoId, creatorUsername, retailerName, productName, declined, comment, dateStart, dateEnd, rebate, isRebateCascade, regularSale, type, estimateRopi, ropi, estimateRopiCash, ropiCash, estimatePromoSale, expenses, price, resultSale, estimateGP, gp, estimateGPCash, gpCash } });
    dialogRef.componentInstance.flag = flag;

    dialogRef.componentInstance.isDeclined = declinedAddComment;


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
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'type', 'expenses', 'estimatePromoSale', 'regularSale', 'estimateUplift', 'estimateRopi', 'estimateRopiCash', 'promoGp2', 'estimateGP', 'actions'];
    }
    else if (this.type === 'PROMO_LIST') {
      this.displayedColumns = ['retailer', 'product', 'startDate', 'endDate', 'rebate', 'type', 'expenses', 'estimatePromoSale', 'regularSale', 'estimateUplift', 'estimateRopi', 'estimateRopiCash', 'promoGp2', 'estimateGP', 'actions'];
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

  format(x: number, regularSale: number): string {
    const res = (x / regularSale) * 100 - 100;
    return res.toFixed(2); // Format to 2 decimal places
  }

  isDateBeforeToday(dateString: string): boolean {
    // Parse the input date string into a Date object
    const inputDate = new Date(dateString);

    // Get today's date
    const today = new Date();

    // Use the comparison operator to check if the input date is before today
    return inputDate < today;
  }

}