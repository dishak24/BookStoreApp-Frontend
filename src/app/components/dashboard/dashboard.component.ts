import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDilogComponent } from '../logout-dilog/logout-dilog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit
{
  username: string = '';

  constructor(
    private router: Router, 
    private dialog: MatDialog,     
  ) { }

  //for searching
  searchTerm: string = '';

  selectedBook: any = null;

  selectedSection: string = 'books'; // or 'wishlist'

  onBookSelected(book: any) 
  {
  this.selectedBook = book;
  }

  ngOnInit(): void 
  {
    //fetching username from localStorage
    const userData = localStorage.getItem('user');
    if (userData) 
    {
      const user = JSON.parse(userData);
      const fullName = user; 
      this.username = fullName.split(' ')[0]; //to get first name
      console.log("Current logged User:", this.username);
    }
    else 
    {
      this.username = 'Profile';
    }
  }

  // Logout function
  openLogoutDialog() 
  {
    const dialogRef = this.dialog.open(LogoutDilogComponent, 
    {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => 
    {
      if (result) 
      {
        this.logout();
      }
    });
  }

  // Logout function
  logout() 
  {
    //Remove token from local storage
    localStorage.removeItem('Token'); 
    console.log('User logged out !!!!'); 
    // Navigate to the login page
    this.router.navigate(['/auth']); 
  }

}
