import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfigModule } from './core/auth/auth-config.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './core/app.service';

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
  ],
  providers: [
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: (app: AppService) => {
        app.init().then(() => console.log('app started'));
      },
      deps: [AppService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
