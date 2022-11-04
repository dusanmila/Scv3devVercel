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
export class UploadsComponent {

  objectsFile: any;
  positionsFile: any;
  productsFile: any;
  isObjLoading = false;
  isPosLoading = false;
  isProdLoading = false;

  constructor(public objectService: ObjectService,
    public positionService: PositionService,
    public productService: ProductService,
    public snackBar: MatSnackBar) { }



  uploadObjectsFile(event: any) {
    this.isObjLoading = true;
    this.objectsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.objectsFile);
    this.objectService.excelImport(formData).subscribe(data => {
      this.isObjLoading = false;
      this.snackBar.open("Objects added.", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
    });
  }

  uploadPositionsFile(event: any) {
    this.isPosLoading = true;
    this.positionsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.positionsFile);

    this.positionService.excelImport(formData).subscribe(data => {
      this.isPosLoading = false;
      this.snackBar.open("Secondary positions added.", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
    });
  }

  uploadProductsFile(event: any) {
    this.isProdLoading = true;
    this.productsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.productsFile);

    this.productService.excelImport(formData).subscribe(data => {
      this.isProdLoading = false;
      this.snackBar.open("Products added.", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
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

}
