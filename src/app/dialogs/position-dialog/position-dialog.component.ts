import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from 'src/app/models/position';
import { PositionClass } from 'src/app/models/positionClass';
import { PositionType } from 'src/app/models/positionType';
import { ProductCategory } from 'src/app/models/productCategory';
import { PositionService } from 'src/app/Services/position-service.service';
import { ProductCategoryService } from 'src/app/Services/product-category.service';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PositionProductCategoryService } from 'src/app/Services/position-product-category.service';
import { PositionProductCategory } from 'src/app/models/positionProductCategory';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css']
})
export class PositionDialogComponent implements OnInit {

  public form: FormGroup;
  public flag: number;
  public isPositionCheck: boolean;
  public objectIdCompany: string;
  public positionClasses: PositionClass[];
  public positionTypes: PositionType[];
  public productCategories: ProductCategory[];
  public changed: boolean = false;
  public submitClicked: boolean = false;
  public imageUploaded: boolean = false;
  public imageUploaded2: boolean = false;
  public imageUploaded3: boolean = false;
  public isLoading: boolean = false;
  //public secPos = { secondaryPositionId: "", objectIdCompany: "", posClassName: "", posTypeName: "", productCategory: "", supplier: "", location: "", comment: "", img: "", isImgHorizontal: false, valid: false };
  public suppliers = ['Frikom', 'Other'];
  public locations = ['Magacin', 'Prodajni prostor'];
  isRotated = false;
  isRotated2 = false;
  isRotated3 = false;

  img1Changed = false;
  img2Changed = false;
  img3Changed = false;

  isSuggestions = false;

  public selectedProductCategories: ProductCategory[] = [];
  public positionProductCategory: PositionProductCategory = { positionProductCategoryId: "", positionId: "", productCategoryId: "" };
  public currentProdCategories: ProductCategory[] = [];

  public currentProdCatString: string = " ";

  public secPosId: Guid = Guid.create();

