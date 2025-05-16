import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book/book.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnChanges 
{
  books: any[] = [];

  @Input() searchTerm: string = '';  // <-- Input from parent

  @Output() bookClicked = new EventEmitter<any>();

  onBookClick(book: any) 
  {
    this.bookClicked.emit(book);
  }

  //for pagination
  currentPage = 1;
  pageSize = 8;

  isSortMenuOpen = false;
  selectedSortLabel = 'Relevance';
  originalBooks: any[] = [];

  constructor(private bookService: BookService, private snackBar: MatSnackBar) {}

  ngOnInit(): void 
  {
    this.bookService.getAllBooks().subscribe(
    {
      next: (result: any) => 
      {
        this.books = Array.isArray(result) ? result : result.data;
        this.originalBooks = [...this.books];  // important!
        this.snackBar.open('Got all books Successfully.', 'Close', 
          {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => 
      {
        this.snackBar.open('Getting all books failed !!!!', 'Close', 
          {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
 
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
    if (changes['searchTerm']) 
    {
      this.filterBooks();
    }
  }

  filterBooks(): void 
  {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) 
    {
      this.books = this.originalBooks.filter(
        book =>
          book.bookName.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      );
    } 
    else 
    {
      this.books = [...this.originalBooks];
    }
    this.currentPage = 1; // reset pagination on search
  }

   
  get totalPages(): number 
  {
    return Math.ceil(this.books.length / this.pageSize);
  }

  get pages(): number[] 
  {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void 
  {
    if (page >= 1 && page <= this.totalPages) 
    {
      this.currentPage = page;
    }
  }

  prevPage(): void 
  {
    if (this.currentPage > 1) 
    {
      this.currentPage--;
    }
  }

  nextPage(): void 
  {
    if (this.currentPage < this.totalPages) 
    {
      this.currentPage++;
    }
  }
  
  toggleSortMenu() 
  {
    this.isSortMenuOpen = !this.isSortMenuOpen;
  }

  sortBooks(criteria: string) 
  {
    this.selectedSortLabel = criteria;
    this.isSortMenuOpen = false;

    switch (criteria) 
    {
      case 'Low To High':
        this.books = [...this.books].sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'High To Low':
        this.books = [...this.books].sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'Newest':
        this.books = [...this.books].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Relevance':
      default:
        this.books = [...this.originalBooks];
        break;
    }

    this.currentPage = 1;  // reset pagination to page 1
    console.log('Sorted books:', this.books);
  }



}