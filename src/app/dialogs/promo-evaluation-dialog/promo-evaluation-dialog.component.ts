import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromoEvaluator } from 'src/app/models/promoEvaluator';
import { PromoEvaluatorService } from 'src/app/Services/promo-evaluator.service';
import { UserService } from 'src/app/Services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-promo-evaluation-dialog',
  templateUrl: './promo-evaluation-dialog.component.html',
  styleUrls: ['./promo-evaluation-dialog.component.css']
})
export class PromoEvaluatorDialogComponent  {

  myForm: FormGroup;
  flag: number;
  isLoading: boolean = false;
  isAutocompleteLoading: boolean = false;
  changed: boolean = false;
  searchResults: any[] = [];
  showErrorMessage: boolean = false;
  user!: string;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PromoEvaluatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromoEvaluator,
    public promoEvaluatorService: PromoEvaluatorService,
    public userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.data.username;
    this.userService.getUserByUsername(this.user).subscribe(data => {
      this.data.username = data;
      
    });
    
   
    this.myForm = new FormGroup({
      username: new FormControl({value: '', disabled: this.flag === 3 }, [ValidateUser]),
      rebate: new FormControl({value: '', disabled: this.flag === 3 })
    });
  }


  add() {
    console.log(this.data)
    this.isLoading=true;
    this.data.username=this.user;
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
    this.data.username=this.user;
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
    this.data.username=this.user;
    this.promoEvaluatorService.deletePromoEvaluator(this.data.username).subscribe(data => {
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
  getUsers() {
    // this.isLoading = true;
    this.isAutocompleteLoading = true;
    this.userService.getUsersByUsername(this.data.username).subscribe(data => {
      this.searchResults = data;
      this.isAutocompleteLoading = false;
    });
  }

  changeUser(event) {
    this.user = event.option.value.username;
  }

  close() {
    this.dialogRef.close(this.changed);
  }
  displayWith(user?: any) {
    if (typeof user === "string") {
      return user ? user : undefined;
    }
    return user ? user.username : undefined;
  }

}

function ValidateUser(control: AbstractControl): { [key: string]: any } | null {
  const selection: any = control.value;

  if (typeof selection === "string") {
    return { incorrect: true };
  }
  return null;
}
