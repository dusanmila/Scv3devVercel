import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPriceScannerService } from 'src/app/Services/product-price-scanner.service';
import { ProductPriceScanner } from 'src/app/models/productPriceScanner';

@Component({
  selector: 'app-product-price-scanner-dialog',
  templateUrl: './product-price-scanner-dialog.component.html',
  styleUrls: ['./product-price-scanner-dialog.component.css']
})
export class ProductPriceScannerDialogComponent implements OnInit {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductPriceScannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductPriceScanner,
    private productPriceScannerService: ProductPriceScannerService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.isLoading = true;
    this.productPriceScannerService.createProduct(this.data)
      .subscribe(() => {
        this.isLoading = false;
        this.changed = true;
        this.close();
        this.snackBar.open('Product successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public update(): void {
    this.isLoading = true;
    this.productPriceScannerService.updateProduct(this.data)
      .subscribe(() => {
        this.isLoading = false;
        this.changed = true;
        this.close();
        this.snackBar.open('Updated product', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public delete(): void {
    this.isLoading = true;
    this.productPriceScannerService.deleteProduct(this.data.productPriceScannerId)
      .subscribe(() => {
        this.isLoading = false;
        this.changed = true;
        this.close();
        this.snackBar.open('Product deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public close(): void {
    this.dialogRef.close(this.changed);
  }

}
