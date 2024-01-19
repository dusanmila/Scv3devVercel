
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: { username: string, password: string } = { username: "", password: "" };

  isLoginFailed: boolean = false;
  isLoading = false;
  disableLogin = false;

  loginAttempts: number = 0;
  rightnow: any;

  constructor(private router: Router, public loginService: LoginService) { }


  public LoginUser() {

    this.isLoading = true;

    if (this.isLoginFailed) {
      this.isLoginFailed = false;
    }


    // if(localStorage.getItem("unsuccessfulLoginExpiration")==null || new Date(localStorage.getItem("unsuccessfulLoginExpiration")!)  < new Date())
    this.loginService.login(this.user.username, this.user.password).subscribe({
      next: data => {

        if (data.token !== null) {
          const token = data;
          localStorage.setItem("jwt", token);

          let role = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          let username = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
          let email = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);
          localStorage.setItem("email", email);

          //ovih 6 ispod msm da ne treba ako cu u adminguard
          if (role === "Admin") {
            this.router.navigate(["/admin"]);
          }
          else {
            this.router.navigate(["/modules"]);
          }
        } else {
          this.isLoginFailed = true;
        }
      },
      error: (e) => {
        this.isLoading = false;
        this.isLoginFailed = true;

        if (this.loginAttempts < 5) {
          this.loginAttempts++;
        }


      }
    });


  }



}
