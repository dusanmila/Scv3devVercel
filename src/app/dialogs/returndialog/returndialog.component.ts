import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Return } from 'src/app/models/returns';
import { ProductService } from 'src/app/Services/product.service';
import { ReturnService } from 'src/app/Services/returns.service';

@Component({
  selector: 'app-return-dialog',
  templateUrl: './returndialog.component.html',
  styleUrls: ['./returndialog.component.css']
})
export class ReturnDialogComponent implements OnInit {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;
  searchResults: any[] = [];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Return,
    public returnService: ReturnService,
    public productService: ProductService,
    private datePipe: DatePipe) {
    data.expiryDate = datePipe.transform(data.expiryDate, 'dd-MMM-yy')
  }

  ngOnInit(): void {

  }

  add() {
this.isLoading=true;
    this.data.expiryDate = this.datePipe.transform(this.data.expiryDate, 'yyyy-MM-dd');
    this.returnService.createReturn(this.data).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Return successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update() {
    this.isLoading=true;
    this.data.expiryDate = this.datePipe.transform(this.data.expiryDate, 'yyyy-MM-dd');
    this.returnService.updateReturn(this.data).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Return successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  sold()
  {
    this.isLoading=true;
    this.returnService.sold(this.data.returnId).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Return successfully sold', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }

  }

  delete() {
    this.isLoading=true;
    this.returnService.deleteReturn(this.data.returnId).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Return successfully deleted', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  getProducts() {
    this.isLoading=true;
    this.productService.getProductByProductIdCompanyOrName(this.data.productName).subscribe(data => {

      this.isLoading=false;
      this.searchResults = data;

    });
  }

  changeProductIdCompany(event) {
    // this.data.productIdCompany = productIdCompany;
    // console.log(this.data.productIdCompany);
    // console.log(productIdCompany)
    console.log(event)
  }

  close() {
    this.dialogRef.close(this.changed);
  }

}
