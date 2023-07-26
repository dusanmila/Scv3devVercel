import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PromoService } from 'src/app/Services/promo.service';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { StatisticsModel } from 'src/app/models/statisticsModel';

@Component({
  selector: 'app-promo-dashboard',
  templateUrl: './promo-dashboard.component.html',
  styleUrls: ['./promo-dashboard.component.css']
})
export class PromoDashboardComponent implements OnInit {

  opened: boolean = false;
  resolved: boolean = false;
  flag: number = 1;
  title: string = 'Dashboard';
  breakpoint: number;

  query: string;
  selectQuery: string;


  days2: string[];

  years: string[] = [
    'All', '2022', '2023', '2024', '2025', '2026'
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


  selectedYear: string = "";
  selectedDay: string = "";
  selectedMonth: string = "";
  selectedUser: string = "";
  selectedObject: string = "";
  selectedRetailer: string = "";
  selectedProduct: string = "";

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


  ropiByProductCategories: StatisticsModel[] = [];
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  labelFormat(label) {
    const self: any = this;

    const data = self.series.find(x => x.name === label);

    if (data) {
      return `${data.name}: ${data.value}%`;
    } else {
      return label;
    }
  }

  tooltipText(data) {
    return `${data.data.label}: ${data.data.value}%`;
  }

  constructor(public statisticsService: StatisticsService,
    public promoService: PromoService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 2 : 4;
    this.send();
    this.getRopiByProductCategories();
  }

  changePage(flag: number, title: string) {
    this.flag = flag;
    this.title = title;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 2 : 4;
  }

  selectRetailer(retailer: string) {
    if (this.selectedObject)
      this.selectedObject = '';
    this.selectedRetailer = retailer;
    this.getRopiByProductCategories();
  }

  selectUser(user: string) {
    this.selectedUser = user;
    this.send();
  }

  selectObject(object: string) {
    if (this.selectedRetailer)
      this.selectedRetailer = '';
    this.selectedObject = object;
    this.send();
  }

  selectProduct(product: string) {
    if (this.selectedProduct)
      this.selectedProduct = '';
    this.selectedProduct = product;
    this.send();
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.send();
  }

  setYear(value) {
    if (value === "All") {
      this.selectedYear = "";
    } else {
      this.selectedYear = value;
    }
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
    this.send();
  }

  setDay(value) {
    this.selectedDay = value;
    this.send();
  }

  send() {

  }

  getRopiByProductCategories() {
    this.promoService.getRopiByProductCategories(this.selectedRetailer).subscribe(data => {
      this.ropiByProductCategories = data;
    });
  }

}
