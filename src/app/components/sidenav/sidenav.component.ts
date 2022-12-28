import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  opened: boolean = true;
  title: string = 'Dashboard';

  constructor(public dialog: MatDialog, public router: Router,) { }

  ngOnInit(): void {
    this.changeTitle();
  }

  public changeTitle() {
    let url = this.router.url;
    if (url === '/admin/dashboard')
      this.title = 'Feedback statistics';
    else if (url === '/admin/position-dashboard')
      this.title = 'Position statistics';
    else if (url === '/admin/user')
      this.title = 'Users';
    else if (url === '/admin/object')
      this.title = 'Objects';
    else if (url === '/admin/retailer')
      this.title = 'Retailers';
    else if (url === '/admin/storeCheckReceiver')
      this.title = 'Store Check Receivers';
    else if (url === '/admin/secondaryPosition')
      this.title = 'Secondanry Positions';
    else if (url === '/admin/product')
      this.title = 'Products';
    else if (url === '/admin/uploads')
      this.title = 'Import / Export Files';
  }

  public logout() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    localStorage.setItem("jwt", "");
    localStorage.setItem("refreshToken", "");
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }

}
