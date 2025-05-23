import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderPlaceComponent } from './components/order-place/order-place.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

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
    children: 
              [
                { path: 'home', component: BooksComponent },
                { path: 'books/:bookId',  component: BookDetailsComponent },
                { path: 'wishlists', component: WishlistComponent },
                { path: 'carts', component: CartComponent },
                { path: 'purchase', component: OrderPlaceComponent },
                { path: 'orders', component: OrderHistoryComponent},
              ] 
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
