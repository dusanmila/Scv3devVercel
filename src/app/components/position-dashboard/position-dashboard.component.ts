import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'app-position-dashboard',
  templateUrl: './position-dashboard.component.html',
  styleUrls: ['./position-dashboard.component.css']
})
export class PositionDashboardComponent implements OnInit {

  query: string;

  selectQuery: string;

  selectPositionClassQuery: string;
  selectPositionTypeQuery: string;
  selectProductCategoryQuery: string;

  ObjectQuery: string = " inner join [object] o on (sp.[ObjectId]=o.[ObjectId]) where objectname='";

  RetilerQuery: string = " inner join [object] o on (sp.[ObjectId]=o.[ObjectId])"
    + " inner join Retailer r on (o.RetailerId=r.RetailerId) where retailerName='";

  selectedObject: string = "";
  selectedRetailer: string = "";

  productCategoryResult: StatisticsModel[];
  positionClassResult: StatisticsModel[];
  positionTypeResult: StatisticsModel[];

  countData: StatisticsModel[] = [];
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
    this.send();
    this.getCountData();
  }

  selectRetailer(retailer: string) {
    if (this.selectedObject) {
      this.selectedObject = '';
    }
    this.selectedRetailer = retailer;
    this.send();
  }

  selectObject(object: string) {
    if (this.selectedRetailer) {
      this.selectedRetailer = '';
    }
    this.selectedObject = object;
    this.send();
  }

  getCountData() {
    this.statisticsService.getCountData('POSITION_DASHBOARD').subscribe(data => {
      this.countData = data;
    });
  }

  public queryUpdate() {

    if (this.selectedObject != "") {

      this.selectQuery = this.selectQuery + this.ObjectQuery + this.selectedObject + "'";
      this.selectPositionClassQuery = this.selectPositionClassQuery + this.ObjectQuery + this.selectedObject + "'";
      this.selectPositionTypeQuery = this.selectPositionTypeQuery + this.ObjectQuery + this.selectedObject + "'";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + this.ObjectQuery + this.selectedObject + "'";
    }


    if (this.selectedRetailer != "") {

      this.selectQuery = this.selectQuery + this.RetilerQuery + this.selectedRetailer + "'";
      this.selectPositionClassQuery = this.selectPositionClassQuery + this.RetilerQuery + this.selectedRetailer + "'";
      this.selectPositionTypeQuery = this.selectPositionTypeQuery + this.RetilerQuery + this.selectedRetailer + "'";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + this.RetilerQuery + this.selectedRetailer + "'";
    }
  }

  public send() {

    this.selectQuery = "select count(SecondaryPositionId) as Count from SecondaryPosition sp ";

    this.selectPositionClassQuery = "select count(SecondaryPositionId) as Value, PositionTypeName as Name " +
      "from PositionType pt inner join SecondaryPosition sp on (pt.PositionTypeId=sp.PositionTypeId) ";

    this.selectPositionTypeQuery = "select count(SecondaryPositionId) as Value, PositionClassName as Name " +
      "from PositionClass pc inner join SecondaryPosition sp on (pc.PositionClassId=sp.PositionClassId) "

    this.selectProductCategoryQuery = "select count(PositionId) as Value, ProductCategoryName as Name " +
      "from ProductCategory pc inner join PositionProductCategory ppc on (pc.ProductCategoryId=ppc.ProductCategoryId) " +
      "inner join SecondaryPosition sp on (sp.SecondaryPositionId= ppc.PositionId) "


    this.queryUpdate();
    this.selectPositionClassQuery = this.selectPositionClassQuery + " group by PositionTypeName";
    this.selectPositionTypeQuery = this.selectPositionTypeQuery + " group by PositionClassName";
    this.selectProductCategoryQuery = this.selectProductCategoryQuery + " group by ProductCategoryName";

    this.statisticsService.getCountListByQuerry(this.selectPositionClassQuery).subscribe(data => {
      this.positionClassResult = data;
    });

    this.statisticsService.getCountListByQuerry(this.selectPositionTypeQuery).subscribe(data => {
      this.positionTypeResult = data;
    });

    this.statisticsService.getCountListByQuerry(this.selectProductCategoryQuery).subscribe(data => {
      this.productCategoryResult = data;
    });
  }


}
