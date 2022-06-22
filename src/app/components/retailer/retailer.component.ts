import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ObjectService } from 'src/app/Services/object.service';
import { RetailerDialogComponent } from 'src/app/dialogs/retailerdialog/retailerdialogcomponent';
import { FormGroup } from '@angular/forms';
import { Retailer } from 'src/app/models/retailer';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent  {

  displayedColumns = ["retailerName","planogramPdf","actions"];
dataSource: MatTableDataSource<Retailer>;

tableForm:FormGroup;
search : string ="";

searchClicked: boolean = false;

isLoading=false;
noData=false;

selectedRetailer:Retailer;

  constructor(public objectService: ObjectService, private dialog:MatDialog) { }



public loadData(){
  this.objectService.getRetailers().subscribe(data => {

    this.dataSource = new MatTableDataSource(data);
    this.isLoading=false;
});
}

  public selectRetailer(retailer:Retailer){
    this.objectService.getOneRetailer(retailer).subscribe(data => {
      this.selectedRetailer=data;
    }) ;
   }




  public editRetailer(retailer:Retailer)
  {
    this.objectService.updateRetailer(retailer).subscribe();
  }

  public deleteRetailer()
  {
    this.objectService.deleteRetailer(this.selectedRetailer).subscribe();
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

  /*  public searchByName(){
      this.isLoading=true;
      this.objectService.getRetailersByNameContains(this.search).subscribe(data => {
        console.log(data)
        type RetArray = Array<Retailer>;
        const retArr: RetArray = [
          data
      ];
        this.dataSource=new MatTableDataSource<Retailer>(retArr);
        this.isLoading=false;
      });
      this.searchClicked=true;
    }*/

    public searchByName(){
      this.noData=false;
      this.isLoading = true;
      this.objectService.getRetailersByNameContains(this.search).subscribe(data => {
if(data){
  this.dataSource = new MatTableDataSource<Retailer>(data);
}else{
  this.noData=true;
}

        this.isLoading = false;
      });
    }


}
