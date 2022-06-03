import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { ObjectStoreCheck } from 'src/app/models/objectStoreCheck';
import { StoreCheck } from 'src/app/models/storeCheck';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-store-check',
  templateUrl: './store-check.component.html',
  styleUrls: ['./store-check.component.css']
})
export class StoreCheckComponent implements OnInit {

  public storeCheck!: StoreCheck;
  public objectStoreCheck!: ObjectStoreCheck;

  constructor(public storeCheckService: StoreCheckService,
    public objectStoreCheckService: ObjectStoreCheckService,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.router.navigate(['/login']);
        }
      }
      )
  }
}
