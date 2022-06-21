import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-already-finished',
  templateUrl: './already-finished.component.html',
  styleUrls: ['./already-finished.component.css']
})
export class AlreadyFinishedComponent {

  constructor(public dialogRef: MatDialogRef<AlreadyFinishedComponent>) { }

  public close() {
    this.dialogRef.close();
  }

}
