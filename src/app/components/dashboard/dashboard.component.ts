import { Component, OnInit } from '@angular/core';
import { Tile } from '@angular/material/grid-list/tile-coordinator';

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
  selectedMonth: string;
  selectedRetailer: string;
  selectedUser: string;
  selectedObject: string;
  query: string;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor() { }

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

}
