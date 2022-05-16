import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { UserDialogComponent } from 'src/app/dialogs/userdialog/userdialog.component';
import { ObjectService, Retailer } from 'src/app/Services/object.service';
import { RetailerDialogComponent } from 'src/app/dialogs/retailerdialog/retailerdialogcomponent';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  displayedColumns = ["retailerName","planogramPdf","actions"];
dataSource: MatTableDataSource<Retailer>;

tableForm:FormGroup;
search : string ="";


selectedRetailer:Retailer;

  constructor(public objectService: ObjectService, private dialog:MatDialog) { }

  ngOnInit(): void {

    this.loadData();


  }

public loadData(){
  this.objectService.getRetailers().subscribe(data => {

    this.dataSource = new MatTableDataSource(data);
});
}

  public selectRetailer(retailer:Retailer){
    this.objectService.getOneRetailer(retailer).subscribe(data => {
      this.selectedRetailer=data;
    }) ;
   }




  public editRetailer(retailer:Retailer)
  {
    this.objectService.updateRetailer(retailer).subscribe(data=>{

      console.log(data);

    });
  }

  deleteRetailer()
  {

    this.objectService.deleteRetailer(this.selectedRetailer).subscribe(data =>{
    });
  }

  public openDialog(flag:number, retailerName?:string,planogramPdf?:string){
    const dialogRef = this.dialog.open(RetailerDialogComponent, {data: {retailerName,planogramPdf}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
    .subscribe( res => {
        if(res === 1){
          this.loadData();
        }
      }
    )
    }

    public searchByName(){
      this.objectService.getRetailerByName(this.search).subscribe(data => {
        console.log(data)
        type RetArray = Array<Retailer>;
        const retArr: RetArray = [
          data
      ];
        this.dataSource=new MatTableDataSource<Retailer>(retArr);
      });
    }


}
