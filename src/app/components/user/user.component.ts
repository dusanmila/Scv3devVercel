
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';


import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { UserDialogComponent } from 'src/app/dialogs/userdialog/userdialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() isDashboard: boolean = false;
  @Output() selectedUser = new EventEmitter<string>();

  user: User = { firstName: "", lastName: "", username: "", email: "", password: "", userType: "", totalCount: 0 };
  //selectedUser: User = { firstName: "", lastName: "", username: "", email: "", password: "", userType: "" };
  displayedColumns = ["firstName", "lastName", "username", "email", "userType", "actions"];
  dataSource: MatTableDataSource<User>;
  subscription: Subscription;
  isLoading = false;
  searchClicked: boolean = false;

  noData = false;
  search: string = "";
  page: number = 1;
  count: number = 5;
  length: number = 0;


  ngOnInit(): void {
    if (this.isDashboard)
      this.count = 2;
    if (this.isDashboard) {
      this.displayedColumns.splice(3, 3);
      this.displayedColumns.splice(0, 2);
    }
    this.loadData();
  }

  public get users(): User[] {
    return this._users;
  }

  private _users: User[] = []


  constructor(public userService: UserService, private dialog: MatDialog) { }

  public loadData() {
    this.isLoading = true;
    this.userService.getUsers(this.count, this.page, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<User>(data);
        this.length = data[0].totalCount;
        this.noData = false;
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0
      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData();
  }

  public searchByUsername(): void {
    this.noData = false;
    this.isLoading = true;
    this.userService.getUsersByUsername(this.search).subscribe(data => {

      console.log(data);

      if (data) {
        this.dataSource = new MatTableDataSource<User>(data);

        this.searchClicked = true; //izbaciti?

        if (this.dataSource.data.length == 0) {
          this.noData = true;
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

  public selectUser(username: string) {
    this.selectedUser.emit(username);
  }

}
