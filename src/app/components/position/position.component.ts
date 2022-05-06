
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Position, PositionService } from '../../services/position-service.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit{ 

  position:Position={objectName:"", posClassName:"", posTypeName:""};
  selectedPosition:Position;

  public get positions(): Position[]
  {

    return this._positions;
  }

  public _positions: Position[]=[];

  constructor(public positionService: PositionService) { }

  ngOnInit(): void {
    this.positionService.getPositions().subscribe(data => {

      this._positions = data;
    console.log(this._positions.length)
  });
  }


  createPosition(){
    console.log(this.position.objectName);
    this.positionService.createPosition(this.position).subscribe(data => {
      this._positions.push(data);

    });
    this.position = {objectName:"", posClassName: "",posTypeName:""};

  }

  selectPosition(position:Position){
    this.positionService.getOnePosition(position).subscribe(data => {
      this.selectedPosition=data;
    })
    this.selectedPosition=position;

  }

  editPosition(position:Position)
  {
    this.positionService.editPosition(position).subscribe();
  }

  deletePosition()
  {

    this.positionService.deletePosition(this.selectedPosition).subscribe(data =>{
    let helper=this._positions.findIndex(pos => pos.secondaryPositionId==this.selectedPosition.secondaryPositionId);
    if(helper>0){
    this._positions.splice(helper,1);
    }
    else{
      console.log("Error while deleting position.")
    }
    });
  }
}

