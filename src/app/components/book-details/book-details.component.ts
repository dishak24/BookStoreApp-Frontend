import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit 
{
  bookId: number = 0;
  book: any;
  isInCart = false;
  quantity = 1;


  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  // @Input() book: any;
  // @Output() back = new EventEmitter<void>();

  goBack() 
  {
    //this.back.emit();
    this.router.navigate(['/dashboard/home']);
  }

  ngOnInit(): void 
  {
    // Get the ID from route
    this.bookId = Number(this.route.snapshot.paramMap.get('bookId'));

    // Now call your service with that ID
    this.bookService.getBookById(this.bookId).subscribe({
      next: (response: any) => {
        this.book = response.data;
        console.log('Book details:', this.book);
      },
      error: (err) => 
      {
        console.error('Error fetching book details:', err);
      }
    });
  }

  addToWishlist(bookId: number) 
  {
  const payload = { bookId };
  console.log('Attempting to add book to wishlist:', payload);

  this.bookService.addToWishlist(bookId).subscribe({
    next: (result) => {
      console.log('Book added to wishlist!', result);

      this.snackbar.open('Book added to wishlist!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    },
    error: (err) => {
      console.error('Adding to wishlist failed!!', err);

      let errorMsg = 'Could not add book to wishlist. Please try again.';

      if (err?.error?.message?.includes('Book is already in the wishlist')) {
        errorMsg = 'Book already exists in your wishlist.';
      } else if (err?.error?.message?.includes('Book not found')) {
        errorMsg = 'Book not found.';
      }

      this.snackbar.open(errorMsg, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  });
}


//cart
addToCart(book: any) 
{
  this.bookService.addToCart(book.bookId).subscribe({
    next: (res) => {
      console.log('Added to cart:', res);
      this.snackbar.open('Book added to cart!', 'Close', { duration: 3000 });

      // Replace button with quantity counter
      this.isInCart = true;

      // OPTIONAL: update cart icon badge
      // this.cartService.incrementCartCount(); // only if you have shared service
    },
    error: (err) => {
      console.error('Failed to add to cart:', err);
      this.snackbar.open('Failed to add book to cart.', 'Close', { duration: 3000 });
    }
  });
}


increaseQty(book: any) 
{
  book.quantity++; // actually update the book object’s quantity
  this.bookService.updateCartQuantity(book.bookId, book.quantity).subscribe({
    next: (res) => {
      this.snackbar.open('Quantity Increased!', 'Close', { duration: 3000 });
    },
    error: (err) => {
      console.error("Error increasing quantity:", err);
    }
  });
}


//to decrease the quantity
decreaseQty(book: any) 
{
  this.quantity--;
  //update quantity to backend
  const newQty = book.quantity-1;
  this.bookService.updateCartQuantity(book.bookId, newQty).subscribe({
    next: (res) => 
    {
      book.quantity = newQty;
      this.snackbar.open('Quantity Decreased!', 'Close', { duration: 3000 });
    },
    error: (err) => {
      console.error("Error in decreasing quantity:", err);
    }
  });
}



}
