import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService 
{
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  token: any;
  constructor( private http: HttpService) 
  { 
    //to retrive token first from local storage
    this.token = localStorage.getItem('accessToken');
    //to check if token is present or not
    console.log('accessToken:', this.token);

    this.loadCartCount(); // Load initial cart count on service creation
  
  }

//common function for http options
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  //get all books
  getAllBooks()
  {
    let httpOption = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/books', httpOption.headers)as Observable<any[]>;
  }

  //get book by id
  getBookById(payload: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi(`/api/books/${payload}`, httpOption.headers);
  }

  //add book to wishlist
  addToWishlist(bookId: number)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.postApi(`/api/wishlists?bookId=${bookId}`,{}, httpOption.headers);
  }

  //get all books in wishlist
  getWishlist()
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/wishlists', httpOption.headers);
  }

  //remove book from wishlist
  removeFromWishlist(bookId: number) 
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.deleteApi(`/api/wishlists/${bookId}`, httpOption.headers);
  }

  //add book to cart
  addToCart(bookId: number)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.postApi(`/api/carts?bookId=${bookId}`, {}, httpOption.headers)
    .pipe(
        tap(() => this.loadCartCount())
      );
  }

  // update book quantity in cart
  updateCartQuantity(bookId: number, quantity: number) 
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const body = { quantity };

    return this.http.putApi(`/api/carts/${bookId}`, body, headers)
    .pipe(
        tap(() => this.loadCartCount())
      );
  }

  //get all books in cart
  getCartItems()
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/carts', httpOption.headers);
  }


  // Load and update the cart count BehaviorSubject
  loadCartCount() {
  this.getCartItems().subscribe({
    next: (res: any) => {
      if (res.success && res.data?.items) {
        const count = res.data.items.length; // Only count distinct items
        this.cartCountSubject.next(count);
      } else {
        this.cartCountSubject.next(0);
      }
    },
    error: err => {
      console.error('Error loading cart count:', err);
      this.cartCountSubject.next(0);
    }
  });
}

  //get order history
  getOrderHistory()
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/api/orders', httpOption.headers);
  }


  //to place order
  placeOrder()
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.postApi('/api/orders', {}, httpOption.headers);
  }
  
}
