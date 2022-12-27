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
import {  PositionProductCategoryService } from 'src/app/Services/position-product-category.service';
import { PositionProductCategory } from 'src/app/models/positionProductCategory';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css']
})
export class PositionDialogComponent implements OnInit {

  public form: FormGroup;
  public flag: number;
  public objectIdCompany: string;
  public positionClasses: PositionClass[];
  public positionTypes: PositionType[];
  public productCategories: ProductCategory[];
  public changed: boolean = false;
  public submitClicked: boolean = false;
  public imageUploaded: boolean = false;
  public isLoading: boolean = false;
  public secPos = { secondaryPositionId: "", objectIdCompany: "", posClassName: "", posTypeName: "", productCategory: "", supplier: "", location: "", comment: "", img: "", isImgHorizontal: false, valid: false };
  public suppliers = ['Frikom', 'Other'];
  public locations = ['Magacin', 'Prodajni prostor'];
  isRotated = false;

  public selectedProductCategories:ProductCategory[]=[];
  public positionProductCategory:PositionProductCategory={positionProductCategoryId:"",positionId:"",productCategoryId:""};
  public currentProdCategories:ProductCategory[]=[];

  public currentProdCatString:string=" ";

public secPosId: Guid = Guid.create();

  positionDto: Position = {
    secondaryPositionId: Guid.create(),
    objectIdCompany: "",
    posClassName: "",
    posTypeName: "",
    productCategory: "",
    supplier: "",
    location: "",
    comment: "",
    img: "",
    isImgHorizontal: false,
    valid: false
  };


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position,
    public positionService: PositionService,
    public productCategoryService: ProductCategoryService,
    public positionProductCategoryService:PositionProductCategoryService,
     public fb: FormBuilder) {
    this.form = this.fb.group({
      file: [null],
      img: ['']
    });
  }

  ngOnInit(): void {

    this.positionDto = this.data;

    console.log(this.positionDto)

    this.loadPositionClasses();
    this.loadPositionTypes();
    this.loadProductCategories();
    this.loadCurrentProdCat();
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
        this.currentProdCatString += " " + cat.productCategoryName +" ";
    });

      
     
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
  }

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
    this.positionDto.productCategory = this.data.productCategory;

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

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')!.updateValueAndValidity();
    this.imageUploaded = true;
  }

  

  submitFormCreate() {
    this.submitClicked = true;


console.log(this.selectedProductCategories)


    this.isLoading = true;
    let username = localStorage.getItem("username") as string;
    const formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
    formData.append('secondaryPositionId', this.secPosId);
    formData.append('objectIdCompany', this.objectIdCompany);
    formData.append('posClassName', this.positionDto.posClassName);
    formData.append('posTypeName', this.positionDto.posTypeName);
    formData.append('productCategory', this.positionDto.productCategory);
    formData.append('supplier', this.positionDto.supplier);
    formData.append('location', this.positionDto.location);
    formData.append('comment', this.positionDto.comment);
    formData.append('img', this.positionDto.img);
    formData.append('valid', true);

    this.positionService.createPosition(formData).subscribe(data => {
      this.changed = true;
      this.isLoading = false;
      console.log(data);
      this.snackBar.open('Position added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });

      this.close();
      for (var cat of this.selectedProductCategories) {

        this.positionProductCategory.positionId=this.secPosId.toString();
        this.positionProductCategory.productCategoryId=cat.productCategoryId.toString();
      
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
    this.submitClicked = true;

    this.isLoading = true;
    let username = localStorage.getItem("username") as string;
    const formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
    formData.append('secondaryPositionId', this.positionDto.secondaryPositionId);
    formData.append('objectIdCompany', this.objectIdCompany);
    formData.append('posClassName', this.positionDto.posClassName);
    formData.append('posTypeName', this.positionDto.posTypeName);
    formData.append('productCategory', this.positionDto.productCategory);
    formData.append('supplier', this.positionDto.supplier);
    formData.append('location', this.positionDto.location);
    formData.append('comment', this.positionDto.comment);
    if (this.imageUploaded) {
      formData.append('img', this.positionDto.img);
    }
    formData.append('isValid', this.positionDto.valid);

    this.positionService.updatePosition(formData).subscribe(data => {
      console.log(this.selectedProductCategories)
      for (var cat of this.selectedProductCategories) {
if(this.flag==1){
  this.positionProductCategory.positionId=this.secPosId.toString();
}else{
this.positionProductCategory.positionId=this.data.secondaryPositionId.toString();
}
        
        this.positionProductCategory.productCategoryId=cat.productCategoryId.toString();
      console.log(this.positionProductCategory)
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
      console.log(data);
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


  }

  async adjustImage() {



    const img = document.getElementById('posphoto') as HTMLImageElement;

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

  }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
