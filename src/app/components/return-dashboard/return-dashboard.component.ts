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

  selectedObject: string = "";
  selectedRetailer: string = "";

  selectedObjects: string[] = [];
  selectedRetailers: string[] = [];

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
    if (this.selectedObject) {
      this.returnResult = [];
    }
    this.selectedObject = '';
    this.selectedObjects = [];
    let index = this.selectedRetailers.indexOf(retailer);
    if (index < 0) {
      this.selectedRetailer = retailer;
      this.selectedRetailers.push(retailer);
      this.getReturnsCount();
    }
  }

  removeRetailer(retailer: string) {
    let index = this.selectedRetailers.indexOf(retailer);
    if (index >= 0) {
      this.selectedRetailers.splice(index, 1);
    }
    index = this.returnResult.findIndex(el => el.name === retailer);
    if (index >= 0) {
      this.returnResult.splice(index, 1);
    }
  }

  selectObject(object: string) {
    if (this.selectedRetailer) {
      this.returnResult = [];
    }
    this.selectedRetailer = '';
    this.selectedRetailers = [];
    let index = this.selectedObjects.indexOf(object);
    if (index < 0) {
      this.selectedObject = object;
      this.selectedObjects.push(object);
      this.getReturnsCount();
    }
  }

  removeObject(objectName: string) {
    let index = this.selectedObjects.indexOf(objectName);
    if (index >= 0) {
      this.selectedObjects.splice(index, 1);
    }
    index = this.returnResult.findIndex(el => el.name === objectName);
    if (index >= 0) {
      this.returnResult.splice(index, 1);
    }
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
