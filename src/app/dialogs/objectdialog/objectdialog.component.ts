import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { Obj, ObjectService } from 'src/app/Services/object.service';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-object-dialog',
  templateUrl: './objectdialog.component.html',
  styleUrls: ['./objectdialog.component.css']
})
export class ObjectDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<ObjectDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: Obj, public objectService: ObjectService) { }

  ngOnInit(): void {
  }

public add(): void{
  this.objectService.createObject(this.data)
  .subscribe( data =>{
    this.snackBar.open('Object successfully added: ' + this.data.objectName, 'Ok', { duration: 2500 });
  } ),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
  }
}

public update(): void{
  this.objectService.updateObject(this.data)
  .subscribe(data => {
    this.snackBar.open('Updated object: ' + this.data.objectName, 'OK', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured, try again later. ', 'Close', { duration: 2500 });
  }
}

public delete(): void{
 /* this.objectService.deleteObject(this.data)
  .subscribe(data => {
    this.snackBar.open('Object successfully deleted', 'Ok', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occurred. ', 'Close', { duration: 2500 });
  }*/
}

public close(): void{
this.dialogRef.close();
}

}
