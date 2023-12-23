import { NgModule } from '@angular/core';
import {
  AbstractSecurityStorage,
  AuthModule,
  DefaultLocalStorageService,
} from 'angular-auth-oidc-client';
import { ConfigService } from '../config.service';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: ConfigService.config.issuer.url,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'web_app',
        scope: 'openid all offline_access', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 5,
      },
    }),
  ],
  providers: [
    { provide: AbstractSecurityStorage, useClass: DefaultLocalStorageService },
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
