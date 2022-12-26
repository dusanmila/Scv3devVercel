import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class AdminpageComponent {


  constructor(private objectService: ObjectService, private positionService: PositionService, public dialog: MatDialog, public router: Router,
    public snackBar: MatSnackBar) { }


  objectsFile: any;
  positionsFile: any;

  isObjLoading = false;
  isPosLoading = false;

  uploadObjectsFile(event: any) {
    this.isObjLoading=true;
    this.objectsFile = event.target.files[0];
    let formData = new FormData();
    formData.set('file', this.objectsFile);

    this.objectService.excelImport(formData).subscribe(data => {
      this.isObjLoading=false;
      this.snackBar.open("Objects added", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
    });
  }

  uploadPositionsFile(event: any) {
    this.isPosLoading=true;
    this.positionsFile = event.target.files[0];
    let formData = new FormData();
    formData.set('file', this.positionsFile);

    this.positionService.excelImport(formData).subscribe(data => {
      this.isPosLoading=false;
      this.snackBar.open("Secondary positions added", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
    });
  }


  public openDialog(flag: number) {
    const dialogRef = this.dialog.open(AnalyticsdialogComponent);
    dialogRef.componentInstance.flag = flag;


  }

  public logout() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    localStorage.setItem("jwt", "");
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/login']);
        }
      }
      )
  }


}
