import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.auth.getAuthorizationTokenHeaderValue().pipe(
      catchError((error) =>
        throwError(() => {
          console.log('Authorization Header was not received.', error);
        }),
      ),
      switchMap((tokenValue: string) => {
        if (!tokenValue) {
          throwError(() => {
            console.log('Authorization Header is empty.');
          });
        }

        let headers = request.headers.set('Authorization', tokenValue);

        headers = headers.set('ngsw-bypass', 'true');

        const requestClone = request.clone({
          headers,
        });

        return next.handle(requestClone);
      }),
    );
  }
}
