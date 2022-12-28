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

  years: string[] = [
    'All', '2022', '2023', '2024', '2025', '2026'
  ];

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  days2: string[];

  days31: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

  days30: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

  days28: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];

  selectedYear: string = "";
  selectedDay: string = "";
  selectedMonth: string = "";
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

  setYear(value) {
    if (value === "All") {
      this.selectedYear = "";
    } else {
      this.selectedYear = value;
    }
    console.log(this.selectedYear);
    this.send();
  }

  setMonth(value) {
    this.selectedMonth = value;
    if (this.selectedMonth === 'April' || this.selectedMonth === 'June' || this.selectedMonth === 'September' || this.selectedMonth === 'November') {
      this.days2 = this.days30;
    } else if (this.selectedMonth === 'February') {
      this.days2 = this.days28;
    } else {
      this.days2 = this.days31;
    }
    console.log(this.selectedMonth)
    this.send();
  }

  setDay(value) {
    this.selectedDay = value;
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
