import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent 
{
    wishlistArray:any[]=[];
    isLoading = true;
    constructor(private wishlistservice:BookService){}

    ngOnInit(): void {
      this.getWishlistItems();


    }

      getWishlistItems() 
      {
      
        this.wishlistservice.getWishlist().subscribe({
          next: (response: any) => {
            this.wishlistArray = response.data.items.reverse().map((book:any, index:number) => ({
              ...book,
              //bookImage: `images/book${(index % 9) + 1}.png`
            }));
            console.log(response.data.items);
            // this.filteredBooks = [...this.wishlistArray];
            // this.totalBooks = this.filteredBooks.length;
            this.isLoading = false;
          },
          error: (error: any) => {
            console.error("Error fetching books:", error);
            this.isLoading = false;
          }
        });
      }
      
    trackByBookId(index: number, item: any): number 
    {
      return item.bookId;
    }
      removeFromWishlist(bookId: number) {
        // this.wishlistservice.removeFromWishlist(bookId).subscribe({
        //   next: (response: any) => {
        //       this.sharedservice.triggerCartRefresh();
        //     this.wishlistArray = this.wishlistArray.filter(book => book.id !== bookId);    
        //     console.log("Updated wishlist:", this.wishlistArray);
        //     //window.location.reload();
        //   this.getWishlistItems();
        //   },
        //   error: (error: any) => 
        //   {
        //     console.error("Error removing book from wishlist:", error);
        //   }
        // });
      }
      
}
