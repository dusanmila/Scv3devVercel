import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:User = {firstName: "", lastName: "", username: "", email: false, userType:""};
 
  selectedUser:User= {firstName: "", lastName: "", username: "", email: false, userType:""};


  public get users(): User[]{
    return this._users;
  }

  private _users: User[]=[]


  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this._users = data;
    });

  }

  
  
  public selectUser(user:User){
    this.userService.getOneUser(user).subscribe(data => {
      this.selectedUser=data;
    }) ;
    this.user=user;
   }


  
  public editUser(user:User)
  {
    this.userService.editUser(user).subscribe(data=>{

      console.log(data);

    });
  }

  

}
