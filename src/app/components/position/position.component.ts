
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Position, PositionService } from '../../services/position-service.service';
//import { DataService, Product } from '../data.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})

export class PositionComponent implements OnInit {

  position:Position={objectName:"", posClassName:"", posTypeName:""};
  selectedPosition:Position;
  //editorBool=false;

  public get positions(): Position[]
  {

    return this._positions;
  }

  createPosition(){
    console.log(this.position.objectName);
    this.positionService.createPosition(this.position).subscribe(data => {
      this._positions.push(data);

    });
    this.position = {objectName:"", posClassName: "",posTypeName:""};

  }

  public selectPosition(position:Position){
    this.positionService.getOnePosition(position).subscribe(data => {
      this.selectedPosition=data;
    })
    this.selectedPosition=position;

  }

  public editPosition(position:Position)
  {
    this.positionService.editPosition(position).subscribe();
  }



  public _positions: Position[]=[];

  constructor(public positionService: PositionService) { }

  ngOnInit(): void {
    this.positionService.getPositions().subscribe(data => {

      this._positions = data;
console.log(this._positions.length)
  });


}

/*  createProduct(){
    console.log(this.product);
    this.dataService.createProduct(this.product).subscribe(data => {
    this._products.push(data);
    });
    this.product = {productName: "", productType: "", productDate: "" , userId: 0};

  }

  public selectProduct(product){
    this.dataService.getOneProduct(product).subscribe(data => {
      this.selectedProduct=data;
    })
    this.product=product;

  }


  }

   */
  public deletePosition()
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

