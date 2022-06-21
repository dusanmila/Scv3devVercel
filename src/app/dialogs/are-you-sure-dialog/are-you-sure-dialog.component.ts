import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.css']
})
export class AreYouSureDialogComponent   {

  public retval: boolean = false;

  constructor(public dialogRef: MatDialogRef<AreYouSureDialogComponent>) { }

 
  public exit() {
    this.retval = true;
    this.close();
  }

  public close(): void {
    this.dialogRef.close(this.retval);
  }

}
