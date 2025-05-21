import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BooksComponent } from './components/books/books.component';
import { MatMenuModule } from '@angular/material/menu';
import { PaginationPipe } from './pipe/pagination.pipe';
import { FormsModule } from '@angular/forms';
import { LogoutDilogComponent } from './components/logout-dilog/logout-dilog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartComponent } from './components/cart/cart.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { MatBadgeModule } from '@angular/material/badge';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { OrderPlaceComponent } from './components/order-place/order-place.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    BooksComponent,
    PaginationPipe,
    LogoutDilogComponent,
    BookDetailsComponent,
    WishlistComponent,
    CartComponent,
    OrderPlaceComponent,
    OrderHistoryComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    MatCardModule, 
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatBadgeModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
