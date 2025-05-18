import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = 
[
  {
    path: 'auth',
    component: AuthenticationComponent   
  }, 
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],//property - true or false 
    children: [
      { path: '', component: BooksComponent }, ] 
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'books/:bookId',
    component: BookDetailsComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
