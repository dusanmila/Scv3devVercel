import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductCategoryService } from 'src/app/Services/product-category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;
  productCategoryNames: string[] = [];
  filteredProductCategoryNames: string[] = [];
  selectedProductCategoryName: string = "";
  showProductCategoryNameError = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getProductCategoryNames();
  }

  add() {
    this.isLoading = true;
    this.productService.createProduct(this.data).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Product successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update() {
    this.isLoading = true;
    this.productService.updateProduct(this.data).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Product successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
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
    this.productService.deleteProduct(this.data.productIdCompany).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Product successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  close() {
    this.dialogRef.close(this.changed);
  }

  getProductCategoryNames() {
    this.productCategoryService.getProductCategoryNames().subscribe(data => {
      this.productCategoryNames = data;
    });
  }

  onProductCategoryInputChange(event): void {
    this.filteredProductCategoryNames = this._filterProductCategoryNames(event.target.value);
    if (event.target.value === '') {
      this.showProductCategoryNameError = false;
    } else {
      this.showProductCategoryNameError = !this.productCategoryNames.includes(event.target.value) && this.filteredProductCategoryNames.length === 0;
    }
  }

  private _filterProductCategoryNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productCategoryNames.filter(option => option.toLowerCase().includes(filterValue));
  }

}
