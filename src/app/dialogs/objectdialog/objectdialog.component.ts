import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obj, ObjectCreateDto } from 'src/app/models/object';
import { ObjectInfo } from 'src/app/models/objectInfo';
import { Retailer } from 'src/app/models/retailer';
import { User } from 'src/app/models/user.model';
import { ObjectService } from 'src/app/Services/object.service';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-object-dialog',
  templateUrl: './objectdialog.component.html',
  styleUrls: ['./objectdialog.component.css']
})
export class ObjectDialogComponent implements OnInit {

  public flag: number;

  public users: User[] = [];
  public retailers: Retailer[] = [];

  objectInfo: ObjectInfo;
  object: Obj;

  isLoading=false;

  public objectCreateDto: ObjectCreateDto = {
    objectIdRetail: "",
    objectIdCompany: "",
    retailer: "",
    objectFormat: "",
    objectName: "",
    city: "",
    address: "",
    kam: "",
    director: "",
    supervisor: "",
    commercialist: "",
    merchandiser: "",
    requisitionDays: "",
    merchandiserRevisionDays: "",
    objectInfo: {
      assortmentModule: "",
      gainings12Mrsd: 0,
      wdpercentSerbia: 0,
      wdpercentSector: 0,
      wdpercentCustomer: 0,
      gainingsVs12mpercent: 0,
      registersNumber: 0,
      shelfSpaceM: 0,
      companyShelfSpaceM: 0,
      companyShelfSpacePercent: 0
    }
  }

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ObjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Obj, public objectService: ObjectService, public userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRetailers();
    console.log(this.data);

  }

  public loadUsers() {
    this.userService.getUsers(0, 0, '').subscribe(data => {
      this.users = data;
    });
  }

  public loadRetailers() {
    this.objectService.getRetailers(0, 0, "").subscribe(data => {
      this.retailers = data;
    });
  }

  public update(): void {
    this.isLoading=true;
    this.data.objectIdRetail==null?null:this.objectCreateDto.objectIdRetail = this.data.objectIdRetail;
   this.data.retailer==null?null: this.objectCreateDto.retailer = this.data.retailer.retailerName;
    this.data.objectIdCompany==null?null:this.objectCreateDto.objectIdCompany = this.data.objectIdCompany;
    this.data.objectFormat==null?null:this.objectCreateDto.objectFormat = this.data.objectFormat;
   this.data.objectName==null?null: this.objectCreateDto.objectName = this.data.objectName;
    this.data.city==null?null:this.objectCreateDto.city = this.data.city;
    this.data.address==null?null:this.objectCreateDto.address = this.data.address;
    this.data.kam==null?null:this.objectCreateDto.kam = this.data.kam.toString();

    this.data.director == null ? null : this.objectCreateDto.director = this.data.director.toString();


    this.data.supervisor==null?null:this.objectCreateDto.supervisor = this.data.supervisor.toString();
    this.data.commercialist==null?null:this.objectCreateDto.commercialist = this.data.commercialist.toString();
    this.data.merchandiser==null?null:this.objectCreateDto.merchandiser = this.data.merchandiser.toString();
    this.data.merchandiserRevisionDays==null?null:this.objectCreateDto.merchandiserRevisionDays = this.data.merchandiserRevisionDays;
    this.data.requisitionDays==null?null:this.objectCreateDto.requisitionDays = this.data.requisitionDays;
    this.data.objectInfo==null?null:this.objectCreateDto.objectInfo = this.data.objectInfo;
    this.objectService.updateObject(this.objectCreateDto)
      .subscribe(() => {
        this.isLoading=false;
        this.snackBar.open('Updated object', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured.', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public delete(): void {
    this.isLoading=true;
    this.objectService.deleteObject(this.data)
      .subscribe(() => {
        this.isLoading=false;
        this.snackBar.open('Object successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      }),
      (error: Error) => {
         this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }

  public close(): void {
    this.dialogRef.close();
  }

}
