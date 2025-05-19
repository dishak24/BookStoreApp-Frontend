import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService 
{
  // AuthGuardService is used to protect routes from unauthorized access
  // It checks if the user is authenticated by checking the presence of a token in local storage
  // If the token is present, it allows access to the route
  // If the token is not present, it redirects the user to the login page
  // The constructor injects the Router service to navigate to different routes
  // The canActivate method is called by the router to check if the route can be activated
  // The method checks if the token is present in local storage
  // If the token is present, it returns true, allowing access to the route
  // If the token is not present, it redirects the user to the login page and returns false
  // The AuthGuardService is used in the app-routing.module.ts file to protect the dashboard route
  // The AuthGuardService is provided in the root injector, making it available throughout the application
  
  constructor(private router: Router) { }
  canActivate(): boolean 
  {
    const token = localStorage.getItem('Token');
      if (token) 
      {
        return true;
      } 
      else 
      {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
