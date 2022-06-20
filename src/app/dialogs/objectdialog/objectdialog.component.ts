import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obj, ObjectCreateDto } from 'src/app/models/object';
import { ObjectInfo } from 'src/app/models/objectInfo';
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


  objectInfo:ObjectInfo;
  object:Obj;

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

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<ObjectDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: Obj, public objectService: ObjectService, public userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }



public update(): void{
  this.objectCreateDto.objectIdRetail=this.data.objectIdRetail;
  this.objectCreateDto.retailer=this.data.retailer.retailerName;
  this.objectCreateDto.objectIdCompany=this.data.objectIdCompany;
  this.objectCreateDto.objectFormat=this.data.objectFormat;
  this.objectCreateDto.objectName=this.data.objectName;
  this.objectCreateDto.city=this.data.city;
  this.objectCreateDto.address=this.data.address;
  this.objectCreateDto.kam=this.data.kam.toString();
  this.objectCreateDto.director=this.data.director.toString();
  this.objectCreateDto.supervisor=this.data.supervisor.toString();
   this.objectCreateDto.commercialist=this.data.commercialist.toString();
  this.objectCreateDto.merchandiser=this.data.merchandiser.toString();
  this.objectCreateDto.merchandiserRevisionDays=this.data.merchandiserRevisionDays;
  this.objectCreateDto.requisitionDays=this.data.requisitionDays;
  this.objectCreateDto.objectInfo=this.data.objectInfo;
  this.objectService.updateObject(this.objectCreateDto)
  .subscribe(data => {
    this.snackBar.open('Updated object: ' + this.data.objectName, 'OK', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured, try again later. ', 'Close', { duration: 2500 });
  }
}

public delete(): void{
  this.objectService.deleteObject(this.data)
  .subscribe(data => {
    this.snackBar.open('Object successfully deleted', 'Ok', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occurred. ', 'Close', { duration: 2500 });
  }
}

public close(): void{
this.dialogRef.close();
}

}
