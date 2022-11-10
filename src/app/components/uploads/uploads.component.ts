import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  objectsFile: any;
  positionsFile: any;
  productsFile: any;
  isObjLoading = false;
  isPosLoading = false;
  isProdLoading = false;
  errorMessage!: string;
  isObjectsEmpty=false;
  isPositionsEmpty=false;
  isProductsEmpty=false;


  constructor(public objectService: ObjectService,
    public positionService: PositionService,
    public productService: ProductService,
    public snackBar: MatSnackBar) { }

    ngOnInit(){
 this.objectService.checkNoData().subscribe((data)=>this.isObjectsEmpty=data);
 this.positionService.checkNoData().subscribe((data)=>this.isPositionsEmpty=data);
 this.productService.checkNoData().subscribe((data)=>this.isProductsEmpty=data);

    }

  uploadObjectsFile(event: any) {
    this.errorMessage = '';
    this.isObjLoading = true;
    this.objectsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.objectsFile);
    this.objectService.excelImport(formData).subscribe({
      next: data => {
        this.isObjLoading = false;
        this.snackBar.open("Objects added.", "Close", {
          duration: 2500,
          panelClass: ['blue-snackbar']
        });
      },
      error: err => {
        this.isObjLoading = false;
        this.errorMessage = err.error;
      }
    });
  }

  uploadPositionsFile(event: any) {
    this.errorMessage = '';
    this.isPosLoading = true;
    this.positionsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.positionsFile);

    this.positionService.excelImport(formData).subscribe({
      next: data => {
        this.isPosLoading = false;
        this.snackBar.open("Secondary positions added.", "Close", {
          duration: 2500,
          panelClass: ['blue-snackbar']
        });
      },
      error: err => {
        this.isPosLoading = false;
        this.errorMessage = err.error;
      }
    });
  }

  uploadProductsFile(event: any) {
    this.errorMessage = ''
    this.isProdLoading = true;
    this.productsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.productsFile);

    this.productService.excelImport(formData).subscribe({
      next: data => {
        this.isProdLoading = false;
        this.snackBar.open("Products added.", "Close", {
          duration: 2500,
          panelClass: ['blue-snackbar']
        });
      },
      error: err => {
        console.log(err);
        this.isProdLoading = false;
        this.errorMessage = err.error;
      }
    });
  }

  downloadTemplate(flag: number) {
    console.log('downloading...')
    if (flag === 1)
      this.objectService.downloadExcelTemplate();
    else if (flag === 2)
      this.positionService.downloadExcelTemplate();
    else if (flag === 3)
      this.productService.downloadExcelTemplate();
  }

  deleteObjects(){
    this.objectService.deleteObjects().subscribe({
      next: () => {
        this.isObjectsEmpty=true;

      },
      error: (err: Error) => {
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  deletePositions(){
    this.positionService.deletePositions().subscribe({
      next: () => {
        this.isPositionsEmpty=true;

      },
      error: (err: Error) => {
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  deleteProducts(){
    this.productService.deleteProducts().subscribe({
      next: () => {
        this.isProductsEmpty=true;

      },
      error: (err: Error) => {
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

}
