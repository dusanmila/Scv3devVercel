import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened: boolean = false;
  resolved: boolean = false;
  flag: number = 1;
  title: string = 'Dashboard';
  breakpoint: number;

  query: string;
  selectQuery: string;
  //= "select count(feedbackid) as Count from feedback ";


  days2: string[];

  years: string[] = [
    'All','2022', '2023', '2024', '2025', '2026'
  ];

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  days31: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];



  days30: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

  days28: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];



  selectFeedbackCategoryQuery: string;

  selectProductCategoryQuery: string;




  ObjectQuery: string = "inner join objectstorecheck osc on (f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
    + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) where objectname='";

  RetilerQuery: string = "inner join  objectstorecheck osc on(f.ObjectStoreCheckId=osc.ObjectStoreCheckId) inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany)"
    + " inner join Retailer r on (o.RetailerId=r.RetailerId) where retailerName='";


  selectedYear: string = "";
  selectedDay: string = "";
  selectedMonth: string = "";
  selectedUser: string = "";
  selectedObject: string = "";
  selectedRetailer: string = "";

  feedbackCategoryResult: StatisticsModel[];
  productCategoryResult: StatisticsModel[];

  first: boolean = true;

  date = new Date();
  chosenYearDate: Date;
  chosenMonthDate: Date = new Date(2020, 0, 1);
  chosenSemesterDate: Date;
  chosenWeekDate: Date;
  chosenDate: Date;
  monthInputCtrl: FormControl = new FormControl(new Date(2020, 0, 1));

  visible = true;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 2 : 4;
    this.send();
  }

  public changePage(flag: number, title: string) {
    this.flag = flag;
    this.title = title;
  }

  radioBtnClicked() {
    console.log(this.resolved)
    this.send();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 2 : 4;
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

  selectMonth(month: string) {
    this.selectedMonth = month;
    console.log(this.selectedMonth);
    this.send();
  }

  setYear(value) {

if(value==="All"){
  this.selectedYear="";
}else{
  this.selectedYear=value;
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

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + this.ObjectQuery + this.selectedObject + "'";

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + this.ObjectQuery + this.selectedObject + "'";

      this.first = false
    }


    if (this.selectedRetailer != "") {
      this.selectQuery = this.selectQuery + this.RetilerQuery + this.selectedRetailer + "'";

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + this.RetilerQuery + this.selectedRetailer + "'";

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + this.RetilerQuery + this.selectedRetailer + "'";

      this.first = false
    }

    if (this.selectedUser != "" && !this.first) {

      this.selectQuery = this.selectQuery + " and ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";

      this.selectQuery = this.selectQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.first = false;
    }

    else if (this.selectedUser != "" && this.first ) {
      this.selectQuery = this.selectQuery + "where ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      this.selectQuery = this.selectQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.first = false;
    }


    if (this.selectedYear != "" && !this.first ) {

      this.selectQuery = this.selectQuery + " and ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      this.selectQuery = this.selectQuery + "DATEPART(yy,[Date])=" + this.selectedYear;

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "DATEPART(yy,[Date])=" + this.selectedYear;

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "DATEPART(yy,[Date])=" + this.selectedYear;


      this.first = false
    }

    else if (this.selectedYear != "" && this.first) {
      this.selectQuery = this.selectQuery + "where ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      this.selectQuery = this.selectQuery + "DATEPART(yy,[Date])=" + this.selectedYear;

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "DATEPART(yy,[Date])=" + this.selectedYear;

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "DATEPART(yy,[Date])=" + this.selectedYear;


      this.first = false
    }



    if (this.selectedMonth != "" && !this.first) {

      this.selectQuery = this.selectQuery + " and ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      this.selectQuery = this.selectQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.first = false
    }

    else if (this.selectedMonth != "" && this.first) {
      this.selectQuery = this.selectQuery + "where ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      this.selectQuery = this.selectQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.first = false
    }


    if (this.selectedDay != "" && !this.first) {

      this.selectQuery = this.selectQuery + " and ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      this.selectQuery = this.selectQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.first = false
    }

    else if (this.selectedDay != "" && this.first) {
      this.selectQuery = this.selectQuery + "where ";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      this.selectQuery = this.selectQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.first = false
    }
  }

  public send() {

    this.selectQuery = "select count(feedbackid) as Count from feedback f ";

    this.selectFeedbackCategoryQuery = "select count(feedbackid) as Value, feedbackCategoryName as Name " +
      "from FeedbackCategory fc inner join Feedback f on (f.FeedbackCategoryId=fc.FeedbackCategoryId) ";

    this.selectProductCategoryQuery = "select count(feedbackid) as Value, productCategoryName as Name " +
      "from ProductCategory pc inner join Feedback f on (f.ProductCategoryId=pc.ProductCategoryId) "

    this.queryUpdate();


    if (!this.first) {
      this.selectQuery = this.selectQuery + " and resolved= '" + this.resolved + "'";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and resolved= '" + this.resolved + "'";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and resolved= '" + this.resolved + "'";
    }
    else {
      this.selectQuery = this.selectQuery + "where resolved= '" + this.resolved + "'";
      this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where resolved= '" + this.resolved + "'";
      this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where resolved= '" + this.resolved + "'";

    }

    this.first = true

    this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " group by FeedbackCategoryName";

    this.selectProductCategoryQuery = this.selectProductCategoryQuery + " group by ProductCategoryName";



    this.statisticsService.getFeedbackCount(this.selectQuery).subscribe(data => {
      console.log("number" + data);
    });

    this.statisticsService.getCountListByQuerry(this.selectFeedbackCategoryQuery).subscribe(data => {
      console.log(data);
      this.feedbackCategoryResult = data;
    });

    this.statisticsService.getCountListByQuerry(this.selectProductCategoryQuery).subscribe(data => {
      console.log("product" + data);
      this.productCategoryResult = data;
    });
  }

}
