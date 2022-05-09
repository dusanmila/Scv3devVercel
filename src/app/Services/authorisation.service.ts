import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';


export interface User {

  username: string;
  password: string;
}

export interface TokenTime {

  token: string;
  time: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  tokenTime: TokenTime= {token: "", time: "",isAdmin:false};
  isadmin:BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isadmin=new BehaviorSubject<boolean>(false);
   }

   private readonly adress ="http://localhost:8086/api";

   userDataArrived: EventEmitter<TokenTime>  = new EventEmitter<TokenTime>();
 
   public logIn(user:User):Observable<void>{
     let retval$ = new Subject<void>();
     
       this.http.post<TokenTime>(`${this.adress}`,user).subscribe((helper: TokenTime) => {
         this.tokenTime=helper;
         this.isadmin.next(this.tokenTime.isAdmin); 
         
         this.userDataArrived.emit(this.tokenTime);
 
         retval$.next();
    
     });
     
     return retval$.asObservable();
   }
 
   public logOut():Observable<boolean>
   {
     console.log(this.tokenTime.token);
     let headers:HttpHeaders=new HttpHeaders({'token': this.tokenTime.token});
 
     let retval$ = new Subject<boolean>();
     let clientAdress:string;
  
       this.http.get<boolean>(`${this.adress}`,{headers}).subscribe(helper => {
         
         if(helper){
           this.tokenTime={token: "", time: "",isAdmin:false};;
         }
         else{
           alert("Unsuccessfull logout, exit page manualy!");
         }
 
         retval$.next(helper);
     });
 
     return retval$.asObservable();
   }
 
}
