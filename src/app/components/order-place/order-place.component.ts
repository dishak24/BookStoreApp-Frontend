import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent 
{
  orderId: number = 0;

  constructor(private router: Router) 
  {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { orderId: number };
    this.orderId = state?.orderId ?? 0;
  }

}
