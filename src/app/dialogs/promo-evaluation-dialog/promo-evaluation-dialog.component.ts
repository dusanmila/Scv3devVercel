import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromoEvaluator } from 'src/app/models/promoEvaluator';
import { PromoEvaluatorService } from 'src/app/Services/promo-evaluator.service';

@Component({
  selector: 'app-promo-evaluation-dialog',
  templateUrl: './promo-evaluation-dialog.component.html',
  styleUrls: ['./promo-evaluation-dialog.component.css']
})
export class PromoEvaluatorDialogComponent  {

  flag: number;
  isLoading: boolean = false;
  changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PromoEvaluatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromoEvaluator,
    public promoEvaluatorService: PromoEvaluatorService) { }


  add() {
    this.isLoading=true;
    this.promoEvaluatorService.createPromoEvaluator(this.data).subscribe(data => {
      this.isLoading=false;
      this.changed = true;
      this.snackBar.open('Promo evaluator successfully added', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        this.isLoading=false;
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  update() {
    this.promoEvaluatorService.updatePromoEvaluator(this.data).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Promo evaluator successfully updated', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }

  delete() {
    this.promoEvaluatorService.deletePromoEvaluator(this.data.Username).subscribe(data => {
      this.changed = true;
      this.snackBar.open('Promo evaluator successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
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
