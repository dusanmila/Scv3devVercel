import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConditionsService } from 'src/app/Services/conditions.service';
import { ObjectService } from 'src/app/Services/object.service';
import { ProductCategoryService } from 'src/app/Services/product-category.service';
import { Condition } from 'src/app/models/condition';
import { ProductCategory } from 'src/app/models/productCategory';
import { Retailer } from 'src/app/models/retailer';

@Component({
  selector: 'app-condition-dialog',
  templateUrl: './condition-dialog.component.html',
  styleUrls: ['./condition-dialog.component.css']
})
export class ConditionDialogComponent implements OnInit {

  flag: number;
  retailers: Retailer[] = [];
  productCategories: ProductCategory[] = [];
  isLoading: boolean = false;
  changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Condition,
    private conditionService: ConditionsService,
    private objectService: ObjectService,
    private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.loadRetailers();
    this.loadProductCategories();
  }

  public loadRetailers() {
    this.objectService.getRetailersNoPagination().subscribe(data => {
      this.retailers = data;
    });
  }

  public loadProductCategories() {
    this.productCategoryService.getProductCategories(0, 0, '').subscribe(data => {
      this.productCategories = data;
    });
  }

  public add(): void {
    this.isLoading = true;
    this.conditionService.createCondition(this.data)
      .subscribe(() => {
        this.isLoading = false;
        this.changed = true;
        this.close();
        this.snackBar.open('Condition successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public update(): void {
    this.isLoading = true;
    this.conditionService.updateCondition(this.data)
      .subscribe(() => {
        this.isLoading = false;
        this.changed = true;
        this.close();
        this.snackBar.open('Updated condition', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public delete(): void {
    this.isLoading = true;
    this.conditionService.deleteCondition(this.data.conditionId)
      .subscribe(() => {
        this.isLoading = false;
        this.changed = true;
        this.close();
        this.snackBar.open('Condition deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
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
