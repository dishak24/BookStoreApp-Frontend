import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit
{
  username: string = '';

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
}
