import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ObjectCreateDto, ObjectService } from 'src/app/Services/object.service';
import { Obj } from 'src/app/Services/object.service';



@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  displayedColumns = ["objectName","objectIdRetail","objectIdCompany","actions"];
dataSource: MatTableDataSource<Obj>;
subscription: Subscription;

search : String ="";
 // private _objects: Obj[] = [];
  public object: Obj = {
    objectIdRetail: "string",
    objectIdCompany: "string",
    retailer: {
      "retailerName": "",
      "planogramPdf": ""
    },
    objectFormat: "string",
    objectName: "string",
    city: "string",
    address: "string",
    kam: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    director: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    supervisor: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    commercialist: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    merchandiser: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    requisitionDays: "",
    merchandiserRevisionDays: "string",
    objectInfo: {
      assortmentModule: "",
      gainings12Mrsd: 0,
      wdpercentSerbia: 0,
      wdpercentSector: 0,
      wdpercentCustomer: 0,
      gainingsVs12mpercent: 0,
      registersNumber: 0,
      shelfSpaceM: 0,
      companyShelfSpaceM: 0,
      companyShelfSpacePercent: 0
    }
  }

  public get objects() {
    return this.dataSource;
  }

  constructor(public objectService: ObjectService) { }

  ngOnInit(): void {

    this.objectService.getObjects().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

    });

    // this.objectService.getObjectsByString('ste').subscribe(data => {
    //   this._objects = data;
    //   console.log(this._objects);
    // });

    // this.objectService.getObjectByObjectName('Objekat1').subscribe(data => {
    //   this.object = data;
    //   console.log(this.object);
    // });
  }

  public selectObject(object: Obj){
    this.object=object;
    this.objectService.getOneObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

  public createObject() {
    console.log(this.object);
    this.objectService.createObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

  public updateObject() {
    this.objectService.updateObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

  public searchByString():void{
    this.objectService.getObjectByString(this.search).subscribe(data => {
      console.log(data)
      type ObjArray = Array<Obj>;
      const objArr: ObjArray = [
        data
    ];
      this.dataSource=new MatTableDataSource<Obj>(objArr);
    });
   }

}
