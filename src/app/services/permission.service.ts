import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private oauthService: OAuthService) {}

  checkPermission(permission: string): boolean {
    const decodedToken: any = jwt_decode(this.oauthService.getAccessToken());
    // console.log("token=",decodedToken)
    return (decodedToken['realm_access']['roles'] as Array<string>).some(
      (p) => permission === p
    );
  }

  logout() {
    this.oauthService.logOut();
  }
}
