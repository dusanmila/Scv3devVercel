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
  selector: 'app-object-create-dialog',
  templateUrl: './object-create-dialog.component.html',
  styleUrls: ['./object-create-dialog.component.css']
})
export class ObjectCreateDialogComponent implements OnInit {

  public flag: number;

  public users: User[] = [];
  public retailers: Retailer[] = [];

  objectInfo: ObjectInfo;
  object: Obj;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ObjectCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ObjectCreateDto, public objectService: ObjectService, public userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRetailers();
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

  public add(): void {

    this.objectService.createObject(this.data)
      .subscribe(() => {
        this.snackBar.open('Object successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
      }
  }





  public close(): void {
    this.dialogRef.close();
  }

}

