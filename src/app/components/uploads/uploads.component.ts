import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';
import { ProductService } from 'src/app/Services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import * as saveAs from 'file-saver';
import { Retailer } from 'src/app/models/retailer';
import { Obj } from 'src/app/models/object';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PositionType } from 'src/app/models/positionType';
import { ProductCategoryService } from 'src/app/Services/product-category.service';
import { ProductCategory } from 'src/app/models/productCategory';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  myControl = new FormControl('');
  objectsFile: any;
  positionsFile: any;
  productsFile: any;
  isObjLoading = false;
  isPosLoading = false;
  isProdLoading = false;
  errorMessage!: string;
  isObjectsEmpty = false;
  isPositionsEmpty = false;
  isProductsEmpty = false;
  isWithImages = false;
  selectedRetailer: string = "All";
  selectedObject: string = "All";
  selectedType: string = "All";
  selectedFormat: string = "All";
  selectedCategory: string = "All";
  filteredOptions: Observable<Obj[]>;

  error: boolean = false;
  isUploading = false;
  deletingObjects = false;
  deletingProducts = false;

  retailers: Retailer[];
  objects: Obj[];
  types: PositionType[];
  formats: string[];
  categories: ProductCategory[];


  constructor(public objectService: ObjectService,
    public positionService: PositionService,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.objectService.checkNoData().subscribe((data) => this.isObjectsEmpty = data);
    this.positionService.checkNoData().subscribe((data) => this.isPositionsEmpty = data);
    this.productService.checkNoData().subscribe((data) => this.isProductsEmpty = data);
    this.objectService.getRetailersNoPagination().subscribe((data) => this.retailers = data);
    this.positionService.getPositionTypes().subscribe((data) => this.types = data);
    this.objectService.getObjectFormats().subscribe((data) => this.formats = data);
    this.productCategoryService.getProductCategories().subscribe((data) => this.categories = data);
    this.objectService.getObjectsNoPagination().subscribe((data) => {
      this.objects = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });

  }

  uploadObjectsFile(event: any) {
    this.isUploading = true;
    this.errorMessage = '';
    this.isObjLoading = true;
    this.objectsFile = event.target.files[0];
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
    this.isUploading = true;
    this.errorMessage = '';
    this.isPosLoading = true;
    this.positionsFile = event.target.files[0];
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
    this.isUploading = false;
    this.errorMessage = ''
    this.isProdLoading = true;
    this.productsFile = event.target.files[0];
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
        this.isProdLoading = false;
        this.errorMessage = err.error;
      }
    });
  }

  downloadTemplate(flag: number) {
    if (flag === 1)
      this.objectService.downloadExcelTemplate();
    else if (flag === 2)
      this.positionService.downloadExcelTemplate();
    else if (flag === 3)
      this.productService.downloadExcelTemplate();
  }

  deletePositions() {

    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {

        if (res) {
          this.positionService.deletePositions().subscribe({
            next: () => {
              this.isPositionsEmpty = true;

            },
            error: (err: Error) => {
              this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
            }
          });

        }
      })
  }

  deleteProducts() {
    this.deletingProducts = true;
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, { data: { flag: 1 } });
    dialogRef.afterClosed()
      .subscribe(res => {

        if (res) {
          this.productService.deleteProducts().subscribe({
            next: () => {
              this.isProductsEmpty = true;

            },
            error: (err: Error) => {
              this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
            }
          });

        }
      })
  }

  deleteObjects() {
    this.deletingObjects = true;
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, { data: { flag: 2 } });
    dialogRef.afterClosed()
      .subscribe(res => {

        if (res) {
          this.objectService.deleteObjects().subscribe({
            next: () => {
              this.isObjectsEmpty = true;

            },
            error: (err: Error) => {
              this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
            }
          });

        }
      })

  }

  public exportPositions() {

    if (this.selectedObject == "All" || this.selectedRetailer == "All") {
      this.isPosLoading = true;
      this.positionService.export(this.isWithImages, this.selectedRetailer, this.selectedObject, this.selectedType, this.selectedFormat).subscribe((excel) => {
        this.isPosLoading = false;
        const fileName = 'SecondaryPositions.xlsx';
        saveAs(excel, fileName);
      });
    } else {
      this.error = true;
    }



  }

  public checkWithImages(event) {
    this.isWithImages = event.checked;

  }

  private _filter(value: string): Obj[] {
    const filterValue = value.toLowerCase();

    return this.objects.filter(o => o.objectName.toLowerCase().includes(filterValue));
  }

  public exportProducts() {
    this.isProdLoading = true;
    this.productService.export(this.selectedCategory).subscribe((excel) => {
      this.isProdLoading = false;
      const fileName = 'Products.xlsx';
      saveAs(excel, fileName);
    });

  }


}
