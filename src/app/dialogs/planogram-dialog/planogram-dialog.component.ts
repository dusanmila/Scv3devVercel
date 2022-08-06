import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Planogram } from 'src/app/models/planogram';
import { ObjectService } from 'src/app/Services/object.service';

@Component({
  selector: 'app-planogram-dialog',
  templateUrl: './planogram-dialog.component.html',
  styleUrls: ['./planogram-dialog.component.css']
})
export class PlanogramDialogComponent implements OnInit {

  public planograms: Planogram[] = [];
  public isAdmin: boolean;


  constructor(public dialogRef: MatDialogRef<PlanogramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public retailerName: string,
    public objectService: ObjectService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.objectService.getPlanogramsByRetailer(this.retailerName).subscribe(data => {
      this.planograms = data;
    });
  }

  public loadPlanogram(planogramPdf: string) {
     this.objectService.getPlanogram(planogramPdf);
    //this.objectService.downloadRetailerPlanogram(planogramPdf);
  }

  public deletePlanogram(planogramPdf: string) {
    this.objectService.deletePlanogram(planogramPdf).subscribe(data => {
      this.loadData();
    });
  }

  public close() {
    this.dialogRef.close();
  }

}
