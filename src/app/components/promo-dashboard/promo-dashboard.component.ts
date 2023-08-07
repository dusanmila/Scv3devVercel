import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PromoService } from 'src/app/Services/promo.service';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { PromoStatisticsTableModel } from 'src/app/models/promoStatisticsTableModel';
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

  selectedUser: string = "";
  selectedRetailer: string = "";
  selectedProductCategory: string = "";

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


  promoCountByProductCategories: StatisticsModel[] = [];
  promoCountByProductCategoriesLastYear: StatisticsModel[] = [];
  pieView: [number, number] = [400, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0081af', '#00abe7', '#ead2ac', '#eaba6b']
  };

  labelFormat(label) {
    const self: any = this;

    const data = self.series.find(x => x.name === label);

    if (data) {
      return `${data.name}: ${data.value}`;
    } else {
      return label;
    }
  }

  tooltipText(data) {
    return `${data.data.label}: ${data.data.value}%`;
  }

  promoCountByPeriod: StatisticsModel[] = [];
  ropiByPeriod: StatisticsModel[] = [];

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradientBarChart = false;
  showLegendBarChart = true;
  showXAxisLabel = true;
  xAxisLabel = 'Period';
  showYAxisLabel = true;
  yAxisLabel = 'Promo count';

  promoAndRopiByProductCategoriesAndYears: PromoStatisticsTableModel[] = [];
  displayedColumns = ['name', 'promoCountLastYear', 'promoCountThisYear', 'promoCountDifference', 'ropiLastYear', 'ropiThisYear', 'ropiDifference', 'ropiCashDifference'];
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();

  panelOpenState = false;

  bestEstimators: StatisticsModel[] = [];
  cardColor: string = '#0081af';
  textColor: string = '#fff';

  constructor(public statisticsService: StatisticsService,
    public promoService: PromoService) { }

  ngOnInit(): void {
    this.selectedStartDate.setDate(1);
    this.breakpoint = (window.innerWidth <= 800) ? 2 : 4;
    this.getPromoCountAndRopiByProductCategoriesAndYears();
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getPromoCountByPeriod();
    this.getRopiByPeriod();
    this.getBestEstimators();
  }

  changePage(flag: number, title: string) {
    this.flag = flag;
    this.title = title;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 2 : 4;
  }

  selectRetailer(retailer: string) {
    this.selectedRetailer = retailer;
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getPromoCountByPeriod();
    this.getRopiByPeriod();
    this.getPromoCountAndRopiByProductCategoriesAndYears();
  }

  selectUser(user: string) {
    this.selectedUser = user;
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getPromoCountByPeriod();
    this.getRopiByPeriod();
    this.getPromoCountAndRopiByProductCategoriesAndYears();
  }

  selectProductCategory(productCategory: string) {
    this.selectedProductCategory = productCategory;
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getPromoCountByPeriod();
    this.getRopiByPeriod();
    this.getPromoCountAndRopiByProductCategoriesAndYears();
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeEnd.value)
    this.selectedStartDate = new Date(dateRangeStart.value);
    this.selectedEndDate = new Date(dateRangeEnd.value);

    if (dateRangeStart.value && dateRangeEnd.value) {
      this.getPromoCountAndRopiByProductCategoriesAndYears();
      this.getPromoCountByProductCategories();
      this.getPromoCountByProductCategoriesLastYear();
    }
  }

  getPromoCountAndRopiByProductCategoriesAndYears() {
    this.promoService.getPromoCountAndRopiByProductCategoriesAndYears(this.selectedStartDate, this.selectedEndDate, this.selectedRetailer, this.selectedUser, this.selectedProductCategory).subscribe(data => {
      this.promoAndRopiByProductCategoriesAndYears = data;
    });
  }

  getPromoCountByProductCategories() {
    this.promoService.getPromoCountByProductCategories(this.selectedRetailer, this.selectedUser, this.selectedProductCategory, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      this.promoCountByProductCategories = data;
    });
  }

  getPromoCountByProductCategoriesLastYear() {
    const startDateLastYear = new Date(this.selectedStartDate);
    startDateLastYear.setFullYear(this.selectedStartDate.getFullYear() - 1);
    const endDateLastYear = new Date(this.selectedEndDate);
    endDateLastYear.setFullYear(this.selectedEndDate.getFullYear() - 1);
    this.promoService.getPromoCountByProductCategories(this.selectedRetailer, this.selectedUser, this.selectedProductCategory, startDateLastYear, endDateLastYear).subscribe(data => {
      this.promoCountByProductCategories = data;
    });
  }

  getPromoCountByPeriod() {
    this.promoService.getPromoCountByPeriod(this.selectedRetailer, this.selectedUser, this.selectedProductCategory).subscribe(data => {
      this.promoCountByPeriod = data;
    });
  }

  getRopiByPeriod() {
    this.promoService.getRopiByPeriod(this.selectedRetailer, this.selectedUser, this.selectedProductCategory).subscribe(data => {
      this.ropiByPeriod = data;
    });
  }

  getBestEstimators() {
    this.promoService.getBestEstimators().subscribe(data => {
      this.bestEstimators = data;
    });
  }

}
