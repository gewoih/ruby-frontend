import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthExampleComponent } from './auth-example/auth-example.component';

const routes: Routes = [
  { path: '', component: AuthExampleComponent },
  { path: 'about', component: AuthExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
