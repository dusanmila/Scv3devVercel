import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPriceScannerService } from 'src/app/Services/product-price-scanner.service';
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
  displayedColumns = ['productName', 'weight', 'manufacturer', 'price', 'actionPrice'];
  reg = /^-?\d*[.,]?\d{0,2}$/;
  search: string = '';
  objectIdCompany: string = '';

  constructor(private productPriceScannerService: ProductPriceScannerService,
    private router: Router,
    public snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.objectIdCompany = this.activatedRoute.snapshot.paramMap.get("objectIdCompany") as string;

    this.loadData();
  }

  loadData() {
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
    this.productPriceScannerService.updateProduct(product).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open('Successfuly changed', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      },
      error: error => {
        this.snackBar.open('An error occured.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  public exit() {
    this.router.navigate(['storeCheck']);
  }
}

