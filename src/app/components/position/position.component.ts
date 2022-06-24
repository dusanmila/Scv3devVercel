
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


  position: Position = { secondaryPositionId: Guid.create(), objectName: "", posClassName: "", posTypeName: "", valid: false };
  selectedPosition: Position;


  isLoading = true;
noData=false;

  @Input() objectName: string;
  @Input() resolveFeedbacks: boolean;
  @Output() showFinishButton = new EventEmitter<boolean>();


  public positions: Position[] = [];

  constructor(public positionService: PositionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.noData=false;
    if (this.objectName != null) {
      this.positionService.getPositionsByObjectName(this.objectName).subscribe(data => {
        if(data){
          this.positions = data;
          this.dataSource = new MatTableDataSource(this.positions);
        }else{
          this.noData=true;
          this.dataSource=data;
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

  public uncheckPositions() {
    this.positions.forEach(position => {
      if (position.valid) {
        position.valid = false;
        this.positionService.editPosition(position).subscribe(data => {
          console.log(data);
        });
      }
    });
  }

  createPosition() {
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

    this.positionService.deletePosition(this.selectedPosition).subscribe(() => {
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
    this.positionService.editPosition(pos).subscribe(_res => {
      this.showFinishButton.emit(true);
    });
  }

  public openDialog(flag: number, secondaryPositionId?: number, objectName?: string, posClassName?: string, posTypeName?: string, valid?: boolean) {
    const dialogRef = this.dialog.open(PositionDialogComponent, { data: { secondaryPositionId, objectName, posClassName, posTypeName, valid } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.objectName = this.objectName;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res)
          this.loadData();
      }
      )
  }
}

