import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDilogComponent } from '../logout-dilog/logout-dilog.component';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { Subscription } from 'rxjs';

import { SearchingService } from 'src/app/services/search/searching.service'; // adjust path as needed

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit
{
  username: string = '';

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private bookService: BookService,
    private searchService: SearchingService     
  ) { }

  //for searching
  searchTerm: string = '';

  selectedBook: any = null;

  selectedSection: string = 'books'; // or 'wishlist'

  cartItemCount: number = 0;

  private cartCountSub!: Subscription;


  // onBookSelected(book: any) 
  // {
  // this.selectedBook = book;
  // }

  navigateToWishlist()
  {
    this.router.navigate(['/dashboard/wishlists']);
  }

  navigateToCart()
  {
    this.router.navigate(['/dashboard/carts']);
  }

  ngOnInit(): void 
  {
    //fetching username from localStorage
    const userData = localStorage.getItem('user');
    if (userData) 
    {
      const user = JSON.parse(userData);
      const fullName = user; 
      this.username = fullName.split(' ')[0]; //to get first name
      console.log("Current logged User:", this.username);
    }
    else 
    {
      this.username = 'Profile';
    }

    //this.fetchCartCount();
    // Subscribe to reactive cart count updates
    this.cartCountSub = this.bookService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });

  }

  onSearchTermChange(term: string) 
  {
      this.searchService.setSearchTerm(term);
  }

  ngOnDestroy(): void {
    if (this.cartCountSub) {
      this.cartCountSub.unsubscribe();
    }
  }

  // Logout function
  openLogoutDialog() 
  {
    const dialogRef = this.dialog.open(LogoutDilogComponent, 
    {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => 
    {
      if (result) 
      {
        this.logout();
      }
    });
  }

  // Logout function
  logout() 
  {
    //Remove token from local storage
    localStorage.removeItem('Token'); 
    console.log('User logged out !!!!'); 
    // Navigate to the login page
    this.router.navigate(['/auth']); 
  }

  getCartCount() {
  this.bookService.getCartItems().subscribe((cartItems: any) => {
    this.cartItemCount = cartItems.length; // or sum of quantities if needed
  });
}

fetchCartCount() {
  this.bookService.getCartItems().subscribe({
    next: (res: any) => {
      if (res.success) {
        this.cartItemCount = res.data.items.reduce(
          (total: number, item: any) => total + item.quantity,0 );
      }
    },
    error: (err) => {
      console.error('Error fetching cart count:', err);
    }
  });
}


}
