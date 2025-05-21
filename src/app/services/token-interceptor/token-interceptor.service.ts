import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuardService } from '../auth-guard/auth-guard.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthGuardService,
    private router: Router,
    private loader: LoaderService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    let authReq = req;

    // Add Bearer token if exists
    if (accessToken) 
    {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }

    // Show loader before request
    this.loader.show();

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => 
      {
        // If 401 Unauthorized and refresh token is available
        if (error.status === 401 && this.authService.getRefreshToken()) {
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => 
            {
              const newAccess = res.data.accessToken;
              const newRefresh = res.data.refreshToken;

              // Save new tokens
              this.authService.setTokens(newAccess, newRefresh);

              // Retry original request with new access token
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newAccess}` }
              });

              return next.handle(retryReq);
            }),
            catchError(err => 
            {
              this.authService.clearTokens();
              this.router.navigate(['/auth']);
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      }),

      // Hide loader after request finishes (success or error)
      finalize(() => 
      {
        this.loader.hide();
      })
    );
  }
}
