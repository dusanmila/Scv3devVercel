import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PromoEvaluatorDialogComponent } from 'src/app/dialogs/promo-evaluation-dialog/promo-evaluation-dialog.component';
import { PromoEvaluator } from 'src/app/models/promoEvaluator';
import { PromoEvaluatorService } from 'src/app/Services/promo-evaluator.service';

@Component({
  selector: 'app-promo-evaluator',
  templateUrl: './promo-evaluator.component.html',
  styleUrls: ['./promo-evaluator.component.css']
})
export class PromoEvaluatorComponent implements OnInit {

  displayedColumns = ["Position","Username", "Rebate", "actions"];
  dataSource: MatTableDataSource<PromoEvaluator>;
  isLoading: boolean = false;
  noData: boolean = false;
  count: number = 5;
  page: number = 1;
  search: string = '';
  length: number = 0;

  constructor(public promoEvaluatorService: PromoEvaluatorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData(false);
  }

  public loadData(pageChanged: boolean) {
    this.isLoading = true;
    if (!pageChanged)
      this.page = 1;
    this.promoEvaluatorService.getPromoEvaluators(this.count, this.page, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<PromoEvaluator>(data);
        this.noData = false;
        this.length = data[0].totalCount;
      } else {
        this.noData = true;
        this.dataSource = data;
      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(true);
  }

  public openDialog(flag: number, username?: string, rebate?: number) {
    const dialogRef = this.dialog.open(PromoEvaluatorDialogComponent, { data: { username, rebate } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData(false);
      }
    });
  }

}
