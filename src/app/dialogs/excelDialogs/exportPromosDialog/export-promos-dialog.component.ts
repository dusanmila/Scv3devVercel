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
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { Observable, map, startWith } from 'rxjs';
import { PromoService } from 'src/app/Services/promo.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'export-promos-dialog',
  templateUrl: './export-promos-dialog.component.html',
  styleUrls: ['./export-promos-dialog.component.css']
})
export class ExportPromosDialogComponent implements OnInit {

public userControl = new FormControl('');
public retailerControl = new FormControl('');
public productCategoryControl = new FormControl('');

  public form: FormGroup;
 
  public imageUploaded: boolean = false;
  public changed: boolean = false;
  submitClicked: boolean = false;
  isLoading = false;

  public users: User[]=[];
  public productCategories: ProductCategory[]=[];
  public retailers: Retailer[]=[];

  filteredOptions: Observable<Retailer[]>;
  filteredOptionsProdCat: Observable<ProductCategory[]>;
  filteredOptionsUsers: Observable<User[]>;

  public selectedUsername:string='All';
 public datePipe = new DatePipe('en-US');
  public startDate:Date;
 public endDate:Date;
  public retailer:string='All';
  public productCategory:string='All';

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExportPromosDialogComponent>,
    public userService: UserService,
    public promoService: PromoService,
    public productCategoryService: ProductCategoryService,
    public objectService: ObjectService,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.form = this.fb.group({
      file: [null],
      img: ['']
    });
  }

  ngOnInit(): void {
  
   this.loadCategories();
   
    this.dialogRef.updateSize('20%', '60%');
  }

 
  public loadCategories() {
    this.productCategoryService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });
    
  }


  submitForm() {
    this.submitClicked = true;
   
    this.isLoading = true;
     
   
    this.promoService.export('All',this.selectedUsername,this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),this.datePipe.transform(this.endDate, 'yyyy-MM-dd'),this.retailer,this.productCategory).subscribe((excel) => {
      
      const fileName = 'Conditions.xlsx';
      saveAs(excel, fileName);
    });
    

  }

  private _filter(value: string): Retailer[] {
    const filterValue = value.toLowerCase();

    return this.retailers.filter(r => r.retailerName.toLowerCase().includes(filterValue));
  }

  private _filterProdCat(value: string): ProductCategory[] {
    const filterValue = value.toLowerCase();

    return this.productCategories.filter(p => p.productCategoryName.toLowerCase().includes(filterValue));
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(u=>u.username.toLowerCase().includes(filterValue));
  }

  public close(): void {
    this.dialogRef.close(this.changed);
  }
}
