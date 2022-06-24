import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalyticsdialogComponent } from 'src/app/dialogs/analyticsdialog/analyticsdialog.component';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent  {


  constructor( private objectService:ObjectService, private positionService:PositionService, public dialog:MatDialog, public router: Router ) { }


  objectsFile: any;
  positionsFile: any;

  uploadObjectsFile(event: any) {
    this.objectsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.objectsFile);

    this.objectService.excelImport(formData);
  }

  uploadPositionsFile(event: any) {
    this.positionsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.positionsFile);

    this.positionService.excelImport(formData);
  }


  public openDialog(flag: number) {
    const dialogRef = this.dialog.open(AnalyticsdialogComponent);
    dialogRef.componentInstance.flag = flag;


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
