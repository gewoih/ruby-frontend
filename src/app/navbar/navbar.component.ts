import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/auth/auth.service';
import { AuthModalComponent } from '../shared/auth-modal/auth-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cs-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
  ) {}

  public login() {
    this.modalService.open(AuthModalComponent, { centered: true });
  }

  public logout() {
    this.authService.logout();
  }
}
