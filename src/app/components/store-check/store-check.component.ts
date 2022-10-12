import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
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
export class StoreCheckComponent {

  public storeCheck!: StoreCheck;
  public objectStoreCheck!: ObjectStoreCheck;
  public menager:boolean=false;
  public workModel: string;
  public storecheck:boolean=false;

  constructor(public storeCheckService: StoreCheckService,
    public objectStoreCheckService: ObjectStoreCheckService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public router: Router) {
      if (localStorage.getItem("role")=="Menager")
      {
        this.menager=true;
      }
     }
     ngOnInit(): void {
     
      this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
      if (this.workModel == "storeCheck") {
        this.storecheck = true;
      }
    }

  public logout() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    localStorage.setItem("jwt", "");
    localStorage.setItem("refreshToken", "");
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/login']);
        }
      }
      )
  }
}
