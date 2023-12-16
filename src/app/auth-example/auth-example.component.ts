import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-example',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe],
  templateUrl: './auth-example.component.html',
  styleUrl: './auth-example.component.scss',
})
export class AuthExampleComponent {
  constructor(public authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
