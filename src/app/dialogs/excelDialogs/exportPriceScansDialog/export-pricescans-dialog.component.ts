import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackCategory } from 'src/app/models/feedbackCategory';
import { ProductCategory } from 'src/app/models/productCategory';
import { Retailer } from 'src/app/models/retailer';
import { ConditionsService } from 'src/app/Services/conditions.service';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { ObjectService } from 'src/app/Services/object.service';
import { ProductCategoryService } from 'src/app/Services/product-category.service';
import * as saveAs from 'file-saver';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'export-pricescans-dialog',
  templateUrl: './export-pricescans-dialog.component.html',
  styleUrls: ['./export-pricescans-dialog.component.css']
})
export class ExportPriceScansDialogComponent implements OnInit {


  public form: FormGroup;
 
  public imageUploaded: boolean = false;
  public changed: boolean = false;
  submitClicked: boolean = false;
  isLoading = false;


  public retailers: Retailer[]=[];
  public productCategories: ProductCategory[]=[];

  public retailer:string='All';
  public productCategory:string='All';

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExportPriceScansDialogComponent>,
    public objectService: ObjectService,
    public conditionService: ConditionsService,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.form = this.fb.group({
      file: [null],
      img: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadRetailers();
    this.dialogRef.updateSize('15%', '50%');
  }

  public loadCategories() {
    this.productCategoryService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });
    
  }

  public loadRetailers() {
    this.objectService.getRetailers(0,0,'').subscribe(data => {
      this.retailers = data;
    });
    
  }



  submitForm() {
    this.submitClicked = true;
   
    this.isLoading = true;
  
    this.productService.exportPriceScans().subscribe((excel) => {
     
      const fileName = 'PriceScans.xlsx';
      saveAs(excel, fileName);
    });
  
   

  }



  public close(): void {
    this.dialogRef.close(this.changed);
  }
}
