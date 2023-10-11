import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ProductPriceScannerService } from 'src/app/Services/product-price-scanner.service';
import { ProductPriceScannerDialogComponent } from 'src/app/dialogs/product-price-scanner-dialog/product-price-scanner-dialog.component';
import { ProductPriceScanner } from 'src/app/models/productPriceScanner';

@Component({
  selector: 'app-product-price-scanner',
  templateUrl: './product-price-scanner.component.html',
  styleUrls: ['./product-price-scanner.component.css']
})
export class ProductPriceScannerComponent implements OnInit {

  isLoading: boolean = false;
  noData: boolean = false;
  dataSource: MatTableDataSource<ProductPriceScanner>;
  priceFormControls: FormControl[] = [];
  actionPriceFormControls: FormControl[] = [];
  displayedColumns = ['category', 'productName', 'weight', 'manufacturer', 'price', 'actionPrice'];
  reg = /^-?\d*[.,]?\d{0,2}$/;
  search: string = '';
  objectIdCompany: string = '';
  isDashboard: boolean = false;
  count: number = 5;
  page: number = 1;
  length: number = 0;

  constructor(private productPriceScannerService: ProductPriceScannerService,
    private router: Router,
    public snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.objectIdCompany = this.activatedRoute.snapshot.paramMap.get("objectIdCompany") as string;
    if (!this.objectIdCompany) {
      this.isDashboard = true;
      this.displayedColumns = ['category', 'productName', 'weight', 'manufacturer', 'actions'];
    }

    this.loadData();
  }

  loadData() {
    if (this.isDashboard) {
      this.getProducts();
    } else {
      this.getProductsByObject();
    }
  }

  loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productPriceScannerService.getProductPriceScanners(this.count, this.page, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<ProductPriceScanner>(data);
        this.noData = false;
        this.length = data[0].totalCount;
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0;
      }
      this.isLoading = false;
    });
  }

  getProductsByObject() {
    this.isLoading = true;
    this.productPriceScannerService.getProductsPriceScannerByObject(this.objectIdCompany, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<ProductPriceScanner>(data);
        this.noData = false;
        data.forEach(i => {
          this.priceFormControls.push(new FormControl('', [Validators.required, Validators.pattern(this.reg)]));
          this.actionPriceFormControls.push(new FormControl('', [Validators.required, Validators.pattern(this.reg)]));
        });
      } else {
        this.noData = true;
        this.dataSource = data;
      }
      this.isLoading = false;
    });
  }

  changePrice(product: ProductPriceScanner) {
    product.objectIdCompany = this.objectIdCompany;
    this.productPriceScannerService.updatePrice(product).subscribe({
      next: data => {
        this.snackBar.open('Successfuly changed', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      },
      error: error => {
        this.snackBar.open('An error occured.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  openDialog(flag: number, productPriceScannerId?: Guid, category?: string, productName?: string, manufacturer?: string, weight?: number) {
    const dialogRef = this.dialog.open(ProductPriceScannerDialogComponent, { data: { productPriceScannerId, category, productName, manufacturer, weight } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData();
      }
    });
  }

  public exit() {
    this.router.navigate(['storeCheck']);
  }
}

