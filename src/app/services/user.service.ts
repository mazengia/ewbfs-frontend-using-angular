import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import {AuthService} from "./auth.service";
import {Employee} from "../model/user";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private oauthService: OAuthService,private authService:AuthService) {}

  getUserBranch(employeeId: String): Observable<Employee> {
    return this.http
      .get<Employee>(
        `${environment.HR_HOST}/employees/by-employeeId/${employeeId}`
      )
      .pipe(catchError(this.errorHandler));
  }

  getCurrentUser() {
    return jwt_decode(this.authService.accessToken);
  }

  getEmployeeId() {
    return (<any>this.getCurrentUser()).employeeID;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
