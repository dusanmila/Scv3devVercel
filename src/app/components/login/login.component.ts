import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthorisationService } from 'src/app/Services/authorisation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {username:string, password:string} = {username:"", password:""};
  constructor(private router: Router, public authorisation: AuthorisationService) { }

  ngOnInit(): void {
  }

  
  public LoginUser(){
    
    /*
    this.authorisation.logIn(this.user)
    .pipe(catchError(it => {

      console.log('neuspeh 123');
      return it;
    }))
    .subscribe((data: any)=> {
     // this.user={username:"",password:""}
     console.log(data);
      this.router.navigate(['/client']);

      
    },
      (err: any) => {
      console.log("Fail",err);
      
    }, 
    () => {console.log('complete')} );
    this.user=this.user;*/
  }
}
