import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from 'src/app/models/position';
import { PositionClass } from 'src/app/models/positionClass';
import { PositionType } from 'src/app/models/positionType';
import { ProductCategory } from 'src/app/models/productCategory';
import { PositionService } from 'src/app/Services/position-service.service';
import { ProductCategoryService } from 'src/app/Services/product-category.service';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css']
})
export class PositionDialogComponent implements OnInit {

  public flag: number;
  public objectIdCompany: string;
  public positionClasses: PositionClass[];
  public positionTypes: PositionType[];
  public productCategories: ProductCategory[];
  public changed: boolean = false;
  public suppliers = ['Frikom', 'Other'];
  public locations = ['Magacin', 'Prodajni prostor'];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position,
    public positionService: PositionService,
    public productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.loadPositionClasses();
    this.loadPositionTypes();
    this.loadProductCategories();
  }

  public loadPositionClasses() {
    this.positionService.getPositionClasses().subscribe(data => {
      this.positionClasses = data;
    });
  }

  public loadPositionTypes() {
    this.positionService.getPositionTypes().subscribe(data => {
      this.positionTypes = data;
    });
  }

  public loadProductCategories() {
    this.productCategoryService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });
  }

  public add() {
    this.data.objectIdCompany = this.objectIdCompany;
    this.data.valid = false;
    this.positionService.createPosition(this.data).subscribe({
      next: () => {
        this.changed = true;
        this.close();
        this.snackBar.open('Secondary position added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      },
      error: (err: Error) => {
        console.log(err.name + ' -> ' + err.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  public delete() {
    this.positionService.deletePosition(this.data).subscribe({
      next: () => {
        this.changed = true;
        this.snackBar.open('Secondary position deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      },
      error: (err: Error) => {
        console.log(err.name + ' -> ' + err.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
