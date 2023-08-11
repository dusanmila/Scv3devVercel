import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PromoService } from 'src/app/Services/promo.service';
import { UserPerformance } from 'src/app/models/userPerformance';

@Component({
  selector: 'app-user-performance',
  templateUrl: './user-performance.component.html',
  styleUrls: ['./user-performance.component.css']
})
export class UserPerformanceComponent implements OnInit {

  userPerformances: UserPerformance[] = [];
  dataSource: MatTableDataSource<UserPerformance>;
  displayedColumns: string[] = ['username', 'user', 'avgEstimationSuccess'];
  isLoading: boolean = false;
  noData: boolean = false;
  length: number = 0;
  search: string = '';
  page: number = 1;
  count: number = 5;

  constructor(private promoService: PromoService) { }

  ngOnInit(): void {
    this.loadData(false);
  }

  loadData(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    this.isLoading = true;
    this.promoService.getUserPerformance(this.search, this.page, this.count).subscribe(data => {
      this.isLoading = true;
      if (data) {
        this.dataSource = new MatTableDataSource<UserPerformance>(data);
        // this.length = data[0].totalCount;
        this.noData = false;
        this.length = data[0].totalCount;
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0
      }
      this.isLoading = false;
    });
  }

  loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(true);
  }

}
