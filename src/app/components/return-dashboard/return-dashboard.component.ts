import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'app-return-dashboard',
  templateUrl: './return-dashboard.component.html',
  styleUrls: ['./return-dashboard.component.css']
})
export class ReturnDashboardComponent implements OnInit {

  selectedRetailer: string = "";
  selectedObject: string = "";
  selectedUser: string = "";
  selectedProduct: string = "";


  returnResult: StatisticsModel[] = [];

  cardColor: string = '#0081af';
  textColor: string = '#fff';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00abe7', '#2dc7ff', '#ead2ac', '#eaba6b']
  };

  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
  }

  

  selectRetailer(retailer: string) {
    if (this.selectedObject)
      this.selectedObject = '';
    this.selectedRetailer = retailer;
   
  }

  selectObject(object: string) {
    if (this.selectedRetailer)
      this.selectedRetailer = '';
    this.selectedObject = object;
  
  }

  selectUser(user: string){
    this.selectedUser= user;
   
  }
  selectProduct(product: string) {
   
    this.selectedProduct= product;

    console.log(this.selectedProduct)
   
  }
 
  getReturnsCount() {
    this.statisticsService.getReturnsCount(this.selectedObject, this.selectedRetailer).subscribe(data => {
      if (data.name) {
        this.returnResult.push(data);
        this.returnResult = [...this.returnResult];
      }
    });
  }

}
