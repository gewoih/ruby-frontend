import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthConfigModule } from './core/auth/auth-config.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './core/app.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ApiAuthInterceptor } from './core/interceptors/api-auth.interceptor';

export function initializeApp(appService: AppService) {
  return (): Promise<void> => {
    return appService.init();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SidebarComponent,
    HttpClientModule,
    AuthConfigModule,
    NgbModule,
    NavbarComponent,
    ServiceWorkerModule.register('service-worker.js', {
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
