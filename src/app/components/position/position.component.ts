
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { PositionDialogComponent } from 'src/app/dialogs/position-dialog/position-dialog.component';
import { Position, PositionService } from 'src/app/Services/position-service.service';
//import { DataService, Product } from '../data.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  displayedColumns = ["posClassName", "posTypeName", "actions"];
  dataSource: MatTableDataSource<Position>;


  position: Position = { secondaryPositionId: Guid.create(), objectName: "", posClassName: "", posTypeName: "", valid: false };
  selectedPosition: Position;

  @Input() public objectName: string;
  @Input() public resolveFeedbacks: boolean;

  public positions: Position[] = [];

  constructor(public positionService: PositionService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.objectName != null) {
      console.log('load by object')
      this.loadPositionsByObject();
    } else {
      this.loadData();
    }
  }

  public loadData() {
    this.positionService.getPositions().subscribe(data => {
      this.positions = data;
      this.dataSource = new MatTableDataSource(this.positions);
    });
  }

  public loadPositionsByObject() {
    this.positionService.getPositionsByObjectName(this.objectName).subscribe(data => {
      this.positions = data;
      if (!this.resolveFeedbacks) {
        this.uncheckPositions();
      }
      this.dataSource = new MatTableDataSource(this.positions);
    });
  }

  public uncheckPositions() {
    this.positions.forEach(position => {
      if (position.valid == true) {
        position.valid = false;
        this.positionService.editPosition(position).subscribe(data => {
          console.log(data);
        });
      }
    });
  }

  createPosition() {
    console.log(this.position.objectName);
    this.positionService.createPosition(this.position).subscribe(data => {
      this.positions.push(data);

    });
    this.position = { secondaryPositionId: Guid.create(), objectName: "", posClassName: "", posTypeName: "", valid: false };

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
      let helper = this.positions.findIndex(pos => pos.secondaryPositionId == this.selectedPosition.secondaryPositionId);
      if (helper > 0) {
        this.positions.splice(helper, 1);
      }
      else {
        console.log("Error while deleting position.")
      }
    });
  }

  public updatePosition(checked: boolean, pos: Position) {
    pos.valid = checked;
    this.positionService.editPosition(pos);
  }

  public openDialog(flag: number, secondaryPositionId?: number, objectName?: string, posClassName?: string, posTypeName?: string, valid?: boolean) {
    const dialogRef = this.dialog.open(PositionDialogComponent, { data: { secondaryPositionId, objectName, posClassName, posTypeName, valid } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.objectName = this.objectName;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
          this.loadPositionsByObject();
        }
      }
      )
  }
}

