import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectStoreCheck, ObjectStoreCheckCreateDto, ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { Obj, ObjectService } from 'src/app/Services/object.service';
import { Position, PositionService } from 'src/app/Services/position-service.service';

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
  public showDetails: boolean = false;
  public resolveFeedbacks: boolean = false;

  constructor(public objectService: ObjectService,
              public objectStoreCheckService: ObjectStoreCheckService,
              public positionService: PositionService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.objectName = this.activatedRoute.snapshot.paramMap.get("objectName") as string;
    let workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (workModel == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (workModel == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }
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
    console.log('get retailer planogram');
    this.objectService.getRetailerPlanogram(this.object.retailer);
  }

  public showObjectInfos() {
    this.showDetails = !this.showDetails;
  }

  public finishObjectStoreCheck() {
    this.objectStoreCheckService.finishObjectStoreCheck("ppetrovic").subscribe(data => {
      console.log(data);
    });
  }

}
