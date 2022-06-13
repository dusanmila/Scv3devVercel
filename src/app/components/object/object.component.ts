import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable, Subscription } from 'rxjs';
import { ObjectCreateDialogComponent } from 'src/app/dialogs/object-create-dialog/object-create-dialog.component';
import { ObjectDialogComponent } from 'src/app/dialogs/objectdialog/objectdialog.component';
import { Obj } from 'src/app/models/object';
import { ObjectCreateDto } from 'src/app/models/object';
import { ObjectInfo } from 'src/app/models/objectInfo';
import { ObjectStoreCheckCreateDto } from 'src/app/models/objectStoreCheck';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';



@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  displayedColumns = ["objectName", "address", "actions"];
  dataSource: MatTableDataSource<Obj>;
  subscription: Subscription;
  isLoading=false;

  @Input() public workModel: string;
  @Input() public isAdmin: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public detailSearch: boolean = false;
  public idCompany: string = "";
  public retailer: string = "";
  public city: string = "";
  public format: string = "";
  public page: number = 1;
  public count: number = 5;
  public length: number = 100;

  objectInfo:ObjectInfo;


  search: string = "";

  searchClicked: boolean=false;

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
      email: "",
      userType: ""
    },
    director: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userType: ""
    },
    supervisor: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userType: ""
    },
    commercialist: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userType: ""
    },
    merchandiser: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userType: ""
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
    },
    totalCount: 0
  }

  public objectCreateDto: ObjectCreateDto = {
    objectIdRetail: "",
    objectIdCompany: "",
    retailer: "",
    objectFormat: "",
    objectName: "",
    city: "",
    address: "",
    kam: "",
    director: "",
    supervisor: "",
    commercialist: "",
    merchandiser: "",
    requisitionDays: "",
    merchandiserRevisionDays: "",
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

  constructor(public objectService: ObjectService, public dialog: MatDialog) { }

  ngOnInit(): void {

    //this.loadData();
    // this.objectService.getObjectsByString('ste').subscribe(data => {
    //   this._objects = data;
    //   console.log(this._objects);
    // });

    // this.objectService.getObjectByObjectName('Objekat1').subscribe(data => {
    //   this.object = data;
    //   console.log(this.object);
    // });
  }

  public loadData() {
    console.log(this.idCompany, this.retailer, this.city, this.format)
    this.objectService.getObjects(this.page, this.count, this.search, this.idCompany, this.retailer, this.city, this.format).subscribe(data => {
      this.length = data[0].totalCount;
      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
      console.log(data);
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    // if ((event.pageIndex + 1) * this.count > this.length) {
    //   this.count = this.length % this.count;
    // }
    this.page = event.pageIndex + 1;
    this.loadData();
  }

  public selectObject(object: Obj) {
    this.object = object;
    this.objectService.getOneObject(this.object).subscribe(data => {
      console.log(data);
    });
  }
/*
  public createObject() {
    console.log(this.object);
    this.objectService.createObject(this.object).subscribe(data => {
      console.log(data);
    });
  }*/

  public updateObject() {
    this.objectService.updateObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

  public searchByString(): void {
    this.isLoading=true;
    this.objectService.getObjectsByStringContains(this.search).subscribe(data => {

      this.dataSource = new MatTableDataSource<Obj>(data);
      this.isLoading=false;
    });
  }

  public openDialog(flag: number, objectName?: string, objectIdCompany?: string, objectIdRetail?: string, address?:string,city?:string,retailer?:Retailer,objectFormat?:string,requisitionDays?:string,merchandiserRevisionDays?:string) {
    if(flag==1){
      const dialogRef = this.dialog.open(ObjectCreateDialogComponent,{data: this.objectCreateDto});
    }
    else{
      const dialogRef = this.dialog.open(ObjectDialogComponent, { data: { objectName, objectIdCompany, objectIdRetail, address,city,retailer,objectFormat,requisitionDays,merchandiserRevisionDays } });
      dialogRef.componentInstance.flag = flag;
      console.log(retailer?.retailerName);
      dialogRef.afterClosed()
        .subscribe(res => {
          if (res === 1) {
            this.loadData();
          }
        }
        )
    }

  }

  public applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public showDetailSearch() {
    this.detailSearch = !this.detailSearch;
  }

  public setSearchClicked(){
    this.searchClicked=true;
  }

}
