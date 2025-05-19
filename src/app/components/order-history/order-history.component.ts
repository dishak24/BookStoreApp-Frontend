import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
orders: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getOrderHistory().subscribe({
      next: (response: any) => {
        this.orders = response.data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
}