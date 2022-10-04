import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent {

  @Input() data: StatisticsModel[];

  single: any[];
  view: [number, number] = [600, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;

  label: string = 'Total Feedbacks';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0081af', '#00abe7', '#ead2ac', '#eaba6b']
  };

  constructor(public statisticsService: StatisticsService) {
  
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

}
