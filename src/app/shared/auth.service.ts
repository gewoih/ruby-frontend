import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData$: Observable<UserDataResult>;

  public configuration$: Observable<OpenIdConfiguration>;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  private authConfig = {
    issuer: 'https://localhost:7220',
    redirectUri: window.location.origin + '/callback',
    clientId: 'web_app',
    scope: 'all',
    responseType: 'code',
    showDebugInformation: true,
  };
  private popupWindow: Window | null = null;

  constructor(private oauthService: OidcSecurityService) {
    this.configuration$ = this.oauthService.getConfiguration();
    this.userData$ = this.oauthService.userData$;
    this.initAuth();
  }

  private initAuth() {
    this.oauthService.stsCallback$.subscribe((result) => {
      console.log(result);
    });

    this.oauthService.isAuthenticated$.subscribe((r) => {
      console.info('authenticated: ', r.isAuthenticated);
    });
    this.oauthService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
        console.log(isAuthenticated);
        console.log(userData);
        console.log(accessToken);
        console.log(errorMessage);
      });
  }

  login() {
    this.oauthService
      .authorizeWithPopUp()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
        console.log(isAuthenticated);
        console.log(userData);
        console.log(accessToken);
        console.log(errorMessage);
      });
  }

  logout() {
    this.oauthService.logoff().subscribe((result) => console.log(result));
  }

  public refreshSession() {
    this.oauthService
      .forceRefreshSession()
      .subscribe((result) => console.warn(result));
  }

  //
  // public handleCallback() {
  //   return this.oauthService.loadDiscoveryDocumentAndLogin();
  // }
}
