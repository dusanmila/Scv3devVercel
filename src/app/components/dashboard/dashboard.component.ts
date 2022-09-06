import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Tile } from '@angular/material/grid-list/tile-coordinator';
import { isEmpty } from 'rxjs';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened: boolean = false;
  flag: number = 1;
  title: string = 'Dashboard';
  breakpoint: number;

  query: string;
  selectQuery: string ;
  //= "select count(feedbackid) as Count from feedback ";

  selectedYear:string;
  selectedDay:string;
  selectedMonth:string;

  days2: string[];

  years: string[] = [
   '2022','2021','2020'
  ];

 months: string[] = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
   ];

   days31: string[] = [
    '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'   ];



   days30: string[] = [
    '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'   ];

    days28: string[] = [
      '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];



  selectFeedbackCategoryQuery: string;
  /*= "select count(feedbackid) as firstInt, feedbackCategoryName as firstString" +
    "from FeedbackCategory fc inner join Feedback f on (f.FeedbackCategoryId=fc.FeedbackCategoryId)";*/

  selectProductCategoryQuery: string ;
  /*= "select count(feedbackid) as firstInt, productCategoryName as firstString" +
    "from ProductCategory pc inner join Feedback f on (f.ProductCategoryId=pc.ProductCategoryId)" +
    "group by productCategoryName";*/



  ObjectQuery: string = "inner join objectstorecheck osc on (f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
  + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) where objectname='";



  selectedUser: string = "";
  selectedObject: string = "";
  selectedFormat: string = "";
  selectedRetailer: string = "";

  feedbackCategoryResult: StatisticsModel[];
  productCategoryResult: StatisticsModel[];

  first: boolean = true;

  // version = VERSION;
  date = new Date();
  chosenYearDate: Date;
  chosenMonthDate: Date = new Date(2020,0,1);
  chosenSemesterDate: Date;
  chosenWeekDate: Date;
  chosenDate: Date;
  monthInputCtrl: FormControl = new FormControl(new Date(2020,0,1));

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
  }

  public changePage(flag: number, title: string) {
    this.flag = flag;
    this.title = title;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 2 : 4;
  }

  selectRetailer(retailer: string) {
    this.selectedRetailer = retailer;
    console.log(this.selectedRetailer);
  }

  selectUser(user: string) {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  selectObject(object: string) {
    this.selectedObject = object;
    console.log(this.selectedObject);
  }

  selectMonth(month: string) {
    this.selectedMonth = month;



    console.log(this.selectedMonth);
  }

  setYear(year:any){
this.selectedYear=year;
console.log(this.selectedYear)
  }

setMonth(value){
this.selectedMonth=value;

if(this.selectedMonth==='April'||this.selectedMonth==='June'||this.selectedMonth==='September' || this.selectedMonth==='November'){
  this.days2=this.days30;
}else if(this.selectedMonth==='February'){
this.days2=this.days28;
}else{
  this.days2=this.days31;
}

  console.log(this.selectedMonth)
}

setDay(day:any){

this.selectedDay=day;

}


  public queryUpdate() {


    if (this.selectedObject != "") {


      this.selectQuery = this.selectQuery +"f "+ this.ObjectQuery + this.selectedObject + "'";


      this.selectFeedbackCategoryQuery=this.selectFeedbackCategoryQuery + this.ObjectQuery + this.selectedObject + "'";

      this.selectProductCategoryQuery=this.selectProductCategoryQuery + this.ObjectQuery + this.selectedObject + "'";

      this.first = false
    }
    /*
       if(this.selectedFormat!="" )
       {


        this.selectQuery=this.selectQuery+"f inner join  objectstorecheck osc on(f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
        + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) where objectFormat='"
        + this.selectedFormat+"'";
        this.first=false
       }

       if( this.selectedRetailer!="" )
       {


        this.selectQuery=this.selectQuery+"f inner join  objectstorecheck osc on(f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
        + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany)"
        +" inner join Retailer r on (o.RetailerId=r.RetailerId)  where retailerName='"
        + this.selectedFormat+"'";
        this.first=false
       }*/

    if (this.selectedUser != "") {
      if (this.first == false) {
        this.selectQuery = this.selectQuery + " and ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      }
      else {
        this.selectQuery = this.selectQuery + "where ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      }

      this.selectQuery = this.selectQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.selectFeedbackCategoryQuery=this.selectFeedbackCategoryQuery +"(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";

      this.selectProductCategoryQuery=this.selectProductCategoryQuery + "(f.username='" + this.selectedUser + "' or f.usernameResolve='" + this.selectedUser + "')";


      this.first = false;
    }

    if (this.selectedYear != "") {
      if (this.first == false) {
        this.selectQuery = this.selectQuery + " and ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      }
      else {
        this.selectQuery = this.selectQuery + "where ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      }

      this.selectQuery = this.selectQuery + "DATEPART(yy,[Date])=" + this.selectedYear;

      this.selectFeedbackCategoryQuery=this.selectFeedbackCategoryQuery + "DATEPART(yy,[Date])=" + this.selectedYear;

      this.selectProductCategoryQuery=this.selectProductCategoryQuery + "DATEPART(yy,[Date])=" + this.selectedYear;


      this.first = false
    }
    if (this.selectedMonth != "") {
      if (this.first == false) {
        this.selectQuery = this.selectQuery + " and ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      }
      else {
        this.selectQuery = this.selectQuery + "where ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      }

      this.selectQuery = this.selectQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.selectFeedbackCategoryQuery=this.selectFeedbackCategoryQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.selectProductCategoryQuery=this.selectProductCategoryQuery + "DATENAME(mm, [Date])='" + this.selectedMonth + "'";

      this.first = false
    }
    if (this.selectedDay != "") {
      if (this.first == false) {
        this.selectQuery = this.selectQuery + " and ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + " and ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + " and ";
      }
      else {
        this.selectQuery = this.selectQuery + "where ";
        this.selectFeedbackCategoryQuery = this.selectFeedbackCategoryQuery + "where ";
        this.selectProductCategoryQuery = this.selectProductCategoryQuery + "where ";
      }

      this.selectQuery = this.selectQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.selectFeedbackCategoryQuery=this.selectFeedbackCategoryQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.selectProductCategoryQuery=this.selectProductCategoryQuery + "DATEPART(dd,[Date])=" + this.selectedDay;

      this.first = false
    }
  }

  public send() {

    this.selectQuery = "select count(feedbackid) as Count from feedback ";

    this.selectFeedbackCategoryQuery= "select count(feedbackid) as Value, feedbackCategoryName as Name " +
      "from FeedbackCategory fc inner join Feedback f on (f.FeedbackCategoryId=fc.FeedbackCategoryId) ";

    this.selectProductCategoryQuery= "select count(feedbackid) as Value, productCategoryName as Name " +
    "from ProductCategory pc inner join Feedback f on (f.ProductCategoryId=pc.ProductCategoryId) "

    this.queryUpdate();

    this.selectFeedbackCategoryQuery=this.selectFeedbackCategoryQuery+"group by FeedbackCategoryName";

    this.selectProductCategoryQuery=this.selectProductCategoryQuery+"group by ProductCategoryName";


    this.statisticsService.getFeedbackCount(this.selectQuery).subscribe(data => {
      console.log("number"+data);
    });

    this.statisticsService.getCountListByQuerry(this.selectFeedbackCategoryQuery).subscribe(data => {
      console.log(data);
      this.feedbackCategoryResult = data;
    });

    this.statisticsService.getCountListByQuerry(this.selectProductCategoryQuery).subscribe(data => {
      console.log("product"+data);
      this.productCategoryResult = data;
    });
  }

}
