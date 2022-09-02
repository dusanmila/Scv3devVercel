import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { single } from './data';

@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent implements OnInit {

  result: StatisticsModel[];

  single: any[];
  view: [number, number] = [600, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  label: string = 'Total Feebacks';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0081af', '#00abe7', '#ead2ac', '#eaba6b']
  };

  constructor(public statisticsService: StatisticsService) {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.getCountOfFeedbackByCategory();
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public getCountOfFeedbackByCategory() {
    let query = 'select feedbackCategoryName as "Name", count(feedbackId) as "Value" from feedback f left join feedbackCategory fc on (f.feedbackCategoryId = fc.feedbackCategoryId) group by feedbackCategoryName';
    this.statisticsService.getCountListByQuerry(query).subscribe(data => {
      this.result = data;
    });
  }

}
