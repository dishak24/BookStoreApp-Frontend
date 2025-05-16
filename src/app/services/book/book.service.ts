import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService 
{

  token: any;
  constructor( private http: HttpService) 
  { 
    //to retrive token first from local storage
    this.token = localStorage.getItem('Token');
    //to check if token is present or not
    console.log('Token:', this.token);
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
  getBookById(bookId: number)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi(`/api/books/${bookId}`, httpOption.headers);
  }
}
