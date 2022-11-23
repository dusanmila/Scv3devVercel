import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlreadyFinishedComponent } from 'src/app/dialogs/already-finished/already-finished.component';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
import { UnfinishedObjectStoreCheckDialogComponent } from 'src/app/dialogs/unfinished-object-store-check-dialog/unfinished-object-store-check-dialog.component';
import { Obj } from 'src/app/models/object';
import { StoreCheck } from 'src/app/models/storeCheck';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { ObjectService } from 'src/app/Services/object.service';
import { ReturnService } from 'src/app/Services/returns.service';
import { StoreCheckService } from 'src/app/Services/store-check.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-choose-object',
  templateUrl: './choose-object.component.html',
  styleUrls: ['./choose-object.component.css']
})
export class ChooseObjectComponent implements OnInit {

  public objects: Obj[] = [];
  // public resolveFeedbacks: boolean;
  public workModel: string;
  public storeCheck: StoreCheck;
  public isReturns:boolean=false;
  public showFinishStoreCheck: boolean;
  isLoading=false;
  isExportReturnsLoading=false;

  constructor(public objectService: ObjectService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public storeCheckService: StoreCheckService,
    public router: Router,
    public objectStoreCheckService: ObjectStoreCheckService,
    public returnsService:ReturnService) { }

  ngOnInit(): void {
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (this.workModel === "returns") {
        this.isReturns = true;
       }
    // if (this.workModel == "addStoreCheck") {
    //   this.resolveFeedbacks = false;
    // } else if (this.workModel == "resolveFeedbacks") {
    //   this.resolveFeedbacks = true;
    // }
    // if (!this.resolveFeedbacks) {
    //   this.loadStoreCheck();
    // }
    if (this.workModel === 'addStoreCheck') {
      this.loadStoreCheck();
    }
  }

  public loadStoreCheck() {
    let username = localStorage.getItem("username") as string;
    this.storeCheckService.getUnfinishedStoreCheckByUsername(username).subscribe(data => {
      this.storeCheck = data;
      if (data) {
        if (data.objectStoreChecks.length > 0) {
          this.showFinishStoreCheck = true;
        } else {
          this.showFinishStoreCheck = false;
        }
      } else {
        this.createEmptyStoreCheck();
      }
    });
  }

  public createEmptyStoreCheck() {
    let username = localStorage.getItem("username") as string;
    let sc: StoreCheck = {
      username: username,
      date: new Date(Date.now()),
      finished: false,
      objectStoreChecks: []
    }
    this.storeCheckService.createStoreCheck(sc).subscribe(data => {
      console.log(data);
    });
  }

  public openDialog() {
    let username = localStorage.getItem("username") as string;
    this.objectStoreCheckService.getUnfinishedObjectStoreCheckByUsername(username).subscribe(data => {
      if (data) {
        let newObjectName = data.object.objectName;
        let newObjectIdCompany = data.object.objectIdCompany;
        const dialogRef = this.dialog.open(UnfinishedObjectStoreCheckDialogComponent, { data: newObjectName });
        dialogRef.afterClosed()
          .subscribe(res => {
            if (res) {
              this.router.navigate(['/storeCheckPage', 'addStoreCheck', newObjectIdCompany]);
            } else {
              this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck(username).subscribe(data => {
                this.storeCheckService.getUnfinishedStoreCheckByUsername(username).subscribe(data => {
                  this.storeCheck = data;
                  if (!this.storeCheck) {
                    this.dialog.open(AlreadyFinishedComponent);
                  } else if (data && data.objectStoreChecks.length <= 0) {
                    this.showFinishStoreCheck = false;
                  } else {
                    const dialogRef = this.dialog.open(EmailDialogComponent);
                    dialogRef.componentInstance.flag = 1;
                  }
                });
              });
            }
          });
      } else {
        this.storeCheckService.getUnfinishedStoreCheckByUsername(username).subscribe(data => {
          this.storeCheck = data;
          if (!this.storeCheck) {
            this.dialog.open(AlreadyFinishedComponent);
          } else {
            const dialogRef = this.dialog.open(EmailDialogComponent);
            dialogRef.componentInstance.flag = 1;
          }
        });
      }
    });
  }


  public exportReturns() {
    this.isExportReturnsLoading=true;
    this.returnsService.export().subscribe((excel)=>{
      this.isExportReturnsLoading=false;
      const fileName = 'Returns.xlsx';
     saveAs(excel, fileName);
    });

  }

  public exit() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/storeCheck']);
        }
      }
      )
  }

}
