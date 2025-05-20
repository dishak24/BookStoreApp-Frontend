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


  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  // Triggered when user clicks Home
  goBack() 
  {
    this.router.navigate(['/dashboard/home']);
  }

  ngOnInit(): void 
  {
    // Get the ID from route
    this.bookId = Number(this.route.snapshot.paramMap.get('bookId'));
    
    this.bookService.getBookById(this.bookId).subscribe({
      next: (response: any) => 
      {
        this.book = response.data;
        console.log('Book details:', this.book);
      },
      error: (err) => 
      {
        console.error('Error fetching book details:', err);
      }
    });
  }


  // add to wishlist
  addToWishlist(bookId: number) 
  {
    const payload = { bookId };
    console.log('Attempting to add book to wishlist:', payload);

    this.bookService.addToWishlist(bookId).subscribe({
      next: (result) => 
      {
        console.log('Book added to wishlist!', result);

        this.snackbar.open('Book added to wishlist!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => 
      {
        console.error('Adding to wishlist failed!!', err);

        let errorMsg = 'Could not add book to wishlist. Please try again.';

        if (err?.error?.message?.includes('Book is already in the wishlist')) 
        {
          errorMsg = 'Book already exists in your wishlist.';
        } 
        else if (err?.error?.message?.includes('Book not found')) 
        {
          errorMsg = 'Book not found.';
        }

        this.snackbar.open(errorMsg, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }


// add to cart 
// check if book is already in cart if yes then increase quantity
// else add to cart
  addToCart(book: any) 
  {
    this.bookService.getCartItems().subscribe({
      next: (response: any) => 
      {
        const cartItems = response.data?.items ?? []; // 👈 handles null case

        const cartItem = cartItems.find((item: any) => item.bookId === book.bookId);

        if (cartItem) 
        {
          // Book already in cart → increase quantity
          const newQty = cartItem.quantity + 1;

          this.bookService.updateCartQuantity(book.bookId, newQty).subscribe({
            next: () => 
            {
              this.snackbar.open('Quantity increased in cart!', 'Close', { duration: 3000 });
              this.isInCart = true;
              book.quantity = newQty;
            },
            error: () => 
            {
              console.error('Failed to update quantity');
              this.snackbar.open('Failed to update quantity.', 'Close', { duration: 3000 });
            }
          });
        } 
        else 
        {
          // Cart is empty or book not found → add to cart
          this.bookService.addToCart(book.bookId).subscribe({
            next: () => 
            {
              this.snackbar.open('Book added to cart!', 'Close', { duration: 3000 });
              this.isInCart = true;
              book.quantity = 1;
            },
            error: () => 
            {
              console.error('Failed to add to cart');
              this.snackbar.open('Failed to add book to cart.', 'Close', { duration: 3000 });
            }
          });
        }
      },
      error: () => 
      {
        console.error('Failed to fetch cart items');
        this.snackbar.open('Could not verify cart status.', 'Close', { duration: 3000 });
      }
    });
  }



  // increase quantity in cart
  increaseQty(book: any) 
  {
    const newQty = book.quantity + 1;
    this.bookService.updateCartQuantity(book.bookId, newQty).subscribe({
      next: (res) => 
      {
        book.quantity = newQty;
        this.snackbar.open('Quantity Increased!', 'Close', { duration: 3000 });
      },
      error: (err) => 
      {
        console.error("Error increasing quantity:", err);
      }
    });
  }

  // Decrease quantity in cart
  decreaseQty(book: any) 
  {
    if (book.quantity > 1) 
    {
      const newQty = book.quantity - 1;

      this.bookService.updateCartQuantity(book.bookId, newQty).subscribe({
        next: (res) => 
        {
          book.quantity = newQty;
          this.snackbar.open('Quantity Decreased!', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error("Error decreasing quantity:", err);
        }
      });
    } 
    else 
    {
      this.snackbar.open('Minimum quantity is 1.', 'Close', { duration: 3000 });
    }
  }

}
