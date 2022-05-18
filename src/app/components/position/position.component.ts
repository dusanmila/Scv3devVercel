
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Position, PositionService } from 'src/app/Services/position-service.service';
//import { DataService, Product } from '../data.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  displayedColumns = ["objectName", "posClassName", "posTypeName", "actions"];
  dataSource: MatTableDataSource<Position>;


  position: Position = { secondaryPositionId: Guid.create(),objectName: "", posClassName: "", posTypeName: "",valid:false };
  selectedPosition: Position;

  @Input() public objectName: string;
  @Input() public resolveFeedbacks: boolean;

  public get positions(): Position[] {

    return this._positions;
  }

  public _positions: Position[] = [];

  constructor(public positionService: PositionService) { }

  ngOnInit(): void {
 //   if(this.objectName != null) {
 //     this.loadPositionsByObject();
  //  }
  this.loadData();
  }

  public loadData() {
    this.positionService.getPositions().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);

    });
  }

  public loadPositionsByObject() {
    this.positionService.getPositionsByObjectName(this.objectName).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  createPosition() {
    console.log(this.position.objectName);
    this.positionService.createPosition(this.position).subscribe(data => {
      this._positions.push(data);

    });
    this.position = {secondaryPositionId: Guid.create(), objectName: "", posClassName: "", posTypeName: "",valid:false };

  }

  selectPosition(position: Position) {
    this.positionService.getOnePosition(position).subscribe(data => {
      this.selectedPosition = data;
    })
    this.selectedPosition = position;

  }

/*  editPosition(position: Position) {
    this.positionService.editPosition(position).subscribe();
  }*/

  deletePosition() {

    this.positionService.deletePosition(this.selectedPosition).subscribe(data => {
      let helper = this._positions.findIndex(pos => pos.secondaryPositionId == this.selectedPosition.secondaryPositionId);
      if (helper > 0) {
        this._positions.splice(helper, 1);
      }
      else {
        console.log("Error while deleting position.")
      }
    });
  }

  public updatePosition(checked:boolean,pos:Position){
    pos.valid=checked;
this.positionService.editPosition(pos);

  }



  public openDialog(flag: number, objectName?: string, posClassName?: string, posTypeName?: string) {
    /*  const dialogRef = this.dialog.open(PositionDialogComponent, {data: {objectName,posClassName,posTypeName}});
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
      .subscribe( res => {
          if(res === 1){
            this.loadData();
          }
        }
      )*/
  }
}

