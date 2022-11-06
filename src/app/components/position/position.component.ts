
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Guid } from 'guid-typescript';
import { PositionDialogComponent } from 'src/app/dialogs/position-dialog/position-dialog.component';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/Services/position-service.service';



@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  displayedColumns = ["posClassName", "posTypeName", "actions"];
  dataSource: MatTableDataSource<Position>;


  position: Position = {
    secondaryPositionId: Guid.create(), objectIdCompany: "", posClassName: "", posTypeName: "",img:"",isImgHorizontal:false, valid: false,
    productCategory: '',
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
      this.positionService.getPositionsByObjectIdCompany(this.objectIdCompany).subscribe(data => {
        console.log(data);
        if (data) {
          this.positions = data;
          this.dataSource = new MatTableDataSource(this.positions);
        } else {
          this.noData = true;
          this.dataSource = data;
        }

        this.isLoading = false;
      });
    } else {
      this.positionService.getPositions().subscribe(data => {
        this.positions = data;
        this.dataSource = new MatTableDataSource(this.positions);
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
    if(checked){
      this.positionService.editPositionCheck(pos).subscribe(_res => {
        this.showFinishButton.emit(true);
      });
    }else{
      this.positionService.editPositionUncheck(pos).subscribe(_res => {
        this.showFinishButton.emit(true);
      });
    }

  }

  public exportPositions() {
    this.positionService.export();
  }

  public openDialog(flag: number, secondaryPositionId?: number, objectName?: string, posClassName?: string, posTypeName?: string, valid?: boolean, productCategory?: string, supplier?: string, location?: string, img?: string,isImgHorizontal?:boolean) {
    const dialogRef = this.dialog.open(PositionDialogComponent, { data: { secondaryPositionId, objectName, posClassName, posTypeName, valid, productCategory, supplier, location,img,isImgHorizontal } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.objectIdCompany = this.objectIdCompany;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res)
          this.loadData();
      }
      )
  }
}

