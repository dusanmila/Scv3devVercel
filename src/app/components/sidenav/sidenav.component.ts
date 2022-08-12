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
    if (url === '/sidenav/dashboard')
      this.title = 'Dashboard';
    else if (url === '/sidenav/user')
      this.title = 'Users';
    else if (url === '/sidenav/object')
      this.title = 'Objects';
    else if (url === '/sidenav/retailer')
      this.title = 'Retailers';
    else if (url === '/sidenav/storeCheckReceiver')
      this.title = 'Store Check Receivers';
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