  positionDto: Position = {
    secondaryPositionId: Guid.create(),
    objectIdCompany: "",
    posClassName: "",
    posTypeName: "",
    //  productCategory: "",
    supplier: "",
    location: "",
    comment: "",
    isSuggestion: false,
    img: "",
    img2: "",
    img3: "",
    isImgHorizontal: false,
    isImg2Horizontal: false,
    isImg3Horizontal: false,
    valid: false
  };


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position,
    public positionService: PositionService,
    public productCategoryService: ProductCategoryService,
    public positionProductCategoryService: PositionProductCategoryService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      file: [null],
      file2: [null],
      file3: [null],
      img: ['']
    });
  }

  ngOnInit(): void {
    this.positionDto = this.data;

    this.loadPositionClasses();
    this.loadPositionTypes();
    this.loadProductCategories();

    if (this.flag != 1) {
      this.loadCurrentProdCat();
    }



  }

  public loadPositionClasses() {
    this.positionService.getPositionClasses().subscribe(data => {
      this.positionClasses = data;
    });
  }

  public loadCurrentProdCat() {
    this.productCategoryService.getProductCategoriesByPosition(this.data.secondaryPositionId).subscribe(data => {
      this.currentProdCategories = data;
      console.log(this.currentProdCategories)
      this.currentProdCategories.forEach(cat => {
        this.currentProdCatString += " " + cat.productCategoryName + " ";
      });



    });
  }

  public loadPositionTypes() {
    this.positionService.getPositionTypes().subscribe(data => {
      this.positionTypes = data;
    });
  }

  public loadProductCategories() {
    this.productCategoryService.getProductCategories(0, 0, '').subscribe(data => {
      this.productCategories = data;
    });
  }

  /*public add() {
    this.isLoading = true;
    this.data.objectIdCompany = this.objectIdCompany;
    this.data.valid = false;
    this.positionService.createPosition(this.data).subscribe({
      next: () => {
        this.changed = true;
        this.close();
        this.isLoading = false;
        this.snackBar.open('Secondary position added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      },
      error: (err: Error) => {
        this.isLoading = false;
        console.log(err.name + ' -> ' + err.message)
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }*/

  public delete() {
    this.isLoading = true;
    this.positionService.deletePosition(this.data).subscribe({
      next: () => {
        this.changed = true;
        this.snackBar.open('Secondary position deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
        this.isLoading = false;
        this.close();
      },
      error: (err: Error) => {
        console.log(err.name + ' -> ' + err.message)
        this.isLoading = false;
        this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
    });
  }

  public update(): void {
    console.log(this.positionDto)


    this.isLoading = true;
    // this.positionDto.secondaryPositionId=this.secPos.secondaryPositionId;
    this.positionDto.location = this.data.location;
    this.positionDto.objectIdCompany = this.data.objectIdCompany;
    this.positionDto.posClassName = this.data.posClassName;
    this.positionDto.posTypeName = this.data.posTypeName;
    this.positionDto.supplier = this.data.supplier;
    //   this.positionDto.productCategory = this.data.productCategory;

    this.positionService.updatePosition(this.positionDto)
      .subscribe(() => {
        this.positionProductCategoryService.createPositionProductCategory
        this.snackBar.open('Updated position', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
        this.isLoading = false;
        this.close();
      }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.isLoading = false
        this.snackBar.open('An error occured.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  uploadFile(event: any, imgNumber: number) {
    console.log(imgNumber)
    if (imgNumber == 1) {
      const file = (event.target as HTMLInputElement).files![0];
      this.form.patchValue({
        file: file
      });
      this.form.get('file')!.updateValueAndValidity();
      this.imageUploaded = true;
    } else if (imgNumber == 2) {
      const file2 = (event.target as HTMLInputElement).files![0];
      this.form.patchValue({
        file2: file2
      });
      this.form.get('file2')!.updateValueAndValidity();
      this.imageUploaded2 = true;
    } else if (imgNumber == 3) {
      const file3 = (event.target as HTMLInputElement).files![0];
      this.form.patchValue({
        file3: file3
      });
      this.form.get('file3')!.updateValueAndValidity();
      this.imageUploaded3 = true;

    }

  }



  submitFormCreate() {
    this.submitClicked = true;


    console.log(this.selectedProductCategories)


    this.isLoading = true;
    let username = localStorage.getItem("username") as string;
    const formData: any = new FormData();
    formData.append('files', this.form.get('file')!.value);
    console.log(this.form.get('file')!.value)
    if (this.imageUploaded2) {
      formData.append('files', this.form.get('file2')!.value);
      console.log(this.form.get('file2')!.value)
    }
    if (this.imageUploaded3) {
      formData.append('files', this.form.get('file3')!.value);
    }

    formData.append('secondaryPositionId', this.secPosId);
    formData.append('objectIdCompany', this.objectIdCompany);
    formData.append('posClassName', this.positionDto.posClassName);
    formData.append('posTypeName', this.positionDto.posTypeName);
    //   formData.append('productCategory', this.positionDto.productCategory);
    formData.append('supplier', this.positionDto.supplier);
    formData.append('location', this.positionDto.location);
    formData.append('comment', this.positionDto.comment);
    formData.append('img', this.positionDto.img);



    this.positionService.createPosition(formData, this.isPositionCheck).subscribe(data => {
      this.changed = true;
      this.isLoading = false;
      console.log(data);
      this.snackBar.open('Position added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });

      this.close();
      for (var cat of this.selectedProductCategories) {

        this.positionProductCategory.positionId = this.secPosId.toString();
        this.positionProductCategory.productCategoryId = cat.productCategoryId.toString();

        this.positionProductCategoryService.createPositionProductCategory(this.positionProductCategory).subscribe(data => {
          console.log('successfully added')
        }),
          (error: Error) => {
            console.log(error.name + ' -> ' + error.message)
            this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
          };
      }
    }),
      (error: Error) => {
        this.isLoading = false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      };


  }


  submitFormUpdate() {
    console.log(this.imageUploaded)
    console.log(this.imageUploaded2)
    console.log(this.imageUploaded3)

    this.submitClicked = true;

    this.isLoading = true;
    let username = localStorage.getItem("username") as string;
    const formData: any = new FormData();
    if (this.imageUploaded) {
      formData.append('files', this.form.get('file')!.value);
      this.img1Changed = true;
    }
    console.log(this.form.get('file')!.value)
    if (this.imageUploaded2) {
      formData.append('files', this.form.get('file2')!.value);
      this.img2Changed = true;
    }
    if (this.imageUploaded3) {
      formData.append('files', this.form.get('file3')!.value);
      this.img3Changed = true;
    }
    formData.append('secondaryPositionId', this.positionDto.secondaryPositionId);
    formData.append('objectIdCompany', this.objectIdCompany);
    formData.append('posClassName', this.positionDto.posClassName);
    formData.append('posTypeName', this.positionDto.posTypeName);
    //   formData.append('productCategory', this.positionDto.productCategory);
    formData.append('supplier', this.positionDto.supplier);
    formData.append('location', this.positionDto.location);
    formData.append('comment', this.positionDto.comment);
    if (this.imageUploaded) {
      formData.append('img', this.positionDto.img);
    }
    formData.append('isValid', this.positionDto.valid);
    formData.append('img1Changed', this.img1Changed);
    formData.append('img2Changed', this.img2Changed);
    formData.append('img3Changed', this.img3Changed);

    this.positionService.updatePosition(formData).subscribe(data => {
      for (var cat of this.selectedProductCategories) {
        if (this.flag == 1) {
          this.positionProductCategory.positionId = this.secPosId.toString();
        } else {
          this.positionProductCategory.positionId = this.data.secondaryPositionId.toString();
        }

        this.positionProductCategory.productCategoryId = cat.productCategoryId.toString();
        this.positionProductCategoryService.createPositionProductCategory(this.positionProductCategory).subscribe(() => {
          console.log('successfully added')
        }),
          (error: Error) => {
            console.log(error.name + ' -> ' + error.message)
            this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
          };
      }
      this.changed = true;
      this.isLoading = false;
      this.snackBar.open('Position updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });

      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.isLoading = false;
        this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      };


  }

  ngAfterViewInit(): void {

    if (this.positionDto.img) {
      this.adjustImage();
    }

    if (this.positionDto.img2) {
      this.adjustImage();
    }

    if (this.positionDto.img3) {
      this.adjustImage();
    }


  }

  async adjustImage() {

    const img = document.getElementById('posphoto') as HTMLImageElement;

    const img2 = document.getElementById('posphoto2') as HTMLImageElement;

    const img3 = document.getElementById('posphoto3') as HTMLImageElement;

    window.exifr.parse(img!).then((exif) => {

      if (exif && exif.Orientation == 6) {
        this.isRotated = true;
      }

      if (this.isRotated) {

        if (this.data.isImgHorizontal == true) {

          img.setAttribute('height', '250');
          img.setAttribute('width', '180');

        } else {

          img.setAttribute('height', '200');
          img.setAttribute('width', '250');

        }
      } else {

        if (this.data.isImgHorizontal == true) {

          img.setAttribute('height', '180');
          img.setAttribute('width', '250');

        } else {

          img.setAttribute('height', '250');
          img.setAttribute('width', '200');


        }
      }

      if (this.isRotated) {
        img.setAttribute('class', 'rotate');
      }

    })

    if (img2 != null) {
      window.exifr.parse(img2!).then((exif) => {

        if (exif && exif.Orientation == 6) {
          this.isRotated2 = true;
        }

        if (this.isRotated2) {

          if (this.data.isImg2Horizontal == true) {

            img2.setAttribute('height', '250');
            img2.setAttribute('width', '180');

          } else {

            img2.setAttribute('height', '200');
            img2.setAttribute('width', '250');

          }
        } else {

          if (this.data.isImg2Horizontal == true) {

            img2.setAttribute('height', '180');
            img2.setAttribute('width', '250');

          } else {

            img2.setAttribute('height', '250');
            img2.setAttribute('width', '200');


          }
        }

        if (this.isRotated2) {
          img.setAttribute('class', 'rotate');
        }

      })
    }

    if (img3 != null) {
      window.exifr.parse(img3!).then((exif) => {

        if (exif && exif.Orientation == 6) {
          this.isRotated3 = true;
        }

        if (this.isRotated3) {

          if (this.data.isImg3Horizontal == true) {

            img3.setAttribute('height', '250');
            img3.setAttribute('width', '180');

          } else {

            img3.setAttribute('height', '200');
            img3.setAttribute('width', '250');

          }
        } else {

          if (this.data.isImg3Horizontal == true) {

            img3.setAttribute('height', '180');
            img3.setAttribute('width', '250');

          } else {

            img3.setAttribute('height', '250');
            img3.setAttribute('width', '200');


          }
        }

        if (this.isRotated3) {
          img3.setAttribute('class', 'rotate');
        }

      })
    }


  }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
