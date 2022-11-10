import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';

@Component({
  selector: 'app-retailerdialog',
  templateUrl: './retailerdialog.component.html',
  styleUrls: ['./retailerdialog.component.css']
})
export class RetailerDialogComponent implements OnInit {

  tableForm: FormGroup;
  selectedFiles: File[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RetailerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Retailer,
    public objectService: ObjectService,
    public formBuilder: FormBuilder) {
    this.tableForm = formBuilder.group({
      // file: new FormControl()
      file: [null]
    });
  }
  retailer: Retailer = { retailerName: "", planogramPdf: "", totalCount: 0 };

  public flag: number;
  retailerName: string;
  public changed: boolean = false;
  isLoading = false;
  isUploaded: boolean = false;
  selectedFilesCount: number = 0;

  ngOnInit(): void {
    this.retailer.retailerName = this.data.retailerName;
    this.retailer.planogramPdf = this.data.planogramPdf;

  }
  public close() {
    this.dialogRef.close(this.changed);
  }



  public submit() {
    this.isLoading = true;
    if (this.flag == 2) {

      if (!this.selectedFiles || this.selectedFiles.length === 0) {
        return;
      }

      const formData: any = new FormData();
      this.selectedFiles.forEach((f) => formData.append('files', f));
      formData.append('retailerName', this.data.retailerName);

      this.isLoading = true;
      this.objectService.addPlanograms(formData).subscribe({
        next: (data) => {

          this.changed = true;
          this.isLoading = false;
          this.close();
        },
        error: (err) => {

          this.isLoading = false;
          this.close();
        }
      });
    } else {
      this.retailer.retailerName = (<HTMLInputElement>document.getElementById("name")).value;
      this.retailer.planogramPdf = "";
      if (this.retailer.retailerName != "") {
        this.objectService
          .createRetailer(this.retailer).subscribe(() => {
            this.changed = true;
            this.snackBar.open('Retailer created', 'Ok', { duration: 2500, panelClass: ['blue-snackbar'] });
            this.close();
          }),
          (error: Error) => {
            console.log(error.name + ' -> ' + error.message)
            this.snackBar.open('An error occured', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
            this.close();
          };
      }


    }

    this.isLoading = false;

  }

  uploadFile(event: any) {
    this.isLoading = true;
    this.selectedFiles = [];
    if (event.target.files.length === 0) {
      return;
    }

    const parent = event.target;
    [...parent.files].forEach((file) => {
      console.log(file)
      this.selectedFiles.push(file);
    });

    this.isLoading = false;
    this.selectedFilesCount = parent.files.length;
    this.isUploaded = true;
  }

  openInput() {
    document.getElementById("fileInput")!.click();
  }

  delete() {

    this.objectService.deleteRetailer(this.data)
      .subscribe(() => {
        this.changed = true;
        this.snackBar.open('Retailer successfully deleted', 'Ok', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500, panelClass: ['red-snackbar'] });
        this.close();
      }
  }
}

