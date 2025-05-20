import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book/book.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchingService } from 'src/app/services/search/searching.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy 
{
  books: any[] = []; // original unfiltered data

  filteredBooks: any[] = []; // data shown in UI (after search/sort)
  currentPage = 1;
  pageSize = 8;
  isSortMenuOpen = false;
  selectedSortLabel = 'Relevance';
  private searchSub!: Subscription;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router,
    private searchService: SearchingService
  ) {}

  ngOnInit(): void 
  {
    this.bookService.getAllBooks().subscribe({
      next: (result: any) => 
      {
        this.books = Array.isArray(result) ? result : result.data;
        this.filteredBooks = [...this.books]; // default to all books
        this.snackBar.open('Got all books Successfully.', 'Close', 
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.listenToSearch(); // for search 
      },
      error: () => 
      {
        this.snackBar.open('Getting all books failed !!!!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  // for searching
  listenToSearch() 
  {
    this.searchSub = this.searchService.searchTerm$.subscribe(term => {
      const trimmed = term.trim().toLowerCase();
      if (trimmed) {
        this.filteredBooks = this.books.filter(
          book =>
            book.bookName.toLowerCase().includes(trimmed) ||
            book.author.toLowerCase().includes(trimmed)
        );
      } else {
        this.filteredBooks = [...this.books];
      }
      this.currentPage = 1; // reset pagination
    });
  }

  //when user clicks on book
  // go to book details
  onBookClick(book: any) 
  {
    this.router.navigate(['/dashboard/books', book.bookId]);
  }

  //for pagination
  get totalPages(): number 
  {
    return Math.ceil(this.filteredBooks.length / this.pageSize);
  }

  //get pages
  get pages(): number[] 
  {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  //change page
  changePage(page: number): void 
  {
    if (page >= 1 && page <= this.totalPages) 
    {
      this.currentPage = page;
    }
  }

  
  //go to previous page
  prevPage(): void 
  {
    if (this.currentPage > 1) 
    {
      this.currentPage--;
    }
  }

  //go to next page
  nextPage(): void 
  {
    if (this.currentPage < this.totalPages) 
    {
      this.currentPage++;
    }
  }

  //toggle sort menu
  toggleSortMenu() 
  {
    this.isSortMenuOpen = !this.isSortMenuOpen;
  }

  
  // sort books based on criteria
  sortBooks(criteria: string) 
  {
    this.selectedSortLabel = criteria;
    this.isSortMenuOpen = false;

    switch (criteria) 
    {
      case 'Low To High':
        this.filteredBooks = [...this.filteredBooks].sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'High To Low':
        this.filteredBooks = [...this.filteredBooks].sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'Newest':
        this.filteredBooks = [...this.filteredBooks].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'Relevance':
      default:
        this.filteredBooks = [...this.books];
        break;
    }

    this.currentPage = 1;
  }

  ngOnDestroy(): void 
  {
    if (this.searchSub) this.searchSub.unsubscribe();
  }
}
