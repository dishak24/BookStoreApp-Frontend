import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

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

}
