import { HttpClient } from '@angular/common/http';
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
  constructor(private router: Router, public authorisation: AuthorisationService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  
  public LoginUser(){
    this.http.post("https://localhost:44323/api/auths/login", this.user, {headers: {}}).subscribe((data: any) => {
      console.log(data);
        if (data.token !== undefined)
        {
          const token = data.token;
          const refreshToken = data.refreshToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("refreshToken", refreshToken);
          // ovde dodati ako je admin videti iz tokena dal je admin da navigate to /admin
          this.router.navigate(["/storeCheck"]);
        }
    });
  }
}
