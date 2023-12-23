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
        resolve();
      });
    });
  }
}
