import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService 
{
  // AuthGuardService is used to protect routes from unauthorized access
  constructor(private router: Router, private http: HttpService) { }
  canActivate(): boolean 
  {
    const token = localStorage.getItem('accessToken');
      if (token) 
      {
        return true;
      } 
      else 
      {
        this.router.navigate(['/auth']);
        return false;
      }
  }

  getAccessToken() 
  {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() 
  {
    return localStorage.getItem('refreshToken');
  }

  setTokens(access: string, refresh: string) 
  {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  clearTokens() 
  {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  refreshToken(): Observable<any> 
  {
    return this.http.postApi('/api/auth/users-refresh-Token', {
      refreshToken: this.getRefreshToken()
    });
  }
}
