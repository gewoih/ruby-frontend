import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  constructor(
    private authService: AuthService,
    private activeModal: NgbActiveModal,
  ) {
    this.authService.authorizationCompleted$.subscribe((result) => {
      if (result) {
        this.activeModal.close();
      }
    });
  }

  public login() {
    this.authService.login();
  }
}