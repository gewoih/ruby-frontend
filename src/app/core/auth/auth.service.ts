import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  private authorizationCompletedSubject = new BehaviorSubject<boolean>(false);
  public authorizationCompleted$: Observable<boolean> =
    this.authorizationCompletedSubject.asObservable();

  constructor(private oauthService: OidcSecurityService) {
    this.configuration$ = this.oauthService.getConfiguration();
    this.userData$ = this.oauthService.userData$;
  }

  public initAuth() {
    this.oauthService.isAuthenticated$.subscribe((r) => {
      this.isAuthenticatedSubject.next(r.isAuthenticated);
      console.info('authenticated: ', r.isAuthenticated);
    });
    this.oauthService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        console.log(isAuthenticated);
        console.log(userData);
        console.log(accessToken);
        console.log(errorMessage);
      });
  }

  login() {
    return this.oauthService
      .authorizeWithPopUp()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        if (isAuthenticated) {
          this.authorizationCompletedSubject.next(true);
        }
        console.log(isAuthenticated);
        console.log(userData);
        console.log(accessToken);
        console.log(errorMessage);
      });
  }

  logout() {
    this.oauthService.logoffAndRevokeTokens().subscribe((result) => {
      console.log(result);
    });
  }

  public refreshSession() {
    this.oauthService
      .forceRefreshSession()
      .subscribe((result) => console.warn(result));
  }

  public getAuthorizationTokenHeaderValue(): Observable<string> {
    return this.oauthService
      .getAccessToken()
      .pipe(map((token) => `Bearer ${token}`));
  }
  //
  // public handleCallback() {
  //   return this.oauthService.loadDiscoveryDocumentAndLogin();
  // }
}
