import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-predefined-dialog',
  templateUrl: './add-to-predefined-dialog.component.html',
  styleUrls: ['./add-to-predefined-dialog.component.css']
})
export class AddToPredefinedDialogComponent implements OnInit {

  flag: number;
  retval: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddToPredefinedDialogComponent>) { }

  ngOnInit(): void {
  }

  public exit() {
    this.retval = true;
    this.close();
  }



  public close(): void {
    this.dialogRef.close(this.retval);
  }

}
