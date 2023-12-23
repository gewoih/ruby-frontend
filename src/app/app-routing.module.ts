import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthExampleComponent } from './auth-example/auth-example.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user', component: AuthExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
