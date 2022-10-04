import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategory } from 'src/app/models/productCategory';
import { ProductCategoryService } from 'src/app/Services/product-category.service';

@Component({
  selector: 'app-product-category-dialog',
  templateUrl: './product-category-dialog.component.html',
  styleUrls: ['./product-category-dialog.component.css']
})
export class ProductCategoryDialogComponent  {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategory,
    public productCategoryService: ProductCategoryService) { }


  add() {
    this.productCategoryService.createProductCategory(this.data).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Product category successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update() {
    this.productCategoryService.updateProductCategory(this.data).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Product category successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  delete() {
    this.productCategoryService.deleteProductCategory(this.data.productCategoryName).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Product category successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  close() {
    this.dialogRef.close(this.changed);
  }

}
