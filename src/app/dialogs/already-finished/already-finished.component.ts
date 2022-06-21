import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-already-finished',
  templateUrl: './already-finished.component.html',
  styleUrls: ['./already-finished.component.css']
})
export class AlreadyFinishedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlreadyFinishedComponent>) { }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

}
