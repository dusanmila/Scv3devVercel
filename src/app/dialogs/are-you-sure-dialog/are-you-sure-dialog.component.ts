import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.css']
})
export class AreYouSureDialogComponent {

  public retval: boolean = false;

  public message: string = "";

  constructor(public dialogRef: MatDialogRef<AreYouSureDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.flag == 1) {
      this.message = "If you delete products, returns will be deleted too."
    } else if (this.data.flag == 2) {
      this.message = "If you delete objects, positions will be deleted too."
    }

  }

  public exit() {
    this.retval = true;
    this.close();
  }



  public close(): void {
    this.dialogRef.close(this.retval);
  }

}
