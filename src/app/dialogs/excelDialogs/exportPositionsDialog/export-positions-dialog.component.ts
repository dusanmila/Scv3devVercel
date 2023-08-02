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
import { PositionService } from 'src/app/Services/position-service.service';
import { PositionType } from 'src/app/models/positionType';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { Obj } from 'src/app/models/object';

@Component({
  selector: 'export-positions-dialog',
  templateUrl: './export-positions-dialog.component.html',
  styleUrls: ['./export-positions-dialog.component.css']
})
export class ExportPositionsDialogComponent implements OnInit {


  public form: FormGroup;
 
  public imageUploaded: boolean = false;
  public changed: boolean = false;
  submitClicked: boolean = false;
  isLoading = false;

  withImages: boolean = false;

  public retailers: Retailer[]=[];
  public productCategories: ProductCategory[]=[];
  public types: PositionType[]=[];
  public objects: Obj[]=[];
  filteredOptions: Observable<Obj[]>;
  formats: string[];

  myControl = new FormControl('');

  public retailer:string='All';
  public productCategory:string='All';
  public selectedType:string='All';
  public selectedObject:string='All';
  selectedFormat: string = "All";

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExportPositionsDialogComponent>,
    public objectService: ObjectService,
    public conditionService: ConditionsService,
    public productCategoryService: ProductCategoryService,
    public positionService: PositionService,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.form = this.fb.group({
      file: [null],
      img: ['']
    });
  }

  ngOnInit(): void {
    this.loadTypes();
    this.loadRetailers();
    this.loadTypes();
    this.loadFormats();
    this.loadObjects();
   
    this.dialogRef.updateSize('15%', '50%');
  }

public loadFormats(){
  this.objectService.getObjectFormats().subscribe((data) => this.formats = data);
}

public loadObjects(){
  this.filteredOptions = this.myControl.valueChanges.pipe(
    debounceTime(300), // Add a debounce to prevent rapid consecutive API calls
    distinctUntilChanged(), // Only trigger if the value changes
    switchMap(value => this.objectService.getObjectsByObjectName(value)) // Call the backend function
  );
}

  public loadTypes() {
    this.positionService.getPositionTypes().subscribe((data) => this.types = data);
    
  }

  public loadRetailers() {
    this.objectService.getRetailers(0,0,'').subscribe(data => {
      this.retailers = data;
    });
    
  }



  submitForm() {
    this.submitClicked = true;
   
    this.isLoading = true;
     
   
  /*  this.positionService.export(this.withImages,this.retailer,this.selectedObject,this.selectedType,this.selectedFormat).subscribe((excel) => {
      
      const fileName = 'Positions.xlsx';
      saveAs(excel, fileName);
    });*/
    
console.log(this.withImages+ ',retailer: ' +this.retailer + ' obj:' + this.selectedObject,this.selectedType,this.selectedFormat)
  }

  private _filter(value: string): Obj[] {
    const filterValue = value.toLowerCase();

    return this.objects.filter(o => o.objectName.toLowerCase().includes(filterValue));
  }

  onAutocompleteInputChange(event: Event) {
    this.myControl.setValue((event.target as HTMLInputElement).value);
  }

  public close(): void {
    this.dialogRef.close(this.changed);
  }
}
