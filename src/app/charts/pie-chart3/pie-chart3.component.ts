import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsModel } from 'src/app/models/statisticsModel';
import { StatisticsService } from 'src/app/Services/statistics.service';


@Component({
  selector: 'pie-chart3',
  templateUrl: './pie-chart3.component.html',
  styleUrls: ['./pie-chart3.component.css']
})

//OBJECTS BY FEEDBACKS
export class PieChart3Component implements OnInit{

  result: StatisticsModel[] = [];

  single: any[];


  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  view: [number, number] = [600, 300];

  constructor(public statisticsService: StatisticsService) {
    //Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.loadData();
  }


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00abe7', '#2dc7ff', '#ead2ac', '#eaba6b']
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public loadData() {
    this.statisticsService.getTop3ObjectsByFeedbacks().subscribe(data => {
      this.result = data;
    });
  }

}
