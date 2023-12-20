import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from './shared/auth-modal/auth-modal.component';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'cs-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'casino-frontend';

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
