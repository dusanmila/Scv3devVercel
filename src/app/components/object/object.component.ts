import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObjectCreateDialogComponent } from 'src/app/dialogs/object-create-dialog/object-create-dialog.component';
import { ObjectDialogComponent } from 'src/app/dialogs/objectdialog/objectdialog.component';
import { UnfinishedObjectStoreCheckDialogComponent } from 'src/app/dialogs/unfinished-object-store-check-dialog/unfinished-object-store-check-dialog.component';

import { Obj, ObjectCreateDto } from 'src/app/models/object';
import { ObjectInfo } from 'src/app/models/objectInfo';
import { ObjectStoreCheckCreateDto } from 'src/app/models/objectStoreCheck';
import { Retailer } from 'src/app/models/retailer';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
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
  isLoading = false;

  @Input() public workModel: string;
  @Input() public isAdmin: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public detailSearch: boolean = false;
  public address: string = "";
  public objectName: string = "";
  public idCompany: string = "";
  public retailer: string = "";
  public city: string = "";
  public format: string = "";
  public page: number = 1;
  public count: number = 5;
  public length: number = 100;
  public resolveFeedbacks: boolean = false;

  objectInfo: ObjectInfo;


  search: string = "";

  searchClicked: boolean = false;

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
      password: "",
      userType: ""
    },
    director: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      userType: ""
    },
    supervisor: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      userType: ""
    },
    commercialist: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      userType: ""
    },
    merchandiser: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
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

  public objectArray: Obj[] = [];

  public get objects() {
    return this.dataSource;
  }

  constructor(public objectService: ObjectService,
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public objectStoreCheckService: ObjectStoreCheckService) { }
    noData=false;

  ngOnInit(): void {
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (this.workModel == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (this.workModel == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }


  }

  public loadData() {
    this.isLoading=true;
    this.noData=false;
    this.objectService.getObjects(this.page, this.count, this.address, this.objectName, this.idCompany, this.retailer, this.city, this.format).subscribe(data => {
      if (data) {
        this.length = data[0].totalCount;
        this.dataSource = new MatTableDataSource(data);
      } else {
        this.noData=true;
        this.length = 0;
        this.dataSource = new MatTableDataSource(this.objectArray);
      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.loadData();
  }

  public selectObject(object: Obj) {
    this.object = object;
    this.objectService.getOneObject(this.object).subscribe(data => {
      console.log(data);
    });
  }


  public updateObject() {
    this.objectCreateDto.objectIdRetail = this.object.objectIdRetail;
    this.objectCreateDto.retailer = this.object.retailer.retailerName;
    this.objectCreateDto.objectIdCompany = this.object.objectIdCompany;
    this.objectCreateDto.objectFormat = this.object.objectFormat;
    this.objectCreateDto.objectName = this.object.objectName;
    this.objectCreateDto.city = this.object.city;
    this.objectCreateDto.address = this.object.address;
    this.objectCreateDto.kam = this.object.kam.username;
    this.objectCreateDto.director = this.object.director.username;
    this.objectCreateDto.supervisor = this.object.commercialist.username;
    this.objectCreateDto.merchandiser = this.object.merchandiser.username;
    this.objectCreateDto.merchandiserRevisionDays = this.object.merchandiserRevisionDays;
    this.objectCreateDto.requisitionDays = this.object.requisitionDays;
    this.objectCreateDto.objectInfo = this.object.objectInfo;
    this.objectService.updateObject(this.objectCreateDto).subscribe(data => {
      console.log(data);
    });
  }

  public searchByString(): void {
    this.isLoading = true;
    this.noData=false;
    this.objectService.getObjectsByStringContains(this.search).subscribe(data => {

      if(data.length==0){
      this.noData=true;
      }
      else{
        this.dataSource = new MatTableDataSource<Obj>(data);

      }
      this.isLoading = false;
    });
  }

  public openDialog(flag: number, objectName?: string, objectIdCompany?: string, objectIdRetail?: string, address?: string, city?: string, retailer?: Retailer, objectFormat?: string, requisitionDays?: string, merchandiserRevisionDays?: string) {
    if (flag == 1) {
      this.dialog.open(ObjectCreateDialogComponent, { data: this.objectCreateDto });

    }
    else {

      const dialogRef = this.dialog.open(ObjectDialogComponent, { data: { objectName, objectIdCompany, objectIdRetail, address, city, retailer, objectFormat, requisitionDays, merchandiserRevisionDays } });
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed()
        .subscribe(res => {
          if (res === 1) {
            this.loadData();
          }
        }
        )
    }

  }

  public openUpdateDialog(data: Obj) {
    const dialogRef = this.dialog.open(ObjectDialogComponent, { data: data });
    dialogRef.componentInstance.flag = 2;
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

  public setSearchClicked() {
    this.searchClicked = true;
  }

  public createEmptyObjectStoreCheck(objectName: string, objectIdCompany: string) {
    if (!this.resolveFeedbacks) {
      let username = localStorage.getItem("username") as string;
      let osc: ObjectStoreCheckCreateDto = {
        objectIdCompany: objectIdCompany,
        username: username,
        pdf: ""
      }
      this.objectStoreCheckService.createObjectStoreCheck(osc).subscribe(data => {
        this.router.navigate(['/storeCheckPage', this.workModel, objectName]);
      });
    }
  }

  public getUnfinishedObjectStoreCheck(objectName: string, objectIdCompany: string) {
    if (!this.resolveFeedbacks) {
      let username = localStorage.getItem("username") as string;
      this.objectStoreCheckService.getUnfinishedObjectStoreCheckByUsername(username).subscribe(data => {
        if (data) {
          let newObjectName = data.object.objectName;
          const dialogRef = this.dialog.open(UnfinishedObjectStoreCheckDialogComponent, { data: newObjectName });
          dialogRef.afterClosed()
            .subscribe(res => {
              if (res) {
                this.router.navigate(['/storeCheckPage', this.workModel, newObjectName]);
              } else {
                this.objectStoreCheckService.deleteUnfinishedObjectStoreCheck(username);
                this.createEmptyObjectStoreCheck(objectName, objectIdCompany);
              }
            });
        } else {
          this.createEmptyObjectStoreCheck(objectName, objectIdCompany);
        }
      });
    } else {
      this.router.navigate(['/storeCheckPage', this.workModel, objectName]);
    }
  }

}
