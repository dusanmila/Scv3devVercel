import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { Obj } from 'src/app/models/object';
import { ObjectStoreCheck, ObjectStoreCheckCreateDto } from 'src/app/models/objectStoreCheck';
import { Position } from 'src/app/models/position';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-store-check-page',
  templateUrl: './store-check-page.component.html',
  styleUrls: ['./store-check-page.component.css']
})
export class StoreCheckPageComponent implements OnInit {

  public objectName: string = "Objekat1";
  public object: Obj;
  public objectStoreCheck: ObjectStoreCheck;
  public username: string = "ppetrovic";
  public positions: Position[];
  public showDetails: boolean = false;
  public resolveFeedbacks: boolean = false;
  public workModel: string;
  public showFinishButton: boolean = false;

  constructor(public objectService: ObjectService,
    public objectStoreCheckService: ObjectStoreCheckService,
    public positionService: PositionService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.objectName = this.activatedRoute.snapshot.paramMap.get("objectName") as string;
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (this.workModel == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (this.workModel == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }
    this.getOneObject();
    this.getPositionsByObjectName();
    console.log(this.resolveFeedbacks);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:Event) {

          this.router.navigate(['/chooseObject/' + this.workModel]);
          if (!this.resolveFeedbacks) {
            // this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck("ppetrovic").subscribe(data => {
            //   console.log(data);
            // });
          }

  }

  public getOneObject() {
    this.objectService.getObjectByObjectName(this.objectName).subscribe(data => {
      this.object = data;
      if (!this.resolveFeedbacks)
        this.createEmptyObjectStoreCheck();
      console.log(this.object);
    });
  }

  public getPositionsByObjectName() {
    this.positionService.getPositionsByObjectName(this.objectName).subscribe(data => {
      this.positions = data;
      console.log(this.positions);
    });
  }

  public getRetailerPlanogram() {
    console.log('get retailer planogram');
    this.objectService.getRetailerPlanogram(this.object.retailer);
  }

  public showObjectInfos() {
    this.showDetails = !this.showDetails;
  }

  public finishObjectStoreCheck() {
    this.objectStoreCheckService.finishObjectStoreCheck("ppetrovic").subscribe(data => {
      console.log(data);
    });
  }

  public createEmptyObjectStoreCheck() {
    console.log('create empty object store check');
    let osc: ObjectStoreCheckCreateDto = {
      objectIdCompany: this.object.objectIdCompany,
      username: "ppetrovic",
      pdf: ""
    }
    this.objectStoreCheckService.createObjectStoreCheck(osc).subscribe(data => {
      this.objectStoreCheck = data;
      console.log(this.objectStoreCheck);
    });
  }

  public enableFinishButton(showButton: boolean) {
    this.showFinishButton = showButton;
  }

  public addToStoreCheck() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.finishObjectStoreCheck();
          this.router.navigate(['/chooseObject/' + this.workModel]);
        }
      }
      )
  }

  public exit() {
    if (this.showFinishButton) {
      const dialogRef = this.dialog.open(AreYouSureDialogComponent);
      dialogRef.afterClosed()
        .subscribe(res => {
          console.log(res)
          if (res) {
            this.router.navigate(['/chooseObject/' + this.workModel]);
            if (!this.resolveFeedbacks) {
              // this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck("ppetrovic").subscribe(data => {
              //   console.log(data);
              // });
            }
          }
        }
        )
    } else {
      this.router.navigate(['/chooseObject/' + this.workModel]);
    }
  }

}
