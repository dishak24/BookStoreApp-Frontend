import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dilog',
  templateUrl: './logout-dilog.component.html',
  styleUrls: ['./logout-dilog.component.scss']
})
export class LogoutDilogComponent 
{
  constructor(public dialogRef: MatDialogRef<LogoutDilogComponent>) {}

  onLogout() 
  {
    this.dialogRef.close(true);
  }

  onCancel() 
  {
    this.dialogRef.close(false);
  }

}
