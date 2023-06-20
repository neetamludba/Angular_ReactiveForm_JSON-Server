import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionUser } from '../models/session.user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<SessionUser>;


  constructor(
    private http: HttpClient,
    private router: Router) {
    const userObject = localStorage.getItem('user');

    this.userSubject = new BehaviorSubject<SessionUser>(
      userObject ? JSON.parse(userObject) : null
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): SessionUser {
    return this.userSubject.value?.userObject;
  }

  public get token(): string {
    return this.userSubject.value.token.accessToken;
  }

  private jsonServerURL = 'http://localhost:3000/user';

  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };


  async login(email: string, password: string): Promise<any> {
    return this.http.get(this.jsonServerURL + '?email=' + email + '&password=' + password)
      .toPromise().then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
      .catch((ex) => console.log(ex));
  }
}
