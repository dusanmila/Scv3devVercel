import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectService, Retailer } from 'src/app/Services/object.service';

@Component({
  selector: 'app-retailerdialog',
  templateUrl: './retailerdialog.component.html',
  styleUrls: ['./retailerdialog.component.css']
})
export class RetailerDialogComponent implements OnInit {

  tableForm:FormGroup;

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<RetailerDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: Retailer, public objectService: ObjectService,public formBuilder:FormBuilder)
  {
    this.tableForm = formBuilder.group({
     // file: new FormControl()
     file: [null]
    });
}

retailers:Retailer[];
public flag: number;


  ngOnInit(): void {
    this.objectService.getRetailers()
.subscribe((data) => {
  this.retailers = data;

  })
  }
  public close(){
    this.dialogRef.close();
     }

     public add(){

     }

     public searchByName(){

    }

    public submit(){

        var formData: any = new FormData();
        formData.append('file', this.tableForm.get('file')!.value);
        formData.append('RetailerName',this.data.retailerName);
        this.objectService
        .addPlanogram(formData); //TODO dodati subscribe


    }

    uploadFile(event:any) {
      const file = (event.target as HTMLInputElement).files![0];
      this.tableForm.patchValue({
        file: file,
      });
      this.tableForm.get('file')!.updateValueAndValidity();
    }

    openInput(){
      document.getElementById("fileInput")!.click();
 }
}

