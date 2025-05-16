import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

// interface BookResponse {
//   success: boolean;
//   message: string;
//   data: {
//     bookId: number;
//     bookName: string;
//     author: string;
//     description: string;
//     price: number;
//     discountPrice: number;
//     quantity: number;
//     bookImage: string;
//   }
// }

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit 
{
  bookId: number = 0;
  //book: any;

  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService,
    private snackbar: MatSnackBar
  ) {}

  @Input() book: any;
  @Output() back = new EventEmitter<void>();

  goBack() 
  {
    this.back.emit();
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




}
