import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authService: OAuthService,
    private oauthService: OAuthService) { }
  getUsername() {
    const claims = this.authService.getIdentityClaims();
    if (claims) {
      return null;
    }
    return  (claims as any).given_name;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  public get accessToken() {
    return this.oauthService.getAccessToken();
  }
  getTokenDetails() {
    // @ts-ignore
    return jwtDecode(this.getToken());
  }

  getUserRoles() {
    return (this.getTokenDetails() as any).realm_access;
  }


}
