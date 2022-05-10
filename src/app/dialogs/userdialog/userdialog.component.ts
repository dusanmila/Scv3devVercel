import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-user-dialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css']
})
export class UserDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<UserDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: User, public userService: UserService) { }

  ngOnInit(): void {
  }

public add(): void{
  this.userService.createUser(this.data)
  .subscribe( data =>{
    this.snackBar.open('User successfully added: ' + this.data.username, 'Ok', { duration: 2500 });
  } ),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
  }
}

public update(): void{
  this.userService.editUser(this.data)
  .subscribe(data => {
    this.snackBar.open('Updated user: ' + this.data.username, 'OK', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured, try again later. ', 'Close', { duration: 2500 });
  }
}

public delete(): void{
  this.userService.deleteUser(this.data)
  .subscribe(data => {
    this.snackBar.open('User successfully deleted', 'Ok', { duration: 2500 });
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

