import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  objInfo: ObjectInfo;
  isReturns: boolean = false;

  @Input() public workModel: string;
  @Input() public isAdmin: boolean = false;
  @Input() public isDashboard: boolean = false;
  @Output() public selectedObject = new EventEmitter<string>();

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
  public length: number = 0;
  // public resolveFeedbacks: boolean = false;
  // public positionCheck: boolean = false;

  objectInfo: ObjectInfo;
  isObjectSelected = false;

  search: string = "";

  searchClicked: boolean = false;

  public object: Obj = {
    objectIdRetail: "string",
    objectIdCompany: "string",
    retailer: {
      "retailerName": "",
      "planogramPdf": "",
      "totalCount": 0
    },
    objectFormat: "string",
    objectName: "string",
    city: "string",
    address: "string",
    kam: "string",
    director: "string",
    supervisor: "string",
    commercialist: "string",
    merchandiser: "string",
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
  noData = false;

  ngOnInit(): void {
    let url = this.router.url;
    if (url === '/admin/object') {
      this.isAdmin = true;
    }
    if (this.isDashboard)
      this.count = 2;
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;


    if (this.workModel == 'returns') {
      this.isReturns = true;
    }
    // if (this.workModel == "addStoreCheck") {
    //   this.resolveFeedbacks = false;
    // } else if (this.workModel == "resolveFeedbacks") {
    //   this.resolveFeedbacks = true;
    // } else if (this.workModel = "position") {
    //   this.positionCheck = true;
    // }
    if (this.isDashboard) {
      this.displayedColumns.splice(1, 2);
    }
    if (this.isDashboard || this.isAdmin) {
      this.loadData(false);
    }
  }

  public loadData(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    this.isLoading = true;
    this.noData = false;
    this.objectService.getObjects(this.page, this.count, this.address, this.objectName, this.idCompany, this.retailer, this.city, this.format).subscribe(data => {
      if (data) {
        this.length = data[0].totalCount;
        this.dataSource = new MatTableDataSource(data);
      } else {
        this.noData = true;
        this.length = 0;
        this.dataSource = new MatTableDataSource(this.objectArray);

      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(true);
  }


  public searchByString(): void {
    this.isLoading = true;
    this.noData = false;
    this.objectService.getObjectsByStringContains(this.search).subscribe(data => {

      if (data.length == 0) {
        this.noData = true;
        this.dataSource = new MatTableDataSource<Obj>(data);
      }
      else {
        this.dataSource = new MatTableDataSource<Obj>(data);

      }
      this.isLoading = false;
    });
  }

  public openDialog(flag: number, objectName?: string, objectIdCompany?: string, objectIdRetail?: string, address?: string, city?: string, retailer?: Retailer, objectFormat?: string, requisitionDays?: string, merchandiserRevisionDays?: string, kam?: string, merchandiser?: string, director?: string, commercialist?: string, supervisor?: string) {
    

    if (flag == 1 || flag == 4) {
      const dialogRef=this.dialog.open(ObjectCreateDialogComponent, { data: this.objectCreateDto });
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed()
        .subscribe(res => {
          if (res === 1) {
            this.loadData(false);
          }
        }
        )
    
    } 
    else {
      const dialogRef = this.dialog.open(ObjectDialogComponent, { data: { objectName, objectIdCompany, objectIdRetail, address, city, retailer, objectFormat, requisitionDays, merchandiserRevisionDays, kam, merchandiser, director, commercialist, supervisor } });

      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed()
        .subscribe(res => {
          if (res === 1) {
            this.loadData(false);
          }
        }
        )
    }

  }

  public openUpdateDialog(flag: number, data: Obj) {
    const dialogRef = this.dialog.open(ObjectDialogComponent, { data: data });
    dialogRef.componentInstance.flag = flag;
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
    if (this.workModel === 'addStoreCheck') {
      let username = localStorage.getItem("username") as string;
      let osc: ObjectStoreCheckCreateDto = {
        objectIdCompany: objectIdCompany,
        username: username,
        pdf: ""
      }
      this.objectStoreCheckService.createObjectStoreCheck(osc).subscribe(data => {
        this.router.navigate(['/storeCheckPage', this.workModel, objectIdCompany]);
      });
    }
  }

  public getUnfinishedObjectStoreCheck(objectName: string, objectIdCompany: string) {

    this.isObjectSelected = true;
    if (this.workModel === 'addStoreCheck') {
      let username = localStorage.getItem("username") as string;
      this.objectStoreCheckService.getUnfinishedObjectStoreCheckByUsername(username).subscribe(data => {
        if (data) {
          let newObjectName = data.object.objectName;
          let newObjectIdCompany = data.object.objectIdCompany;
          const dialogRef = this.dialog.open(UnfinishedObjectStoreCheckDialogComponent, { data: newObjectName });
          dialogRef.afterClosed()
            .subscribe(res => {
              if (res) {
                this.router.navigate(['/storeCheckPage', this.workModel, newObjectIdCompany]);
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
      this.router.navigate(['/storeCheckPage', this.workModel, objectIdCompany]);
    }
  }

  public returnPage(objectIdCompany: string) {
    this.router.navigate(['/returns', objectIdCompany]);
  }

  openPriceScannerPage(objectIdCompany) {
    this.router.navigate(['/priceScanner', objectIdCompany]);
  }

  public selectObject(objectName: string) {
    this.isObjectSelected = true;
    this.selectedObject.emit(objectName);
  }

}
