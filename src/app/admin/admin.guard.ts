import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) { }

  async canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    let routeData = route.data;
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (routeData['admin'] === true && role !== "Admin") {
      return false;
    }
    if (token !== null && !jwtHelper.isTokenExpired(token)) {

      return true;
    }
    this.router.navigate(["login"]);

    return false;
  }



}
