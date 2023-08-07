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
  showStoreMetrics: boolean = false;
  showPromoManagement: boolean = false;
  showData: boolean = false;


  constructor(public dialog: MatDialog, public router: Router,) { }

  ngOnInit(): void {
  
  }

  toggleStoreMetrics() {
    this.showStoreMetrics = !this.showStoreMetrics;
}

togglePromoManagement() {
    this.showPromoManagement = !this.showPromoManagement;
}

toggleData() {
    this.showData = !this.showData;
}

  updateTitle(newTitle: string) {
    this.title = newTitle;
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
