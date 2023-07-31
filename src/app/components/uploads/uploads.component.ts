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
import { Condition } from 'src/app/models/condition';
import { PriceScan } from 'src/app/models/priceScan';
import { Promo } from 'src/app/models/promo';
import { PromoService } from 'src/app/Services/promo.service';
import { ConditionsService } from 'src/app/Services/conditions.service';
import { ExportConditionsDialogComponent } from 'src/app/dialogs/excelDialogs/exportConditionsDialog/export-conditions-dialog.component';
import { ExportPromosDialogComponent } from 'src/app/dialogs/excelDialogs/exportPromosDialog/export-promos-dialog.component';
import { ExportProductsDialogComponent } from 'src/app/dialogs/excelDialogs/exportProductsDialog/export-products-dialog.component';
import { ExportPositionsDialogComponent } from 'src/app/dialogs/excelDialogs/exportPositionsDialog/export-positions-dialog.component';


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
  priceScansFile: any;
  promosFile: any;
  conditionsFile: any;
  isObjLoading = false;
  isPosLoading = false;
  isProdLoading = false;
  isPriceScansLoading = false;
  isPromosLoading = false;
  isConditionsLoading = false;
  errorMessage!: string;
  isObjectsEmpty = false;
  isPositionsEmpty = false;
  isProductsEmpty = false;
  isPriceScansEmpty = false;
  isPromosEmpty = false;
  isConditionsEmpty = false;
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
  deletingPriceScans = false;
  deletingPromos = false;
  deletingConditions = false;

  retailers: Retailer[];
  objects: Obj[];
  types: PositionType[];
  formats: string[];
  categories: ProductCategory[];
  priceScans: PriceScan[];
  promos: Promo[];
  conditions: Condition[];


  constructor(public objectService: ObjectService,
    public positionService: PositionService,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService,
    public promoService: PromoService,
    public conditionService: ConditionsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.objectService.checkNoData().subscribe((data) => this.isObjectsEmpty = data);
    this.positionService.checkNoData().subscribe((data) => this.isPositionsEmpty = data);
    this.productService.checkNoData().subscribe((data) => this.isProductsEmpty = data);
    this.productService.checkNoDataPriceScans().subscribe((data) => {this.isPriceScansEmpty = data; console.log(this.isPriceScansEmpty)});
    this.promoService.checkNoData().subscribe((data) => this.isPromosEmpty = data);
    this.conditionService.checkNoData().subscribe((data) => this.isConditionsEmpty = data);
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

  uploadPriceScansFile(event: any) {
    this.isUploading = false;
    this.errorMessage = ''
    this.isPriceScansLoading = true;
    this.priceScansFile = event.target.files[0];
    let formData = new FormData();
    formData.set('file', this.priceScansFile);

    this.productService.excelImportPriceScans(formData).subscribe({
      next: data => {
        this.isPriceScansLoading = false;
        this.snackBar.open("Price scans added.", "Close", {
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

  uploadPromosFile(event: any) {
    this.isUploading = false;
    this.errorMessage = ''
    this.isPromosLoading = true;
    this.promosFile = event.target.files[0];
    let formData = new FormData();
    formData.set('file', this.promosFile);

    this.promoService.excelImport(formData).subscribe({
      next: data => {
        this.isPriceScansLoading = false;
        this.snackBar.open("Price scans added.", "Close", {
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

  uploadConditionsFile(event: any) {
    this.isUploading = false;
    this.errorMessage = ''
    this.isConditionsLoading = true;
    this.conditionsFile = event.target.files[0];
    let formData = new FormData();
    formData.set('file', this.conditionsFile);

    this.conditionService.excelImport(formData).subscribe({
      next: data => {
        this.isConditionsLoading = false;
        this.snackBar.open("Conditions added.", "Close", {
          duration: 2500,
          panelClass: ['blue-snackbar']
        });
      },
      error: err => {
        this.isConditionsLoading = false;
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
    else if (flag === 4)
      this.productService.downloadPriceScanTemplate();
    else if (flag === 5)
      this.promoService.downloadExcelTemplate();
    else if (flag === 6)
      this.conditionService.downloadExcelTemplate();
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

  deletePriceScans() {
    this.deletingPriceScans = true;
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, { data: { flag: 3 } });
    dialogRef.afterClosed()
      .subscribe(res => {

        if (res) {
          this.productService.deletePriceScans().subscribe({
            next: () => {
              this.isPriceScansEmpty = true;

            },
            error: (err: Error) => {
              this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
            }
          });

        }
      })

  }

  deletePromos() {
    this.deletingPromos = true;
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, { data: { flag: 3 } });
    dialogRef.afterClosed()
      .subscribe(res => {

        if (res) {
          this.promoService.deletePromos().subscribe({
            next: () => {
              this.isPromosEmpty = true;

            },
            error: (err: Error) => {
              this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
            }
          });

        }
      })

  }

  deleteConditions() {
    this.deletingConditions = true;
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, { data: { flag: 3 } });
    dialogRef.afterClosed()
      .subscribe(res => {

        if (res) {
          this.conditionService.deleteConditions().subscribe({
            next: () => {
              this.isConditionsEmpty = true;

            },
            error: (err: Error) => {
            //  this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
          console.log(err)
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

  
/*
  public exportPromos() {

    this.promoService.export().subscribe((excel) => {
        this.isPromosLoading = false;
        const fileName = 'Promos.xlsx';
        saveAs(excel, fileName);
      });
   
      



  }
*/


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

  public exportPriceScans(){
    this.productService.exportPriceScans().subscribe((excel) => {
     
      const fileName = 'PriceScans.xlsx';
      saveAs(excel, fileName);
    });
  }
 

  openDialog(flag: number) {

    if(flag==2){
      const dialogRef = this.dialog.open(ExportPositionsDialogComponent);
   
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          console.log('exported');
        }
      });
    }

    if(flag==3){
      const dialogRef = this.dialog.open(ExportProductsDialogComponent);
   
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          console.log('exported');
        }
      });
    }

    if(flag==5){
      const dialogRef = this.dialog.open(ExportPromosDialogComponent);
   
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          console.log('exported');
        }
      });
    }

    if(flag==6){
      const dialogRef = this.dialog.open(ExportConditionsDialogComponent);
   
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          console.log('exported');
        }
      });
    }

  
    
  }


}
