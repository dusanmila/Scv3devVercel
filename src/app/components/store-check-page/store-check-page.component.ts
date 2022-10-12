import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { Obj } from 'src/app/models/object';
import { ObjectStoreCheck } from 'src/app/models/objectStoreCheck';
import { Position } from 'src/app/models/position';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';
import { AlreadyFinishedComponent } from 'src/app/dialogs/already-finished/already-finished.component';
import { PlanogramDialogComponent } from 'src/app/dialogs/planogram-dialog/planogram-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-store-check-page',
  templateUrl: './store-check-page.component.html',
  styleUrls: ['./store-check-page.component.css']
})
export class StoreCheckPageComponent implements OnInit {

  public objectIdCompany: string = "";
  public object: Obj;
  public objectStoreCheck: ObjectStoreCheck;
  public positions: Position[];
  public showDetails: boolean = false;
  public resolveFeedbacks: boolean = false;
  public workModel: string;
  public showFinishButton: boolean = false;
  public positionCheck: boolean=false;

  constructor(public snackBar:MatSnackBar,
    public objectService: ObjectService,
    public objectStoreCheckService: ObjectStoreCheckService,
    public positionService: PositionService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.objectIdCompany = this.activatedRoute.snapshot.paramMap.get("objectIdCompany") as string;
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (this.workModel == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (this.workModel == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }
    else if(this.workModel="position"){
      this.positionCheck=true;
    }
    this.getOneObject();
    this.getPositionsByObjectIdCompany();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {

    this.router.navigate(['/chooseObject/' + this.workModel]);
    if (!this.resolveFeedbacks) {
      let username = localStorage.getItem("username") as string;
      this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck(username).subscribe(data => {
        console.log(data);
      });
    }

  }

  public getOneObject() {
    this.objectService.getObjectByObjectIdCompany(this.objectIdCompany).subscribe(data => {
      this.object = data;
    });
  }

  public getPositionsByObjectIdCompany() {
    this.positionService.getPositionsByObjectIdCompany(this.objectIdCompany).subscribe(data => {
      this.positions = data;
    });
  }

  public getRetailerPlanogram() {
    this.objectService.getRetailerPlanogram(this.object.retailer);
  }

  public showObjectInfos() {
    this.showDetails = !this.showDetails;
  }

  // ovo koristimo kada ne izlazi dijalog za mejlove pri zarsetku object store checka
  public finishObjectStoreCheck() {
    let username = localStorage.getItem("username") as string;
    this.router.navigate(['/chooseObject/' + this.workModel]);
    this.objectStoreCheckService.finishObjectStoreCheck(username).subscribe(data => {

      this.snackBar.open('Successfully added', 'Close', { duration: 2500, panelClass: ['blue-snackbar'] });
    },
    err=> this.snackBar.open('Error', 'Close', { duration: 2500, panelClass: ['red-snackbar'] }));
  }



  public enableFinishButton(showButton: boolean) {
    this.showFinishButton = showButton;
  }

  // ovo koristimo kada ne izlazi dijalog za mejlove pri zarsetku object store checka
  public addToStoreCheck() {

    let username = localStorage.getItem("username") as string;
    this.objectStoreCheckService.getUnfinishedObjectStoreCheckByUsername(username).subscribe(data => {
      if (data) {
        const dialogRef = this.dialog.open(AreYouSureDialogComponent);
        dialogRef.afterClosed()
          .subscribe(res => {
            console.log(res)
            if (res) {
              this.finishObjectStoreCheck();

            }
          },
          err=> this.snackBar.open('Error', 'Close', { duration: 2500, panelClass: ['red-snackbar'] }));

      } else {
        this.dialog.open(AlreadyFinishedComponent);
      }
    },
    err=> this.snackBar.open('Error', 'Close', { duration: 2500, panelClass: ['red-snackbar'] }));

  }



  public exit() {
    if (this.showFinishButton) {
      const dialogRef = this.dialog.open(AreYouSureDialogComponent);
      dialogRef.afterClosed()
        .subscribe(res => {
          if (res) {
            this.router.navigate(['/chooseObject/' + this.workModel]);
            if (!this.resolveFeedbacks) {
              let username = localStorage.getItem("username") as string;
              this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck(username).subscribe(data => {
                console.log(data);
              });
            }
          }
        }
        )
    } else {
      if (!this.resolveFeedbacks) {
        let username = localStorage.getItem("username") as string;
        this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck(username).subscribe(data => {
          this.router.navigate(['/chooseObject/' + this.workModel]);
        });
      } else {
        this.router.navigate(['/chooseObject/' + this.workModel]);
      }
    }
  }

  public openPlanogramDialog() {
    const dialogRef = this.dialog.open(PlanogramDialogComponent, { data: this.object.retailer.retailerName });
    dialogRef.componentInstance.isAdmin = false;
  }

}
