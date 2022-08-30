
import { Component,OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';


import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { UserDialogComponent } from 'src/app/dialogs/userdialog/userdialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = { firstName: "", lastName: "", username: "", email: "", password: "", userType: "" };

  selectedUser: User = { firstName: "", lastName: "", username: "", email: "", password: "", userType: "" };

  displayedColumns = ["firstName", "lastName", "username", "email", "userType", "actions"];
  dataSource: MatTableDataSource<User>;
  subscription: Subscription;

  search: string = "";

  isLoading = false;

  searchClicked: boolean = false;

  noData=false;

  ngOnInit(): void {
    this.loadData();


  }

  public get users(): User[] {
    return this._users;
  }

  private _users: User[] = []


  constructor(public userService: UserService, private dialog: MatDialog) { }


  public loadData() {
    this.userService.getUsers().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }



  public searchByUsername(): void {
    this.noData=false;
    this.isLoading = true;
    this.userService.getUsersByUsername(this.search).subscribe(data => {
      console.log(data);
if(data){
  this.dataSource = new MatTableDataSource<User>(data);

  this.searchClicked = true; //izbaciti?

  if(this.dataSource.data.length==0){
    this.noData=true;
  }
}

this.isLoading = false;

    });
  }


 

  public openDialog(flag: number, firstName?: string, lastName?: string, username?: string, email?: string, userType?: string) {
    const dialogRef = this.dialog.open(UserDialogComponent, { data: { firstName, lastName, username, email, userType } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
          this.loadData();
        }
      }
      )
  }

  public setSearchClicked() {
    this.searchClicked = true;
  }

}
