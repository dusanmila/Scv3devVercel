import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { single } from './data';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {

  @Input() data: StatisticsModel[];
  result: StatisticsModel[];

  single: any[];
  multi: any[];
  // data: any[];

  view: [number, number] = [500, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  @Input() xAxisLabel;
  showYAxisLabel = true;
  @Input() yAxisLabel;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0081af', '#00abe7', '#ead2ac', '#eaba6b']
  };

  constructor(public statisticsService: StatisticsService) {
    Object.assign(this, { single })
    // Object.assign(this, { data })
  }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 300];
  }

}
