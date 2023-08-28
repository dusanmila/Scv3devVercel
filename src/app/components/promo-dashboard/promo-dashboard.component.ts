import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PromoService } from 'src/app/Services/promo.service';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { GroupedBarChartDataModel } from 'src/app/models/groupedBarChartDataModel';
import { PromoStatisticsTableModel } from 'src/app/models/promoStatisticsTableModel';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import * as saveAs from 'file-saver';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

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
  selectedRetailerForSecondTable: string = "null";
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
  animations: boolean = true;

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
    domain: ['#00abe7', '#2dc7ff', '#ead2ac', '#eaba6b']
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
    console.log(data);
    return `${data.data.label}: ${data.data.value}%`;
  }

  ropiCashByProductCategories: GroupedBarChartDataModel[] = [];
  yAxisTickFormattingCash = function (value: number) {
    return (value / 1000000).toFixed(2);
  }

  avgUpliftByPeriod: StatisticsModel[] = [];
  promoCountByPeriod: StatisticsModel[] = [];
  ropiCashByPeriod: StatisticsModel[] = [];

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradientBarChart = false;
  showLegendBarChart = true;
  showXAxisLabel = true;
  xAxisLabel = 'Period';
  showYAxisLabel = true;
  yAxisLabel = 'Promo count';
  yAxisTickFormattingCount = function (value) {
    return value;
  }

  displayedColumns = ['name', 'promoCountLastYear', 'promoCountThisYear', 'ropiLastYear', 'ropiThisYear', 'ropiCashLastYear', 'ropiCashThisYear', 'uplift'];
  promoAndRopiByProductCategoriesAndYears: PromoStatisticsTableModel[] = [];
  promoAndRopiByProductCategoriesAndYearsSecondTable: PromoStatisticsTableModel[] = [];
  showSecondTable: boolean = false;
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  retailerRadioBtnValue: string = 'retailer1';

  numericData: StatisticsModel[] = [];
  cardColor: string = '#0081af';
  textColor: string = '#fff';

  constructor(public statisticsService: StatisticsService,
    public promoService: PromoService) { }

  ngOnInit(): void {
    registerLocaleData(es);
    this.selectedStartDate.setDate(1);
    this.breakpoint = (window.innerWidth <= 800) ? 2 : 4;
    this.getPromoCountAndRopiByProductCategoriesAndYears();
    this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getRopiCashByProductCategories();
    this.getPromoCountByPeriod();
    this.getRopiCashByPeriod();
    this.getNumericData();
    this.getAvgUpliftByPeriod();
  }

  changePage(flag: number, title: string) {
    this.flag = flag;
    this.title = title;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 2 : 4;
  }

  selectRetailer(retailer: string) {
    if (this.retailerRadioBtnValue === 'retailer1') {
      this.selectedRetailer = retailer;
      this.getPromoCountAndRopiByProductCategoriesAndYears();
      this.getPromoCountByProductCategories();
      this.getPromoCountByProductCategoriesLastYear();
      this.getPromoCountByPeriod();
      this.getRopiCashByPeriod();
      this.getRopiCashByProductCategories();
      this.getAvgUpliftByPeriod();
    } else if (this.retailerRadioBtnValue === 'retailer2') {
      this.selectedRetailerForSecondTable = retailer;
      this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
    }
  }

  deselectRetailer() {
    this.selectedRetailer = '';
    this.getPromoCountAndRopiByProductCategoriesAndYears();
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getPromoCountByPeriod();
    this.getRopiCashByPeriod();
    this.getRopiCashByProductCategories();
    this.getAvgUpliftByPeriod();
  }

  deselectRetailerForSecondTable() {
    this.selectedRetailerForSecondTable = '';
    this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
  }

  onRadioBtnChange(event) {
    this.retailerRadioBtnValue = event;
  }

  selectUser(user: string) {
    this.selectedUser = user;
    this.getPromoCountByProductCategories();
    this.getPromoCountByProductCategoriesLastYear();
    this.getPromoCountByPeriod();
    this.getRopiCashByPeriod();
    this.getPromoCountAndRopiByProductCategoriesAndYears();
    this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
    this.getRopiCashByProductCategories();
    this.getAvgUpliftByPeriod();
  }

  selectProductCategory(productCategory: string) {
    this.selectedProductCategory = productCategory;
    this.getPromoCountByPeriod();
    this.getRopiCashByPeriod();
    this.getPromoCountAndRopiByProductCategoriesAndYears();
    this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
    this.getAvgUpliftByPeriod();
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.selectedStartDate = new Date(dateRangeStart.value);
    this.selectedEndDate = new Date(dateRangeEnd.value);

    if (dateRangeStart.value && dateRangeEnd.value) {
      this.getPromoCountAndRopiByProductCategoriesAndYears();
      this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
      this.getPromoCountByProductCategories();
      this.getPromoCountByProductCategoriesLastYear();
      this.getRopiCashByPeriod();
      this.getPromoCountByPeriod();
      this.getRopiCashByProductCategories();
      this.getAvgUpliftByPeriod();
    }
  }

  getPromoCountAndRopiByProductCategoriesAndYears() {
    this.promoService.getPromoCountAndRopiByProductCategoriesAndYears(this.selectedStartDate, this.selectedEndDate, this.selectedRetailer, this.selectedUser, this.selectedProductCategory).subscribe(data => {
      this.promoAndRopiByProductCategoriesAndYears = data;
    });
  }

  getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable() {
    if (this.showSecondTable) {
      this.promoService.getPromoCountAndRopiByProductCategoriesAndYears(this.selectedStartDate, this.selectedEndDate, this.selectedRetailerForSecondTable, this.selectedUser, this.selectedProductCategory).subscribe(data => {
        this.promoAndRopiByProductCategoriesAndYearsSecondTable = data;
      });
    }
  }


  getPromoCountByProductCategories() {
    this.promoService.getPromoCountByProductCategories(this.selectedRetailer, this.selectedUser, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      this.promoCountByProductCategories = data;
    });
  }

  getPromoCountByProductCategoriesLastYear() {
    const startDateLastYear = new Date(this.selectedStartDate);
    startDateLastYear.setFullYear(this.selectedStartDate.getFullYear() - 1);
    const endDateLastYear = new Date(this.selectedEndDate);
    endDateLastYear.setFullYear(this.selectedEndDate.getFullYear() - 1);
    this.promoService.getPromoCountByProductCategories(this.selectedRetailer, this.selectedUser, startDateLastYear, endDateLastYear).subscribe(data => {
      this.promoCountByProductCategoriesLastYear = data;
    });
  }


  getRopiCashByProductCategories() {
    this.promoService.getRopiCashByProductCategories(this.selectedRetailer, this.selectedUser, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      this.ropiCashByProductCategories = data;
    });
  }

  getAvgUpliftByPeriod() {
    this.promoService.getAvgUpliftByPeriod(this.selectedRetailer, this.selectedUser, this.selectedProductCategory, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      this.avgUpliftByPeriod = data;
    });
  }

  getPromoCountByPeriod() {
    this.promoService.getPromoCountByPeriod(this.selectedRetailer, this.selectedUser, this.selectedProductCategory, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      this.promoCountByPeriod = data;
    });
  }

  getRopiCashByPeriod() {
    this.promoService.getRopiCashByPeriod(this.selectedRetailer, this.selectedUser, this.selectedProductCategory, this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      this.ropiCashByPeriod = data;
    });
  }

  getNumericData() {
    this.promoService.getNumericData().subscribe(data => {
      this.numericData = data;
    });
  }

  export() {

    this.promoService.exportStatistics(this.selectedStartDate, this.selectedEndDate, this.selectedRetailer, this.selectedUser, this.selectedProductCategory, this.selectedRetailerForSecondTable).subscribe((excel) => {

      const fileName = 'PromoStatistics.xlsx';
      saveAs(excel, fileName);
    });


  }

  onChangeSlideToggle() {
    this.showSecondTable = !this.showSecondTable;
    this.getPromoCountAndRopiByProductCategoriesAndYearsForSecondTable();
  }

  calculatePercentage(value: number, data: StatisticsModel[]) {
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    return ((value / totalValue) * 100).toFixed(2);
  }

  format(x: number): string {

    return x.toFixed(2); // Format to 2 decimal places
  }

}
