import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config.service';

@Injectable()
export class AppService {
  constructor(
    private zone: NgZone,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  public init(): Promise<void> {
    return new Promise((resolve) => {
      this.zone.runOutsideAngular(() => {
        this.authService.initAuth();
        this.registerServiceWorker().then(() =>
          console.log('serviceWorker registered'),
        );
        resolve();
      });
    });
  }

  private async registerServiceWorker() {
    if (navigator?.serviceWorker) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (navigator.serviceWorker.controller === null) {
          // we get here after a ctrl+f5 OR if there was no previous service worker.
          navigator.serviceWorker.ready.then(() => {
            registration!.active!.postMessage('claimMe');
          });
        }
      });

      navigator.serviceWorker.addEventListener('message', (event) => {
        const { action } = event.data;
        const port = event.ports[0];

        if (action === 'getAuthTokenHeader') {
          this.authService
            .getAuthorizationTokenHeaderValue()
            .subscribe((authHeader) => {
              port.postMessage({
                response: authHeader,
              });
            });
        }
      });
    }
  }
}
