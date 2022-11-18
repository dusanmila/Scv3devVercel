import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Return } from 'src/app/models/returns';
import { ReturnService } from 'src/app/Services/returns.service';

@Component({
  selector: 'app-return-dialog',
  templateUrl: './returndialog.component.html',
  styleUrls: ['./returndialog.component.css']
})
export class ReturnDialogComponent implements OnInit {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Return,
    public returnService: ReturnService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  add() {
    this.returnService.createReturn(this.data).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Return successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update() {
    this.returnService.updateReturn(this.data).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Return successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  delete() {
    this.returnService.deleteReturn(this.data.returnId).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Return successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  close() {
    this.dialogRef.close(this.changed);
  }

}
