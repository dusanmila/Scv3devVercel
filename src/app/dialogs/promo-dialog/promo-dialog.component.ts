import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Promo } from 'src/app/models/promo';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';
import { ProductService } from 'src/app/Services/product.service';
import { PromoService } from 'src/app/Services/promo.service';

@Component({
  selector: 'app-promo-dialog',
  templateUrl: './promo-dialog.component.html',
  styleUrls: ['./promo-dialog.component.css']
})
export class PromoDialogComponent implements OnInit {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;
  retailers: Retailer[];
  products: Product[];
  promoTypes: string[] = ['On', 'Off'];
  currentDate: Date = new Date();
  selectedRetailer: Retailer;
  selectedProduct: Product;
  retailerNames: string[] = [];
  filteredRetailerNames: string[] = [];
  selectedRetailerName: string = "";
  showRetailerError = false;
  productNames: string[] = [];
  filteredProductNames: string[] = [];
  selectedProductName: string = "";
  showProductError = false;
  isDeclined:boolean=false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PromoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Promo,
    public datePipe: DatePipe,
    public promoService: PromoService,
    public objectService: ObjectService,
    public productService: ProductService) {
  }

  ngOnInit(): void {
    this.getRetailers();
    this.getProducts();
    this.getRetailerNames();
    this.getProductNames();
  }

  add() {
    this.isLoading = true;
    this.data.creatorUsername = localStorage.getItem("username") as string;
    this.promoService.createPromo(this.data).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Promotion successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update(isDecline:boolean) {
    this.isLoading = true;
    if(isDecline){
      this.data.declined=true;
    }
   
    if(!isDecline){
      this.promoService.updatePromoResultSale(this.data).subscribe(data => {
        this.isLoading = false;
        this.changed = true;
        this.snackBar.open('Promo successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
        this.close();
      }),
        (error: Error) => {
          this.isLoading = false;
          console.log(error.name + ' -> ' + error.message)
          this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
          this.close();
        }
    }else{
      this.promoService.declinePromo(this.data).subscribe(data => {
        this.isLoading = false;
        this.changed = true;
        this.snackBar.open('Promo successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
        this.close();
      }),
        (error: Error) => {
          this.isLoading = false;
          console.log(error.name + ' -> ' + error.message)
          this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
          this.close();
        }
    }
    
  }

  confirmPromo() {
    this.isLoading = true;
    this.promoService.confirmPromo(this.data).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Promo successfully confirmed', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  delete() {
    this.isLoading = true;
    this.promoService.deletePromo(this.data.promoId).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Promotion successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  getRetailers() {
    this.objectService.getRetailers(0, 0, '').subscribe(data => {
      this.retailers = data;
      if (this.data.retailerName) {
        let index = this.retailers.findIndex(r => r.retailerName === this.data.retailerName);
        this.selectedRetailer = this.retailers[index];
      }
    });
  }

  getRetailerNames() {
    this.objectService.getRetailerNames().subscribe(data => {
      this.retailerNames = data;
    });
  }

  onRetailerInputChange(event): void {
    this.filteredRetailerNames = this._filterRetailerNames(event.target.value);
    if (event.target.value === '') {
      this.showRetailerError = false;
    } else {
      this.showRetailerError = !this.retailerNames.includes(event.target.value) && this.filteredRetailerNames.length === 0;
    }
  }

  private _filterRetailerNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.retailerNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  getProducts() {
    this.productService.getProducts(0, 0, '').subscribe(data => {
      this.products = data;
      if (this.data.productName) {
        let index = this.products.findIndex(p => p.productName === this.data.productName);
        this.selectedProduct = this.products[index];
      }
    });
  }

  getProductNames() {
    this.productService.getProductNames().subscribe(data => {
      this.productNames = data;
    });
  }

  onProductInputChange(event): void {
    this.filteredProductNames = this._filterProductNames(event.target.value);
    if (event.target.value === '') {
      this.showProductError = false;
    } else {
      this.showProductError = !this.productNames.includes(event.target.value) && this.filteredProductNames.length === 0;
    }
  }

  private _filterProductNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectRetailer(event) {
    this.data.retailerName = event.value.retailerName;
  }

  selectProduct(event) {
    this.data.productIdCompany = event.value.productIdCompany;
  }

  selectStartDate(event) {
    let date = event.value;
    this.data.dateStart = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  selectEndDate(event) {
    let date = event.value;
    this.data.dateEnd = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  selectPromoType(event) {
    this.data.type = event.value;
  }

  close() {
    this.dialogRef.close(this.changed);
  }

}
