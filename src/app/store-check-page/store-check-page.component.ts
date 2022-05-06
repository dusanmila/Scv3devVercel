import { Component, OnInit } from '@angular/core';
import { ObjectStoreCheck, ObjectStoreCheckCreateDto, ObjectStoreCheckService } from '../Services/object-store-check.service';
import { Obj, ObjectService } from '../Services/object.service';
import { Position, PositionService } from '../Services/PositionService/position-service.service';

@Component({
  selector: 'app-store-check-page',
  templateUrl: './store-check-page.component.html',
  styleUrls: ['./store-check-page.component.css']
})
export class StoreCheckPageComponent implements OnInit {

  public objectName: string = "Objekat1";
  public object: Obj;
  public objectStoreCheck: ObjectStoreCheck;
  public username: string = "ppetrovic";
  public positions: Position[];

  constructor(public objectService: ObjectService,
              public objectStoreCheckService: ObjectStoreCheckService,
              public positionService: PositionService) { }

  ngOnInit(): void {
    this.getOneObject();
    this.getPositionsByObjectName();
  }

  public getOneObject() {
    this.objectService.getObjectByObjectName(this.objectName).subscribe(data => {
      this.object = data;
      console.log(this.object);
    });
  }

  public createEmptyObjectStoreCheck() {
    console.log('Create empty object store check');
    let osc: ObjectStoreCheckCreateDto = {
      objectIdRetail: this.object.objectIdRetail,
      username: this.username,
      pdf: ""
    }
    this.objectStoreCheckService.createObjectStoreCheck(osc).subscribe(data => {
      this.objectStoreCheck = data;
      console.log(this.objectStoreCheck);
    });
  }

  public getPositionsByObjectName() {
    this.positionService.getPositionsByObjectName(this.objectName).subscribe(data => {
      this.positions = data;
      console.log(this.positions);
    });
  }

  public getRetailerPlanogram() {
    this.objectService.getRetailerPlanogram(this.object.retailer);
  }

}
