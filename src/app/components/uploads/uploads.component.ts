import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  objectsFile: any;
  positionsFile: any;
  isObjLoading = false;
  isPosLoading = false;

  constructor(public objectService: ObjectService,
    public positionService: PositionService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  uploadObjectsFile(event: any) {
    this.isObjLoading = true;
    this.objectsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.objectsFile);
    this.objectService.excelImport(formData).subscribe(data => {
      this.isObjLoading = false;
      this.snackBar.open("Objects added.", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
    });
  }

  uploadPositionsFile(event: any) {
    this.isPosLoading = true;
    this.positionsFile = event.target.files[0];
    console.log(event.target.files[0].name);
    let formData = new FormData();
    formData.set('file', this.positionsFile);

    this.positionService.excelImport(formData).subscribe(data => {
      this.isPosLoading = false;
      this.snackBar.open("Secondary positions added.", "Close", {
        duration: 2500,
        panelClass: ['blue-snackbar']
      });
    });
  }

  clickObj() {
    console.log('objekti klik')
  }

  downloadTemplate(flag: number) {
    console.log('downloading...')
    if (flag === 1)
      this.objectService.downloadExcelTemplate();
    else
      this.positionService.downloadExcelTemplate();
  }

}
