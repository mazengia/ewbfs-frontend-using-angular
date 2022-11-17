import { AuthConfig } from 'angular-oauth2-oidc';
import {environment} from "../../environments/environment";

export const authConfig: AuthConfig = {
  redirectUri: window.location.origin + '/welcome',
  clientId: 'frontend',
  scope: 'openid profile email',
  issuer: environment.ISSUER_URL,
  responseType: 'code',
  showDebugInformation: true,
  requireHttps: false
};
