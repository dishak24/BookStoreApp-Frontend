import { Component, OnInit, Output , EventEmitter, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit 
{
  cartItems: any[] = [];

  addresses = ['BridgeLabz Solutions LLP, Noida']; 

 // @Output() goHome = new EventEmitter<void>();
  //@Output() cartUpdated = new EventEmitter<void>();
  
  showPlaceOrderButton = true;

  addressForm!: FormGroup;

  // Triggered when user clicks Home
  goHome() 
  {
    this.router.navigate(['/dashboard/home'])
  }

  ngOnInit(): void {

    this.fetchCartItems();

    // Initialize the address form
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  @ViewChild('addressPanel') addressPanel!: MatExpansionPanel;
  @ViewChild('summaryPanel') summaryPanel!: MatExpansionPanel;

  constructor(
    private bookService: BookService, 
    private snackbar: MatSnackBar, 
    private fb: FormBuilder,
    private router : Router) {}


  placeOrder() {
    this.showPlaceOrderButton = false;
    this.addressPanel.open();
  }

  isSubmitting = false;

  continueToSummary() 
  {
    if (this.addressForm.valid) 
    {
      this.isSubmitting = true;
      console.log(this.addressForm.value);
      this.summaryPanel.open(); // or await if it's async
      this.isSubmitting = false;
    } 
    else 
    {
      this.addressForm.markAllAsTouched();
    }
}


  fetchCartItems() {
    this.bookService.getCartItems().subscribe({
      next: (res:any) => {
        if (res.success) {
          this.cartItems = res.data.items;
        }
      },
      error: (err : any) => {
        console.error('Error fetching cart items:', err);
        this.snackbar.open('Failed to load cart items.', 'Close', { duration: 3000 });
      }
    });
  }

  increaseQty(book: any) {
    const updatedQty = book.quantity + 1;
    this.bookService.updateCartQuantity(book.bookId, updatedQty).subscribe({
      next: () => {
        book.quantity = updatedQty;
        // this.cartUpdated.emit(); //Emit when updated
        this.snackbar.open('Quantity Increased!', 'Close', { duration: 3000 });
      },
      error: (err) => console.error('Error increasing quantity:', err)
    });
  }

  decreaseQty(book: any) {
    if (book.quantity > 1) {
      const updatedQty = book.quantity - 1;
      this.bookService.updateCartQuantity(book.bookId, updatedQty).subscribe({
        next: () => {
          book.quantity = updatedQty;
          // this.cartUpdated.emit(); //Emit when updated
          this.snackbar.open('Quantity Decreased!', 'Close', { duration: 3000 });
        },
        error: (err) => console.error('Error decreasing quantity:', err)
      });
    }
  }

  removeFromCart(book: any) 
  {
    this.bookService.updateCartQuantity(book.bookId, 0).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(b => b.bookId !== book.bookId);
        // this.cartUpdated.emit(); //Emit when updated
        this.snackbar.open('Item removed from cart', 'Close', { duration: 3000 });
      },
      error: (err) => console.error('Error removing item:', err)
    });
  }

  get totalAmount(): number 
  {
    return this.cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }


  // Triggered when user clicks on Place Order
  purchaseBooks() {
  // Optional: disable button or show loading spinner
  if (this.cartItems.length === 0) {
    this.snackbar.open('Your cart is empty!', 'Close', { duration: 3000 });
    return;
  }

  this.bookService.placeOrder().subscribe({
    next: (res: any) => {
      if (res.success) {
        this.snackbar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard/purchase']); // or wherever your order confirmation page is
      } else {
        this.snackbar.open('Failed to place order. Please try again.', 'Close', { duration: 3000 });
      }
    },
    error: (err: any) => {
      console.error('Purchase error:', err);
      this.snackbar.open('Something went wrong!', 'Close', { duration: 3000 });
    }
  });
}


}
