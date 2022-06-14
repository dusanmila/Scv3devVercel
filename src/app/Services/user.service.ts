
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { USER_URL } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});
  
   private readonly adress ="http://localhost:8083/user";
   private readonly userAdress ="http://localhost:8086/api/users";

  //private readonly adress = "https://microserviceuser.azurewebsites.net/user";
  //private readonly userAdress = "https://microserviceuser.azurewebsites.net/api/users";

  public getUsers(): Observable<User[]> {

    let retval$ = new Subject<User[]>();

    this.http.get<User[]>(`${USER_URL}/users`,{headers:this.headers}).subscribe((users: User[]) => {

      retval$.next(users)

    });

    return retval$.asObservable();
  }



  /*
  public createUser(user:User):Observable<User>{

    let retval$ = new Subject<User>();

    this.http.post<User>(`${USER_URL}/users`, user).subscribe((helper: User) => {

      retval$.next(helper)

    });

    return retval$.asObservable();
  }
*/
  public deleteUser(user: User): Observable<User> {


    let retval$ = new Subject<User>();
    this.http.delete<User>(`${USER_URL}/users/${user.username}`,{headers:this.headers}).subscribe((helper: User) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public editUser(user: User): Observable<User> {

    let retval$ = new Subject<User>();

    this.http.put<User>(`${USER_URL}/users`, user,{headers:this.headers}).subscribe((helper: User) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneUser(user: User): Observable<User> {

    let retval$ = new Subject<User>();

    this.http.get<User>(`${USER_URL}/users/username/${user.username}`,{headers:this.headers}).subscribe((helper: User) => {
      retval$.next(helper)

    });

    return retval$.asObservable();

  }

  public getUserByUsername(username: String): Observable<User> {

    let retval$ = new Subject<User>();

    this.http.get<User>(`${USER_URL}/users/username/${username}`,{headers:this.headers}).subscribe((user: User) => {

      retval$.next(user)

    });

    return retval$.asObservable();
  }

  public getUsersByUsername(username: String): Observable<User[]> {

    let retval$ = new Subject<User[]>();

    this.http.get<User[]>(`${USER_URL}/users/usernameList/${username}`,{headers:this.headers}).subscribe((users: User[]) => {

      retval$.next(users)

    });

    return retval$.asObservable();
  }

  public createUser(user: User): Observable<User> {

    let retval$ = new Subject<User>();
    this.http.post<User>(`${USER_URL}/users`, user,{headers:this.headers}).subscribe((helper: User) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }




}
