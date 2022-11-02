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
import { FormBuilder, FormGroup } from '@angular/forms';

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
  public submitClicked:boolean=false;
  public imageUploaded:boolean=false;
  public isLoading:boolean=false;
  public secPos = { secondaryPositionId: "",  objectIdCompany: "", posClassName: "", posTypeName:"", productCategory: "", supplier:"", location: "",img:"",isImgHorizontal:false, valid:false};
  public suppliers = ['Frikom', 'Other'];
  public locations = ['Magacin', 'Prodajni prostor'];
  isRotated=false;

  positionDto : Position = {
    secondaryPositionId:Guid.create(),
    objectIdCompany: "",
    posClassName: "",
    posTypeName: "",
    productCategory: "",
    supplier: "",
    location: "",
    img:"",
    isImgHorizontal:false,
    valid: false
  };


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position,
    public positionService: PositionService,
    public productCategoryService: ProductCategoryService,public fb: FormBuilder) {
      this.form = this.fb.group({
      file: [null],
      img: ['']
    });}

  ngOnInit(): void {

this.positionDto=this.data;

console.log(this.positionDto)
console.log(this.positionDto.img)

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

  public update(): void {
   // this.positionDto.secondaryPositionId=this.secPos.secondaryPositionId;
    this.positionDto.location=this.positionDto.location;
    this.positionDto.objectIdCompany=this.positionDto.objectIdCompany;
    this.positionDto.posClassName=this.positionDto.posClassName;
    this.positionDto.posTypeName=this.positionDto.posTypeName;
    this.positionDto.supplier = this.positionDto.supplier;
    this.positionDto.productCategory=this.positionDto.productCategory;

    this.positionService.updatePosition(this.positionDto)
      .subscribe(() => {
        this.snackBar.open('Updated position', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
        this.close();
      }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
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
    this.submitClicked=true;

      this.isLoading=true;
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
      formData.append('img', this.positionDto.img);
      formData.append('valid', this.positionDto.valid);

      this.positionService.createPosition(formData).subscribe(data => {
        this.changed = true;
        this.isLoading = false;
        console.log(data);
        this.snackBar.open('Position added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });

        this.close();
      }),
      (error:Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      };


  }

  submitFormUpdate() {
    this.submitClicked=true;
    if(this.imageUploaded){
      this.isLoading=true;
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
      formData.append('img', this.positionDto.img);
      formData.append('valid', this.positionDto.valid);

      this.positionService.updatePosition(formData).subscribe(data => {
        this.changed = true;
        this.isLoading = false;
        console.log(data);
        this.snackBar.open('Position updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });

        this.close();
      }),
      (error:Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      };
    }

  }

  ngAfterViewInit(): void {

if(this.positionDto.img){
  this.adjustImage();
}


    }

    async adjustImage(){



      const img = document.getElementById('posphoto') as HTMLImageElement;

      window.exifr.parse(img!).then((exif) => {

        if (exif.Orientation == 6) {
        this.isRotated=true;
        }

console.log("isrotated"+this.isRotated)
console.log("ishor"+this.data.isImgHorizontal)

        if(this.isRotated){

          if(this.data.isImgHorizontal==true){

            img.setAttribute('height','250');
            img.setAttribute('width','180');

          }else{

            img.setAttribute('height','200');
            img.setAttribute('width','250');



          }
        }else{

          if(this.data.isImgHorizontal==true){

            img.setAttribute('height','180');
            img.setAttribute('width','250');

          }else{

            img.setAttribute('height','250');
            img.setAttribute('width','200');


          }
        }

     if(this.isRotated){
            img.setAttribute('class','rotate');
     }


      })




    }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
