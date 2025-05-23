import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})

export class WishlistComponent 
{
    wishlistBooks: any[] = [];     

    // Triggered when user clicks Home
    navigateHome() 
    {
      this.router.navigate(['/dashboard/home'])
    }

  constructor(
    private bookService: BookService, 
    private snackBar: MatSnackBar, 
    private router : Router
  ) {}

  ngOnInit() 
  {
    this.getWishlist();
  }

  //get wishlist
  getWishlist() 
  {
    this.bookService.getWishlist().subscribe({
      next: (res: any) => 
      {
        console.log('Wishlist fetched successfully!', res);
        this.wishlistBooks = res.data; // Assign to local variable
      },
      error: (err: any) => 
      {
        console.error('Error fetching wishlist', err);
      }
    });
  }

  //remove book from wishlist
  removeFromWishlist(bookId: number) 
  {
    // Optimistically remove from UI first
    this.wishlistBooks = this.wishlistBooks.filter(book => book.bookId !== bookId);

    this.bookService.removeFromWishlist(bookId).subscribe({
      next: (res: any) => 
      {
        console.log('Removed from wishlist.', res);

        this.snackBar.open('Book removed from wishlist!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
        });
      },
      error: (err: any) => 
      {
        console.error('Error in removing from wishlist !!', err);

        this.snackBar.open('Failed to remove book from wishlist.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        });

        //refresh the wishlist
        this.getWishlist();

      }
    });
  }


}
