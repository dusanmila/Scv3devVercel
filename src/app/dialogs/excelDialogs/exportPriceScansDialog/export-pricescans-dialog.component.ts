import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Obj } from 'src/app/models/object';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'export-pricescans-dialog',
  templateUrl: './export-pricescans-dialog.component.html',
  styleUrls: ['./export-pricescans-dialog.component.css']
})
export class ExportPriceScansDialogComponent implements OnInit {

  myControl = new FormControl('');

  public form: FormGroup;

  public imageUploaded: boolean = false;
  public changed: boolean = false;
  submitClicked: boolean = false;
  isLoading = false;



  public objects: Obj[]=[];
  filteredOptions: Observable<Obj[]>;
  public selectedObject:string='All';


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExportPriceScansDialogComponent>,
    public objectService: ObjectService,
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
 this.loadObjects();
    this.dialogRef.updateSize('15%', '30%');
  }





  submitForm() {
    this.submitClicked = true;

    this.isLoading = true;


    this.productService.exportPriceScans(this.selectedObject).subscribe((excel) => {

      const fileName = 'PriceScans.xlsx';
      saveAs(excel, fileName);
    });


  }

 
    public loadObjects(){
      this.filteredOptions = this.myControl.valueChanges.pipe(
        debounceTime(300), // Add a debounce to prevent rapid consecutive API calls
        distinctUntilChanged(), // Only trigger if the value changes
        switchMap(value => this.objectService.getObjectsByObjectName(value)) // Call the backend function
      );
    }
    
    onAutocompleteInputChange(event: Event) {
      this.myControl.setValue((event.target as HTMLInputElement).value);
    }
  

  public close(): void {
    this.dialogRef.close(this.changed);
  }
}
