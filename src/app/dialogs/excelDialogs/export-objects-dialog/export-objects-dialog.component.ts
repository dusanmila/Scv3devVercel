import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectService } from 'src/app/Services/object.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-export-objects-dialog',
  templateUrl: './export-objects-dialog.component.html',
  styleUrls: ['./export-objects-dialog.component.css']
})
export class ExportObjectsDialogComponent implements OnInit {
  isLoading = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExportObjectsDialogComponent>,
    private objectService: ObjectService) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('400px', '200px');
  }

  export() {
    this.isLoading = true;
    this.objectService.exportObjects().subscribe((excel) => {
      this.isLoading = false;
      const fileName = 'Objects.xlsx';
      saveAs(excel, fileName);
      this.close();
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

}
