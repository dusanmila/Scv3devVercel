import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { Tile } from '@angular/material/grid-list/tile-coordinator';
import { stringify } from 'querystring';
import { isEmpty } from 'rxjs';
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
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  query:string;
  selectQuery: string ="select count(feedbackid) as firstInt from feedback";
  
  selectedYear:string;
  selectedMonth:string;
  selectedDay:string;
  selectedUser:string;
  selectedObject:string;
  selectedFormat:string;
  selectedRetailer: string;
  selectedUser: string;
  selectedObject: string;

  first:boolean=true;t

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.changeQuery();
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

  changeQuery() {
    this.query = 'select count(FeedbackId) as "Value", FeedbackCategoryName as "Name"' + 
                  ' from Feedback f left join FeedbackCategory fc on (f.FeedbackCategoryId = fc.FeedbackCategoryId)' + 
                  ' left join ObjectStoreCheck osc on (f.ObjectStoreCheckId = osc.ObjectStoreCheckId)' +
                  ' left join [Object] o on (osc.ObjectIdCompany = o.ObjectIdCompany)' +
                  ' left join Retailer r on (o.RetailerId = r.RetailerId)' +
                  ' group by FeedbackCategoryName';
    
  }


  public queryUpdate()
  {

   if(this.selectedUser!="")
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"where username="+this.selectedUser+" or usernameResolve="+this.selectedUser;
    this.first=false;
   }

   if(this.selectedYear!="")
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"where DATEPART(yy,[Date])="+this.selectedYear;
    this.first=false
   }
   if(this.selectedMonth!="")
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"where DATEPART(mm,[Date])="+this.selectedMonth;
    this.first=false
   }
   if(this.selectedDay!="")
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"where DATEPART(dd,[Date])="+this.selectedDay;
    this.first=false
   }

   if(this.selectedObject!="" )
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"f inner join  objectstorecheck osc on(f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
    + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) where objectname="
    + this.selectedObject;
    this.first=false
   }

   if( this.selectedFormat!="" )
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"f inner join  objectstorecheck osc on(f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
    + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany) where objectFormat="
    + this.selectedFormat;
    this.first=false
   }

   if( this.selectedRetailer!="" )
   {
    if (this.first=false)
    {
      this.selectQuery=this.selectQuery+" and ";
    }

    this.selectQuery=this.selectQuery+"f inner join  objectstorecheck osc on(f.ObjectStoreCheckId=osc.ObjectStoreCheckId)"
    + " inner join [object] o on (osc.ObjectIdCompany=o.ObjectIdCompany)"
    +" inner join Retailer r on (o.RetailerId=r.RetailerId)  where retailerName="
    + this.selectedFormat;
    this.first=false
   }
  }

  public send()
  {
    this.statisticsService.getFeedbackCount(this.selectQuery).subscribe(data => {
      console.log(data);
    });
  }
    
  

}
