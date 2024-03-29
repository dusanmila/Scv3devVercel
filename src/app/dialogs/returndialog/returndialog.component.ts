import { DatePipe } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { Return } from 'src/app/models/returns';
import { ReturnTypes } from 'src/app/models/returnType';
import { ProductService } from 'src/app/Services/product.service';
import { ReturnService } from 'src/app/Services/returns.service';

@Component({
  selector: 'app-return-dialog',
  templateUrl: './returndialog.component.html',
  styleUrls: ['./returndialog.component.css']
})
export class ReturnDialogComponent implements OnInit {

  myForm: FormGroup;

  flag: number;
  isLoading: boolean = false;
  isAutocompleteLoading: boolean = false;
  changed: boolean = false;
  searchResults: any[] = [];
  showErrorMessage: boolean = false;
  product!: string;
  selectedReturnType:string;
  public returnTypes: ReturnTypes[] = [];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Return,
    public returnService: ReturnService,
    public productService: ProductService,
    private datePipe: DatePipe,
    private fb: FormBuilder) {
    // data.expiryDate = datePipe.transform(data.expiryDate, 'dd-MMM-yy')
  }

  ngOnInit(): void {
    this.product = this.data.productName;
  
    this.productService.getProductByProductName(this.product).subscribe(data => {
      this.data.productName = data;
    });

    this.returnService.getReturnTypes().subscribe(data => {
      this.returnTypes = data;
      console.log(this.returnTypes)
    });

    this.myForm = new FormGroup({
      productName: new FormControl({ value: '', disabled: this.flag === 3 || this.flag === 4 }, [ValidateProduct]),
      quantity: new FormControl({ value: '', disabled: this.flag === 3 || this.flag === 4 }),
      expiryDate: new FormControl({ value: '', disabled: this.flag === 3 || this.flag === 4 }),
      returnTypeName: new FormControl({ value: '', disabled: this.flag === 3 || this.flag === 4 }),
      comment: new FormControl({ value: '', disabled: this.flag === 3 || this.flag === 4 })
    });
  }

  add() {
    this.data.expiryDate = this.data.expiryDate;
    this.data.productName = this.product;
    this.data.returnTypeName=this.selectedReturnType;
    console.log(this.data.returnTypeName)
    this.returnService.createReturn(this.data).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Return successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
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
    this.data.expiryDate = this.data.expiryDate;
    this.data.productName = this.product;
    this.returnService.updateReturn(this.data).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Return successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  sold() {
    this.returnService.sold(this.data.returnId).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Return successfully sold', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
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
    this.returnService.deleteReturn(this.data.returnId).subscribe(data => {
      this.isLoading = false;
      this.changed = true;
      this.snackBar.open('Return successfully deleted', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  getProducts() {
    // this.isLoading = true;
    this.isAutocompleteLoading = true;
    this.productService.getProductByProductIdCompanyOrName(this.data.productName).subscribe(data => {
      this.searchResults = data;
      this.isAutocompleteLoading = false;
    });
  }

  changeProduct(event) {
    this.product = event.option.value.productName;
  }

  close() {
    this.dialogRef.close(this.changed);
  }

  displayWith(product?: any) {
    if (typeof product === "string") {
      return product ? product : undefined;
    }
    return product ? product.productName : undefined;
  }

}

function ValidateProduct(control: AbstractControl): { [key: string]: any } | null {
  const selection: any = control.value;

  if (typeof selection === "string") {
    return { incorrect: true };
  }
  return null;
}
