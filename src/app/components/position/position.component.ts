
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Guid } from 'guid-typescript';
import { PositionDialogComponent } from 'src/app/dialogs/position-dialog/position-dialog.component';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/Services/position-service.service';
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  displayedColumns = ["posTypeName", "actions"];
  dataSource: MatTableDataSource<Position>;
  isExporting = false;

  position: Position = {
    secondaryPositionId: Guid.create(), objectIdCompany: "", posClassName: "", posTypeName: "", comment: "",isSuggestion:false, img: "", img2: "", img3: "", isImgHorizontal: false, isImg2Horizontal: false, isImg3Horizontal: false, valid: false,
    //  productCategory: '',
    supplier: '',
    location: ''
  };
  selectedPosition: Position;


  isLoading = true;
  noData = false;

  @Input() objectIdCompany: string;
  @Input() resolveFeedbacks: boolean;
  @Input() public isAdmin: boolean = false;
  @Input() positionCheck: boolean;
  @Output() showFinishButton = new EventEmitter<boolean>();


  public positions: Position[] = [];

  constructor(public positionService: PositionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.noData = false;
    if (this.objectIdCompany != null) {
      this.positionService.getPositionsByObjectIdCompanyAndIsSuggestion(this.objectIdCompany,this.positionCheck).subscribe(data => {
        if (data) {
          this.positions = data;
          this.dataSource = new MatTableDataSource(this.positions);
        } else {
          this.noData = true;
          this.dataSource = data;
        }

        this.isLoading = false;
      });
    }
  }

  deletePosition() {
    this.positionService.deletePosition(this.selectedPosition).subscribe(() => {
      let helper = this.positions.findIndex(pos => pos.secondaryPositionId == this.selectedPosition.secondaryPositionId);
      if (helper > 0) {
        this.positions.splice(helper, 1);
      }
      else {
        console.log("Error while deleting position")
      }
    });
  }

  public updatePosition(checked: boolean, pos: Position) {
    pos.valid = checked;
    if (checked) {
      this.positionService.editPositionCheck(pos).subscribe(_res => {
        this.showFinishButton.emit(true);
      });
    } else {
      this.positionService.editPositionUncheck(pos).subscribe(_res => {
        this.showFinishButton.emit(true);
      });
    }

  }
  /*
    public exportPositions() {
      this.isExporting=true;
      this.positionService.export(true).subscribe((excel)=>{
        this.isExporting=false;
        const fileName = 'SecondaryPositions.xlsx';
       saveAs(excel, fileName);
      });
  
    }*/

  public openDialog(flag: number, secondaryPositionId?: number, objectName?: string, posClassName?: string, posTypeName?: string, valid?: boolean, productCategory?: string, supplier?: string, location?: string, comment?: string, img?: string, img2?: string, img3?: string, isImgHorizontal?: boolean, isImg2Horizontal?: boolean, isImg3Horizontal?: boolean) {

    if (comment == "undefined") {
      comment = "";
    }

    if (posClassName == "undefined") {
      posClassName = "";
    }

    if (productCategory == "undefined") {
      productCategory = "";
    }

    if (supplier == "undefined") {
      supplier = "";
    }

    if (location == "undefined") {
      location = "";
    }

    const dialogRef = this.dialog.open(PositionDialogComponent, { data: { secondaryPositionId, objectName, posClassName, posTypeName, valid, productCategory, supplier, location, comment, img, img2, img3, isImgHorizontal, isImg2Horizontal, isImg3Horizontal } });

    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.isPositionCheck=this.positionCheck; //postavlja da li se radi storecheck da bi znao da li je sugestija nove pozicije  
    console.log(this.positionCheck)
    dialogRef.componentInstance.objectIdCompany = this.objectIdCompany;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res)
          this.loadData();
      }
      )
  }
}

