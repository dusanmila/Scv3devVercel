import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UserType } from 'src/app/models/userType';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-user-dialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css']
})
export class UserDialogComponent implements OnInit {

  public flag: number;

  public userTypes: UserType[] = [];

  constructor(public snackBar:MatSnackBar,
              public dialogRef:MatDialogRef<UserDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: User,
              public userService: UserService) { }

  ngOnInit(): void {
    this.loadUserTypes();
  }

  public loadUserTypes() {
    this.userService.getUserTypes().subscribe(data => {
      this.userTypes = data;
    });
  }

public add(): void{
  this.userService.createUser(this.data)
  .subscribe(() =>{
    this.snackBar.open('User successfully added', 'Ok', { duration: 2500 });
  } ),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured', 'Close', { duration: 2500 });
  }
}

public update(): void{
  this.userService.editUser(this.data)
  .subscribe(() => {
    this.snackBar.open('Updated user', 'Ok', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured', 'Close', { duration: 2500 });
  }
}

public delete(): void{
  this.userService.deleteUser(this.data)
  .subscribe(() => {
    this.snackBar.open('User deleted', 'Ok', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occurred', 'Close', { duration: 2500 });
  }
}

public close(): void{
this.dialogRef.close();
}

}

