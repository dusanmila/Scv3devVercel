import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:User = {firstName: "", lastName: "", username: "", email: false, userType:""};

  selectedUser:User= {firstName: "", lastName: "", username: "", email: false, userType:""};

  displayedColumns = ["firstName","lastName","username","email","userType","actions"];
dataSource: MatTableDataSource<User>;
subscription: Subscription;

search : String ="";


  public get users(): User[]{
    return this._users;
  }

  private _users: User[]=[]


  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {

        this.dataSource = new MatTableDataSource(data);
    });



  }



  public selectUser(user:User){
    this.userService.getOneUser(user).subscribe(data => {
      this.selectedUser=data;
    }) ;
    this.user=user;
   }

   public searchByUsername():void{
    this.userService.getUserByUsername(this.search).subscribe(data => {
      console.log(data)
      type UserArray = Array<User>;
      const userArr: UserArray = [
        data
    ];
      this.dataSource=new MatTableDataSource<User>(userArr);
    });
   }


  public editUser(user:User)
  {
    this.userService.editUser(user).subscribe(data=>{

      console.log(data);

    });
  }



}
