import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';

@Component({
  selector: 'app-number-card-chart',
  templateUrl: './number-card-chart.component.html',
  styleUrls: ['./number-card-chart.component.css']
})
export class NumberCardChartComponent implements OnInit {

  result: StatisticsModel[] = [];

  single: any[];
  view: [number, number] = [1200, 180];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00abe7', '#2dc7ff', '#ead2ac', '#eaba6b']
  };

  cardColor: string = '#0081af';
  textColor: string = '#fff';

  constructor(public statisticsService: StatisticsService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  onSelect(event) {
    console.log(event);
  }

  public loadData() {
    this.statisticsService.getCountData().subscribe(data => {
      this.result = data;
    });
  
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 180];
  }

}
