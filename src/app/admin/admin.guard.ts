import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AUTH_URL } from '../app.constants';
import { AuthenticatedResponse } from '../models/authenticatedResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let routeData = route.data;
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (routeData['admin'] === true && role !== "Admin") {
      return false;
    }
    if (token !== null && !jwtHelper.isTokenExpired(token)) {
      console.log(jwtHelper.decodeToken(token))
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token!);
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }
    return isRefreshSuccess;
  }



  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;
    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.http.post<AuthenticatedResponse>(`${AUTH_URL}/tokens/refresh`, credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe({
        next: (res: AuthenticatedResponse) => resolve(res),
        error: (_) => { reject; isRefreshSuccess = false; }
      });
    });
    console.log("try prosao")
    localStorage.setItem("jwt", refreshRes.token);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);
    isRefreshSuccess = true;
    return isRefreshSuccess;
  }
}