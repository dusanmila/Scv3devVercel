import { Component, OnInit } from '@angular/core';
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

  ObjectQuery: string = " inner join [object] o on (sp.ObjectIdCompany=o.ObjectIdCompany) where objectname='";

  RetilerQuery: string = " inner join [object] o on (sp.ObjectIdCompany=o.ObjectIdCompany)"
  + " inner join Retailer r on (o.RetailerId=r.RetailerId) where retailerName='";

  selectedUser: string = "";
  selectedObject: string = "";
  selectedRetailer: string = "";

  positionClassResult: StatisticsModel[];
  positionTypeResult: StatisticsModel[];


  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.send();
  }
  
  selectRetailer(retailer: string) {
    if (this.selectedObject)
      this.selectedObject = '';
    this.selectedRetailer = retailer;
    console.log(this.selectedRetailer);
    this.send();
  }

  selectUser(user: string) {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.send();
  }

  selectObject(object: string) {
    if (this.selectedRetailer)
      this.selectedRetailer = '';
    this.selectedObject = object;
    console.log(this.selectedObject);
    this.send();
  }
  
  public queryUpdate() {


    if (this.selectedObject != "") {

      this.selectQuery = this.selectQuery + this.ObjectQuery + this.selectedObject + "'";

      this.selectPositionClassQuery = this.selectPositionClassQuery + this.ObjectQuery + this.selectedObject + "'";

      this.selectPositionTypeQuery = this.selectPositionTypeQuery + this.ObjectQuery + this.selectedObject + "'";

    }


    if (this.selectedRetailer != "") {

      this.selectQuery = this.selectQuery + this.RetilerQuery + this.selectedRetailer + "'";

      this.selectPositionClassQuery = this.selectPositionClassQuery + this.RetilerQuery + this.selectedRetailer + "'";

      this.selectPositionTypeQuery = this.selectPositionTypeQuery + this.RetilerQuery + this.selectedRetailer + "'";

    }
  }

    
  public send() {

    this.selectQuery = "select count(SecondaryPositionId) as Count from SecondaryPosition sp ";

    this.selectPositionClassQuery = "select count(SecondaryPositionId) as Value, PositionTypeName as Name " +
      "from PositionType pt inner join SecondaryPosition sp on (pt.PositionTypeId=sp.PositionTypeId) ";

    this.selectPositionTypeQuery = "select count(SecondaryPositionId) as Value, PositionClassName as Name " +
      "from PositionClass pc inner join SecondaryPosition sp on (pc.PositionClassId=sp.PositionClassId) "

    this.queryUpdate();



    this.selectPositionClassQuery = this.selectPositionClassQuery + " group by PositionTypeName";

    this.selectPositionTypeQuery = this.selectPositionTypeQuery + " group by PositionClassName";

    this.statisticsService.getCountListByQuerry(this.selectPositionClassQuery).subscribe(data => {
      console.log(data);
      this.positionClassResult = data;
    });


    this.statisticsService.getCountListByQuerry(this.selectPositionTypeQuery).subscribe(data => {
      console.log("type" + data);
      this.positionTypeResult = data;
    });
  }


}
